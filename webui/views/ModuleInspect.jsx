import React from 'react'

import withModules from '../hooks/withModules'

import ModuleView from '../components/modules'

export default props => {
  const [ modules ] = withModules()
  const module = modules.find(m => m.id == props.match.params.id)

  props.setTitle(module.title)
  props.setBackTo(true)

  return (<ModuleView module={module} {...props} />)
}