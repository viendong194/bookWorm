import React, { Component } from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import gravatarURL from 'gravatar-url';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class TopNavigation extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <Menu secondary pointing>
        <Menu.Item as={Link} to="/dashboard">
          Dash Board
        </Menu.Item>
        <Menu.Menu position="right">
          <Dropdown trigger={<Image avatar src={gravatarURL(user.email)} />}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { logout: actions.logout }
)(TopNavigation);
