import {  _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion,} from './_DATA'

export function getInitialData ()
{
    return Promise.all([
        _getUsers(),
        _getQuestions(),
      ]).then(([users, polls]) => ({
        users,
        polls,
      }))
}

export function saveQuestion({})
{
    
}