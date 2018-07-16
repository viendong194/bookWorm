import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { resetPassword, validateToken } from '../../actions';
import ResetPasswordForm from '../form/ResetPasswordForm';
class ResetPasswordPage extends Component {
  state = {
    loading: true,
    succes: false
  };
  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => {
        this.setState({ loading: false, success: true });
      })
      .catch(() => {
        this.setState({ loading: false, success: false });
      });
  }
  submit = (data) => 
    this.props.resetPassword(data).then(() => this.props.history.push('/'));
  render() {
    const { loading, success } = this.state;
    const token = this.props.match.params.token;
    return (
      <div>
        {loading && <Message>Loading</Message>}
        {!loading &&
          success && (
            <ResetPasswordForm submit={this.submit} token={token}>
              Form
            </ResetPasswordForm>
          )}
        {!loading && !success && <Message>Opps</Message>}
      </div>
    );
  }
}
export default connect(
  null,
  { resetPassword, validateToken }
)(ResetPasswordPage);
