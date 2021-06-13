import { Breadcrumbs, createStyles, Link, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import {useLocation} from '@reach/router';
import TodayIcon from '@material-ui/icons/Today';
import {navigate} from 'gatsby';
import { RankingRouters, useQueryContext } from '../templates/RankingPage';

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
  const { query, setQuery } = useQueryContext();
  const { pathname } = useLocation()
  const classes = useStyles();

  const handleClick = (range, event) => {
    navigate(event.currentTarget.getAttribute('href'));
    setQuery({range: range});
    event.preventDefault();
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" {...props}>
      {Object.keys(RankingRouters).map((iteratorRange) => (
        iteratorRange === "monthly" ? "" : // マンスリーはまだ表出ししない
        <Link key={iteratorRange} color={query.range === iteratorRange ? "secondary" : "inherit"} href={RankingRouters[iteratorRange].link} onClick={(e) => handleClick(iteratorRange, e)} className={classes.link}>
          <TodayIcon className={classes.icon} />
          {RankingRouters[iteratorRange].name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
