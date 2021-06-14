import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Channel } from '../../entities/entity';
import { CATEGORY, RANGE, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { RankingTime } from '../atoms/RankingTime';
import { ChannelCard, getThumbnail } from '../molecules/ChannelCard';
import { RankingNavigation } from '../molecules/RankingNavigation';
import { Article } from '../SEO';
import { useArticleContext } from '../templates/RankingPage';
import { TabPanel } from './TabPane';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0 1em',
      display: 'block',
    },
    listitem: {
      padding: 0,
    },
    navigation: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

const initialChannelData = () => {
  const channels = Array(10).fill(null);
  return channels.map((_,i) => {
    return {
      title: null,
      id: i.toString(),
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
  const { article, setArticle } = useArticleContext();
  const classes = useStyles();
  const [data, setData] = useState<Channel[]>(initialChannelData());
  const youtube = new YouTube();
  const { category, range, time, notices } = props;
  const [error, setError] = useState<Error>(null);

  const createArticle = (ranking: Channel[]) => {
    return {
      headline: article.headline,
      image: getThumbnail(ranking[0].videoId),
      publishedAt: article.publishedAt,
    } as Article;
  }

  useEffect(() => {
    setData(initialChannelData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const ranking = await youtube.fetchRanking(category, range, time);
        if (article) {
          setArticle(createArticle(ranking));
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

  return (
    <TabPanel>
      { time ? (<RankingTime range={range} time={time} />) : (<RankingNavigation className={classes.navigation} />)}
      <List dense={true}>
        {notices ?
          notices.map((notice, i) => (
            <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
          )) : ""}
      </List>
      <List className="ranking-main">
      {data.map((channel, i) => (
        <React.Fragment>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.root} ${classes.listitem}`} >
            <ChannelCard channel={channel} />
          </ListItem>
           {/* 広告枠用 */}
          <ListItem key={`${i}.5`} className={`${classes.listitem} item-${i}`}></ListItem>
        </React.Fragment>
      ))}
      </List>
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
