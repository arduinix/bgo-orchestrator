import {
  getCurrentUser,
  signIn,
  signOut,
  SignInInput,
} from "@aws-amplify/auth";

const ACCESS_TOKEN_KEY = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function isLoggedIn(): Promise<boolean> {
  const response = await checkIsLoggedIn();
  return response;
}
export async function checkIsLoggedIn(): Promise<boolean> {
  try {
    const session = await getCurrentUser();
    if (session) {
      return true;
    }
    return false;
  } catch (err) {
    console.log("err: ", err);
    return false;
  }
}

export function logout() {
  signOut();
}

export async function login(signInInput: SignInInput) {
  signIn(signInInput)
    .then((result) => {
      console.log("result: ", result);
      return result;
    })
    .catch((err) => {
      console.log("err: ", err);
      return err;
    });
}
