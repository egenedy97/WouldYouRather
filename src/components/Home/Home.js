import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class Home extends Component {

  state = {
    'showunPolls': true
  }

  chpangition = (showunPolls) => {
    this.setState((prevState) => ({
      showunPolls: showunPolls
    }))
  }

  showAvatar = (author) => {
    let user = _.pick(this.props.users, author)[author]
    return user.avatarURL
  }

  render() {
    let { questions, authedUser, users } = this.props

    let userObject = _.pickBy(users, (user) => user.id === authedUser.id)
    let user = userObject[authedUser.id]
    let pollsKey = Object.keys(user.answers)
    let pollskeys = Object.keys(questions)
    let unansweredKeys = _.difference(pollskeys, pollsKey)
    let pollsunanswered = _.pick(questions, unansweredKeys)
    let pollsanswers = _.pick(questions, pollsKey)
    let pollsByCategory = this.state.showunPolls ? pollsunanswered : pollsanswers
    let sortedPolls = Object.values(pollsByCategory).sort((a, b, ) => b.timestamp - a.timestamp)

    return (
      <div>
        <h1 className='text-center mt-3'>Select Polls Category</h1>


        <nav>
          <ul className="pagination pagination-lg justify-content-center">
            <li className={"page-item " + (this.state.showunPolls ? 'active' : '')} onClick={() => this.chpangition(true)}><button className="btn btn-success">Unanswered Polls</button></li>
            <li className={"page-item " + (this.state.showunPolls ? '' : 'active')} onClick={() => this.chpangition(false)}><button className="btn btn-danger">Answered Polls</button></li>
          </ul>
        </nav>


        <div className='questions mx-auto'>
          {sortedPolls.map((question) => (
            <Link to={`/questions/${question.id}`} className='questionBox' key={question.id}>
              <div class="card text-center">
                <div class="card-header text-monospace text-muted">
                  Would you Rather ?
         </div>
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Option 1</th>
                      <th scope="col">Option 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {question.optionOne.text}
                      </td>
                      <td>
                        {question.optionTwo.text}
                      </td>
                      <td>

                      </td>
                    </tr>
                  </tbody>

                </table>
                <p className='text-muted'>
                  By: {question.author}
                </p>
              </div>
              <br />
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users, }) {
  return {
    authedUser,
    questions,
    users,
  }
}

export default connect(mapStateToProps)(Home)
