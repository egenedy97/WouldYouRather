import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQuestion } from '../../actions/shared'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {

  state = {
    inputOne: '',
    inputTwo: '',
    qid: ''
  }

  handleChange = (e) => {
    let targetValue = e.target.value
    let inputNumber = e.target.id

    this.setState((prevState) => ({
      ...prevState,
      [inputNumber]: targetValue
    }))
  }

  handleClick = (e) => {
    e.preventDefault()
    let optionOneText = this.state.inputOne
    let optionTwoText = this.state.inputTwo
    this.props.dispatch(handleNewQuestion(optionOneText, optionTwoText))
      .then((qid) => {
        this.setState((prevState) => ({
          ...prevState,
          qid: qid
        }))
      })
  }

  render() {

    if(this.state.qid !== '') {
      return <Redirect to={`/`} />
    }

    return(
      <div className='container'>
        <h3 className='text-center'>Add a new polls</h3>
        <form>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="inputOne">First Poll</label>
              <input type="text" className="form-control" id="inputOne" placeholder="First option" value={this.state.inputOne} onChange={this.handleChange} />
            </div>
          </div>

          <div className='row'>
            <div className='col text-center'>
              or
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputTwo">Second Poll</label>
            <input type="text" className="form-control" id="inputTwo" placeholder="Second option" value={this.state.inputTwo} onChange={this.handleChange} />
          </div>
          <div className='row'>
            <button type="submit" className="btn btn-danger btn-lg mx-auto" disabled={ this.state.inputOne === '' || this.state.inputTwo === '' } onClick={this.handleClick}>Add question</button>
          </div>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)
