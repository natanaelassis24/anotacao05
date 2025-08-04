// seleciona a nossa ul com a lista de tarefas no HTML
const tarefas = document.getElementById("listaTarefas");

// URL correta da sua API
const API_URL = "https://crudcrud.com/api/37e5331553564acca6f144f2933ba743/tarefas";

// faz uma requisição GET para buscar todas as tarefas
fetch(API_URL)
.then(resposta => resposta.json()) // converte o corpo da resposta em JSON
.then((listaDeTarefas) => {
    // itera sobre cada tarefa do array
    listaDeTarefas.forEach(tarefa => {
        // cria um novo elemento de lista (<li>) para cada tarefa
        const item = document.createElement("li");
        item.innerHTML = `${tarefa.descricao} <button>x</button>`;
        tarefas.appendChild(item);
    });
});

// adiciona uma nova tarefa ao clicar no botão
document.getElementById("add").addEventListener("click", () => {
    const descricao = document.getElementById("tarefa").value;

    if (!descricao.trim()) return; // evita enviar tarefa vazia

    fetch("https://crudcrud.com/api/37e5331553564acca6f144f2933ba743/tarefas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ descricao })
    })
    .then(resposta => resposta.json())
    .then(tarefa => {
        const item = document.createElement("li");
        item.innerHTML = `${tarefa.descricao} <button>x</button>`;
        tarefas.appendChild(item);
        document.getElementById("tarefa").value = ""; // limpa o campo
    });
});
