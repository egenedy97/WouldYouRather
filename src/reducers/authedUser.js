import {
  LOGIN_AUTHED_USER,
  LOGOUT_AUTHED_USER,
} from '../actions/authedUser'

export default function authedUser(state = null, action) {
  switch (action.type) {
    case LOGIN_AUTHED_USER :
      return {
        id: action.id,
        name: action.name,
        avatarPath: action.path
      }
    case LOGOUT_AUTHED_USER :
      return null
    default :
      return state
  }
}
