import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
export default class LoginForm extends Component {
  state = {
    data: {
      email: '',
      pasword: ''
    },
    loading: false,
    errors: {}
  };
  /**
   * on change event
   */
  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  /**
   * on submit event
   */
  onSubmit = () => {
    let errors = this.validate(this.state.data);
    this.setState({ errors });
    if(Object.keys(errors).length === 0){
      this.props.submit(this.state.data);
    }
  };
  /**
   * validation
   */
  validate = (data) => {
    let errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'invalid email';
    if (!data.email) errors.email = "can't be empty";
    if (!data.password) errors.password = "can't be empty";
    return errors;
  };
  render() {
    const { data, errors } = this.state;
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={
              !!errors.email === true ? errors.email : 'example@example.com'
            }
            value={data.email}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder={
              !!errors.password === true ? errors.password : '*******'
            }
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Login</Button>
      </Form>
    );
  }
}
