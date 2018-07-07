import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import {Container} from 'semantic-ui-react';
class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </Container>
    );
  }
}

export default App;
