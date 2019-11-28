import React from 'react'
import { Typography, Grid, makeStyles } from '@material-ui/core'

const replaceNLwithBr = str => {
  if (str === undefined) return ''

  return String(str)
    .split('\n')
    .map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ))
}

const useStyle = makeStyles({
  name: {
    textAlign: 'right',
  },
  value: {
    textAlign: 'left',
  },
})

const Row = ({ name, value }) => {
  const c = useStyle()

  return (
    <Grid item container direction="row" spacing={2}>
      <Grid item className={c.name} xs={6} md={4}>
        <Typography>{name}:</Typography>
      </Grid>
      <Grid item className={c.value} xs md>
        <Typography>{replaceNLwithBr(value)}</Typography>
      </Grid>
    </Grid>
  )
}

export default Row
