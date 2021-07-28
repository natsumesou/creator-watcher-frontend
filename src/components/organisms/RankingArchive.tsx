import { useProgressContext } from '@/app';
import { CustomDate } from '@/entities/Date';
import { createStyles, List, ListItem, ListItemText, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Archive } from '../../entities/entity';
import { YouTube } from '../../repositories/YouTube';
import { ErrorSnackBar } from '../atoms/ErrorSnackBar';
import { ArchiveList } from '../molecules/ArchiveList';
import { TabPanel } from './TabPane';

const initialArchiveData = () => {
  return {
    daily: [],
    weekly: [],
    monthly: [],
  } as Archive;
}

type Props = {
  notices?: string[],
}

export const RankingArchive: React.FC<Props> = ({notices}) => {
  const { showProgress, setShowProgress } = useProgressContext();
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
    <React.Fragment>
      <ArchiveList archive={archive} />
      {error ? (<ErrorSnackBar text="データ読み込みエラー" />) : ""}
    </React.Fragment>
  )
}
