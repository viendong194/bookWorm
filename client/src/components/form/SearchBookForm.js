import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

export default class SearchBookForm extends Component {
  state = {
    query: '',
    loading: false,
    options: [],
    books: {}
  };
  onSearchChange = (e, data) => {
    clearTimeout(this.timer);
    this.setState({ query: data.searchQuery });
    this.timer = setTimeout(this.fetchOptions, 1000);
  };
  fetchOptions = () => {
    if (!this.state.query) return;
    this.setState({ loading: true });
    fetch(`/api/book/search?q=${this.state.query}`, {
      method: 'get'
    })
      .then((res) => res.json())
      .then((data) => {
        const books = data.book;
        const options = [];
        const bookHash = [];
        books.map((ele) => {
          bookHash[ele.goodreadsId] = ele;
          options.push({
            key: ele.goodreadsId,
            value: ele.goodreadsId,
            text: ele.title
          });
        });
        this.setState({ options, books: bookHash, loading: false });
      });
  };
  onChange = (e,data) =>{
    this.setState({query:data.value});
    console.log(data)
    this.props.onBookSelect(this.state.books[data.value])
  }
  render() {
    return (
      <div>
        <Dropdown
          search
          fluid
          placeholder="search a book by title"
          value={this.state.query}
          onSearchChange={this.onSearchChange}
          options={this.state.options}
          loading={this.state.loading}
          onChange = {this.onChange}
        />
      </div>
    );
  }
}
