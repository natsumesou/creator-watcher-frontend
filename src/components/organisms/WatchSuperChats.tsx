import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChat, SuperChats as SuperChatsType } from '../../entities/entity';
import { NotFoundError, RANGE, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { SuperChatCard } from '../molecules/SuperChatCard';
import { CalcTime } from '../atoms/CalcTime';
import { Skeleton } from '@material-ui/lab';
import { useQueryContext } from '../templates/WatchPage';

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
    }
  }),
);

const initialSuperChatData = () => {
  const superChats = Array(10).fill(null).map((_,i) => {
    return {
      supporterChannelId: null,
      supporterDisplayName: null,
      totalAmount: null,
      thumbnail: null,
    } as SuperChat;
  });

  return {
    startAt: null,
    superChats: superChats,
  } as SuperChatsType;
}

export const WatchSuperChats = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { query, setQuery } = useQueryContext();
  const classes = useStyles();
  const [data, setData] = useState<SuperChatsType>(initialSuperChatData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setData(initialSuperChatData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        console.log(query);
        const superChats = await youtube.fetchStreamSuperChats(query.cid, query.vid);
        setShowProgress(false);
        setData(superChats);
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

  return (
    <TabPanel>
      <a href={`https://www.youtube.com/watch?v=${query.vid}`} target="_blank" rel="noopener">
        <Typography component="h2" variant="h2">{data.channelName}</Typography>
      </a>
      <List dense={true}>
      {notices.map((notice, i) => (
        <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
      ))}
      </List>
      <List className="ranking-main">
      {data.superChats.map((superChat, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.listroot} ${classes.listitem}`} >
            <SuperChatCard superChat={superChat} />
          </ListItem>
          {/* 広告枠用 item-area のクラス名必須 display: block 必須 */}
          {((i !== 0 && i % 10 === 0)) ? (
          <ListItem className={`${classes.listitem} ${classes.ads} item-area`}>
            <InfeedAds />
          </ListItem>
          ) : ("")}
        </React.Fragment>
      ))}
      </List>
      {error ? (error instanceof NotFoundError) ? (
        <ErrorSnackBar text="集計対象外です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
