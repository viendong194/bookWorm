import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions';
import decode from 'jwt-decode';
import { getImages } from './image_actions';
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
if (localStorage.bookwormJWT) {
	const payload = decode(localStorage.bookwormJWT);
	const user = {
		token: localStorage.bookwormJWT,
		email: payload.email,
		confirmed: payload.confirmed
	};
	store.dispatch(userLoggedIn(user));
}
store.dispatch(getImages());
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);
registerServiceWorker();
