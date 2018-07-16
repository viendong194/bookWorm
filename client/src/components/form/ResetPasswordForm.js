import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

export default class ResetPasswordForm extends Component {
  state = {
    data: {
      token: this.props.token,
      password: '',
      passwordConfirmation: ''
    },
    loading:false,
    errors:{}
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
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data).catch((err) => {
        err
          .json()
          .then((value) =>
            this.setState({ errors: value.errors, loading: false })
          );
      });
    }
  };
  /**
   * validation
   */
  validate = (data) => {
    let errors = {};
    if (!data.password) errors.password = "can't be empty";
    if (data.password !== data.passwordConfirmation) errors.password = "the password must same";
    return errors;
  };
  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global && (
          <Message negative>
            <Message.Header>Something go wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}
        <Form.Field error={!!errors.password}>
          <label htmlFor="email">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder={
              !!errors.password === true ? errors.password : 'your new password'
            }
            value={data.password}
            onChange={this.onChange}
          />
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="email">Confirm Your Password</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder={
              !!errors.password === true ? errors.password : 'type it again'
            }
            value={data.passwordConfirmation}
            onChange={this.onChange}
          />
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>
    );
  }
}
