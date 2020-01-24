// Elementos necessários
var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var toDos = JSON.parse(localStorage.getItem("list_todos")) || [];

// Funcionalidades
function renderTodos(){
    listElement.innerHTML = "";
    for( toDo of toDos){
        // Criando Elementos necessários
        var todoElement = document.createElement("li");
        var todoText = document.createTextNode(toDo);
        
        var linkElement = document.createElement("a");
        var linkText = document.createTextNode(" Feito");
        
        linkElement.setAttribute("href", "#");
        
        // Identificando cada To Do
        var pos = toDos.indexOf(toDo);

        linkElement.setAttribute("onclick","removeTodos("+ pos +")");
        
        // Adicionando Elementos
        linkElement.appendChild(linkText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);

        listElement.appendChild(todoElement);
    }
}

function addTodo(){
    // Obtendo valor do input
    var todoText = inputElement.value;

    // Adicionando novo toDo
    toDos.push(todoText);
    // Resetando o input
    inputElement.value = "";
    renderTodos();
    saveToStorage();
}

function removeTodos(pos){
    toDos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem("list_todos", JSON.stringify(toDos));
}

// Código para inicialização da aplicação
renderTodos();

buttonElement.onclick = addTodo;
