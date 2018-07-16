import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>HomePage</h1>
        {this.props.isAuthenticated ? (
          <button onClick={this.props.logout}>Logout</button>
        ) : (
          <div>
            <Link to="/login">Login</Link>or<Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    );
  }
}

function mapPropsToState(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}
export default connect(
  mapPropsToState,
  { logout }
)(HomePage);
