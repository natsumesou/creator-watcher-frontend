import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Box } from '@material-ui/core';
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
import { Link } from '@material-ui/core';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listroot: {
      margin: '0 0 1em',
      display: 'block',
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
    ads: {
      minHeight: '250px',
      display: 'block',
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

  const handleClick = (event) => {
    navigate(event.currentTarget.getAttribute('href'));
    event.preventDefault();
  };

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
            article: article,
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
          {((i !== 0 && i % 10 === 0) || i === 1) ? (
          <ListItem className={`${classes.listitem} ${classes.ads} item-area`}>
            <InfeedAds />
          </ListItem>
          ) : ("")}
        </React.Fragment>
      ))}
      </List>
      <Link color="inherit" href="/ranking/archive" onClick={(e) => handleClick(e)} className={classes.link}>
        <AccountBalanceIcon className={classes.icon} />
        アーカイブ
      </Link>
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
