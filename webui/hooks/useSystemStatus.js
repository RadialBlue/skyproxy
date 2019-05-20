import { useEffect, useState } from 'react'

import axios from 'axios'

export default () => {
  const [ status, setStatus ] = useState({})

  useEffect(() => {
    async function fetch () {
      try {
        const response = (await axios.get('/api/status')).data
        //setStatus(response)
      } catch (e) {
      }
    }

    const interval = setInterval(fetch, 1000)
    return () => clearInterval(interval)
  }, [])

  return [ status ]
}