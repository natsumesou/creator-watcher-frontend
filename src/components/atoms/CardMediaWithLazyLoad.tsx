import { createStyles, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import 'lazysizes'
import 'lazysizes/plugins/unveilhooks/ls.unveilhooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundSize: 'contain',
      backgroundColor: theme.palette.primary.dark,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }),
);

type Props = {
  image: string,
  title: string,
  className?: string,
}

export const CardMediaWithLazyLoad: React.FC<Props> = ({image, title, className}) => {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${className} lazyload`} data-bg={image} title={title} />
  )
}
