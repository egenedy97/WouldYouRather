import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'
import VoteCardAnswered from '../VotedCard/VoteCardAnswered'

class QuestionAnswered extends Component {

  render() {
    let { question, authedUser } = this.props

    let optionOneVotes = question.optionOne.votes.length
    let optionTwoVotes = question.optionTwo.votes.length
    let totalVotes = optionOneVotes + optionTwoVotes
    let optionOnePercentage = optionOneVotes / totalVotes * 100
    let optionTwoPercentage = optionTwoVotes / totalVotes * 100

    let votedOptionOne = _.includes(question.optionOne.votes, authedUser.id)

    return(
      <div>
        <h4 className='text-center' style={{ fontSize: 80 + 'px' }}>
          Total Votes: {totalVotes}
        </h4>
        <br></br>

        <div className="progress" style={{ height: 30 + 'px' }}>
          <div className={'progress-bar ' + (votedOptionOne ? 'bg-success' : 'bg-danger')} role="progressbar" style={{ width: optionOnePercentage + '%', fontSize: 22 + 'px' }} aria-valuenow={optionOnePercentage} aria-valuemin="0" aria-valuemax="100">{Math.round(optionOnePercentage)}%</div>
          <div className={'progress-bar ' + (votedOptionOne ? 'bg-danger' : 'bg-success')} role="progressbar" style={{ width: optionTwoPercentage + '%', fontSize: 22 + 'px' }} aria-valuenow={optionTwoPercentage} aria-valuemin="0" aria-valuemax="100">{Math.round(optionTwoPercentage)}%</div>
        </div>

        <br></br>

        <div className='row'>
          <VoteCardAnswered option={'optionOne'} />
          <div className='col-lg-2 text-center align-self-center or'>
            or
          </div>
          <VoteCardAnswered option={'optionTwo'} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, }, { match }) {

  let paramId = match.params.id

  return {
    authedUser,
    question: _.pick(questions, paramId)[paramId],
  }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswered))
