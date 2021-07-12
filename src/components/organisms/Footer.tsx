import { createStyles, makeStyles, Typography } from '@material-ui/core'
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

export const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <MainBox className={classes.footer}>
      <Typography variant="body2">お問い合わせ先：<a href="mailto:admin@ytubelab.com">admin@ytubelab.com</a></Typography>
      <Typography variant="body2">© 2021 YouTube研究所</Typography>
      </MainBox>
    </footer>
  )
}
