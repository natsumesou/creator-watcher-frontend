import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography, ListItemText, ButtonBase } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChat, SuperChats as SuperChatsType } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { SuperChatCard } from '../molecules/SuperChatCard';
import { useSeoContext } from '../SEO';
import { Skeleton } from '@material-ui/lab';
import { useQueryContext } from '../templates/WatchPage';
import { CustomDate } from '@/entities/Date';
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
    ads: {
      minHeight: '100px',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
    channelLinkRoot: {
      width: '100%',
    },
    titleRoot: {
      width: '100%',
    },
    title: {
      margin: '0 auto',
    },
    amountRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    amountSkeleton: {
      display: 'inline-block',
      width: 100,
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
    superChats: superChats,
    publishedAt: null,
  } as SuperChatsType;
}

export const ChannelSuperChats = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { query, setQuery } = useQueryContext();
  const classes = useStyles();
  const [data, setData] = useState<SuperChatsType>(initialSuperChatData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);
  const { seo, setSeo } = useSeoContext();

  useEffect(() => {
    setData(initialSuperChatData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const superChats = await youtube.fetchChannelSuperChats(query.cid);
        setShowProgress(false);
        setData(superChats);
        setSeo({subtitle: superChats.title});
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
  useScript("/scripts/a8rakutenwidget.js");

  return (
    <TabPanel>
      <ButtonBase href={`https://www.youtube.com/channel/${query.cid}`} target="_blank" rel="noopener" className={classes.channelLinkRoot}>
      <Typography component="h2" variant="h2" className={data.title ? "" : classes.titleRoot}>{data.title ? data.title : (
        <Skeleton animation="wave" width="30%" className={classes.title} />
      )}</Typography>
      </ButtonBase>
      <List dense={true}>
      {notices.map((notice, i) => (
        <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
      ))}
      </List>
      <Typography variant="h3" component="h3" className={classes.amountRoot}>チャンネルの月間スパチャ金額🥇{data.superChatAmount ? data.superChatAmount : (
        <Skeleton animation="wave" width="100px" className={classes.amountSkeleton} />
      )}</Typography>
      <List className="ranking-main">
      {data.superChats.map((superChat, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.listroot} ${classes.listitem}`} >
            <SuperChatCard superChat={superChat} />
          </ListItem>
          {/* 広告枠用 item-area のクラス名必須 display: block 必須 */}
          {((i % 5 === 0)) ? (
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
        <ErrorSnackBar text="このチャンネルは集計中です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
