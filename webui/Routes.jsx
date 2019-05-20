import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  Telemetry,
  Control,
  Navigate,
  Modules,
  ModuleInspect,
  ModuleInstall,
  Settings,
} from './views'

export default props => {
  const globals = props

  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/telemetry" />} />
      <Route exact path="/telemetry" render={ props => <Telemetry {...props} {...globals} /> } />
      <Route exact path="/control" render={ props => <Control {...props} {...globals} /> } />
      <Route exact path="/navigate" render={ props => <Navigate {...props} {...globals} /> } />
      <Route exact path="/modules" render={ props => <Modules {...props} {...globals} /> } />
      <Route exact path="/modules/install" render={ props => <ModuleInstall {...props} {...globals } /> } />
      <Route exact path="/modules/:id" render={ props => <ModuleInspect {...props} {...globals} /> } />
      <Route exact path="/settings" render={ props => <Settings {...props} {...globals} /> } />
    </Switch>
  )
}