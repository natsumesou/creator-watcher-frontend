import { Card, CardContent, CardMedia, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import {Stream} from '../../entities/Stream';
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
    },
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  }),
);

type Props = {
  stream: Stream,
}

export const StreamCard: React.FC<Props> = ({stream}) => {
  const classes = useStyles();

  return (
    <a className={classes.link} href={stream.link} target="_blank" rel="noopener">
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={stream.thumbnail} title={stream.title} />
      <CardContent className={classes.content}>
        <Typography component="h3" variant="h3">
          {stream.title}
        </Typography>
        <Typography variant="body1">
          スパチャ金額：{stream.superChatAmount}
        </Typography>
        <Typography variant="body1">
            メンバー入会数：{stream.memberCount}
        </Typography>
        <Typography variant="body1">
            チャット数：{stream.chatCount}
        </Typography>
      </CardContent>
    </Card>
    </a>
  )
}
