import { useProgressContext } from '@/app';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Stream } from '../../entities/entity';
import { CATEGORY, YouTube } from '../../repositories/YouTube';
import { StreamCard } from '../molecules/StreamCard';
import { TabPanel } from './TabPane';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1em 0 1em',
    },
    listitem: {
      paddingTop: 0,
      paddingBottom: 0,
    }
  }),
);
const initialStreamData = () => {
  const size = 10;
  const streams = [];
  const stream = {
    title: null,
    chatCount: null,
    superChatAmount: null,
    memberCount: null,
    channelTitle: null,
    id: null,
    thumbnail: null,
    link: null,
  } as Stream;

  for (let i = 0; i < size; i++) {
    const copyStream = Object.assign(stream) as Stream;
    copyStream.id = i.toString();
    streams.push(copyStream);
  }
  return streams;
}

export const Timeline = () => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [data, setData] = useState<Stream[]>(initialStreamData());
  const youtube = new YouTube();
  useEffect(() => {
    setShowProgress(true);

    const fetchData = async () => {
      const category: CATEGORY = "hololive";
      const streams = await youtube.fetchTimeline(category);
      setShowProgress(false);
      setData(streams);
    }
    fetchData();
  }, [])

  const notices = [
    "配信が終了したアーカイブでチャット欄が取得可能なものを取得した順に表示しています",
    "金額は為替レートの影響を受けて前後する可能性があります",
    "配信開始の5分以前・配信後のスパチャやメンバー加入はカウントされません",
    "アーカイブで取得できないスパチャやメンバー加入はカウントされません",
  ];

  return (
    <TabPanel>
      <List dense={true}>
        {notices.map((notice, i) => (
          <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
        ))}
      </List>
      {data.map((stream, i) => (
        <div key={i} className={classes.root} >
          <StreamCard stream={stream} />
        </div>
      ))}
    </TabPanel>
  )
}
