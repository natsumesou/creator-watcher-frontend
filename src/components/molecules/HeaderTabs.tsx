import { makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {navigate} from 'gatsby';
import {useLocation, globalHistory} from '@reach/router';

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
    position: 'sticky',
  },
  tab: {
    color: theme.palette.text.primary,
  }
}));

export const HeaderTabs = ({routers = []}) => {
  const { pathname } = useLocation()
  const classes = useStyles();

  const findPathIndex = (router: any, pathname: string) => {
    const match = pathname.match(/^(\/[^/]*)/);
    if (match) {
      return router.link === match[1];
    } else {
      return false;
    }
  }
  const [index, changeIndex] = useState(routers.findIndex(v => findPathIndex(v,pathname)));

  useEffect(() => {
    // ブラウザバックでindexが更新されない問題に対応
    return globalHistory .listen(({ location }) => {
      const pathname = location.pathname;
      const index = routers.findIndex((router) => findPathIndex(router, pathname));
      changeIndex(index);
    });
  }, []);

  const handleChange = (_, value) => {
    changeIndex(value);
    navigate(routers[value].link);
  };

  return (
    <div className={classes.root}>
      <Tabs value={index} onChange={handleChange} aria-label="simple tabs" centered>
        {routers.map((router, i) => (
          <LinkTab key={router.link} label={router.name} href={router.link} className={classes.tab} />
        ))}
      </Tabs>
    </div>
  )
}
