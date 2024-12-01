import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'
import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react/styles/reset.layer.css'
import '@aws-amplify/ui-react/styles/base.layer.css'
import '@aws-amplify/ui-react/styles/button.layer.css'

export default function SigninPage() {
  const { route } = useAuthenticator((context) => [context.route])
  const navigate = useNavigate()

  if (route === 'authenticated') {
    navigate('/')
  }
  return <Authenticator hideSignUp />
}
