import React from 'react'
import { NavLink } from 'react-router-dom'

import {
  Drawer,
  DrawerContent,
} from '@rmwc/drawer'
import '@material/drawer/dist/mdc.drawer.css'

import {
  List,
  ListDivider,
  ListItem,
  ListItemGraphic,
} from '@rmwc/list'
import '@material/list/dist/mdc.list.css'
import { Typography } from '@rmwc/typography';

const MenuItem = props => {
  const { to, icon, children } = props

  return (
    <ListItem tag={ NavLink } to={ to }
        style={{ color: '#4f4f4f' }}
        activeStyle={{ color: '#7890cc' }}
      >
      <ListItemGraphic icon={ icon } />
      { children }
    </ListItem>
  )
}

export default props => {
  const { isDrawerOpen, setIsDrawerOpen } = props

  return (
    <Drawer modal
        open={ isDrawerOpen }
        onClose={ setIsDrawerOpen(false) }
        style={{ marginTop: '-8px' }}
      >
      <DrawerContent>
        <List nonInteractive>
          <MenuItem to="/telemetry" icon="track_changes">Telemetry</MenuItem>
          <MenuItem to="/control" icon="control_camera">Control</MenuItem>
          <MenuItem to="/navigate" icon="explore">Navigate</MenuItem>
          <MenuItem to="/modules" icon="layers">Modules</MenuItem>
          <ListDivider />
          <MenuItem to="/settings" icon="settings">Settings</MenuItem>
        </List>
      </DrawerContent>
    </Drawer>
  )
}