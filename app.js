const input = document.getElementById("todo-input");
const userName = document.getElementById("name");
const submit = document.getElementById("submit-btn");
const todoList = document.getElementById("todo-ul");
const erreurText = document.querySelector(".error");
const buttons = document.getElementsByClassName("btn")
const checkBtn = document.getElementsByClassName("check-btn");
const deleteBtn = document.getElementsByClassName("delete-btn");

document.addEventListener("DOMContentLoaded", () => {
    getName();
    getTodos()
});

//Get the todos in Storage
    function getTodos() {
      let todos;
      if (localStorage.getItem("todos") === null) {
        todos = [];
      } else {
          todos = JSON.parse(localStorage.getItem("todos"));
          for (let h = 0; h < todos.length; h++){
              createTodo(todos[h])
          }
      }
    }

//Save the todos list
function saveTodo(todo) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos= []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}


//On loading, get the user's name and the todo list
function getName() {
  userName.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      e.preventDefault();
      localStorage.setItem("username", e.target.textContent);
      input.focus();
    }
  });
  userName.addEventListener("blur", (e) => {
    if (e) {
      localStorage.setItem("username", e.target.textContent);
    }
  });

  //on load
  if (localStorage.getItem("username")) {
    let named = localStorage.getItem("username");
    userName.textContent = named;
  } else {
    userName.textContent = "[Enter your Name here]";
  }
}

//Submit a todo
submit.addEventListener("click", (e) => {
  e.preventDefault();
  let todo = input.value;
  if (!todo) {
    erreurText.classList.remove("hidden");
  } else if (!todo.replace(/\s/g, "").length) {
    erreurText.innerHTML = "Can't add an only spaces todo!";
    erreurText.classList.remove("hidden");
  } else if (todo.length > 80) {
    erreurText.innerHTML = "Your todo is too long !!";
    erreurText.classList.remove("hidden");
  } else {
    if (!erreurText.classList.contains("hidden")) {
      erreurText.classList.add("hidden");
    }
      saveTodo(todo)
      createTodo(todo);
  }
});

//Create a todo element in the list
function createTodo(todo) {
  //Create a new li
  let newTodoLi = document.createElement("li");
  let newTodo = todoList.appendChild(newTodoLi);
  newTodo.classList.add("todo-element");

  //Select the new todo
  let selectedTodo = document.getElementsByClassName("todo-element");
  let lastTodo = selectedTodo[selectedTodo.length - 1];

  //Add the todo-content div
  let newContentDiv = document.createElement("div");
  let contentDiv = lastTodo.appendChild(newContentDiv);
  contentDiv.classList.add("todo-content");
  contentDiv.textContent = todo;

  //Add the icons div
  let newIconDiv = document.createElement("div");
  let iconDiv = lastTodo.appendChild(newIconDiv);
  iconDiv.classList.add("icons");

  //Check button
  let newCheckImage = document.createElement("img");
  let newCheckButton = document.createElement("button");
  let checkButton = iconDiv.appendChild(newCheckButton);
    checkButton.classList.add("check-btn", "btn");
    checkFn(checkButton)
  let checkImage = checkButton.appendChild(newCheckImage);
  checkImage.src = "./svg/check.svg";
  checkImage.classList.add("icon-img");

  //Delete button
  let newDeleteImage = document.createElement("img");
  let newDeleteButton = document.createElement("button");
  let deleteButton = iconDiv.appendChild(newDeleteButton);
    deleteButton.classList.add("delete-btn", "btn");
    deleteFn(deleteButton)
  let deleteImage = deleteButton.appendChild(newDeleteImage);
  deleteImage.src = "./svg/bin.svg";
  deleteImage.classList.add("icon-img");
   
  input.value = "";
}

 // Check  a todo
function checkFn(button) {
    let parents = button.parentElement.parentElement
    button.addEventListener("click", e => {
        e.preventDefault()
        if (!parents.classList.contains("checked")) {
            parents.classList.add("checked")
        } else {
            parents.classList.remove("checked")
        }
    })
}

//Delete a todo
function deleteFn(button) {
    let parents = button.parentElement.parentElement
    button.addEventListener("click", e => {
        e.preventDefault()
        let text = parents.firstChild.textContent
        let todos = JSON.parse(localStorage.getItem("todos"))
        let index = todos.indexOf(text)
        todos.splice(index, 1)
        localStorage.setItem("todos",JSON.stringify(todos))
        parents.remove()
    })
}



