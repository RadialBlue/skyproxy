import { useEffect, useState } from 'react'

import axios from 'axios'

export default () => {
  const [ modules, setModules ] = useState([
    {
      id: 'sc',
      type: 'skycontroller',
      path: '/#/modules/sc',
      icon: 'videogame_asset',
      title: 'SkyController 2',
      message: 'Connected',
      state: 'online'
    },
    {
      id: 'fc',
      type: 'fc',
      path: '/#/modules/fc',
      icon: 'airplanemode_active',
      title: 'C.H.U.C.K',
      message: 'Connected',
      state: 'online'
    },
    {
      id: 'co',
      type: 'co',
      path: 'https://192.168.12.1:3000/',
      icon: 'developer_board',
      title: 'Co-Pilot Module',
      message: 'Requires Configuration',
      state: 'warning'
    }
  ])

  return [ modules ]
}