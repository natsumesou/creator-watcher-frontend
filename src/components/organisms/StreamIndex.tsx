import { useProgressContext } from '@/app';
import useScript from '@/hooks/useScript';
import { createStyles, List, ListItem, makeStyles, Theme, Box, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { StreamMeta } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { A8RakutenAds } from '../atoms/ads/a8rakutenranking';
import { StreamIndexCard } from '../molecules/StreamIndexCard';
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
  }),
);

const initialStreamData = () => {
  return Array(10).fill(null).map((_,i) => {
    return {
      id: null,
      title: null,
    } as StreamMeta;
  });
}

export const StreamIndex = () => {
  const { showProgress, setShowProgress } = useProgressContext();
  const { query, setQuery } = useQueryContext();
  const classes = useStyles();
  const [data, setData] = useState<StreamMeta[]>(initialStreamData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setData(initialStreamData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const index = await youtube.fetchVideoIndex(query.cid);
        setShowProgress(false);
        setData(index);
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
    <Box p={1}>
      <Typography variant="h3" component="h4" className={classes.amountRoot}>チャンネルの最近の配信</Typography>
      <List className="ranking-main">
      {data.map((stream, i) => (
        <React.Fragment key={i}>
          <ListItem key={i} className={`${classes.listroot} ${classes.listitem}`} >
            <StreamIndexCard stream={stream} />
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
    </Box>
  )
}
