#  To Do List — CRUD com LocalStorage

> Projeto desenvolvido como 2ª Avaliação da disciplina **Código de Alta Performance Web** — UNI7

---

## Preview

<p align="center">
  <img src="assets/preview.png" width="700"/>
</p>

---

##  Tecnologias

<p>
  <img alt="HTML" src="https://img.shields.io/badge/html-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/>
  <img alt="CSS" src="https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white"/>
  <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img alt="LocalStorage" src="https://img.shields.io/badge/LocalStorage-607D8B?style=for-the-badge&logoColor=white"/>
</p>

---

## Funcionalidades (CRUD)

| Operação | Descrição |
|---|---|
| **Criar** | Adicionar tarefas pelo campo de texto e botão Adicionar ou pressionando Enter |
| **Listar** | Visualizar todas as tarefas adicionadas na tela |
| **Atualizar** | Editar o texto de qualquer tarefa pelo botão Editar |
| **Remover** | Apagar uma tarefa individualmente ou limpar todas de uma vez |

---

##  Diferenciais 

| Funcionalidade | Descrição |
|---|---|
|  Marcar como concluída | Checkbox que risca a tarefa quando marcada |
| Contador de tarefas | Header exibe quantas tarefas estão na lista |
|  Lista vazia | Exibe mensagem quando não há tarefas cadastradas |
|  Limpar tudo | Apaga todas as tarefas com confirmação |
| Persistência | Dados salvos no LocalStorage — não somem ao fechar o navegador |
|  Atalho Enter | Pressionar Enter no campo adiciona a tarefa diretamente |

---

##  Conceitos de JavaScript aplicados

| Conceito | Onde aparece |
|---|---|
| `const` | Declaração de todas as variáveis |
| Template Literals | `innerHTML` e `console.log` com interpolação |
| Arrow Function `=>` | Eventos e forEach (sintaxe moderna ES6) |
| Function tradicional | Funções principais da aplicação |
| Array | Lista de tarefas salvas no LocalStorage |
| `forEach` | Percorrer cards ao salvar e carregar |
| Concatenação `+` | Montagem do texto do contador |
| Manipulação do DOM | `createElement`, `appendChild`, `removeChild` |
| LocalStorage | `setItem`, `getItem`, `JSON.stringify`, `JSON.parse` |

---

##  Estrutura dos arquivos

```
📁 projeto/
├── 📁 assets/
│   └── preview.png
├── index.html
├── style.css
├── codigoaula.js
└── README.md
```

---

##  Informações acadêmicas

| | |
|---|---|
| **Nome** | Julia Duran |
| **Matrícula** | 56054513 |
| **E-mail** | 56054513@sempreuni7.com.br |
| **Instituição** | Universidade 7 de Setembro |
| **Disciplina** | Código de Alta Performance Web |
| **Professor** | Ronaldo Cysne |
| **Data de entrega** | 08/06/2026 |