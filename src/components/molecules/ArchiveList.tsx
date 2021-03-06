import { createStyles, makeStyles, Theme, List, ListItem, ListItemText, Divider, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import {Archive} from '../../entities/entity';
import React from 'react'
import { ListItemProps } from '@material-ui/core';
import { CustomDate } from '@/entities/Date';
import { navigate } from 'gatsby';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    flexRoot: {
      flex: 1,
    },
    list: {
      minWidth: '250px',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        minWidth: '200px',
      },
    },
  }),
);

type Props = {
  archive: Archive,
}

export const ArchiveList: React.FC<Props> = ({archive}) => {
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
      <Box className={classes.flexRoot}>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="デイリー" />
        </ListItem>
      </List>
      <Divider />
      {loading ? (
        <React.Fragment>
          <Skeleton animation="wave" height={40} width="80%" style={{ marginBottom: 3}} />
          <Skeleton animation="wave" height={40} width="70%" />
        </React.Fragment>
      ) : (
        <List component="nav" aria-label="secondary" className={classes.list}>
          {archive.daily.map(index => (
          <ListItemLink key={index} href={`/ranking/daily?t=${index}`}>
            <ListItemText primary={CustomDate.getDisplayDate(CustomDate.fromDatestring(index))} />
          </ListItemLink>
          ))}
        </List>
      )}
      </Box>
      <Box className={classes.flexRoot}>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="ウィークリー" />
        </ListItem>
      </List>
      <Divider />
      {loading ? (
        <React.Fragment>
          <Skeleton animation="wave" height={40} width="80%" style={{ marginBottom: 3}} />
          <Skeleton animation="wave" height={40} width="70%" />
        </React.Fragment>
      ) : (
        <List component="nav" aria-label="secondary" className={classes.list}>
          {archive.weekly.map(index => (
          <ListItemLink key={index} href={`/ranking/weekly?t=${index}`}>
            <ListItemText primary={CustomDate.getDisplayDate(CustomDate.fromDatestring(index, "weekly"))} />
          </ListItemLink>
          ))}
        </List>
      )}
      </Box>
      <Box className={classes.flexRoot}>
      <List component="nav" aria-label="main" className={classes.list}>
        <ListItem>
          <ListItemText primary="マンスリー" />
        </ListItem>
      </List>
      <Divider />
      {loading ? (
        <React.Fragment>
          <Skeleton animation="wave" height={40} width="80%" style={{ marginBottom: 3}} />
          <Skeleton animation="wave" height={40} width="70%" />
        </React.Fragment>
      ) : (
        <List component="nav" aria-label="secondary" className={classes.list}>
          {archive.monthly.map(index => (
          <ListItemLink key={index} href={`/ranking/monthly?t=${index}`}>
            <ListItemText primary={CustomDate.getDisplayMonth(CustomDate.fromDatestring(index))} />
          </ListItemLink>
          ))}
        </List>
      )}
      </Box>
    </div>
  )
}
