import { Route, Routes } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { isLoggedIn } from './lib/auth/CognitoAuth'
// import { withAuthenticator } from '@aws-amplify/ui-react'
import NotFound from './pages/not-found/NotFound'
import MainLayout from './components/main-layout/MainLayout'
import Header from './components/header/Header'
import Ecosystems from './pages/ecosystems/Ecosystems'

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
            <Route path="/ecosystems/:viewId?" element={<Ecosystems />} />
          </Route>
        </Routes>
      </Box>
    </>
  )
}

// export default withAuthenticator(AppRouter, {})
