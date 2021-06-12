import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Channel } from '../../entities/entity';
import { CATEGORY, RANGE, YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { ChannelCard } from '../molecules/ChannelCard';
import { RankingNavigation } from '../molecules/RankingNavigation';
import { TabPanel } from './TabPane';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0 1em',
    },
    listitem: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    navigation: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

const initialChannelData = () => {
  const size = 10;
  const channels = [];
  const channel = {
    title: null,
    id: null,
    superChatAmount: null,
    memberCount: null,
  } as Channel;

  for (let i = 0; i < size; i++) {
    const copyChannel = Object.assign(channel) as Channel;
    copyChannel.id = i.toString();
    channels.push(copyChannel);
  }
  return channels;
}

type Props = {
  category: CATEGORY,
  range: RANGE,
  notices?: string[],
}

export const Ranking: React.FC<Props> = (props) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Channel[]>(initialChannelData());
  const youtube = new YouTube();
  const { category, range, notices} = props;
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setData(initialChannelData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const ranking = await youtube.fetchRanking(category, range);
        setShowProgress(false);
        setData(ranking);
      }catch(err) {
        console.error(err);
        setShowProgress(false);
        setError(err);
      }
    }
    fetchData();
  }, [range]);

  return (
    <TabPanel>
      <RankingNavigation className={classes.navigation} />
      <List dense={true}>
        {notices ?
          notices.map((notice, i) => (
            <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
          )) : ""}
      </List>
      {data.map((channel, i) => (
        <div key={i} className={classes.root} >
          <ChannelCard channel={channel} />
        </div>
      ))}
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
