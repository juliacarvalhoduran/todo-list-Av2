// pegando os elementos do HTML pelo id
const inputTarefa = document.getElementById("novaTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("lista");

// quando clicar no botão adicionar, chama a função
btnAdicionar.addEventListener("click", adicionarTarefa);

// quando clicar em limpar tudo, pede confirmação e apaga tudo
document.getElementById("btnLimpar").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todas as tarefas?")) {
    listaTarefas.innerHTML = "";
    localStorage.clear();
    atualizarContador();
    verificarListaVazia();
  }
});

// quando pressionar Enter no input, também adiciona a tarefa
inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});

// função que adiciona uma nova tarefa na lista
function adicionarTarefa() {
  const texto = inputTarefa.value;

  // se o campo estiver vazio, avisa e para
  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  // cria um objeto com id único e o texto digitado
  const tarefa = {
    id: Date.now(),
    texto: texto
  };

  // mostra no console usando interpolação
  console.log(`Nova tarefa adicionada: ${tarefa.texto}`);

  criarCardNaTela(tarefa, true);
  inputTarefa.value = ""; // limpa o campo após adicionar
  atualizarContador();
}

// função que cria o card visualmente na página
function criarCardNaTela(tarefa, salvar) {
  const div = document.createElement("div");
  div.className = "card-item";

  // monta o html do card usando interpolação
  div.innerHTML = `
    <div class="item-content">
      <input type="checkbox" class="checkbox-concluir">
      <li class="item-list">${tarefa.texto}</li>
    </div>
    <div class="btns-item">
      <button class="btn-edit">Editar</button>
      <button class="btn-delete">Apagar</button>
    </div>
  `;

  // pega o texto e o checkbox do card
  const itemLi = div.querySelector(".item-list");
  const checkbox = div.querySelector(".checkbox-concluir");

  // restaura o estado de concluída se estava marcada
  if (tarefa.concluida) {
    checkbox.checked = true;
    itemLi.classList.add("concluida");
  }

  // ao marcar o checkbox, risca o texto da tarefa
  checkbox.addEventListener("change", () => {
    itemLi.classList.toggle("concluida");
    salvarNoLocalStorage();
  });

  // pega os botões só depois de criar o html
  const btnDelete = div.querySelector(".btn-delete");
  const btnEdit = div.querySelector(".btn-edit");

  // ao clicar em apagar, remove o card da tela
  btnDelete.addEventListener("click", () => {
    listaTarefas.removeChild(div);
    salvarNoLocalStorage();
    atualizarContador();
    verificarListaVazia();
  });

  // ao clicar em editar, vira um input para digitar
  // ao clicar em salvar, salva o novo texto
  btnEdit.addEventListener("click", () => {
    const itemLi = div.querySelector(".item-list");
    if (btnEdit.textContent === "Salvar") {
      itemLi.textContent = itemLi.querySelector("input").value;
      btnEdit.textContent = "Editar";
      salvarNoLocalStorage();
    } else {
      const valorAtual = itemLi.textContent;
      itemLi.innerHTML = `<input type="text" value="${valorAtual}">`;
      btnEdit.textContent = "Salvar";
    }
  });

  // adiciona o card na lista da tela
  listaTarefas.appendChild(div);

  // só salva no localstorage se não estiver carregando
  if (salvar) {
    salvarNoLocalStorage();
  }

  verificarListaVazia();
}

// salva todas as tarefas no localstorage
function salvarNoLocalStorage() {
  const cards = listaTarefas.querySelectorAll(".card-item");
  const tarefas = [];

  // percorre cada card e salva o texto e se está concluída
  cards.forEach((card) => {
    const texto = card.querySelector(".item-list").textContent;
    const concluida = card.querySelector(".checkbox-concluir").checked;
    tarefas.push({ texto, concluida });
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// carrega as tarefas salvas quando a página abre
function carregarDoLocalStorage() {
  const tarefasSalvas = localStorage.getItem("tarefas");

  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);

    tarefas.forEach((item) => {
      const tarefa = {
        id: Date.now(),
        texto: item.texto,
        concluida: item.concluida
      };
      criarCardNaTela(tarefa, false);
    });
  }

  atualizarContador();
  verificarListaVazia();
}

// atualiza o contador de tarefas no header
function atualizarContador() {
  const cards = listaTarefas.querySelectorAll(".card-item");
  const total = cards.length;
  const contador = document.getElementById("contador");

  // concatenação para montar o texto do contador
  if (total === 0) {
    contador.textContent = "Nenhuma tarefa";
  } else if (total === 1) {
    contador.textContent = "1 tarefa";
  } else {
    contador.textContent = total + " tarefas";
  }
}

// mostra mensagem quando a lista está vazia
function verificarListaVazia() {
  const cards = listaTarefas.querySelectorAll(".card-item");
  const mensagemExistente = document.getElementById("mensagemVazia");

  if (cards.length === 0) {
    if (!mensagemExistente) {
      const mensagem = document.createElement("p");
      mensagem.id = "mensagemVazia";
      mensagem.textContent = "Nenhuma tarefa adicionada ainda!";
      listaTarefas.appendChild(mensagem);
    }
  } else {
    if (mensagemExistente) {
      listaTarefas.removeChild(mensagemExistente);
    }
  }
}

// inicia carregando as tarefas salvas
carregarDoLocalStorage();