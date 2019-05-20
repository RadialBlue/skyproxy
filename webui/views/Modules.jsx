import React from 'react'
import { Link } from 'react-router-dom'

import { Theme } from '@rmwc/theme'
import '@material/theme/dist/mdc.theme.css'

import { Typography } from '@rmwc/typography'
import '@material/typography/dist/mdc.typography.css'

import {
  Card,
  CardPrimaryAction,
} from '@rmwc/card'
import '@material/card/dist/mdc.card.css'

import { Icon } from '@rmwc/icon'
import '@rmwc/icon/icon.css'

import {
  List,
  ListItem,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemGraphic,
  ListItemMeta,
} from '@rmwc/list'
import '@material/list/dist/mdc.list.css'

import withModules from '../hooks/withModules'

const stateToColor = {
  online: '#6fff6f',
  warning: '#ffaf6f',
}

const stateToIcon = {
  online: 'check',
  warning: 'warning',
}

export default props => {
  const [ modules ] = withModules()

  props.setTitle("Modules")
  props.setBackTo(false)

  return (
    <Theme use="primary">
      { /* <Typography use="headline4">Modules</Typography> */ }

      <Theme use="textPrimaryOnBackground">
        <List twoLine style={{ padding: '0' }}>
        { modules.map(details => (
          <a key={ details.id } href={ details.path }
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
            <Card style={{ margin: '0.5rem', padding: '0.5rem 0.5rem 0.5rem 1rem' }}>
              <ListItem>
                <ListItemGraphic icon={ details.icon } />
                <ListItemText>
                  <ListItemPrimaryText>{ details.title }</ListItemPrimaryText>
                  <ListItemSecondaryText>{ details.message }</ListItemSecondaryText>
                </ListItemText>
                <ListItemMeta
                    icon={ stateToIcon[details.state] }
                    style={{ color: stateToColor[details.state] }}
                  />
              </ListItem>
            </Card>
          </a>
        )) }
        </List>
      </Theme>

      <Link to="/modules/install" style={{ textDecoration: 'none' }}>
        <Theme use="textDisabledOnBackground">
          <Card outlined style={{
              margin: '0.5rem',
              padding: '1rem',
              backgroundColor: '#efefef',
              textAlign: 'center',
            }}>
            <CardPrimaryAction>
              <Typography use="headline6">
                Add Component
              </Typography>

              <Icon icon="add_box" />
            </CardPrimaryAction>
          </Card>
        </Theme>
      </Link>
    </Theme>
  )
}