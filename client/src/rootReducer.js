import { combineReducers } from 'redux';
import user from './reducers/user';
import book from './reducers/book';
import image from './reducers/image';
export default combineReducers({
  user,
  image,
  book
});
