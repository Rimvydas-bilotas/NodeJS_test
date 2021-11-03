/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
const message = document.getElementById('message');

function registerUser(user) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  fetch('http://127.0.0.1:8080/register', options)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          const error = new Error('Something went wrong!');
          error.data = data;
          throw error;
        });
      }
      return response.json();
    })
    .then((data) => {
      message.innerText = 'Registered!';
    })
    .catch((error) => {
      message.innerText = 'Failed to register!\nEmail already exists';
    });
}

function userRegistrationHandler(event) {
  event.preventDefault();
  const full_name = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;

  if (password !== password2) {
    message.innerText = "The passwords doesn't match";
    return;
  }

  const user = { full_name, email, password };
  registerUser(user);
}

document
  .getElementById('register-form')
  .addEventListener('submit', userRegistrationHandler);
