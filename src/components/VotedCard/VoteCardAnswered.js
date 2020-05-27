import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class VoteCardAnswered extends Component {

  state = {
    votedThisOption: false
  }

  componentDidMount = () => {

    let { option, question, authedUser } = this.props

    this.setState((prevState) => ({
      votedThisOption: _.includes(question[option].votes, authedUser.id)
    }))
  }

  displayUserVotes = (option, votesAmount) => {
    let { votedThisOption } = this.state

    switch (true) {
      case (votesAmount === 1 && votedThisOption) :
        return `Only you voted`
      case (votesAmount === 1 && !votedThisOption) :
        return `1 user voted`
      case (votesAmount > 1 && votedThisOption) :
        return `${votesAmount} users voted (including you!)`
      case (votesAmount > 1 && !votedThisOption) :
        return `${votesAmount} users `
      default : // = 0
        return `Nobody voted`
    }
  }

  render() {

    let { question, option } = this.props
    let { votedThisOption } = this.state

    return (
      <div className='col-lg-5 align-self-center'>
        <div className={'card mx-auto text-center text-white ' + (votedThisOption ? 'bg-success' : 'bg-danger')} style={{ width: 20 + 'em' }}>
          <div className="card-body">
            <p className="card-text">{question[option].text}</p>
          </div>
          <div className="card-footer">{this.displayUserVotes(option, question[option].votes.length)}</div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, { option, match }) {

  let paramId = match.params.id

  return {
    authedUser,
    question: _.pick(questions, paramId)[paramId],
    option,
  }
}

export default withRouter(connect(mapStateToProps)(VoteCardAnswered))
