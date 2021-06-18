import { Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import {Channel} from '../../entities/entity';
import React from 'react'
import { CardMediaWithLazyLoad } from '../atoms/CardMediaWithLazyLoad';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { navigate } from 'gatsby';

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
      [theme.breakpoints.up('sm')]: {
        width: 151,
        flex: 1,
      },
    },
  }),
);


export const getThumbnail = (videoId: string, sd?: boolean) => {
  return sd ?
  `https://i.ytimg.com/vi/${videoId}/sddefault.jpg` :
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

type Props = {
  channel: Channel,
}

export const ChannelCard: React.FC<Props> = ({channel}) => {
  const breakpoints = useBreakpoint();
  const classes = useStyles();
  const loading =
    channel.title === null;

  const thumbnail = getThumbnail(channel.videoId, breakpoints.sm);

  const handleClick = (event) => {
    navigate(event.currentTarget.getAttribute('href'));
    event.preventDefault();
  };

  return (
    <a className={classes.link} href={loading ? "" : `/channel?id=${channel.id}`} onClick={handleClick}>
    <Card className={classes.root}>
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
      ) : (
        <CardMediaWithLazyLoad className={classes.cover} image={thumbnail} title={channel.title} />
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
            <Typography component="h3" variant="h3">
              {channel.title}
            </Typography>
            <Typography variant="body1">
              スパチャ金額：{channel.superChatAmount}
            </Typography>
            {channel.memberCount ? (
              <Typography variant="body1">
                メンバー加入数：{channel.memberCount}
              </Typography>
            ) : ""}
          </React.Fragment>
        )}
      </CardContent>
      </div>
    </Card>
    </a>
  )
}
