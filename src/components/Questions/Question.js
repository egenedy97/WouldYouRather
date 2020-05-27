import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import QuestionUnanswered from './QuestionUnanswered'
import QuestionAnswered from './QuestionAnswered'

class Question extends Component {

  render() {
    let { alreadyAnswered } = this.props

    return(
      <div>
       
        <h1 className='text-center'>Would You Rather ?</h1>
        {alreadyAnswered === true
          ? <QuestionAnswered />
          : <QuestionUnanswered />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser, users }, { match }) {

  let paramId = match.params.id 
  let user = _.pick(users, authedUser.id)[authedUser.id]
  let answersKeys = Object.keys(user.answers)

  return {
    alreadyAnswered: _.includes(answersKeys, paramId),
  }
}

export default connect(mapStateToProps)(Question)
