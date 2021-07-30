import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Channel } from '../../entities/entity';
import { CATEGORY, RANGE, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { CalcTime } from '../atoms/CalcTime';
import { ChannelCard, getThumbnail } from '../molecules/ChannelCard';
import { RankingNavigation } from '../molecules/RankingNavigation';
import { Article, useSeoContext } from '../SEO';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { RankingArchive } from './RankingArchive';
import { UpdateTime } from '../atoms/UpdateTime';
import { A8RakutenAds } from '../atoms/ads/a8rakutenranking';
import useScript from '@/hooks/useScript';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listroot: {
      margin: '0 0 1em',
      display: 'block',
      "&:last-child": {
        margin: 0,
      }
    },
    listitem: {
      padding: 0,
    },
    link: {
      fontSize: theme.typography.body2.fontSize,
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
      verticalAlign: 'middle',
    },
    time: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    updateAt: {
      margin: '0 0 1em',
    },
    ads: {
      minHeight: '100px',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
    archive: {
      margin: '0.5em 0 0',
    },
  }),
);

const initialChannelData = () => {
  const channels = Array(50).fill(null);
  return channels.map((_,i) => {
    return {
      meta: null,
      superChatAmount: null,
      memberCount: null,
    } as Channel
  });
}

type Props = {
  category: CATEGORY,
  range: RANGE,
  time?: string,
  notices?: string[],
}

export const Ranking: React.FC<Props> = (props) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { seo, setSeo } = useSeoContext();
  const classes = useStyles();
  const [data, setData] = useState<Channel[]>(initialChannelData());
  const youtube = new YouTube();
  const { category, range, time, notices } = props;
  const [error, setError] = useState<Error>(null);

  const createArticle = (ranking: Channel[]) => {
    return {
      headline: seo.article.headline,
      image: getThumbnail(ranking[0].videoId),
      publishedAt: seo.article.publishedAt,
    } as Article;
  }

  useEffect(() => {
    setData(initialChannelData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const ranking = await youtube.fetchRanking(category, range, time);
        if (seo.article) {
          const article = createArticle(ranking);
          setSeo({
            subtitle: article.headline,
            image: article.image,
            article: article,
          });
        } else {
          setSeo({
            image: getThumbnail(ranking[0].videoId),
          });
        }
        setShowProgress(false);
        setData(ranking);
      } catch(err) {
        console.error(err);
        setShowProgress(false);
        setError(err);
      }
    }
    fetchData();
  }, [range, time]);
  useScript("/scripts/a8rotatewidget.js");

  return (
    <TabPanel>
      <Box className={classes.time}>
      { time ? (<CalcTime range={range} time={time} prefix="ランキング対象期間" />) : (<RankingNavigation />)}
      </Box>
      <List dense={true}>
        {notices ?
          notices.map((notice, i) => (
            <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
          )) : ""}
      </List>
      <List className="ranking-main">
      {data.map((channel, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.listroot} ${classes.listitem}`} >
            <ChannelCard channel={channel} />
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
      { time ? (
        <Box className={classes.updateAt}>
          <UpdateTime range={range} time={time} prefix="更新日時" />
        </Box>
      ) : ""}
      <Typography component="h3" variant="h3" className={classes.archive}><AccountBalanceIcon className={classes.icon} />ランキングアーカイブ</Typography>
      <RankingArchive />
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
