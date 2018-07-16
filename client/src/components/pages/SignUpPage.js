import React, { Component } from 'react';
import SignUpForm from '../form/SignUpForm';
import { connect } from 'react-redux';
import { signup } from '../../actions';
class SignUpPage extends Component {
  submit = (data) =>
    this.props.signup(data).then(() => this.props.history.push('/dashboard'));
  render() {
    return (
      <div>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }
}
export default connect(
  null,
  { signup }
)(SignUpPage);
