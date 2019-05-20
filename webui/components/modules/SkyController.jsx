import React from 'react'

import { Theme } from '@rmwc/theme'
import '@material/theme/dist/mdc.theme.css'

import { Typography } from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import {
  List,
  ListGroupSubheader,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
} from '@rmwc/list'
import '@material/list/dist/mdc.list.css'

import useArsdk from '../../hooks/useArsdk'

export default props => {
  const {
    loading,
    cpuid, serial, hardware_version, software_version, battery_percent, battery_state
  } = useArsdk({
    'skyctrl.SettingsState.CPUID.id': 'cpuid',
    'skyctrl.SettingsState.ProductSerialChanged.serialNumber': 'serial',
    'skyctrl.SettingsState.ProductVersionChanged.hardware': 'hardware_version',
    'skyctrl.SettingsState.ProductVersionChanged.software': 'software_version',
    'skyctrl.SkyControllerState.BatteryChanged.percent': 'battery_percent',
    'skyctrl.SkyControllerState.BatteryState.state': 'battery_state'
  })

  React.useEffect(() => {
    props.setBusy(loading)
  }, [loading])

  const properties = [
    {
      icon: 'memory',
      label: 'CPU ID',
      value: cpuid
    },
    {
      icon: 'sd_card',
      label: 'Serial',
      value: serial
    },
    {
      icon: 'event_note',
      label: 'Revision',
      value: hardware_version
    },
    {
      icon: 'system_update',
      label: 'Software Version',
      value: software_version
    },
    {
      icon: 'battery_full',
      label: 'Battery Charge',
      value: battery_percent && battery_percent + '%'
    },
    {
      icon: 'power_settings_new',
      label: 'Battery Status',
      value: battery_state && battery_state.toUpperCase()
    },
  ]

  return (
    <>
      { !loading &&
      <List nonInteractive twoLine>
        <ListGroupSubheader>Details</ListGroupSubheader>

        { properties.map(prop => (
          <ListItem key={prop.label}>
            <ListItemGraphic icon={ prop.icon } />
            <ListItemText>
              <ListItemPrimaryText>{ prop.label }</ListItemPrimaryText>
              <ListItemSecondaryText>{ prop.value }</ListItemSecondaryText>
            </ListItemText>
          </ListItem>
        ))}
      </List>
      }
    </>
  )
}