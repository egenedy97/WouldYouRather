export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION      = 'ADD_QUESTION'
export const UPDATE_VOTES      = 'UPDATE_VOTES'

export function addQuestion(question) {
  return{
    type: ADD_QUESTION,
    question
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function updateVotes(questionId, option, userId) {
  return {
    type: UPDATE_VOTES,
    questionId,
    option,
    userId,
  }
}
