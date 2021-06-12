import { Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.h3.fontSize,
      },
    },
  }),
);

type Props = {
  title: string,
}

export const TitleButton: React.FC<Props> = ({title}) => {
  const classes = useStyles();

  return (
    <Button href="/">
      <Typography variant="h1" className={classes.text}>
        {title}
      </Typography>
    </Button>
  )
}
