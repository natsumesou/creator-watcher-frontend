import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography, ListItemText, Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { SuperChatByChannels, Channel } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { TabPanel } from './TabPane';
import { InfeedAds } from '../atoms/ads/InfeedAds';
import { ChannelCard } from '../molecules/ChannelCard';
import { useSeoContext } from '../SEO';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Skeleton } from '@material-ui/lab';
import { useQueryContext } from '../templates/WatchPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listroot: {
      margin: '0 0 1em',
      display: 'block',
    },
    profileRoot: {
      width: '100%',
      position: 'relative',
      height: 150,
      overflow: 'hidden',
      alignItems: 'center',
      display: 'flex',
    },
    profileBox: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: (data: SuperChatByChannels) => `${data.user ? `url(${data.user.thumbnail})` : ""}`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(4px) grayscale(30%) opacity(30%)',
    },
    avatar: {
      position: 'absolute',
      width: 64,
      height: 64,
      marginLeft: 20,
      verticalAlign: 'middle',
    },
    profileName: {
      left: 64,
      marginLeft: 20,
      position: 'absolute',
      padding: 20,
      [theme.breakpoints.down('xs')]: {
        padding: 10,
      },
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
    amountRoot: {
      display: 'flex',
      alignItems: 'center',
    },
    amountSkeleton: {
      display: 'inline-block',
      width: 100,
    }
  }),
);

const initialSuperChatData = () => {
  const superChats = Array(3).fill(null).map((_,i) => {
    return {
      meta: null,
      superChatAmount: null,
    } as Channel;
  });

  return {
    user: null,
    superChatByChannels: superChats,
  } as SuperChatByChannels;
}

export const UserSuperChats = ({ notices }) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { query, setQuery } = useQueryContext();
  const [data, setData] = useState<SuperChatByChannels>(initialSuperChatData());
  const classes = useStyles( data );
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);
  const { seo, setSeo } = useSeoContext();

  useEffect(() => {
    setData(initialSuperChatData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const superChats = await youtube.fetchUserSuperChats(query.cid);
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
  }, [query]);

  return (
    <TabPanel>
      <Box className={classes.profileRoot}>
        <span className={classes.profileBox}></span>
        <Avatar alt={data.user ? data.user.supporterDisplayName : ""} src={data.user ? data.user.thumbnail : ""} className={classes.avatar} />
        <Typography className={classes.profileName} component="h2" variant="h2">{data.user ? data.user.supporterDisplayName : (
          <Skeleton animation="wave" height="60px" width="200px" />
        )}</Typography>
      </Box>
      <List dense={true}>
      {notices.map((notice, i) => (
        <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
      ))}
      </List>
        <Typography variant="body1" className={classes.amountRoot}>個人の月間スパチャ金額🥇{data.user ? data.totalAmount : (
          <Skeleton animation="wave" width="100px" className={classes.amountSkeleton} />
        )}</Typography>
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
        <ErrorSnackBar text="集計中です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
