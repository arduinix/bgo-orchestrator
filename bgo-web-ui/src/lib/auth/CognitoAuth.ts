import { getCurrentUser, signIn, signOut, SignInInput } from '@aws-amplify/auth'

const ACCESS_TOKEN_KEY = 'accessToken'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export async function isLoggedIn(): Promise<boolean> {
  const response = await checkIsLoggedIn()
  return response
}
export async function checkIsLoggedIn(): Promise<boolean> {
  try {
    const session = await getCurrentUser()
    if (session) {
      return true
    }
    return false
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return false
  }
}

export function logout() {
  signOut()
}

export async function login(signInInput: SignInInput) {
  signIn(signInInput)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    })
}
