import { SET_AUTHED_USER, UNSET_AUTHED_USER } from "../actions/authedUser";
export default function (state = false, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.username;
    case UNSET_AUTHED_USER:
      return false;
    default:
      return state;
  }
}
