import { combineReducers } from 'redux';
import user from './reducers/user';
import image from './reducers/image';
export default combineReducers({
  user,
  image
});
