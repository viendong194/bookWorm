import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
export default class ForgotPasswordForm extends Component {
  state = {
    data: {
      email: ''
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
    if (!Validator.isEmail(data.email)) errors.email = 'invalid email';
    if (!data.email) errors.email = "can't be empty";
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
        <Button primary>Forgot Password</Button>
      </Form>
    );
  }
}
