import { AppBar, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import React from 'react'
import { TitleButton } from "../atoms/TitleButton"
import { HeaderTabs } from '../molecules/HeaderTabs';
import {useProgressContext} from '../../app/index';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      top: '-65px',
    },
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


export const Header = () => {
  const { showProgress } = useProgressContext();
  const classes = useStyles();
  const a = classes.root;
  const routers = [
    {name: "タイムライン", link: "/"},
    // {name: "ホロライブ", link: "/hololive"},
    // {name: "にじさんじ", link: "/nijisanji"},
    // {name: "ランキング", link: "/ranking/archive"},
  ]
  const progressClass = showProgress ? classes.showProgress : classes.hideProgress;
  return (
    <AppBar position="sticky" className={classes.header}>
      <div className={`${classes.root} ${progressClass}`}>
        <LinearProgress color="secondary" />
      </div>
        <Toolbar variant="regular">
          <TitleButton title={"VTuberスパチャ🥇ランキング"} />
        </Toolbar>
    </AppBar>
  )
}
