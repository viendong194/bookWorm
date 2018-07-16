import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../form/SearchBookForm';
import BookForm from '../form/BookForm'
export default class NewBookPage extends Component {
  state = {
    book: null
  };
  onBookSelect = (book) => this.setState({ book });
  addBook = () => console.log('hi');
  render() {
    return (
      <Segment>
        <h1>Add your new book to your collection</h1>
        <SearchBookForm onBookSelect={this.onBookSelect} />
        {this.state.book && (
          <BookForm submit={this.addBook} book={this.state.book} />
        )}
      </Segment>
    );
  }
}
