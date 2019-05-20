import { useEffect, useState } from 'react'

import axios from 'axios'

function objfind (object, path) {
  const parts = path.split('.')

  let target = object
  parts.forEach(segment => {
    if (!target) return null
    target = target[segment]
  })
  return target
}

export default (mapping) => {
  const [ state, setState ] = useState({})
  const [ loading, setLoading ] = useState(true)

  const props = {}
  const values = {}

  Object.keys(mapping).forEach(path => {
    const [ property, setProperty ] = useState()
    props[path] = { property, setProperty }
    values[mapping[path]] = property
  })

  useEffect(() => {
    async function fetch () {
      try {
        const response = (await axios.get('/api/arsdk')).data
        setState(response)

        Object.keys(props).forEach(k => {
          props[k].setProperty(objfind(response, k))
        })

        setLoading(false)
      } catch (e) {

      }
    }

    const interval = setInterval(fetch, 1000)
    return () => clearInterval(interval)
  }, [])

  return { loading, state, ...values }
}