import { useProgressContext } from '@/app';
import { CustomDate } from '@/entities/Date';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Stream } from '../../entities/entity';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { StreamCard } from '../molecules/StreamCard';
import { TabPanel } from './TabPane';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 0 1em',
    },
    listitem: {
      paddingTop: 0,
      paddingBottom: 0,
    }
  }),
);
const initialStreamData = () => {
  const size = 10;
  const streams = [];
  const stream = {
    title: null,
    chatCount: null,
    superChatAmount: null,
    memberCount: null,
    channelTitle: null,
    id: null,
    thumbnail: null,
    link: null,
    status: "process",
    publishedAt: new CustomDate(),
  } as Stream;

  for (let i = 0; i < size; i++) {
    const copyStream = Object.assign(stream) as Stream;
    copyStream.id = i.toString();
    streams.push(copyStream);
  }
  return streams;
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

  return (
    <TabPanel>
      <List dense={true}>
        {mergedNotices.map((notice, i) => (
          <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
        ))}
      </List>
      {data.map((stream, i) => (
        <div key={i} className={classes.root} >
          <StreamCard stream={stream} />
        </div>
      ))}
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
