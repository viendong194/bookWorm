const USER_LOGGED_IN = 'USER_LOGGED_IN';
const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const userLoggedIn = (user) => ({ type: USER_LOGGED_IN, user });
export const userLoggedOut = () => ({ type: USER_LOGGED_OUT });
/**
 * login action
 * @param {*} credentials
 */
export const login = (credentials) => (dispatch) =>
  fetch('/api/auth', {
    method: 'post',
    body: JSON.stringify({ credentials }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        throw err;
      } else {
        localStorage.bookwormJWT = res.user.token;
        return dispatch(userLoggedIn(res.user));
      }
    });
/**
 * signup action
 * @param {*} credentials
 */
export const signup = (user) => (dispatch) =>
  fetch('/api/users', {
    method: 'post',
    body: JSON.stringify({ user }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        throw err;
      } else {
        localStorage.bookwormJWT = res.user.token;
        return dispatch(userLoggedIn(res.user));
      }
    });
/**
 * confirm action
 * @param {*} credentials
 */
export const resetPasswordRequest = (email) => (dispatch) =>
  fetch('/api/auth/reset_password_request', {
    method: 'post',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        throw err;
      } else {
        return;
        // return dispatch(userLoggedIn(res.user));
      }
    });

export const validateToken = (token) => () =>
  fetch('/api/auth/validate_token', {
    method: 'post',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        throw err;
      } else {
        return;
        // return dispatch(userLoggedIn(res.user));
      }
    });
export const resetPassword = (data) => () =>
  fetch('/api/auth/reset_password', {
    method: 'post',
    body: JSON.stringify({ data }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        console.log(1)
        throw err;
      } else {
        console.log(3)
        return;
        // return dispatch(userLoggedIn(res.user));
      }
    });
export const confirm = (token) => (dispatch) =>
  fetch('/api/auth/confirm', {
    method: 'post',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
    .then((res, err) => {
      if (err) {
        throw err;
      } else {
        return dispatch(userLoggedIn(res.user));
      }
    });
/**
 * logout action
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('bookwormJWT');
  return dispatch(userLoggedOut());
};
function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}
