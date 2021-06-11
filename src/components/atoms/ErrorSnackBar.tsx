import { Button, IconButton, Snackbar } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React from 'react'

type Props = {
  text: string,
}

export const ErrorSnackBar: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(true);
  const {text} = props;

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    message={text}
    action={
      <React.Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          閉じる
        </Button>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    }
  />

  )
}
