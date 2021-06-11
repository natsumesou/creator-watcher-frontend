import { Breadcrumbs, Card, CardContent, createStyles, Link, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {navigate} from 'gatsby';
import {useLocation} from '@reach/router';
import TodayIcon from '@material-ui/icons/Today';

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
  const breakpoints = useBreakpoint();
  const classes = useStyles();

  const [index, changeIndex] = useState(routers.findIndex(v => v.link === pathname));

  const handleChange = (_, value) => {
    changeIndex(value);
    navigate(routers[value].link);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" {...props}>
      {routers.map((router, i) => (
        <Link key={i} color={index === i ? "textPrimary" : "inherit"} href={router.link} className={classes.link}>
          <TodayIcon className={classes.icon} />
          {router.name}
        </Link>
      ))}
    </Breadcrumbs>
  )
}
