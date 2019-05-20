import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { Snackbar } from '@rmwc/snackbar'
import '@material/button/dist/mdc.button.css'
import '@material/snackbar/dist/mdc.snackbar.css'

import { ThemeProvider } from '@rmwc/theme'

import Routes from './Routes'

import AppBar from './components/AppBar'
import Drawer from './components/Drawer'

export default props => {
  const [ title, setTitle ] = React.useState("Sky Proxy")
  const [ backTo, setBackTo ] = React.useState(null)
  const [ busy, setBusy ] = React.useState(false)

  const [ isSnackbarOpen, setIsSnackbarOpen ] = React.useState(false)
  const [ snackbarMessage, setSnackbarMessage ] = React.useState("EMPTY MESSAGE")
  const [ snackbarTimeout, setSnackbarTimeout ] = React.useState(4000)

  const [ isDrawerOpen, setIsDrawerOpen ] = React.useState(false)

  return (
    <ThemeProvider options={{
      primary: '#7890cc',
      primaryBg: '#ff0000',
      secondary: '#00bcd4',
      secondaryBg: '#00ff00',
      error: '#b00020',
      onPrimary: '#ffffff',
      textPrimaryOnBackground: '#4f4f4f',
    }}>
      <Router>
        <AppBar title={ title } busy={ busy } backTo={ backTo }
            setIsDrawerOpen={ setIsDrawerOpen }
          />

        <Drawer isDrawerOpen={ isDrawerOpen } setIsDrawerOpen={ setIsDrawerOpen } />

        <div className="view" style={{ margin: '0 auto', maxWidth: '30rem' }}>
          <Routes setTitle={ setTitle } setBusy={ setBusy } setBackTo={ setBackTo } setIsDrawerOpen={ setIsDrawerOpen } />
        </div>

        <Snackbar stacked
            open={ isSnackbarOpen } onClose={ () => setIsSnackbarOpen(false) }
            message={ snackbarMessage }
            timeout={ snackbarTimeout }
          />
      </Router>
    </ThemeProvider>
  )
}