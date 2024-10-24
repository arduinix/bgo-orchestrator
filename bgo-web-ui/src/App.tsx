// import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
import './App.css'
// import { amplifyAuthConfig } from "./lib/auth/amplifyAuthConfig";
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import AppRouter from './Routes'
import theme from './theme'

import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react/styles/reset.layer.css'
import '@aws-amplify/ui-react/styles/base.layer.css'
import '@aws-amplify/ui-react/styles/button.layer.css'

// Amplify.configure(amplifyAuthConfig);

export default function App() {
  return (
    // <Authenticator>
    //   <BrowserRouter>
    //     <ErrorBoundary>
    //       <ChakraProvider theme={theme}>
    //         <AppRouter />
    //       </ChakraProvider>
    //     </ErrorBoundary>
    //   </BrowserRouter>
    // </Authenticator>

    <BrowserRouter>
      <ErrorBoundary>
        <ChakraProvider theme={theme}>
          <AppRouter />
        </ChakraProvider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

// export default withAuthenticator(App, { hideSignUp: true });
