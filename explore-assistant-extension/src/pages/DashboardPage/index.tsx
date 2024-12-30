import React, { useEffect, useRef } from 'react'
import { LookerEmbedSDK } from '@looker/embed-sdk'

import './style.css'

const DashboardPage = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('DashboardPage rendered') // Add logging
    const hostUrl = 'https://rplumina.cloud.looker.com'
    const dashboardId = '4'
    const theme = 'RealPage'

    if (ref.current) {
      LookerEmbedSDK.init(hostUrl)
      LookerEmbedSDK.createDashboardWithId(dashboardId)
        .appendTo(ref.current)
        .withClassName('custom-iframe') 
        .withTheme(theme)
        .build()
        .connect()
        .catch((error: Error) => {
          console.error('Connection error', error)
        })
    }
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh' }} className="dashboard-page">
      <div ref={ref} style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  )
}

export default DashboardPage
