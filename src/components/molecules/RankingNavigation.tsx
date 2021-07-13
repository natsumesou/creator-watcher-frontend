import { Breadcrumbs, createStyles, Link, makeStyles, Theme, Box } from '@material-ui/core'
import React from 'react'
import {useLocation} from '@reach/router';
import TodayIcon from '@material-ui/icons/Today';
import {navigate} from 'gatsby';
import { RankingRouters, useQueryContext } from '../templates/RankingPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'right',
    },
    navigation: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
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

  const handleClick = (event, range) => {
    navigate(event.currentTarget.getAttribute('href'));
    if (range) {
      setQuery({range: range});
    }
    event.preventDefault();
  };

  return (
    <Box className={classes.root}>
    <Breadcrumbs aria-label="breadcrumb" className={classes.navigation} {...props}>
      {Object.keys(RankingRouters).map((iteratorRange) => (
        <Link key={iteratorRange} color={query.range === iteratorRange ? "secondary" : "inherit"} href={RankingRouters[iteratorRange].link} onClick={(e) => handleClick(e, iteratorRange)} className={classes.link}>
          <TodayIcon className={classes.icon} />
          {RankingRouters[iteratorRange].name}
        </Link>
      ))}
    </Breadcrumbs>
  </Box>
  )
}
