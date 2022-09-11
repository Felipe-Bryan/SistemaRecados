let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');
let description = document.getElementById('descriptionInput');
let detail = document.getElementById('detailInput');
const btnSave = document.getElementById('saveButton');
const users = JSON.parse(localStorage.getItem('usersStorage'));
let data = JSON.parse(localStorage.getItem('loggedUser'));

checklogged();

function logout() {
  let activeUserPosition;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === data.email) {
      activeUserPosition = i;
    }
  }
  users[activeUserPosition].recados = data.recados;
  localStorage.setItem('usersStorage', JSON.stringify(users));

  sessionStorage.removeItem('logged');
  localStorage.removeItem('session');
  localStorage.removeItem('loggedUser');

  window.location.href = 'index.html';
}

function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (!logged) {
    window.location.href = 'index.html';
    return;
  }

  let activeUserPosition;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === data.email) {
      activeUserPosition = i;
    }
  }
  data.recados = users[activeUserPosition].recados;
  console.log(data);
}

btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  newErrand();
});

function newErrand() {
  let errand = {
    id: data.recados.length + 1,
    detail: detail.value,
    description: description.value,
  };
  data.recados.push(errand);
  createTable(data.recados);
  description.value = '';
  detail.value = '';
  console.log(data);
  localStorage.setItem('loggedUser', JSON.stringify(data));
}

createTable = (recadosArray) => {
  //Pega corpo da tabela no html pelo DOM
  const table = document.getElementsByTagName('tbody')[0];

  //Limpeza do corpo da tabela
  table.innerHTML = '';
  // para cada recados cria uma linha
  recadosArray.forEach((recado) => {
    //Criada nova linha
    const tr = document.createElement('tr');

    //Criada nova celula para id do recado e adicionado id no texto da celula
    const idCel = document.createElement('td');
    idCel.innerText = recado.id;

    //Criada nova celula para descrição do recado e adicionado no texto da celula
    const descriptionCel = document.createElement('td');
    descriptionCel.innerText = recado.description;

    //Criada nova celula para o detalhamento do recado e adicionado no texto da celula
    const detailCel = document.createElement('td');
    detailCel.innerHTML = recado.detail;

    //Criada nova celula para adicionar botões de editar e remover
    const btnCel = document.createElement('td');

    // Criado botao de editar
    const btnEdit = document.createElement('button');
    btnEdit.innerText = 'Edit';
    btnEdit.classList = ['btn btn-success'];

    //Criado botao de remover recado com texto Remove dentro
    const btnRemove = document.createElement('button');
    btnRemove.innerText = 'Remove';
    btnRemove.classList = ['btn btn-danger'];

    //adicionado evento de click no botao "remove" para executar a funcao de remover recado
    //criada mais abaixo recebendo o id do recado como parametro na criacao do botao
    btnRemove.addEventListener('click', () => {
      remove(recado.id);
    });

    //adicionado botões dentro da celula para o botao
    btnCel.appendChild(btnEdit);
    btnCel.appendChild(btnRemove);

    //adicionadas as celulas na linha, na ordem que devem aparecer no html
    tr.appendChild(idCel);
    tr.appendChild(descriptionCel);
    tr.appendChild(detailCel);
    tr.appendChild(btnCel);

    //adicinada linha na tabela dentro do html
    table.appendChild(tr);
  });
};

createTable(data.recados);

remove = (id) => {
  //Criado novo array para conter os recados que nao serao deletados
  const newRecadosArray = [];

  //Validacao para que quando recado nao tiver id igual ao id recebido no parametro da funcao,
  //seja adicionado no novo array de recados
  data.recados.forEach((recado) => {
    if (recado.id !== id) {
      recado.id = newRecadosArray.length + 1;
      newRecadosArray.push(recado);
    }
  });

  //Alterado array de recados para se tornar o array novo sem o recado deletado
  data.recados = newRecadosArray;

  //Recriacao da tabela com array de recados atualizado como parametro
  createTable(data.recados);
  localStorage.setItem('loggedUser', JSON.stringify(data));
};
