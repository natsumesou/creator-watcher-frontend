import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import React from 'react'
import { TitleButton } from "../atoms/TitleButton"
import { HeaderTabs } from '../molecules/HeaderTabs';
import {useLocation} from '@reach/router';
import {useProgressContext} from '../../app/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);


export const Header = () => {
  const { showProgress } = useProgressContext();
  const { pathname } = useLocation()
  const classes = useStyles();
  const routers = [
    {name: "タイムライン", link: "/"},
    {name: "ランキング", link: "/ranking"},
  ]
  return (
    <header>
      {showProgress ?
      <div className={classes.root}>
        <LinearProgress color="secondary" />
      </div> : ""}

    <AppBar position="sticky">
      <Toolbar variant="regular">
        <TitleButton />
      </Toolbar>
    </AppBar>
    <HeaderTabs routers={routers} currentPage={pathname} />
    </header>
  )
}
