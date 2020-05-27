import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import notF from '../../images/404_v2.png'

class notFounded extends Component {
  render(){
    return(
      <div>
        <img src={notF} alt='....' />
        <h3 className='text-center'>Sorry, there must have been some mistake!</h3>
        <div className='row'>
          <Link to='/' className='mx-auto'><button type='button' className='btn btn-lg bg-primary'>Go back to Home</button></Link>
        </div>
      </div>
    )
  }
}

export default notFounded
