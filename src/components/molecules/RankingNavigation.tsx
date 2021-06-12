import { Breadcrumbs, createStyles, Link, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import {useLocation} from '@reach/router';
import TodayIcon from '@material-ui/icons/Today';
import {navigate} from 'gatsby';
import { RankingRouters, useRangeContext } from '../templates/RankingDailyPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      fontSize: theme.typography.body2.fontSize,
    },
    icon: {
      marginRight: theme.spacing(0.5),
      width: 20,
      height: 20,
      verticalAlign: 'middle',
    },
  }),
);

export const RankingNavigation = (props) => {
  const { range, setRange } = useRangeContext();
  const { pathname } = useLocation()
  const classes = useStyles();

  const buildQuery = (range) => {
    return `?range=${range}`;
  }

  const handleClick = (range, event) => {
    navigate(buildQuery(range));
    setRange(range);
    event.preventDefault();
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" {...props}>
      {Object.keys(RankingRouters).map((iteratorRange) => (
        <Link key={iteratorRange} color={range === iteratorRange ? "secondary" : "inherit"} href={`${pathname}${buildQuery(iteratorRange)}`} onClick={(e) => handleClick(iteratorRange, e)} className={classes.link}>
          <TodayIcon className={classes.icon} />
          {RankingRouters[iteratorRange].name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
