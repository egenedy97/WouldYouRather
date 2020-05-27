import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutAuthedUser } from '../../actions/authedUser'

class Logout extends Component {

  logout = () => {
    this.props.dispatch(logoutAuthedUser())
  }

  render() {
    let { authedUser } = this.props

    return(
      <div>
        <h3 className='text-center'>{authedUser.name}, are you sure you want to logout?</h3>
        <div className='row'>
          <button className="btn btn-lg btn-danger mx-auto" type="button" onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(Logout)
