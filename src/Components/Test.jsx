import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  test: {
    backgroundColor: 'red',
  },
})

const Test = () => {
  const c = useStyles()
  const [counter, setCounter] = useState(0)

  const handleClick = () => {
    alert(`yay just simulating that i sent ${counter} to server.`)
  }

  return (
    <>
      <div className={c.test} onClick={handleClick}>
        Test with background
      </div>
      <div>
        {counter} - <span onClick={() => setCounter(c => c + 1)}>increase</span>
      </div>
    </>
  )
}

export default Test
