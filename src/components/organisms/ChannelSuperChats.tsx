import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography, ListItemText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChat, SuperChats as SuperChatsType } from '../../entities/entity';
import { NotFoundError, RANGE, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { SuperChatCard } from '../molecules/SuperChatCard';
import { CalcTime } from '../atoms/CalcTime';
import { Skeleton } from '@material-ui/lab';
import { useChannelIdContext } from '../templates/ChannelPage';
import { useSeoContext } from '../SEO';

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

export const ChannelSuperChats = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { channelId, setChannelId } = useChannelIdContext();
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
        const superChats = await youtube.fetchChannelSuperChats(channelId);
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
  }, [channelId]);

  return (
    <TabPanel>
      <Button href={`https://www.youtube.com/channel/${channelId}`} target="_blank" rel="noopener">
      <Typography component="h2" variant="h2">{data.title}</Typography>
      </Button>
      <Box className={classes.time}>
      {data.startAt ? (
        <CalcTime range={RANGE.weekly} time={data.startAt} prefix="スパチャ集計期間" />
        ) : (
        <Skeleton animation="wave" height={40} width="50%" />
        )}
      </Box>
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
          {((i === 2 || i === 6)) ? (
          <ListItem className={`${classes.listitem} ${classes.ads} item-area`}>
            <InfeedAds />
          </ListItem>
          ) : ("")}
        </React.Fragment>
      ))}
      </List>
      {data.superChats.length === 0 ? (
        <React.Fragment>スパチャは確認できませんでした</React.Fragment>
      ) : ""}
      {error ? (error instanceof NotFoundError) ? (
        <ErrorSnackBar text="このチャンネルは集計中です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
