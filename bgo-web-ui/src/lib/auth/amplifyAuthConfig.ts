import { ResourcesConfig } from 'aws-amplify'

export const amplifyAuthConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_USER_POOL_USER_CLIENT_ID || '',
    },
  },
}
