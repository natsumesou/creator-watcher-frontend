import { Card, CardContent, createStyles, makeStyles, Theme, Typography, Box, useTheme} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { SuperChat} from '../../entities/entity';
import React from 'react'
import { Avatar } from '@material-ui/core';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
    },
    root: {
      display: 'flex',
      [theme.breakpoints.up('xs')]: {
        minHeight: 130,
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        minHeight: 200,
      },
    },
    content: {
      flex: 2,
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        paddingBottom: '0 !important',
      },
    },
    main: {
      flex: 2,
    },
    mainText: {
      flex: 2,
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      [theme.breakpoints.up('sm')]: {
        flex: 1,
      },
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
    },
    skeletonMedia: {
      flex: 1,
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        width: 150,
      },
    },
    avatarBox: {
      position: 'relative',
      margin: 8,
      flex: 1,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        flex: 10,
        width: 'auto',
      },
    },
    avatarCover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: (props: Props) =>  `url(${props.superChat.user ? props.superChat.user.thumbnail : ""})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(8px) grayscale(90%) opacity(60%)',
    },
    avatar: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translateY(-50%) translateX(-50%)',
      margin: 'auto',
      marginRight: theme.spacing(0.5),
      width: 64,
      height: 64,
      verticalAlign: 'middle',
    }
  }),
);

type Props = {
  superChat: SuperChat,
}

export const SuperChatCard: React.FC<Props> = (props) => {
  const classes = useStyles(props);
  const { superChat } = props;
  const loading =
    superChat.user === null;

  const handleClick = (event) => {
    navigate(event.currentTarget.getAttribute('href'));
    event.preventDefault();
  };

  return (
    <a className={classes.link} href={superChat.user ? `/user?id=${superChat.user.supporterChannelId}` : ""} onClick={handleClick}>
    <Card className={classes.root}>
      <Box className={classes.avatarBox}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
        ) : (
          <React.Fragment>
          <Box className={classes.avatarCover}></Box>
          <Avatar alt="Remy Sharp" src={superChat.user.thumbnail} className={classes.avatar} />
          </React.Fragment>
        )}
      </Box>
      <CardContent className={classes.content}>
        {loading ? (
          <Box className={classes.main}>
            <Skeleton animation="wave" height={40} style={{ marginBottom: 3}} />
            <Skeleton animation="wave" height={40} width="80%" />
          </Box>
        ) : (
          <Box className={classes.main}>
            <Typography component="h3" variant="h3">
              {superChat.user.supporterDisplayName}
            </Typography>
            <Typography variant="body1">
            🥇{superChat.totalAmount}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
    </a>
  )
}
