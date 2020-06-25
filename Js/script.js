//Referenciar o input
let input = document.querySelector('input[name = tarefa]');
//Referenciar o button-cadastrar
let btn = document.querySelector('#botao');
//Referenciar a lista
let lista = document.querySelector('#lista');
//let card
let card = document.querySelector('.card');

/*
Lista de tarefas será representada em um array
*/
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    //limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';
for(tarefa of tarefas){
    //Criando o item da lista
    let itemLista = document.createElement('li');

    //Adicionar as classes ao item criado
    itemLista.setAttribute('class', 'list-group-item list-group-item-action');

    //Adicionar evento de click no item da lista
    itemLista.onclick = function(){
        deletarTarefa(this);
    }

    //criar um texto
    let itemTexto = document.createTextNode(tarefa);

    //Adicionar o texto no item da lista
    itemLista.appendChild(itemTexto);

    //adicionar o item da lista na lista
    lista.appendChild(itemLista);
    
}
}
//Executando a função para renderizar as tarefas
renderizarTarefas();


// Precisamos "escutar" o evento do clique do botão
btn.onclick = function(){
// Precisamos Capturar o valor digitado pelo usuário no input
        let novaTarefa = input.value;

    if(novaTarefa !== ""){        
        //Precisamos atualizar a nova tarefa na lista(array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);
        renderizarTarefas();
        //limpar o input
        input.value = '';
        //limpar mensagens de erro (spans)
        removerSpans();
        salvarDadosNoStorage();
    } else {
        removerSpans();
        
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');
        let msg = document.createTextNode('Você precisa informar a tarefa!');
        span.appendChild(msg);
        card.appendChild(span);

    }
    

}

//função para remover  a mensagem de erro - spans
function removerSpans(){
    let spans = document.querySelectorAll('span');  
    
    for(let i = 0 ; i < spans.length; i++){
        card.removeChild(spans[i]);
        }
    
    }


function deletarTarefa(tar){
    
    //remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);
    //renderizar novamente a tela
    renderizarTarefas();

    //salva os novos dados no banco de daddos
    salvarDadosNoStorage();

}


function salvarDadosNoStorage(){
    //todo navegador web possui essa capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

