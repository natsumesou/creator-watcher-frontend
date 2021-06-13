import { createStyles, makeStyles, Theme, List, ListItem, ListItemText, Divider, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import {Archive} from '../../entities/entity';
import React from 'react'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import { ListItemProps } from '@material-ui/core';
import { CustomDate } from '@/entities/Date';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },
    list: {
      minWidth: '250px',
    },
  }),
);

type Props = {
  archive: Archive,
}

export const ArchiveList: React.FC<Props> = ({archive}) => {
  const breakpoints = useBreakpoint();
  const classes = useStyles();
  const loading =
    archive.daily.length === 0;

  const ListItemLink = (props: ListItemProps<'a', { button?: true }>) => {
    return <ListItem button component="a"
    onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      navigate(event.currentTarget.getAttribute('href'));
      event.preventDefault();
    }}
    {...props}
    />;
  }

  return (
    <div className={classes.root}>
      <Box>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="デイリー" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary" className={classes.list}>
        {archive.daily.map(index => (
        <ListItemLink key={index} href={`/ranking?range=daily&t=${index}`}>
          <ListItemText primary={CustomDate.fromDatestring(index).getDisplayDate()} />
        </ListItemLink>
        ))}
      </List>
      </Box>
      <Box>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="ウィークリー" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary" className={classes.list}>
        {archive.weekly.map(index => (
        <ListItemLink key={index} href={`/ranking?range=weekly&t=${index}`}>
          <ListItemText primary={CustomDate.fromDatestring(index).getDisplayDate()} />
        </ListItemLink>
        ))}
      </List>
      </Box>
      <Box>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="マンスリー" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary" className={classes.list}>
        {archive.monthly.map(index => (
        <ListItemLink key={index} href={`/ranking?range=monthly&t=${index}`}>
          <ListItemText primary={CustomDate.fromDatestring(index).getDisplayMonth()} />
        </ListItemLink>
        ))}
      </List>
      </Box>
    </div>
  )
}
