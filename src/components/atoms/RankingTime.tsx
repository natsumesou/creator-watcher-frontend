import { CustomDate } from '@/entities/Date';
import { RANGE } from '@/repositories/YouTube';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);

const twoDigit = (num: number) => {
  return ("0" + num).slice(-2);
}

const getDisplayTime = (range: RANGE, time: string) => {
  switch(range) {
    case RANGE.daily:
      const dailyDate = CustomDate.fromDatestring(time);
      return dailyDate.getDisplayDate();
    case RANGE.weekly:
      const startdate = CustomDate.fromDatestring(time);
      const enddate = new CustomDate(startdate.getTime());
      enddate.setDate(enddate.getDate() + 6);
      return startdate.getDisplayDate() + "〜" + enddate.getDisplayDate();
    case RANGE.monthly:
      const monthlyDate = CustomDate.fromDatestring(time);
      return monthlyDate.getDisplayMonth();
  }
}

type Props = {
  range: RANGE,
  time: string,
}

export const RankingTime: React.FC<Props> = ({range, time}) => {
  const classes = useStyles();

  const displayTime = getDisplayTime(range, time);

  return (
    <Box className={classes.root}>
      ランキング対象期間：
      <time dateTime={time}>{displayTime}</time>
    </Box>
  )
}
