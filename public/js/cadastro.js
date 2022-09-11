// Cadastrar usuário
let newEmail = document.getElementById('email');
let newPassword = document.getElementById('password1');
let passwordConfirm = document.getElementById('password2');
const btnCreate = document.getElementById('btnCreate');
let qtUsers = searchUsers();
console.log(qtUsers);

btnCreate.addEventListener('click', (e) => {
  e.preventDefault();
  let validOK = validar();

  if (validOK) {
    createUser();
  }
});

// validar senha
function validar() {
  if (newPassword.value.length < 5) {
    alert('Digite uma senha com no mínimo 5 caracteres');
    return false;
  }

  if (newPassword.value !== passwordConfirm.value) {
    alert('As senhas digitadas não conferem');
    return false;
  }
  return true;
}

function createUser() {
  const users = searchUsers();

  let existe = users.some((value) => value.email === newEmail.value);
  if (existe) {
    alert('E-mail já cadastrado!');
    return;
  }

  const newUser = {
    email: newEmail.value,
    password: newPassword.value,
    recados: [],
  };

  users.push(newUser);
  saveUser(users);
  alert('Conta criada com sucesso!');
  location.href = '/index.html';
}

function searchUsers() {
  return JSON.parse(localStorage.getItem('usersStorage') || '[]');
}

function saveUser(newUser) {
  localStorage.setItem('usersStorage', JSON.stringify(newUser));
}
