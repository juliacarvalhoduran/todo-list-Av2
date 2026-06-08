// ===========================
// SELEÇÃO DOS ELEMENTOS DO HTML
// ===========================
const inputTarefa = document.getElementById("novaTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaTarefas = document.getElementById("lista");

// Evento de clique no botão — usando função tradicional
btnAdicionar.addEventListener("click", adicionarTarefa);
// Botão limpar tudo
document.getElementById("btnLimpar").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja apagar todas as tarefas?")) {
    listaTarefas.innerHTML = "";
    localStorage.clear();
    atualizarContador();
    verificarListaVazia();
  }
});

// Permite adicionar tarefas pressionando Enter
inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});

// ===========================
// FUNÇÃO ADICIONAR (function tradicional)
// ===========================
function adicionarTarefa() {
  const texto = inputTarefa.value;

  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }

  const tarefa = {
    id: Date.now(),
    texto: texto
  };

  console.log(`Nova tarefa adicionada: ${tarefa.texto}`);

  criarCardNaTela(tarefa, true);
  inputTarefa.value = "";
  atualizarContador();
}

// ===========================
// FUNÇÃO CRIAR CARD (function tradicional)
// ===========================
function criarCardNaTela(tarefa, salvar) {
  const div = document.createElement("div");
  div.className = "card-item";

  // 1. Primeiro cria o HTML
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
  // Clicar no texto marca/desmarca a tarefa como concluída
const itemLi = div.querySelector(".item-list");
const checkbox = div.querySelector(".checkbox-concluir");
checkbox.addEventListener("change", () => {
  itemLi.classList.toggle("concluida");
  salvarNoLocalStorage();
});

  // 2. Depois pega os botões
  const btnDelete = div.querySelector(".btn-delete");
  const btnEdit = div.querySelector(".btn-edit");

  // Botão apagar — arrow function
  btnDelete.addEventListener("click", () => {
    listaTarefas.removeChild(div);
    salvarNoLocalStorage();
    atualizarContador();
    verificarListaVazia();
  });

  // Botão editar — arrow function
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

  // 3. Por último adiciona na tela
  listaTarefas.appendChild(div);

  if (salvar) {
    salvarNoLocalStorage();
  }

  verificarListaVazia();
}

// ===========================
// FUNÇÃO SALVAR NO LOCALSTORAGE (function tradicional)
// ===========================
function salvarNoLocalStorage() {
  const cards = listaTarefas.querySelectorAll(".card-item");
  const tarefas = [];

  // Arrow function no forEach
  cards.forEach((card) => {
    const texto = card.querySelector(".item-list").textContent;
    tarefas.push(texto);
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// ===========================
// FUNÇÃO CARREGAR DO LOCALSTORAGE (function tradicional)
// ===========================
function carregarDoLocalStorage() {
  const tarefasSalvas = localStorage.getItem("tarefas");

  if (tarefasSalvas) {
    const tarefas = JSON.parse(tarefasSalvas);

    // Arrow function no forEach
    tarefas.forEach((texto) => {
      const tarefa = {
        id: Date.now(),
        texto: texto
      };
      criarCardNaTela(tarefa, false);
    });
  }

  atualizarContador();
  verificarListaVazia();
}

// ===========================
// FUNÇÃO CONTADOR DE TAREFAS
// ===========================
function atualizarContador() {
  const cards = listaTarefas.querySelectorAll(".card-item");
  const total = cards.length;

  // Concatenação para montar o texto
  const contador = document.getElementById("contador");

  if (total === 0) {
    contador.textContent = "Nenhuma tarefa";
  } else if (total === 1) {
    contador.textContent = "1 tarefa";
  } else {
    contador.textContent = total + " tarefas";
  }
}
// ===========================
// FUNÇÃO MENSAGEM LISTA VAZIA
// ===========================
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

// Carrega as tarefas salvas ao abrir a página
carregarDoLocalStorage();