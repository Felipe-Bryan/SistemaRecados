// Logar usuário
const btnLogin = document.getElementById('btnLogin');
let iptEmail = document.getElementById('login');
let iptPassword = document.getElementById('password');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checklogged();

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});

function login() {
  const users = searchUsers();

  const userFound = users.find((value) => value.email === iptEmail.value && value.password === iptPassword.value);
  const email = iptEmail.value;
  const checksession = document.getElementById('sessionCheck').checked;

  if (userFound) {
    localStorage.setItem('loggedUser', JSON.stringify(userFound));
    saveSession(email, checksession);
    location.href = 'home.html';
  } else {
    alert('E-mail ou senha incorretos');
  }
}

function searchUsers() {
  return JSON.parse(localStorage.getItem('usersStorage') || '[]');
}

function saveUser(newUser) {
  localStorage.setItem('usersStorage', JSON.stringify(newUser));
}

function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (logged) {
    saveSession(logged, session);

    window.location.href = '/home.html';
  }
}

function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem('session', data);
  }
  sessionStorage.setItem('logged', data);
}
