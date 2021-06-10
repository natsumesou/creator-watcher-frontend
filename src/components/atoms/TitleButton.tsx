import { Button, Typography } from '@material-ui/core'
import React from 'react'

type Props = {
  title: string,
}

export const TitleButton: React.FC<Props> = ({title}) => {
  return (
    <Button href="/">
      <Typography variant="h1">
        {title}
      </Typography>
    </Button>
  )
}
