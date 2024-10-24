// import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
// import { Amplify } from "aws-amplify";
import './App.css'
// import { amplifyAuthConfig } from "./lib/auth/amplifyAuthConfig";
import { Provider } from '@/components/ui/provider'
import { system } from '@/theme'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import AppRouter from './Routes'
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
        <Provider value={system}>
          <AppRouter />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

// export default withAuthenticator(App, { hideSignUp: true });
