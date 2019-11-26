import React from 'react'
import { Grid, Container } from '@material-ui/core'

const TableLayouts = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6} md={3}>
          <h3>U-style</h3>
          <h4>1. layout</h4>
          <p>23-26 tables</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3>School style</h3>
          <h4>2. layout</h4>
          <p>16 tables</p>
          <p>32 chairs</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3>Cinema style</h3>
          <h4>3. layout</h4>
          <p>40+ chairs</p>
          <p>100 chairs max</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3>Islands</h3>
          <h4>4. layout</h4>
          <p>4x3 tables</p>
          <p>8-10 chairs per table</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3>Theatre style in both auditoriums</h3>
          <h4>5. layout</h4>
          <p>Detached wall</p>
          <p>80 chairs</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={6} md={3}>
          <h3>Circle</h3>
          <h4>6. layout</h4>
          <p>32 chairs</p>
          <p>16 tables</p>
        </Grid>
        <Grid item xs={6} md={3}>
          <img src='https://fakeimg.pl/200/' alt=''/>
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Written capacities are for standard layouts  per one Auditorium</p>
          <p>Possible extension should be discussed with our facility team</p>
        </Grid>
        <Grid item xs={12} md={6}>
          <p>Total number of:</p>
          <p><b>Chairs:</b> 180</p>
          <p><b>Tables:</b> 32</p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TableLayouts
