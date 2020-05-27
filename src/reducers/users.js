import {
  RECEIVE_USERS,
  ADD_USER_ANSWER,
  ADD_USER_QUESTION,
} from '../actions/users'

export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_ANSWER :
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          answers: { ...state[action.userId].answers, ...action.answer }
        }
      }
    case ADD_USER_QUESTION :
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          questions: state[action.userId].questions.concat([action.questionId])
        }
      }
    default :
      return state
  }
}
