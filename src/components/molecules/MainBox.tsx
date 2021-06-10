import { Box, styled } from '@material-ui/core'

export const MainBox = styled(Box)((props) => ({
  padding: '0 10px',
  margin: '0 auto',
  [props.theme.breakpoints.up('sm')]: {
    width: 1024,
  },
  [props.theme.breakpoints.down('sm')]: {
    width: '90%',
  },
}));
