export const LOGIN_AUTHED_USER  = 'LOGIN_AUTHED_USER'
export const LOGOUT_AUTHED_USER = 'LOGOUT_AUTHED_USER'

export function loginAuthedUser(id, name, path) {
  return {
    type: LOGIN_AUTHED_USER,
    id,
    name,
    path,
  }
}

export function logoutAuthedUser() {
  return {
    type: LOGOUT_AUTHED_USER,
  }
}
