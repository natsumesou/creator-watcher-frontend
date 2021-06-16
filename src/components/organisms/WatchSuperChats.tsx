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
    videoLinkRoot: {
      width: '100%',
      position: 'relative',
      height: 150,
    },
    videoLinkBox: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: (query: Query) =>  `url(${getThumbnail(query.vid)})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(4px) grayscale(30%) opacity(30%)',
    },
    videoLink: {
      position: 'absolute',
    },
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

  const handleClick = (event) => {
    navigate(event.currentTarget.getAttribute('href'));
    event.preventDefault();
  };

  return (
    <TabPanel>
      <ButtonBase href={`https://www.youtube.com/watch?v=${query.vid}`} className={classes.videoLinkRoot} target="_blank" rel="noopener">
        <span className={classes.videoLinkBox}></span>
        <Typography className={classes.videoLink} component="h2" variant="h2">{data.title}</Typography>
      </ButtonBase>
      <Button href={`/channel?id=${query.cid}`} onClick={handleClick}>
        <Typography component="h3" variant="h3">{data.channelName} の週間スパチャ上位を見る</Typography>
      </Button>
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
          {((i === 1)) ? (
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
        <ErrorSnackBar text="集計対象外です🙇‍♀️" />
      ) : (
        <ErrorSnackBar text="データ読み込みエラー" />
      ) : ""}
    </TabPanel>
  )
}
