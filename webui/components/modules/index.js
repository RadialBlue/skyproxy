import React from 'react'

import SkyController from './SkyController'

export default props => (
  <>
    { props.module.type === 'skycontroller' &&
      <SkyController {...props} />
    }
  </>
)