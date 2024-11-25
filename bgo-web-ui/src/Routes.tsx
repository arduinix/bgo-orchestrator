import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { isLoggedIn } from './lib/auth/CognitoAuth'
import NotFound from '@pages/not-found/NotFound'
import MainLayout from '@components/main-layout/MainLayout'
import Header from '@components/header/Header'
import Olympics from '@pages/olympics/Olympics'
import Tutorials from '@pages/tutorials/Tutorials'
import Leagues from '@pages/leagues/Leagues'
import PlayerGroups from '@pages/player-groups/PlayerGroups'
import OlympicsManager from '@pages/olympics-manager/OlympicsManager'
import OlympicsRegistration from '@pages/olympics-registration/OlympicsRegistration'
import OlympicsGames from '@pages/olympics-games/OlympicsGames'
import OlympicsRounds from '@pages/olympics-rounds/OlympicsRounds'
import OlympicsPrintables from '@pages/olympics-printables/OlympicsPrintables'
import OlympicsDashboards from '@pages/olympics-dashboards/OlympicsDashboards'
import OlympicsSettings from '@pages/olympics-settings/OlympicsSettings'
import OlympicsRoundEditor from '@pages/olympics-rounds/OlympicsRoundEditor'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import { amplifyAuthConfig } from '@lib/auth/amplifyAuthConfig'

import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react/styles/reset.layer.css'
import '@aws-amplify/ui-react/styles/base.layer.css'
import '@aws-amplify/ui-react/styles/button.layer.css'

Amplify.configure(amplifyAuthConfig)

interface RequireAuthProps {
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { route } = useAuthenticator((context) => [context.route])
  return route === 'authenticated' ? children : <Authenticator />
}

export default function AppRouter() {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)

  isLoggedIn().then((response) => {
    if (response) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  return (
    <>
      <Authenticator.Provider>
        <Header loggedIn={loggedIn} />
        <Box position={'relative'} minHeight={'100vh'}>
          <Routes>
            <Route path='*' element={<NotFound />} />
            <Route path='/' element={<MainLayout />}>
              <Route path='/tutorials' element={<Tutorials />} />
              <Route
                path='/olympics'
                element={
                  <RequireAuth>
                    <Olympics />
                  </RequireAuth>
                }
              >
                <Route path=':eventId' element={<OlympicsManager />}>
                  <Route
                    path='registration'
                    element={<OlympicsRegistration />}
                  />
                  <Route path='games' element={<OlympicsGames />} />
                  <Route path='rounds' element={<OlympicsRounds />}>
                    <Route path=':roundId' element={<OlympicsRoundEditor />} />
                  </Route>
                  <Route path='printables' element={<OlympicsPrintables />} />
                  <Route path='dashboards' element={<OlympicsDashboards />} />
                  <Route path='settings' element={<OlympicsSettings />} />
                </Route>
              </Route>
              <Route path='/leagues' element={<Leagues />} />
              <Route path='/playergroups' element={<PlayerGroups />} />
            </Route>
          </Routes>
        </Box>
      </Authenticator.Provider>
    </>
  )
}
