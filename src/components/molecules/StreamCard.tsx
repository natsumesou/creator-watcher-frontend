import { Card, CardContent, createStyles, makeStyles, Theme, Typography, Box, ButtonBase } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import {Stream} from '../../entities/entity';
import React from 'react'
import { CardMediaWithLazyLoad } from '../atoms/CardMediaWithLazyLoad';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { CustomDate } from '@/entities/Date';
import { navigate } from 'gatsby';
import { getThumbnail } from './ChannelCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      width: '100%',
    },
    root: {
      width: '100%',
      display: 'flex',
      opacity: (props: Props) => props.stream.status !== 'done' ? '60%' : '100%',
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
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xs')]: {
        paddingBottom: '0 !important',
      },
    },
    mainText: {
      flex: 2,
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
    },
    noDetail: {
      minHeight: '60px',
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
      height: 151,
      [theme.breakpoints.up('sm')]: {
        width: 151,
        flex: 1,
      },
    },
    icon : {
      marginRight: theme.spacing(0.5),
      width: 25,
      height: 25,
      verticalAlign: 'middle',
    }
  }),
);

type Props = {
  stream: Stream,
}

export const StreamCard: React.FC<Props> = (props) => {
  const breakpoints = useBreakpoint();
  const { stream } = props;
  const classes = useStyles(props);
  const loading =
    stream.title === null;

  const thumbnail = getThumbnail(stream.id, breakpoints.sm);

    const handleClick = (event) => {
      navigate(event.currentTarget.getAttribute('href'));
      event.preventDefault();
    };
  const card = (
    <Card className={classes.root}>
      {loading ? (
        <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
      ) : (
        <CardMediaWithLazyLoad className={classes.cover} image={thumbnail} title={stream.title} />
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
            {stream.status === "done" ? (
              <Box className={classes.mainText}>
                <Typography variant="body1">
                  スパチャ金額：{stream.superChatAmount}
                </Typography>
                <Typography variant="body1">
                    メンバー加入数：{stream.memberCount}
                </Typography>
                <Typography variant="body1">
                    チャット数：{stream.chatCount}
                </Typography>
                <Typography variant="body1">
                    配信終了日時：<time dateTime={stream.publishedAt.toISOString()}>{CustomDate.getDisplayDateTime(stream.publishedAt)}</time>
                </Typography>
              </Box>
              ) : (
              <Box className={`${classes.mainText} ${classes.noDetail}`}>
                {stream.status === "process" ?
                  <Typography variant="body1">
                    <DirectionsRunIcon className={classes.icon} />集計中
                  </Typography>
                :
                  <Typography variant="body1">
                    集計出来ませんでした💦
                  </Typography>
                }
              </Box>
            )}
          </React.Fragment>
        )}
      </CardContent>
      </div>
    </Card>
  )
  if (stream.status === "done") {
    return (
      <ButtonBase id={stream.id} className={classes.link} href={loading ? "" : `/watch?cid=${stream.channelId}&vid=${stream.id}`} onClick={handleClick}>
        {card}
      </ButtonBase>
    )
  }
  return card;
}
