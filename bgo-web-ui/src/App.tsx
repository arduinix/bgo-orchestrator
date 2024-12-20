// import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import './App.css'
import { amplifyAuthConfig } from '@lib/auth/amplifyAuthConfig'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'
import AppRouter from './Routes'
import theme from './theme'



Amplify.configure(amplifyAuthConfig)

// function App() {
//   return (
//     <Authenticator>
//       <BrowserRouter>
//         <ErrorBoundary>
//           <ChakraProvider theme={theme}>
//             <AppRouter />
//           </ChakraProvider>
//         </ErrorBoundary>
//       </BrowserRouter>
//     </Authenticator>
//   )
// }

function App() {
  return (

      <BrowserRouter>
        <ErrorBoundary>
          <ChakraProvider theme={theme}>
            <AppRouter />
          </ChakraProvider>
        </ErrorBoundary>
      </BrowserRouter>

  )
}

// export default withAuthenticator(App, { hideSignUp: true })
export default App
