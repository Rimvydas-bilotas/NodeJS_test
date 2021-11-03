/* eslint-disable */

function loginUser(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    };
  
    const message = document.getElementById('message');
  
    fetch('http://127.0.0.1:8080/login', options)
      .then((response) => {
        if (!response.ok) {
          return response.json()
            .then((errResponseData) => {
              const error = new Error('Something went wrong!');
              error.data = errResponseData;
              throw error;
            });
        }
        return response.json();
      })
      .then((data) => {  
        localStorage.setItem('token', data.data);
        message.innerText = 'Logged in!';
        window.location.href = 'groups.html';
      })
      .catch((error) => {
        if (error.data) {
          message.innerText = `Failed to login!\n${error.data.details[0].message}`;
        } else {
          message.innerText = 'Failed to login!\nSomething went wrong';
        }
      });
  }
  
  function userLoginHandler(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = { email, password };
    loginUser(user);
  }
  
  document.getElementById('login-form').addEventListener('submit', userLoginHandler);