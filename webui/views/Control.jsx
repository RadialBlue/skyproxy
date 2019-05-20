import React from 'react'

import { Theme } from '@rmwc/theme'
import '@material/theme/dist/mdc.theme.css'

import { Typography } from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import {
  List,
  ListDivider,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
} from '@rmwc/list'
import '@material/list/dist/mdc.list.css'

export default props => {
  props.setTitle("Control")
  props.setBackTo(false)

  return (
    <List twoLine nonInteractive style={{ padding: 0 }}>
      <ListItem>
        <ListItemGraphic icon="flight_takeoff" />
        Takeoff
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="360" />
        Loiter
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="home" />
        Home
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="place" />
        Waypoints
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="timer" />
        Speed
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="near_me" />
        Heading
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="swap_vert" />
        Altitude
      </ListItem>
      <ListItem>
        <ListItemGraphic icon="straighten" />
        Flat Trim
      </ListItem>
    </List>
  )
}