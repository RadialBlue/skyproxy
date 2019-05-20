import React from 'react'

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
  props.setTitle("Settings")
  return (
    <List twoLine style={{ padding: 0 }}>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Feedback</ListItemPrimaryText>
          <ListItemSecondaryText>Ask for features or submit a bug</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
      <ListDivider />
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Version</ListItemPrimaryText>
          <ListItemSecondaryText>1.0.0 - Alpha 1</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <ListItemPrimaryText>Author</ListItemPrimaryText>
          <ListItemSecondaryText>Radial.Blue</ListItemSecondaryText>
        </ListItemText>
      </ListItem>
    </List>
  )
}