import React from 'react'
import { withRouter } from 'react-router-dom'

import { ThemeProvider } from '@rmwc/theme'

import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust,
  TopAppBarActionItem,
  TopAppBarNavigationIcon,
} from '@rmwc/top-app-bar'
import '@material/top-app-bar/dist/mdc.top-app-bar.css'

import { LinearProgress } from '@rmwc/linear-progress'
import '@material/linear-progress/dist/mdc.linear-progress.css'

import useSystemStatus from '../hooks/useSystemStatus'

/**
 * 
 * @param {*} props 
 */
const StatusIcon = props => (
  <TopAppBarActionItem {...props}
      style={{ color: true ? '#6fff6f' : '#af3f3f'}}
    />
)

/**
 * 
 * @param {*} props
 */
export default withRouter(props => {
  const {
    history,
    title, busy, backTo,
    setIsDrawerOpen,
  } = props

  const [ status ] = useSystemStatus()

  return (
    <>
      <TopAppBar dense fixed style={{ zIndex: 10 }}>
        <TopAppBarRow>
          <TopAppBarSection alignStart>
            { backTo &&
              <TopAppBarNavigationIcon
                  icon="arrow_back"
                  onClick={ () => history.goBack() }
                />
            }
            { !backTo &&
              <TopAppBarNavigationIcon
                icon="apps"
                onClick={ () => setIsDrawerOpen(true) }
              />
            }
            <TopAppBarTitle>{ title }</TopAppBarTitle>
          </TopAppBarSection>

          <TopAppBarSection alignEnd>

            <StatusIcon icon="developer_board" status={status.fc_online} />

            { /*
            <StatusIcon icon="videogame_asset" status={status.sc_online} />
            <StatusIcon icon="flight" status={status.fc_online} />
            <StatusIcon icon="track_changes" status={status.fc_online} />
            */ }
          </TopAppBarSection>
        </TopAppBarRow>

        { busy &&
          <ThemeProvider options={{
            primary: '#afbcd4',
          }}>
            <LinearProgress />
          </ThemeProvider>
        }
      </TopAppBar>

      <TopAppBarFixedAdjust dense />
    </>
  )
})