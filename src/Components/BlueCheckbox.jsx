import React from 'react'
import { Checkbox, withStyles } from '@material-ui/core'

const BlueCheckbox = withStyles({
  root: {
    color: 'black',
    '&$checked': {
      color: 'black',
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />)

export default BlueCheckbox
