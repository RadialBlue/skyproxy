import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@rmwc/theme'

import Routes from './Routes'

export default props => {
  return (
    <ThemeProvider options={{}}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  )
}