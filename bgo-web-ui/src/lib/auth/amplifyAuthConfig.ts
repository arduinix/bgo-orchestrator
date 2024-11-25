import { ResourcesConfig } from 'aws-amplify'



export const amplifyAuthConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      // userPoolId: process.env.VITE_COGNITO_USER_POOL_ID || '',
      // userPoolClientId: process.env.VITE_USER_POOL_USER_CLIENT_ID || '',
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_USER_POOL_USER_CLIENT_ID || '',
    },
  },
}
