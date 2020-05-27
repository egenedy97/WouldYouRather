import React from 'react'
import VoteCardUnanswered from '../VotedCard/VoteCardUnanswered'

const QuestionUnanswered = (props) => {
  return (
    <div className='row'>
      <VoteCardUnanswered option={'optionOne'} />
     
      <VoteCardUnanswered option={'optionTwo'} />
    </div>
  )
}

export default QuestionUnanswered
