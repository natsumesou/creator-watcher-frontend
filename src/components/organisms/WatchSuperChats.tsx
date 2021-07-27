import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Button, ButtonBase, Typography, ListItemText, Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChat, SuperChats as SuperChatsType } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { SuperChatCard } from '../molecules/SuperChatCard';
import { Query, useQueryContext } from '../templates/WatchPage';
import { navigate } from 'gatsby';
import { getThumbnail } from '../molecules/ChannelCard';
import { useSeoContext } from '../SEO';
import { TempCard } from '../molecules/TempCard';
import { Skeleton } from '@material-ui/lab';
import { CustomDate } from '@/entities/Date';
import useScript from '@/hooks/useScript';
import { A8RakutenAds } from '../atoms/ads/a8rakutenranking';

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
      minHeight: '100px',
    },
    nameRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    nameSkeleton: {
      display: 'inline-block',
      width: 100,
    },
    titleRoot: {
      width: '100%',
      textAlign: 'center',
    },
    iframe: {
      width: '100%',
      height: 360,
      [theme.breakpoints.down('xs')]: {
        height: 270,
      },
    },
    noSC: {
      margin: '0 0 1em',
    }
  }),
);

const initialSuperChatData = () => {
  const superChats = Array(10).fill(null).map((_,i) => {
    return {
      user: null,
      totalAmount: null,
    } as SuperChat;
  });

  return {
    publishedAt: null,
    superChats: superChats,
  } as SuperChatsType;
}

export const WatchSuperChats = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { query, setQuery } = useQueryContext();
  const { seo, setSeo } = useSeoContext();
  const classes = useStyles(query);
  const [data, setData] = useState<SuperChatsType>(initialSuperChatData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setData(initialSuperChatData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const superChats = await youtube.fetchStreamSuperChats(query.cid, query.vid);
        setShowProgress(false);
        setData(superChats);
        setSeo({subtitle: superChats.title, image: getThumbnail(query.vid)});
      } catch(err) {
        if (err instanceof NotFoundError) {
          setError(err);
        } else {
          console.error(err);
        }
        setShowProgress(false);
        setError(err);
      }
    }
    fetchData();
  }, [query]);

  const handleClick = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (href) {
      navigate(href);
    }
    event.preventDefault();
  };
  useScript("/scripts/a8rakutenwidget.js");

  return (
    <TabPanel>
        <Typography className={classes.titleRoot} component="h2" variant="h2">{data.title ? data.title : (
          <Skeleton animation="wave" height="60px" width="100%" />
        )}</Typography>
      <iframe id="ytplayer" className={classes.iframe} src={`https://www.youtube.com/embed/${query.vid}`} frameBorder="0" />
      <TempCard id={query.vid} />
      <Button href={data.channelName ? `/channel?id=${query.cid}` : ""} onClick={handleClick}>
        <Typography component="h4" variant="h3" className={classes.nameRoot}>{data.channelName ? data.channelName : (
          <Skeleton animation="wave" className={classes.nameSkeleton} />
        )} の月間スパチャ上位を見る🔍</Typography>
      </Button>
      <List dense={true}>
      {notices.map((notice, i) => (
        <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
      ))}
      </List>
      <Typography variant="h3" component="h3">配信のスパチャ金額🥇{data.superChatAmount}</Typography>
      <List className="ranking-main">
      {data.superChats.map((superChat, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.listroot} ${classes.listitem}`} >
            <SuperChatCard superChat={superChat} />
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
      {data.superChats.length === 0 ? (
        <Typography variant="body2" className={classes.noSC}>スパチャは確認できませんでした</Typography>
      ) : ""}
      {data.publishedAt ? (
        <Typography variant="body2">
        更新日時：
        <time dateTime={data.publishedAt.toISOString()}>{CustomDate.getDisplayDateTime(data.publishedAt)}</time>
        </Typography>
      ) : ""}
      {error ? (error instanceof NotFoundError) ? (
        <ErrorSnackBar text="集計中です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
