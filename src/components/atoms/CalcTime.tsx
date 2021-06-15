import { CustomDate } from '@/entities/Date';
import { RANGE } from '@/repositories/YouTube';
import { Box } from '@material-ui/core'
import React from 'react'

const getDisplayTime = (range: RANGE, time: string) => {
  switch(range) {
    case RANGE.daily:
      const dailyDate = CustomDate.fromDatestring(time);
      return CustomDate.getDisplayDate(dailyDate);
    case RANGE.weekly:
      const startdate = CustomDate.fromDatestring(time);
      const enddate = new CustomDate(startdate.getTime());
      enddate.setDate(enddate.getDate() + 6);
      return CustomDate.getDisplayDate(startdate) + "〜" + CustomDate.getDisplayDate(enddate);
    case RANGE.monthly:
      const monthlyDate = CustomDate.fromDatestring(time);
      return CustomDate.getDisplayMonth(monthlyDate);
  }
}

type Props = {
  range: RANGE,
  time: string,
  prefix?: string,
}

export const CalcTime: React.FC<Props> = ({range, time, prefix}) => {
  const displayTime = getDisplayTime(range, time);

  return (
    <Box>
      {prefix}：
      <time dateTime={time}>{displayTime}</time>
    </Box>
  )
}
