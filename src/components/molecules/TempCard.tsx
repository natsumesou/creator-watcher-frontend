import { Temp } from '@/repositories/Temp'
import { Card, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '5px 0',
    }
  }),
);

type Props = {
  id: string,
}

export const TempCard: React.FC<Props> = ({id}) => {
  const classes = useStyles();
  const [data, setData] = useState<string>("");
  const tmp = new Temp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== null) {
          setData(await tmp.fetch(id));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  return (
    <React.Fragment>
      {data ? (<Card className={classes.root}><Typography variant="body2">{data}</Typography></Card>) : ""}
    </React.Fragment>
  )
}
