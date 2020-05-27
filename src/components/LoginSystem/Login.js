import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { loginAuthedUser } from '../../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    'selectedUser': '',
    'shouldRedirect': false
  }

  handleChange = (id) => {
    this.setState((prevState) => ({
      selectedUser: id
    }))
  }

  login = (e) => {
    e.preventDefault()
    let id = this.state.selectedUser

    let userObject = _.pickBy(this.props.users, (user) => user.id === id) 
    let name = userObject[id].name
    let picture = userObject[id].avatarURL

    this.props.dispatch(loginAuthedUser(id, name, picture))
    this.setState((prevState) => ({
      ...prevState,
      shouldRedirect: true
    }))
  }

  render() {
    let { users, loading } = this.props
    let { selectedUser, shouldRedirect } = this.state
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    if(from.pathname === '/login' || from.pathname === '/logout') { 
      from.pathname = '/'
    }

    if (shouldRedirect === true) {
      return <Redirect to={ from } />
    }

    return(
      <div>
       
        <h3 className='text-center'>Please Select Users :</h3>
        {
          loading === true
            ? null
            : (
              <Fragment>
                  <div className='row justify-content-center'>
                      {
                        Object.values(users).map((user) => (
                          <div key={user.id} className={'card m-2 loginCard ' + (user.id === this.state.selectedUser ? 'border-success' : '')} style={{ width: 14 + 'rem' , cursor: 'pointer' }} onClick={() => this.handleChange(user.id)}>
                            <div className="card-body">
                              <p className="card-text text-center">{user.name}</p>
                            </div>
                          </div>
                        ))
                      }
                </div>
                <div className='row'>
                  <button className="btn btn-lg btn-success mx-auto" type="button" onClick={this.login} disabled={!selectedUser.length > 0}>Login</button>
                </div>
              </Fragment>
            )
        }
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    loading: users === null,
  }
}

export default connect(mapStateToProps)(Login)
