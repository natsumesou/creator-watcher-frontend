import { Card, CardContent, CardMedia, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import {Stream} from '../../entities/entity';
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
    },
    root: {
      display: 'flex',
      [theme.breakpoints.up('xs')]: {
        minHeight: 180,
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: 2,
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      backgroundSize: 'contain',
      backgroundColor: theme.palette.primary.dark,
      [theme.breakpoints.up('sm')]: {
        flex: 1,
      },
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
    },
    skeletonMedia: {
      height: 151,
      width: 151,
      flex: 1,
    }
  }),
);

type Props = {
  stream: Stream,
}

export const StreamCard: React.FC<Props> = ({stream}) => {
  const classes = useStyles();
  const loading =
    stream.title === null;

  return (
    <a className={classes.link} href={stream.link} target="_blank" rel="noopener">
    <Card className={classes.root}>
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
      ) : (
        <CardMedia className={classes.cover} image={stream.thumbnail} title={stream.title} />
      )}
      <div className={classes.details}>
      <CardContent className={classes.content}>
        {loading ? (
          <React.Fragment>
            <Skeleton animation="wave" height={40} style={{ marginBottom: 3}} />
            <Skeleton animation="wave" height={40} width="80%" />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography component="h4" variant="h4">
              {stream.channelTitle}
            </Typography>
            <Typography component="h3" variant="h3">
              {stream.title}
            </Typography>
            <Typography variant="body1">
              スパチャ金額：{stream.superChatAmount}
            </Typography>
            <Typography variant="body1">
                メンバー加入数：{stream.memberCount}
            </Typography>
            <Typography variant="body1">
                チャット数：{stream.chatCount}
            </Typography>
          </React.Fragment>
        )}
      </CardContent>
      </div>
    </Card>
    </a>
  )
}
