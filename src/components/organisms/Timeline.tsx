import { useProgressContext } from '@/app';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Stream } from '../../entities/Stream';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { StreamCard } from '../molecules/StreamCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0 1em',
    },
  }),
);

export const Timeline = () => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Stream[]>([]);
  const youtube = new YouTube();
  useEffect(() => {
    setShowProgress(true);

    const fetchData = async () => {
      const hololive: CATEGORY = "hololive";
      const streams = await youtube.fetchTimeline(hololive);
      setShowProgress(false);
      setData(streams);
    }
    fetchData();
  }, [])

  return (
    <div>
      {data.map(stream => (
        <div key={stream.id} className={classes.root} >
          <StreamCard stream={stream} />
        </div>
      ))}
    </div>
  )
}
