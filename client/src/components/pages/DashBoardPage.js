import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../message/ConfirmEmailMessage';
import { allBooksSelector } from '../../reducers/book';
import AddBookCta from '../cta/AddBookCta'

class DashBoardPage extends Component {
  render() {
    const { books } = this.props;
    return (
      <div>
        {this.props.isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 && <AddBookCta />}
      </div>
    );
  }
}
function mapPropsToState(state) {
  return {
    isCornfirmed: state.user.isCornfirmed,
    books: allBooksSelector(state)
  };
}
export default connect(mapPropsToState)(DashBoardPage);
