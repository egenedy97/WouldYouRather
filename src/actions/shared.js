import { receiveUsers, addUserQuestion, addUserAnswer } from './users'
import { receiveQuestions, addQuestion, updateVotes } from './questions'
import { getInitialdata, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialdata()
      .then(({ users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
      })
      .then(() => dispatch(hideLoading()))
  }
}

export function handleNewQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {

    let { authedUser } = getState()
    let qid = ''

    dispatch(showLoading())

    return saveQuestion({ // add in API/DATA first
      optionOneText,
      optionTwoText,
      author: authedUser.id
    })
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion)) // add in Redux, questions object
        qid = formattedQuestion.id // gotta return so that next .then() can use it OR save as property
        return qid // gotta return so that next .then() can use it!
      })
      .then(() => dispatch(addUserQuestion(authedUser.id, qid))) // add in Redux, users object
      .then(() => {
          dispatch(hideLoading())
          return qid
      })
  }
}

export function handleVoteAnswer(qid, option) {
  return (dispatch, getState) => {

    let { authedUser } = getState()
    let answer = {[qid]: option }

    dispatch(showLoading())

    return saveQuestionAnswer({ // add vote to _DATA
      authedUser: authedUser.id,
      qid,
      answer: option,
    })
      // Question Component will redirect to Answered by checking the user object for answers, so upload user object last!
      .then(() => dispatch(updateVotes(qid, option, authedUser.id))) // add the vote to the questions' object
      .then(() => dispatch(addUserAnswer(authedUser.id, answer))) // add this poll/the vote to the answers in the user's object
      .then(() => dispatch(hideLoading()))
  }
}
