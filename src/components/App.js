import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'

import '../style.css';

import { handleInitialData } from '../actions/shared'

import Home from './Home/Home'
import Login from './LoginSystem/Login'
import Logout from './LoginSystem/Logout'
import Navbar from './Navbar/Navbar'
import Question from './Questions/Question'
import NewPoll from './Questions/NewPoll'
import Leaderboard from './Leaderboard/Leaderboard'
import ErrorPage from './NotFound/notFounded'
import ProtectedRoute from './Roues/ProtectedRoute'
import LoadingBar from 'react-redux-loading-bar'



let prefixForPoll = '/questions/'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    let { loading, loggedIn, questions, qid } = this.props
    return (
      <div>
        <LoadingBar />
          {loading === true
            ? null
            : (
              <Fragment>
                <Navbar />
                <Switch>
                  <Route exact path='/login' component={Login} />
                  <ProtectedRoute exact path='/' component={Home} isLoggedIn={loggedIn} />
                  <ProtectedRoute exact path='/logout' component={Logout} isLoggedIn={loggedIn} />
                  <ProtectedRoute exact path='/add' component={NewPoll} isLoggedIn={loggedIn} />
                  <ProtectedRoute exact path='/leaderboard' component={Leaderboard} isLoggedIn={loggedIn} />
                  {
                    Object.keys(questions).includes(qid) &&
                      <ProtectedRoute path={`${prefixForPoll}:id`} component={Question} isLoggedIn={loggedIn} />
                  }
                  <Route component={ErrorPage} />
                </Switch>
              </Fragment>
            )
          }
      </div>
    )
  }
}

function mapStateToProps({ users, questions, authedUser, }, { location }) {

  return {
    loading: (Object.keys(users).length === 0 && users.constructor === Object) || (Object.keys(questions).length === 0 && questions.constructor === Object), // check whether data is already loaded
    loggedIn: authedUser !== null,
    questions,
    qid: location.pathname.substring(prefixForPoll.length),
  }
}

export default withRouter(connect(mapStateToProps)(App))
