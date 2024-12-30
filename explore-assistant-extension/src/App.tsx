import React, { useEffect, useState } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { useLookerFields } from './hooks/useLookerFields'
import { useBigQueryExamples } from './hooks/useBigQueryExamples'
import useSendVertexMessage from './hooks/useSendVertexMessage'
import AgentPage from './pages/AgentPage'
import SettingsModal from './pages/AgentPage/Settings'
import DashboardPage from './pages/DashboardPage' // Import the new DashboardPage component

const ExploreApp = () => {
  const dispatch = useDispatch()
  const { settings, bigQueryTestSuccessful, vertexTestSuccessful } = useSelector((state: RootState) => state.assistant) as any
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useLookerFields()
  const { testBigQuerySettings } = useBigQueryExamples()
  const { testVertexSettings } = useSendVertexMessage()

  useEffect(() => {
    const missingSettings = Object.values(settings).some(setting => !setting?.value)
    if (missingSettings) {
      setIsSettingsOpen(true)
    } 
  }, [settings])

  useEffect(() => {
    const runTests = async () => {
      testBigQuerySettings()
      testVertexSettings()
    }
    if (!bigQueryTestSuccessful || !vertexTestSuccessful) {
      runTests()
    }
  }, [testBigQuerySettings, testVertexSettings, bigQueryTestSuccessful, vertexTestSuccessful, dispatch, settings.useCloudFunction.value, settings])

  return (
    <Router>
      <SettingsModal
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <nav className="left-nav">
        <ul>
          <li>
            <Link to="/explore-assistant">Explore Assistant</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
      {!isSettingsOpen  && (
        <Switch>
          <Route path="/explore-assistant" exact>
            {() => {
              console.log('Rendering Explore Assistant')
              return <AgentPage />
            }}
          </Route>
          <Route path="/dashboard" exact>
            {() => {
              console.log('Rendering Dashboard')
              return <DashboardPage />
            }}
          </Route>
          <Route>
            <Redirect to="/explore-assistant" />
          </Route>
        </Switch>
      )}
    </Router>
  )
}

export const App = hot(ExploreApp)
