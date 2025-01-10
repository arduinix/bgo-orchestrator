// import { AuthenticatedUser } from '../types'
// import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtDecode, JwtPayload } from "jwt-decode" 

// create a function to get a user from the token

export const getAuthenticatedUser = async (token: string): Promise<JwtPayload> => {
  // make sure that the token is valid
  const decodedUserObject = getValidToken(token)

  // if the user does not already exist in the database, create the new user

  // return the user
  return decodedUserObject
}

// TODO: add verification of the token secret
export const getValidToken = (token: string): JwtPayload => {
  try {
    // const decodedToken = jwt.decode(token)
    const decodedToken = jwtDecode(token)
    return decodedToken
  } catch (error) {
    throw new Error(`Invalid token ${error}`)
  }
}
