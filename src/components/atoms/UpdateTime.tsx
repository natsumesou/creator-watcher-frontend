import { CustomDate } from '@/entities/Date';
import { RANGE } from '@/repositories/YouTube';
import { Box } from '@material-ui/core'
import React from 'react'

const getDate = (range: RANGE, time: string) => {
  switch(range) {
    case RANGE.daily:
      const dailyDate = CustomDate.fromDatestring(time);
      dailyDate.setDate(dailyDate.getDate() + 1);
      dailyDate.setHours(9);
      return dailyDate;
    case RANGE.weekly:
      const startdate = CustomDate.fromDatestring(time);
      const enddate = new CustomDate(startdate.getTime());
      enddate.setDate(enddate.getDate() + 7);
      enddate.setHours(9);
      return enddate;
    case RANGE.monthly:
      const monthlyDate = CustomDate.fromDatestring(time);
      monthlyDate.setMonth(monthlyDate.getMonth() + 1);
      monthlyDate.setHours(9);
      return monthlyDate;
  }
}

type Props = {
  range: RANGE,
  time: string,
  prefix?: string,
}

export const UpdateTime: React.FC<Props> = ({range, time, prefix}) => {
  const date = getDate(range, time);

  return (
    <Box>
      {prefix}：
      <time dateTime={date.toISOString()}>{CustomDate.getDisplayDateTime(date)}</time>
    </Box>
  )
}
