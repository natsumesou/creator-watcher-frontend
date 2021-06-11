import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Channel } from '../../entities/entity';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { ChannelCard } from '../molecules/ChannelCard';
import { TabPanel } from './TabPane';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 0 1em',
    },
    listitem: {
      paddingTop: 0,
      paddingBottom: 0,
    }
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
}

export const Ranking: React.FC<Props> = (props) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Channel[]>(initialChannelData());
  const youtube = new YouTube();
  useEffect(() => {
    setShowProgress(true);

    const fetchData = async () => {
      const { category } = props;
      const rankings = await youtube.fetchRanking(category);
      setShowProgress(false);
      setData(rankings.weekly);
    }
    fetchData();
  }, [])

  return (
    <TabPanel>
      <List dense={true}>
        <ListItem className={classes.listitem}><ListItemText primary="ランキングは毎週月曜の朝6時あたりに前週分のスパチャ金額・メンバー加入数を集計しています" /></ListItem>
      </List>
      {data.map((channel, i) => (
        <div key={i} className={classes.root} >
          <ChannelCard channel={channel} />
        </div>
      ))}
    </TabPanel>
  )
}
