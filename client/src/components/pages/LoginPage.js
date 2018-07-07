import React, { Component } from 'react'
import LoginForm from '../form/LoginForm'
export default class LoginPage extends Component {
  /**
   * submit login information
   */
  submit = (data)=>{
    console.log(data);
  }
  /**
   * render component
   */
  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.submit}/>
      </div>
    )
  }
}
