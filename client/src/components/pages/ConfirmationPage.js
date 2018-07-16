import React, { Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { confirm } from '../../actions';
class ConfirmationPage extends Component {
  state = {
    loading: true,
    success: false
  };
  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }
  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}
        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>Thank you.Your email is verified</Message.Header>
                <Link to="/dashboard">Go to dashboard</Link>
              </Message.Content>
              
            </Message>
          )}
        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Header>Something goes wrong</Message.Header>
            </Message>
          )}
      </div>
    );
  }
}

export default connect(null,{confirm})(ConfirmationPage);
