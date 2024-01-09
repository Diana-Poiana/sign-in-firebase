
import { db, ref, dbref, set, get, auth, child, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from './firebase-config.js';

const formSignUp = document.querySelector('.form__sign-up');
const formLogIn = document.querySelector('.form__log-in');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');

const hidePasswordBtn = document.querySelector('.form__hide-button');
const btnTextInner = document.querySelector('.form__btn-txt');
const showSvg = document.querySelector('.form__show-svg');
const hideSvg = document.querySelector('.form__hide-svg');

// toggle password visabillity
function togglePasswordVisability() {
  if (passwordInput.getAttribute('type') == 'password') {
    passwordInput.removeAttribute('type');
    passwordInput.setAttribute('type', 'text');
    btnTextInner.textContent = 'Show';
    hideSvg.style.display = 'none';
    showSvg.style.display = 'block';
  } else if (passwordInput.getAttribute('type') == 'text') {
    passwordInput.removeAttribute('type');
    passwordInput.setAttribute('type', 'password');
    btnTextInner.textContent = 'Hide';
    hideSvg.style.display = 'block';
    showSvg.style.display = 'none';
  }
}

// user registration
function registerUser(e) {
  e.preventDefault();

  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((credentials) => {
      set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
        phone: phoneInput.value,
      });

      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error('Error occured:', error);
        });

      console.log(credentials);
      sessionStorage.setItem('user-creds', JSON.stringify(credentials.user));
      window.location.href = 'authorization-page.html';
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};

// user login
function logInUser(e) {
  e.preventDefault();

  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((credentials) => {
      console.log(credentials);
      get(child(dbref, 'UsersAuthList/' + credentials.user.uid))
        .then((snapshot) => {
          if (snapshot.exists) {
            sessionStorage.setItem('user-info', JSON.stringify({
              phone: snapshot.val().phone
            }));
            sessionStorage.setItem('user-creds', JSON.stringify(credentials.user));
            window.location.href = 'authorization-page.html';
          }
        });
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
      window.location.href = 'index.html';
    });
};

// event listeners
try {
  hidePasswordBtn.addEventListener('click', togglePasswordVisability);
} catch (error) {
  console.log(error);
}

try {
  formLogIn.addEventListener('submit', logInUser);
} catch (error) {
  console.log(error);
}

try {
  formSignUp.addEventListener('submit', registerUser);
} catch (error) {
  console.log(error);
}









