import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashBoardPage from './components/pages/DashBoardPage';
import NewBookPage from './components/pages/NewBookPage';
import SignUpPage from './components/pages/SignUpPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import { Container } from 'semantic-ui-react';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import { connect } from 'react-redux';
class App extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Container>
        {isAuthenticated && <TopNavigation />}
        <Switch>
          <Route
            location={this.props.location}
            exact
            path="/"
            component={HomePage}
          />
          <Route
            location={this.props.location}
            exact
            path="/confirm/:token"
            component={ConfirmationPage}
          />
          <GuestRoute
            location={this.props.location}
            exact
            path="/login"
            component={LoginPage}
          />
          <GuestRoute
            location={this.props.location}
            exact
            path="/signup"
            component={SignUpPage}
          />
          <GuestRoute
            location={this.props.location}
            exact
            path="/forgot_password"
            component={ForgotPasswordPage}
          />
          <GuestRoute
            location={this.props.location}
            exact
            path="/reset_password/:token"
            component={ResetPasswordPage}
          />
          <UserRoute
            location={this.props.location}
            exact
            path="/dashboard"
            component={DashBoardPage}
          />
          <UserRoute
            location={this.props.location}
            exact
            path="/book/new"
            component={NewBookPage}
          />
        </Switch>
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}
export default connect(mapStateToProps)(App);
