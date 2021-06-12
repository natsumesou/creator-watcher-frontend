import { Breadcrumbs, createStyles, Link, makeStyles, Theme } from '@material-ui/core'
import React, { useState } from 'react'
import {useLocation} from '@reach/router';
import TodayIcon from '@material-ui/icons/Today';
import {navigate} from 'gatsby';

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

export const RankingNavigation = ({routers = [], ...props}) => {
  const { pathname } = useLocation()
  const classes = useStyles();

  const [index, changeIndex] = useState(routers.findIndex(v => v.link === pathname.replace(/\/$/, "")));

  // /ranking のときはデイリーがデフォルトのため
  if (index < 0) {
    changeIndex(0);
  }

  const handleClick = (e) => {
    const link = e.target.getAttribute('href');
    navigate(link);
    e.preventDefault();
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" {...props}>
      {routers.map((router, i) => (
        <Link key={i} color={index === i ? "secondary" : "inherit"} href={router.link} onClick={handleClick} className={classes.link}>
          <TodayIcon className={classes.icon} />
          {router.name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
