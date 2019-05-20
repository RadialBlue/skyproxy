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
  props.setTitle("Telemetry")
  props.setBackTo(false)

  return (
    <List twoLine nonInteractive style={{ padding: 0 }}>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Throttle</ListItemPrimaryText>
          <ListItemSecondaryText>50%</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Power</ListItemPrimaryText>
          <ListItemSecondaryText>Voltage: 12.1V -- Consumption: 4.2A</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Speed</ListItemPrimaryText>
          <ListItemSecondaryText>Ground: 12 m/s -- Air: 14 m/s</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Heading</ListItemPrimaryText>
          <ListItemSecondaryText>110&deg;</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Pitch</ListItemPrimaryText>
          <ListItemSecondaryText>+12&deg;</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Roll</ListItemPrimaryText>
          <ListItemSecondaryText>-18&deg;</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Altitude</ListItemPrimaryText>
          <ListItemSecondaryText>96m</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Latitude</ListItemPrimaryText>
          <ListItemSecondaryText>52.00000&deg;</ListItemSecondaryText>
        </ListItemText>
      </ListItem>

      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Longitude</ListItemPrimaryText>
          <ListItemSecondaryText>00.00000&deg;</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
    </List>
  )
}