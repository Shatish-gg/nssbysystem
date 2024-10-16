function login(username, password) {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
    });
}

function getNewToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return;

  fetch('/token', {
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    });
}

// Call this function periodically, e.g., every 10 minutes
setInterval(getNewToken, 10 * 60 * 1000);

function fetchData() {
  const token = localStorage.getItem('token');
  fetch('/protected-route', {
    headers: { 'Authorization': `Bearer ${token}` },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}
// JavaScript Document// JavaScript Document