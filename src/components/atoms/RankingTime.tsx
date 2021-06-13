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
  const year = parseInt(time.substr(0,4));
  const month = parseInt(time.substr(4,2));
  const day = parseInt(time.substr(6,2));
  switch(range) {
    case RANGE.daily:
      const dailyDate = new Date(year, month, day);
      return `${dailyDate.getFullYear()}年${twoDigit(dailyDate.getMonth() + 1)}月${twoDigit(dailyDate.getDate())}日`;
    case RANGE.weekly:
      const startdate = new Date(year, month, day);
      const enddate = new Date(year, month, day + 6);
      return `${startdate.getFullYear()}年${twoDigit(startdate.getMonth() + 1)}月${twoDigit(startdate.getDate())}日`
            + `〜${enddate.getFullYear()}年${twoDigit(enddate.getMonth() + 1)}月${twoDigit(enddate.getDate())}日`;
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
      ランキング集計期間：
      <time dateTime={time}>{displayTime}</time>
    </Box>
  )
}
