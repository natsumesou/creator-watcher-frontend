import { useProgressContext } from '@/app';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Channel } from '../../entities/entity';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { ChannelCard } from '../molecules/ChannelCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0 1em',
    },
  }),
);

export const Ranking = () => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Channel[]>([]);
  const youtube = new YouTube();
  useEffect(() => {
    setShowProgress(true);

    const fetchData = async () => {
      const category: CATEGORY = "hololive";
      const rankings = await youtube.fetchRanking(category);
      setShowProgress(false);
      setData(rankings.weekly);
    }
    fetchData();
  }, [])

  return (
    <div>
      {data.map(channel => (
        <div key={channel.id} className={classes.root} >
          <ChannelCard channel={channel} />
        </div>
      ))}
    </div>
  )
}
