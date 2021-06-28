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
      height: '100px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('xs')]: {
        minHeight: 100,
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        height: 'auto',
      },
    },
    skeletonMedia: {
      height: 200,
      [theme.breakpoints.up('sm')]: {
        minWidth: 200,
      },
    },
    cover: {
      minWidth: 200,
      height: 200,
      minHeight: 200,
      [theme.breakpoints.down('xs')]: {
        height: 100,
        minHeight: 100,  
        width: '100%',
      },
    },
    content: {
      padding: '8px 16px !important',
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

  const trimTitle = (title: string) => {
    return title.length < 70 ? title : title.slice(0, 69) + "...";
  }

  return (
    <ButtonBase className={classes.root} href={loading ? "" : `/watch?cid=${stream.channelId}&vid=${stream.id}`} onClick={(e) => {handleClick(e, stream)}}>
      <Card className={classes.root}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" className={classes.skeletonMedia} />
        ) : (
          <CardMediaWithLazyLoad className={classes.cover} image={thumbnail} title={stream.title} />
        )}
        <div>
        <CardContent className={classes.content}>

          <Typography component="p" variant="h3">{stream.title ? trimTitle(stream.title) : (
            <Skeleton animation="wave" height={40} width="180px" />
          )}</Typography>
        </CardContent>
        </div>
      </Card>
    </ButtonBase>
  );
}
