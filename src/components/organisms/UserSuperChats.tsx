import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography, ListItemText, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChatByChannels, Channel } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { ChannelCard } from '../molecules/ChannelCard';
import { useChannelIdContext } from '../templates/ChannelPage';
import { useSeoContext } from '../SEO';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

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
      id: null,
      title: null,
      superChatAmount: null,
    } as Channel;
  });

  return {
    user: null,
    superChatByChannels: superChats,
  } as SuperChatByChannels;
}

export const UserSuperChats = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { channelId, setChannelId } = useChannelIdContext();
  const classes = useStyles();
  const [data, setData] = useState<SuperChatByChannels>(initialSuperChatData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);
  const { seo, setSeo } = useSeoContext();

  useEffect(() => {
    setData(initialSuperChatData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const superChats = await youtube.fetchUserSuperChats(channelId);
        console.log(superChats);
        setShowProgress(false);
        setData(superChats);
        if (superChats.user) {
          setSeo({subtitle: superChats.user.supporterDisplayName});
        }
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
      <Typography component="h2" variant="h2">{data.user ? data.user.supporterDisplayName : ""}</Typography>
      <List dense={true}>
      {notices.map((notice, i) => (
        <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
      ))}
      </List>
      <List className="ranking-main">
      {data.superChatByChannels.map((superChat, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} id={`rank${i+1}`} className={`${classes.listroot} ${classes.listitem}`} >
            <ChannelCard channel={superChat} />
          </ListItem>
          {/* 広告枠用 item-area のクラス名必須 display: block 必須 */}
          {((i === 6)) ? (
          <ListItem className={`${classes.listitem} ${classes.ads} item-area`}>
            <InfeedAds />
          </ListItem>
          ) : ("")}
        </React.Fragment>
      ))}
      </List>
      {data.superChatByChannels.length === 0 ? (
        <React.Fragment><DirectionsRunIcon className={classes.icon} />集計中</React.Fragment>
      ) : ""}
      {error ? (error instanceof NotFoundError) ? (
        <ErrorSnackBar text="このチャンネルは集計中です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
