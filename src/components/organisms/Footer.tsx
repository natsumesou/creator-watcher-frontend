import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { MainBox } from '../molecules/MainBox'

const useStyles = makeStyles(
  createStyles({
    footer: {
      margin: '30px auto 20px',
      textAlign: 'center'
    }
  })
)

export const Footer = (props) => {
  const classes = useStyles();

  return (
    <footer {...props}>
      <MainBox className={classes.footer}>
      © 2021 YouTube研究所
      </MainBox>
    </footer>
  )
}
