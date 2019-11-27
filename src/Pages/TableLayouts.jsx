import React from 'react'
import { Grid, Dialog, Link, Container, Button } from '@material-ui/core'

import uStyle from 'img/u-style-sm.png'
import schoolStyle from 'img/school-style-sm.png'
import cinemaStyle from 'img/cinema-style-sm.png'
import islands from 'img/islands-sm.png'
import theatreStyle from 'img/theatre-style-sm.png'
import circle from 'img/circle-sm.png'

const Layout = props => {
  return (
    <>
      <Grid item xs={4} md={3}>
        <h3>{props.head}</h3>
        <h4>{props.num}. layout</h4>
        <p>{props.body1}</p>
        <p>{props.body2}</p>
      </Grid>
      <Grid item xs={8} md={3}>
        <img src={props.img} alt="" />
      </Grid>
    </>
  )
}

const TableLayouts = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Link href="#" onClick={handleOpen} style={{ color: '#4265F0' }}>
        About layouts
      </Link>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <p>
                <Button
                  onClick={handleClose}
                  class="fc-dayGridDay-button fc-button fc-button-primary"
                >
                  Close
                </Button>
              </p>
              <p>
                Written capacities are for standard layouts per one Auditorium
              </p>
              <p>
                Possible extension should be discussed with our facility team
              </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>Total number of:</p>
              <p>
                <b>Chairs:</b> 180
              </p>
              <p>
                <b>Tables:</b> 32
              </p>
            </Grid>
            <Layout head="U-style" num="1" body1="23-26 tables" img={uStyle} />
            <Layout
              head="School style"
              num="2"
              body1="16 tables"
              body2="32 chairs"
              img={schoolStyle}
            />
            <Layout
              head="Cinema style"
              num="3"
              body1="40+ chairs"
              body2="100 chairs max"
              img={cinemaStyle}
            />
            <Layout
              head="Islands"
              num="4"
              body1="4x3 tables"
              body2="8-10 chairs per table"
              img={islands}
            />
            <Layout
              head="Theatre style"
              num="5"
              body1="Detached wall"
              body2="80 chairs"
              img={theatreStyle}
            />
            <Layout
              head="Circle"
              num="6"
              body1="32 chairs"
              body2="16 tables"
              img={circle}
            />
          </Grid>
        </Container>
      </Dialog>
    </>
  )
}

export default TableLayouts
