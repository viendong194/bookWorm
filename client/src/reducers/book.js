import { createSelector } from 'reselect';

export const booksSelector = (state) => state.book;
export const allBooksSelector = createSelector(booksSelector, (booksHash) =>
  Object.values(booksHash)
);
export default (state = {}, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};
