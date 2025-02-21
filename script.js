function carregarLista() {
    fetch('http://localhost:3000/itens') // Endpoint para buscar os itens
        .then(response => response.json())
        .then(data => {
            const lista = document.getElementById("lista-itens");
            lista.innerHTML = ""; // Limpa a lista antes de renderizar

            data.forEach(item => {
                const li = document.createElement("li"); // Criar um novo <li>
                li.textContent = item.nome;
                li.dataset.id = item.id; // Armazena o ID do item para referência

                // Criar botão de edição
                const botaoEdicao = document.getElementsByClassName(".edicao-item");
                botaoEdicao.addEventListener("click", function () {
                    editarItem(item.id, item.nome);
                });

                // Criar botão de exclusão
                const botaoExclusao = document.getElementsByClassName(".exclusao-item");
                botaoExclusao.addEventListener("click", function () {
                    exclusaoItem(item.id);
                });

                // Adicionar botões ao item da lista
                li.appendChild(botaoEdicao);
                li.appendChild(botaoExclusao);

                // Adicionar o item à lista
                lista.appendChild(li);
            });
        })
        .catch(error => console.error("Erro ao carregar lista:", error));
}


document.getElementById("lista-btn-add").addEventListener('click', function(){
    adicionaItem();
})
function adicionaItem(){
    const itemNovo = document.getElementById("input-lista").value
    if (!itemNovo) return alert("Digite um item válido!");

    fetch('http://localhost:3000/adicionar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemNovo })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Item adicionado com sucesso!");
    })
    .catch(error => console.error("Erro:", error));
}




function editarItem(id, nomeAtual) {
    const novoNome = prompt("Edite o item:", nomeAtual);
    if (!novoNome) return; // Se o usuário cancelar, não faz nada

    fetch(`http://localhost:3000/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Item atualizado com sucesso!");
        carregarLista(); // Atualiza a lista na tela
    })
    .catch(error => console.error("Erro ao editar item:", error));
}




function exclusaoItem(id) {
    if (!confirm("Tem certeza que deseja excluir este item?")) return;

    fetch(`http://localhost:3000/excluir/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Item excluído com sucesso!");
        carregarLista(); // Atualiza a lista na tela
    })
    .catch(error => console.error("Erro ao excluir item:", error));
}



document.addEventListener("DOMContentLoaded", carregarLista);