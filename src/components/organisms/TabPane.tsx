import { Box, createStyles, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { MainBox } from '../molecules/MainBox'

const useStyles = makeStyles(
  createStyles({
  })
)

export const TabPanel = (props) => {
  const classes = useStyles();
  const { children } = props;

  return (
    <div
      role="tabpanel">
        <Box p={1}>
          {children}
        </Box>
    </div>
  )
}
