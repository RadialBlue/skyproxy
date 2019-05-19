import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
} from './views'

export default props => {
  return (
    <Switch>
      <Route exact path="/" render={ props => <Home {...props} /> } />
    </Switch>
  )
}