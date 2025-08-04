const tarefas = document.getElementById("listaTarefas");
const API_URL = "https://crudcrud.com/api/37e5331553564acca6f144f2933ba743/tarefas";

// Cria e exibe uma tarefa na lista
function adicionarItemNaTela(tarefa) {
  const item = document.createElement("li");

  item.innerHTML = `
    ${tarefa.descricao} 
    <button>x</button>
  `;

  const botao = item.querySelector("button");

  // Deleta da API e da tela
  botao.addEventListener("click", () => {
    fetch(`${API_URL}/${tarefa._id}`, {
      method: "DELETE"
    })
    .then(() => {
      tarefas.removeChild(item);
    });
  });

  tarefas.appendChild(item);
}

// Carrega tarefas salvas na API
fetch(API_URL)
  .then(resposta => resposta.json())
  .then((listaDeTarefas) => {
    listaDeTarefas.forEach(adicionarItemNaTela);
  });

// Adiciona nova tarefa ao clicar no botão
document.getElementById("add").addEventListener("click", () => {
  const descricao = document.getElementById("tarefa").value.trim();

  if (!descricao) return;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ descricao })
  })
    .then(resposta => resposta.json())
    .then((novaTarefa) => {
      adicionarItemNaTela(novaTarefa);
      document.getElementById("tarefa").value = "";
    });
});
