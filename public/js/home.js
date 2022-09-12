// coletar informações da sessão
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');
// identificar os inputs
let description = document.getElementById('descriptionInput');
let detail = document.getElementById('detailInput');
// botão salvar recado
const btnSave = document.getElementById('saveButton');
// array de usuarios cadastrados
const users = JSON.parse(localStorage.getItem('usersStorage'));
// array com os dados do usuário logado
let data = JSON.parse(localStorage.getItem('loggedUser'));
// flag para começar uma edição de recado
let editOn = false;

// função chamada para verificar estado de login e carregar dados do usuário ativo
checklogged();

//Criada função de logout
function logout() {
  if (editOn) {
    alert('Finalize a edição atual antes de continuar!');
    return;
  } else {
    // Definir posição do usuário ativo dentro do array de usuarios cadastrados
    let activeUserPosition;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === data.email) {
        activeUserPosition = i;
      }
    }
    // salvar alterações feitas nos recados antes de sair
    users[activeUserPosition].recados = data.recados;
    localStorage.setItem('usersStorage', JSON.stringify(users));

    // apagar os dados da sessão ativa
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');
    localStorage.removeItem('loggedUser');

    // retornar a pagina inicial
    window.location.href = 'index.html';
  }
}

// função replicada do index para verificar se o usuario está logado
function checklogged() {
  if (session) {
    sessionStorage.setItem('logged', session);
    logged = session;
  }

  if (!logged) {
    window.location.href = 'index.html';
    return;
  }

  // carregar os recados do usuario dentro do array de usuarios cadastrados
  let activeUserPosition;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === data.email) {
      activeUserPosition = i;
    }
  }
  data.recados = users[activeUserPosition].recados;
}

btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  newErrand();
});

// salvar novo recado
function newErrand() {
  if (editOn) {
    alert('Finalize a edição atual antes de continuar!');
    return;
  } else {
    let errand = {
      id: data.recados.length + 1,
      detail: detail.value,
      description: description.value,
    };
    data.recados.push(errand);
    createTable(data.recados);
    description.value = '';
    detail.value = '';
    localStorage.setItem('loggedUser', JSON.stringify(data));
  }
}

// moldar tabela de acordo com os recados dentro do array de recados
createTable = (recadosArray) => {
  //Pega corpo da tabela no html pelo DOM
  const table = document.getElementsByTagName('tbody')[0];

  //Limpeza do corpo da tabela
  table.innerHTML = '';
  // para cada recados cria uma linha
  recadosArray.forEach((recado) => {
    //Criada nova linha
    const tr = document.createElement('tr');
    tr.id = `line-${recado.id}`;

    //Criada nova celula para id do recado e adicionado id no texto da celula
    const idCel = document.createElement('td');
    idCel.classList = [`line-${recado.id}`];
    idCel.innerText = recado.id;

    //Criada nova celula para descrição do recado e adicionado no texto da celula
    const descriptionCel = document.createElement('td');
    descriptionCel.classList = [`line-${recado.id}`];
    descriptionCel.innerText = recado.description;

    //Criada nova celula para o detalhamento do recado e adicionado no texto da celula
    const detailCel = document.createElement('td');
    detailCel.classList = [`line-${recado.id}`];
    detailCel.innerHTML = recado.detail;

    //Criada nova celula para adicionar botões de editar e remover
    const btnCel = document.createElement('td');
    btnCel.classList = [`line-${recado.id}`];

    // Criado botao de editar
    const btnEdit = document.createElement('button');
    btnEdit.innerText = 'Edit';
    btnEdit.classList = ['btn btn-success'];
    //adicionado evento de click no botao "edit" para executar a funcao de editar recado
    //criada mais abaixo recebendo o id do recado como parametro na criacao do botao
    btnEdit.addEventListener('click', () => {
      edit(recado.id);
    });

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

// criar tabela caso o array de recados já tenha dados ao carregar a pagina
createTable(data.recados);

// função para remover recados
remove = (id) => {
  if (editOn) {
    alert('Finalize a edição atual antes de continuar!');
    return;
  } else {
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
  }

  //Alterado array de recados para se tornar o array novo sem o recado deletado
  data.recados = newRecadosArray;

  //Recriacao da tabela com array de recados atualizado como parametro
  createTable(data.recados);
  localStorage.setItem('loggedUser', JSON.stringify(data));
};

function edit(id) {
  if (editOn) {
    alert('Finalize a edição atual antes de continuar!');
    return;
  } else {
    editOn = true;
    let editLineId = `line-${id}`;
    let editLine = document.getElementById(editLineId);
    let values = document.getElementsByClassName(editLineId);
    let editedId = values[0].innerHTML;
    let editedDescription = values[1].innerHTML;
    let editedDetail = values[2].innerHTML;
    editLine.innerHTML = '';

    const idCel = document.createElement('td');
    idCel.innerText = id;
    editLine.appendChild(idCel);

    const descriptionCel = document.createElement('td');
    const descriptionIpt = document.createElement('input');
    descriptionIpt.id = 'editDescription';
    descriptionIpt.type = 'text';
    descriptionIpt.value = editedDescription;
    descriptionIpt.placeholder = 'Digite a nova descrição';
    descriptionCel.appendChild(descriptionIpt);
    editLine.appendChild(descriptionCel);

    const detailCel = document.createElement('td');
    const detailIpt = document.createElement('input');
    detailIpt.id = 'editDetail';
    detailIpt.type = 'text';
    detailIpt.value = editedDetail;
    detailIpt.placeholder = 'Digite o novo detalhamento';
    detailCel.appendChild(detailIpt);
    editLine.appendChild(detailCel);

    const btnCel = document.createElement('td');
    const btnSave = document.createElement('button');
    btnSave.innerText = 'Salvar';
    btnSave.classList = ['btn btn-primary'];
    btnSave.addEventListener('click', () => {
      saveEdit(id);
    });
    btnCel.appendChild(btnSave);
    editLine.appendChild(btnCel);

    descriptionIpt.focus();
  }
}

function saveEdit(id) {
  let editLineId = `line-${id}`;
  let editLine = document.getElementById(editLineId);
  let editDescription = document.getElementById('editDescription');
  let editDetail = document.getElementById('editDetail');
  let position;

  let editedErrand = {
    id: id,
    detail: editDetail.value,
    description: editDescription.value,
  };

  data.recados.forEach((recado) => {
    if (recado.id == id) {
      recado = editedErrand;
      data.recados[id - 1] = recado;
    }
  });
  editOn = false;
  localStorage.setItem('loggedUser', JSON.stringify(data));
  createTable(data.recados);
}
