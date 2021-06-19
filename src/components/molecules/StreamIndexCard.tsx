import { createStyles, makeStyles, Theme, Typography, Card, ButtonBase, CardContent } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import { StreamMeta} from '../../entities/entity';
import React from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { navigate } from 'gatsby';
import { getThumbnail } from './ChannelCard';
import { CardMediaWithLazyLoad } from '../atoms/CardMediaWithLazyLoad';
import { useQueryContext } from '../templates/WatchPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        minHeight: 100,
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    skeletonMedia: {
      height: 151,
      [theme.breakpoints.up('sm')]: {
        width: 151,
        flex: 1,
      },
    },
    cover: {
      [theme.breakpoints.up('sm')]: {
        flex: 1,
      },
      [theme.breakpoints.down('sm')]: {
        height: 200,
      },
    },
    detail: {
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
  }),
);

type Props = {
  stream: StreamMeta,
}

export const StreamIndexCard: React.FC<Props> = (props) => {
  const breakpoints = useBreakpoint();
  const { stream } = props;
  const { query, setQuery } = useQueryContext();
  const classes = useStyles(props);
  const loading =
    stream.id === null;
  const thumbnail = getThumbnail(stream.id, breakpoints.sm);

  const handleClick = (event, stream) => {
    const href = event.currentTarget.getAttribute('href');
    setQuery({cid: stream.channelId, vid: stream.id});
    navigate(href);
    event.preventDefault();
  };

  return (
    <ButtonBase className={classes.root} href={loading ? "" : `/watch?cid=${stream.channelId}&vid=${stream.id}`} onClick={(e) => {handleClick(e, stream)}}>
      <Card className={classes.root}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
        ) : (
          <CardMediaWithLazyLoad className={classes.cover} image={thumbnail} title={stream.title} />
        )}
        <div className={classes.detail}>
        <CardContent className={classes.content}>
          <Typography component="h3" >{stream.title}</Typography>
        </CardContent>
        </div>
      </Card>
    </ButtonBase>
  );
}
