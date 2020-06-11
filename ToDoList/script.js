// Elementos de tela necessários
var listElement = document.querySelector('div#main ul');
var inputElement = document.querySelector('div#insert input');
var selectElement = document.querySelector('div#insert select');
var btnElement = document.querySelector('div#insert a');


// "Banco de Dados"
var id = 1;
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];
todos.map(todo => {
    if(todo.id > id){
        id = todo.id + 1;
    }
})

// FUNÇOES DA APLICAÇÃO

//Renderizar os ToDos
function renderTodos(){
    listElement.innerHTML = '';
    for (const todo of todos) {
        // Elementos de um  ToDo
        var itemElement = document.createElement('li');
        itemElement.id = todo.id;
        var textElement = document.createElement('span');
        var alertElement = document.createElement('span');
        var checkElement = document.createElement('a');
        var removeElement = document.createElement('a');
        checkElement.setAttribute('onclick', 'checkTodo('+ todo.id +')');
        removeElement.setAttribute('onclick', 'removeTodo('+ todo.id +')');

        //Textos de cada elemento
        var textItem = document.createTextNode(todo.todo);
        var valor;
        var estilo;

        if(todo.valorTodo == '3'){
            valor = 'Urgente';
            estilo = 'badge badge-pill badge-danger ml-3';
        }else{
            if(todo.valorTodo == '2'){
                valor = 'Normal';
                estilo = 'badge badge-pill badge-warning ml-3';
            }else{
                valor = 'Sem Pressa';
                estilo = 'badge badge-pill badge-success ml-3';
            }
        }
        if(todo.status == 1) valor = 'Feito';
        var textAlert = document.createTextNode(valor);

        textElement.appendChild(textItem);
        alertElement.appendChild(textAlert);

        //Botões
        var checkIcon = document.createElement('i');
        var removeIcon = document.createElement('i');

        // Estilização
        if(todo.status == 1) itemElement.className = 'list-group-item bg-success text-dark';
        else itemElement.className = 'list-group-item';

        if(todo.status == 1) alertElement.className = 'badge badge-pill ml-3 bg-dark text-light';
        else alertElement.className = estilo;

        if(todo.status == 1) checkElement.className = 'd-none';
        else checkElement.className = 'float-right text-success';

        if(todo.status == 1) removeElement.className = 'float-right mr-4 text-dark';
        else removeElement.className = 'float-right mr-4 text-danger';
        
        checkIcon.className = 'fas fa-check-circle';
        removeIcon.className = 'fas fa-trash';

        // Dar um pai a cada elemento filho
        checkElement.appendChild(checkIcon);
        removeElement.appendChild(removeIcon);

        itemElement.appendChild(textElement);
        itemElement.appendChild(alertElement);
        itemElement.appendChild(checkElement);
        itemElement.appendChild(removeElement);

        listElement.appendChild(itemElement);
    }
}

//Adicionar um ToDo
function addToDo(){
    if(inputElement.value == ''){
        alert("Insira uma atividade para o ToDo");
        return;
    }

    // Criando novo objeto
    var newTodo = {
        id,
        status: 0,
        todo: inputElement.value,
        valorTodo: selectElement.value
    }

    // Inserindo no "BD"
    todos.push(newTodo);

    //Alerta ao usuário e restart dos campos
    inputElement.value = '';

    renderTodos();
    saveToStorage();
    id++;
}
btnElement.onclick = addToDo;

//Remover ToDo
function removeTodo(identificador){
    if(!confirm("Deseja excluir essa atividade? Essa ação não pode ser desfeita!")) return;

    var pos = todos.findIndex(todo => todo.id == identificador);

    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

//Check ToDo
function checkTodo(identificador){
    todos.map(todo => {
        if(todo.id == identificador){
            todo.status = 1;
        }
    });
    renderTodos();
    saveToStorage();
}

//Salvando no Storage
function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
}

// ATIVIDADES DA APLICAÇÃO EM EXECUÇÃO
renderTodos();