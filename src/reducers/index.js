import users from "./users";
import polls from "./polls";
import authedUser from "./authedUser";
import { combineReducers } from "redux";

export default combineReducers({
  users,
  polls,
  authedUser,
});
