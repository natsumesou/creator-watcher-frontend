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
    showProgress: {
      visibility: 'visible',
    },
    hideProgress: {
      visibility: 'hidden',
    }
  }),
);


export const Header = (props) => {
  const { showProgress } = useProgressContext();
  const { pathname } = useLocation()
  const classes = useStyles();
  const a = classes.root;
  const routers = [
    {name: "タイムライン", link: "/"},
    {name: "ホロライブ", link: "/hololive"},
    {name: "にじさんじ", link: "/nijisanji"},
    {name: "ランキング", link: "/ranking"},
  ]
  const progressClass = showProgress ? classes.showProgress : classes.hideProgress;
  return (
    <header {...props}>
      <div className={`${classes.root} ${progressClass}`}>
        <LinearProgress color="secondary" />
      </div>
      <AppBar position="sticky">
        <Toolbar variant="regular">
          <TitleButton title={"VTuberスパチャランキング"} />
        </Toolbar>
      </AppBar>
      <HeaderTabs routers={routers} currentPage={pathname} />
    </header>
  )
}
