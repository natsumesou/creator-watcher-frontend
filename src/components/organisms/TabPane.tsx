import { Box, createStyles, makeStyles } from '@material-ui/core'
import React from 'react'

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
