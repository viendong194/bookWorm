import React, { Component } from 'react';
import LoginForm from '../form/LoginForm';
import { connect } from 'react-redux';
import {login} from '../../actions';
import {Link} from 'react-router-dom';

class LoginPage extends Component {
  /**
   * submit login information
   */
  submit = (data) =>
    this.props.login(data).then(() => this.props.history.push('/'));
  /**
   * render component
   */
  render() {
    return (
      <div>
        <h1>LoginPage</h1>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot password</Link>
      </div>
    );
  }
}

export default connect(
  null,
  { login }
)(LoginPage);
