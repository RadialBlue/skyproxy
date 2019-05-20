import React from 'react'

import { Theme } from '@rmwc/theme'
import '@material/theme/dist/mdc.theme.css'

import { Typography } from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import { Select, SelectHelperText } from '@rmwc/select'
import '@material/select/dist/mdc.select.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'
import '@material/menu/dist/mdc.menu.css'
import '@material/menu-surface/dist/mdc.menu-surface.css'
import '@material/list/dist/mdc.list.css'

export default props => {
  props.setTitle("Install Module")
  props.setBackTo(true)

  return (
    <>
      <List></List>
      <Select enhanced outlined
        rootProps={{
          style: { width: '100%' }
        }}
        withLeadingIcon="developer_board"
        label="Module Type"
        placeholder="Select module type"
        options={['Parrot SkyController', 'Parrot C.H.U.C.K']} />
      <SelectHelperText>Choose a supported module type.</SelectHelperText>
    </>
  )
}