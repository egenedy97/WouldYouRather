import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleVoteAnswer } from '../../actions/shared'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class VoteCardUnanswered extends Component {

  handleVote = (e) => {
    e.preventDefault() // gotta do this otherwise dispatches twice!

    let { option, qid } = this.props
    this.props.dispatch(handleVoteAnswer(qid, option))
  }

  render() {
    let { option, question } = this.props

    return (
      <div className='col-lg-5 align-self-center'>
        <div className="card mx-auto text-center text-white bg-info" style={{ width: 20 + 'em' }}>
          <div className="card-body">
            <p className="card-text">{question[option].text}</p>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-light" onClick={this.handleVote}>Vote</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions }, { option, match }) {

  let paramId = match.params.id

  return {
    question: _.pick(questions, paramId)[paramId],
    option,
    qid: paramId,
  }
}

export default withRouter(connect(mapStateToProps)(VoteCardUnanswered))
