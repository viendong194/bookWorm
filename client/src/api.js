export default {
  user: {
    login: (credentials) =>
      fetch('/api/auth', {
        method: 'post',
        body: JSON.stringify({ credentials }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res)=>handleResponse(res))
        .then((res) => res.user)
  }
};

