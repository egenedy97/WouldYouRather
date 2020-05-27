export const RECEIVE_USERS         = 'RECEIVE_USERS'
export const ADD_USER_ANSWER       = 'ADD_USER_ANSWER'
export const ADD_USER_QUESTION     = 'ADD_USER_QUESTION'

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function addUserAnswer(userId, answer){
  return {
    type: ADD_USER_ANSWER,
    userId,
    answer, // { "question ID" : "Option" }
  }
}

export function addUserQuestion(userId, questionId){
  return {
    type: ADD_USER_QUESTION,
    userId,
    questionId,
  }
}
