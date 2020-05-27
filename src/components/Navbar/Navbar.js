import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {

  render() {
    let { authedUser } = this.props
    let { pathname } = this.props.location

    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className='container'>

        <NavLink className="navbar-brand" to="/">Would You Rather</NavLink>
        <div className="navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <NavLink exact to="/" activeClassName={ pathname === '/' ? 'active' : '' } className="nav-item nav-link">Home</NavLink>
          <NavLink to="/add" activeClassName={ pathname === '/add' ? 'active' : '' } className="nav-item nav-link">Add Poll</NavLink>
          <NavLink to="/leaderboard" activeClassName={ pathname === '/leaderboard' ? 'active' : '' } className="nav-item nav-link">Leaderboard</NavLink>
          </div>
        </div>
          <div className="navbar-nav navbar-right">
            {
              this.props.loggedIn === true
              ? (
                <div className="navbar-brand navbar-right d-flex align-items-center">
                  <span style={{ fontSize: 16 + 'px' }}>Hello, {authedUser.name}!</span>
                  <img src={authedUser.avatarPath} width="34" height="34" className="d-inline-block align-top rounded mr-2 ml-2" alt="User Avatar" />
                  {
                    pathname === '/logout' // don't show logout button on the Logout page
                      ? null
                      : <NavLink to='/logout'><button className="btn btn-danger" type="button">Logout</button></NavLink>
                  }
                </div>
              )
              : (
                <div>
                  {
                    pathname === '/login' // don't show logout button on the Logout page
                    ? null
                    : <NavLink to='/login'><button className="btn btn-outline-success" type="button">Login</button></NavLink>
                  }
                </div>
              )
            }
          </div>
          </div>

      </nav>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    // gotta make sure entire authedUser object is loaded, not just id. otherwise won't display name & picture
    loggedIn: authedUser !== null && authedUser.name !== null && authedUser.avatarPath !== null,
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))
