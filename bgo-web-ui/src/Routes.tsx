import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { isLoggedIn } from './lib/auth/CognitoAuth'
// import { withAuthenticator } from '@aws-amplify/ui-react'
import NotFound from '@pages/not-found/NotFound'
import MainLayout from '@components/main-layout/MainLayout'
import Header from '@components/header/Header'
import Ecosystems from '@pages/ecosystems/Ecosystems'
import Olympics from '@pages/olympics/Olympics'
import Tutorials from '@pages/tutorials/Tutorials'
import Leagues from '@pages/leagues/Leagues'
import PlayerGroups from '@pages/player-groups/PlayerGroups'
import EventEditor from '@pages/olympics-manager/OlympicsManager'
import OlympicsRegistration from '@pages/olympics-registration/OlympicsRegistration'
import OlympicsGames from '@pages/olympics-games/OlympicsGames'
import OlympicsRounds from '@pages/olympics-rounds/OlympicsRounds'
import OlympicsPrintables from '@pages/olympics-printables/OlympicsPrintables'
import OlympicsDashboards from '@pages/olympics-dashboards/OlympicsDashboards'
import OlympicsSettings from '@pages/olympics-settings/OlympicsSettings'

export default function AppRouter() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  isLoggedIn().then((response) => {
    if (response) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })

  return (
    <>
      <Header loggedIn={loggedIn} />

      <Box position={'relative'} minHeight={'100vh'}>
        {/* <Box
          backgroundImage={panther}
          bgSize="cover"
          bgPosition="center"
          opacity={0.2}
          minHeight="100vh"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
        /> */}
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/olympics" element={<Olympics />}>
              <Route path=":id" element={<EventEditor />}>
                <Route path="registration" element={<OlympicsRegistration />} />
                <Route path="games" element={<OlympicsGames />} />
                <Route path="rounds" element={<OlympicsRounds />} />
                <Route path="printables" element={<OlympicsPrintables />} />
                <Route path="dashboards" element={<OlympicsDashboards />} />
                <Route path="settings" element={<OlympicsSettings />} />
              </Route>
            </Route>
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/leagues" element={<Leagues />} />
            <Route path="/playergroups" element={<PlayerGroups />} />
            <Route path="/ecosystems/:viewId?" element={<Ecosystems />} />
          </Route>
        </Routes>
      </Box>
    </>
  )
}

// export default withAuthenticator(AppRouter, {})
