import { Card, CardContent, CardMedia, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import {Channel} from '../../entities/entity';
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
  channel: Channel,
}

export const ChannelCard: React.FC<Props> = ({channel}) => {
  const classes = useStyles();

  return (
    <a className={classes.link} href={channel.link} target="_blank" rel="noopener">
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={channel.thumbnail} title={channel.title} />
      <CardContent className={classes.content}>
        <Typography component="h3" variant="h3">
          {channel.title}
        </Typography>
        <Typography variant="body1">
          スパチャ金額：{channel.superChatAmount}
        </Typography>
        <Typography variant="body1">
            メンバー入会数：{channel.memberCount}
        </Typography>
      </CardContent>
    </Card>
    </a>
  )
}
