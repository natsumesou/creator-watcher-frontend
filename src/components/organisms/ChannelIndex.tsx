import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, makeStyles, Theme, Link, Typography, Tabs, Tab } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { ChannelMeta } from '../../entities/entity';
import { NotFoundError, YouTube } from '../../repositories/YouTube';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      whiteSpace: 'nowrap',
    }
  }),
);

const initialChannelData = () => {
  return Array(10).fill(null).map((_,i) => {
    return {
      id: null,
      title: null,
      category: null,
    } as ChannelMeta;
  });
}

export const ChannelIndex = ({ category }) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<ChannelMeta[]>(initialChannelData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);

  const handleClick = (event) => {
    const href = event.currentTarget.getAttribute('href');
    if (href) {
      navigate(href);
    }
    event.preventDefault();
  };

  useEffect(() => {
    setData(initialChannelData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const index = await youtube.fetchChannelIndex(category);
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
  }, [category]);

  return (
    <Tabs
    value={false}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scro
    llable auto tabs example"
  >
  {data.map((channel, i) => (
     <Tab key={i} label={channel.title} href={`/channel?id=${channel.id}`} onClick={handleClick} className={classes.title} />
    ))}
  </Tabs>
  )
}
