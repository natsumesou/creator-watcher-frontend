import { useProgressContext } from '@/app';
import { CustomDate } from '@/entities/Date';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Archive } from '../../entities/entity';
import { YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { ArchiveList } from '../molecules/ArchiveList';
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

const initialArchiveData = () => {
  const size = 10;
  const archive = {
    daily: [],
    weekly: [],
    monthly: [],
  } as Archive;
  return archive;
}

type Props = {
  notices?: string[],
}

export const RankingArchive: React.FC<Props> = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
  const classes = useStyles();
  const [archive, setArchive] = useState<Archive>(initialArchiveData());
  const youtube = new YouTube();
  const [error, setError] = useState<Error>(null);

  useEffect(() => {
    setArchive(initialArchiveData());
    setShowProgress(true);

    const fetchData = async () => {
      try {
        const archive = await youtube.fetchRankingIndex();
        setShowProgress(false);
        setArchive(archive);
      } catch(err) {
        setShowProgress(false);
        setError(err);
      }
    }
    fetchData();
  }, []);

  return (
    <TabPanel>
      <List dense={true}>
        {notices ?
          notices.map((notice, i) => (
            <ListItem key={i} className={classes.listitem}><ListItemText primary={notice} /></ListItem>
          )) : ""}
      </List>
      <ArchiveList archive={archive} />
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </TabPanel>
  )
}
