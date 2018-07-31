import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
export default class AddBookCta extends Component {
  render() {
    return (
      <Card centered>
        <Card.Content textAlign="center">
          <Card.Header>Add New Book</Card.Header>
          <Link to="/book/new"><Icon name="plus circle" size="massive" /></Link>
        </Card.Content>
      </Card>
    );
  }
}
