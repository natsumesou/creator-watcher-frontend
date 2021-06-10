import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import {navigate} from 'gatsby';

const props = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const LinkTab = (props) => {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  tab: {
    color: theme.palette.text.primary,
  }
}));

export const HeaderTabs = ({routers = [], currentPage}) => {
  const classes = useStyles();
  const [index, changeIndex] = useState(routers.findIndex(v => v.link === currentPage));

  const handleChange = (_, value) => {
    changeIndex(value);
    navigate(routers[value].link);
  };

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Tabs value={index} onChange={handleChange} aria-label="simple tabs" centered>
        {routers.map((router, i) => (
          <LinkTab key={router.link} label={router.name} href={router.link} className={classes.tab} {...props(i)} />
        ))}
      </Tabs>
    </AppBar>
    </div>
  )
}
