import { useProgressContext } from '@/app';
import { CustomDate } from '@/entities/Date';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Stream } from '../../entities/entity';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { StreamCard } from '../molecules/StreamCard';
import { TabPanel } from './TabPane';
import { TempCard } from '../molecules/TempCard';
import { A8RakutenAds } from '../atoms/ads/a8rakutenranking';
import useScript from '@/hooks/useScript';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 0 1.5em',
      display: 'block',
    },
    listitem: {
      padding: 0,
    },
    ads: {
      minHeight: '100px',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    }
  }),
);

const initialStreamData = () => {
  const streams = Array(125).fill(null);
  return streams.map((_, i) => {
    return {
      meta: {
        id: null,
        title: null,
        channelId: null,
      },
      chatCount: null,
      superChatAmount: null,
      memberCount: null,
      channelTitle: null,
      thumbnail: null,
      link: null,
      status: "process",
      publishedAt: new CustomDate(),
    } as Stream;
  });
}

type Props = {
  category: CATEGORY,
  notices?: string[],
}

export const Timeline: React.FC<Props> = (props) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Stream[]>(initialStreamData());
  const youtube = new YouTube();
  const { category, notices } = props;
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const streams = await youtube.fetchTimeline(category);
        setShowProgress(false);
        setData(streams);
      } catch (err) {
        console.error(err);
        setShowProgress(false);
        setError(err);
      }
    }
    fetchData();
  }, [])

  const defaultNotices = [
    "配信が終了したアーカイブでチャット欄が取得可能なものを順次表示しています",
    "アーカイブで取得できないスパチャやメンバー加入はカウントされません",
    "金額は為替レートの影響を受けて前後する可能性があります",
  ];

  const mergedNotices = notices ? defaultNotices.concat(notices) : defaultNotices;
  useScript("/scripts/a8rotatewidget.js");

  return (
    <TabPanel>
      <List dense={true}>
        {mergedNotices.map((notice, i) => (
          <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
        ))}
      </List>
      <List className="timeline-main">
      {data.map((stream, i) => (
        <React.Fragment key={i}>
          <ListItem className={`${classes.root} ${classes.listitem}`} >
            <StreamCard stream={stream} />
            <TempCard id={stream.meta.id} />
          </ListItem>
          {/* 広告枠用 item-area のクラス名必須 display: block 必須 */}
          {((i % 10 === 0)) ? (
          <ListItem className={`${classes.listitem} ${classes.ads} item-area`}>
            <A8RakutenAds />
          </ListItem>
          ) : ("")}
        </React.Fragment>
      ))}
      </List>
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
