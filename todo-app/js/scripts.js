const buttonNew = document.getElementById("button-new");
const buttonTheme = document.getElementById("button-theme");
const stackTodo = document.getElementById("stack-todo");
const stackList = document.getElementById("stack-list");
const stackControl = document.getElementById("stack-control");
const selectorCategory = document.getElementById("select-category");
const categoryAll = document.getElementById("category-all");
const categoryActive = document.getElementById("category-active");
const categoryCompleted = document.getElementById("category-completed");
const inputTodo = document.getElementById("input-todo");
const itemsLeft = document.getElementById("items-left");
const modalWindow = document.getElementById("modal-window");
const modalConfirmButton = document.getElementById("modal-button-confirm");
const modalCancelButton = document.getElementById("modal-button-cancel");
const modalMessage = document.getElementById("modal-message");
const modalIcon = document.getElementById("modal-icon");

// Variables para trabajar con los datos de la base indexada
let todoData = [];
let maxPriority = 0;
let todoName = "";

const localStorage = window.localStorage;
window.addEventListener("load", () => {
  localStorage.getItem("theme")
    ? setTheme(localStorage.getItem("theme"))
    : localStorage.setItem("theme", "light");
});

buttonTheme.addEventListener("click", () => {
  buttonTheme.classList.contains("component__button-theme--active")
    ? setTheme("light")
    : setTheme("dark");
});

buttonNew.addEventListener("click", (e) => {
  todoName = inputTodo.value;
  addNewTodo(todoName.trim());
});

inputTodo.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    todoName = inputTodo.value;
    addNewTodo(todoName.trim());
  }
});

selectorCategory.addEventListener("click", (e) => {
  switch (e.target.dataset.category) {
    case "all":
      changeTodoCategory("all");
      break;
    case "active":
      changeTodoCategory("active");
      break;
    case "completed":
      changeTodoCategory("completed");
      break;
  }
  fillTodoData();
});

stackTodo.addEventListener("click", (e) => {
  switch (e.target.dataset.type) {
    case "check":
      setTodoState(e.target.parentNode, e.target.dataset.key);
      break;
    case "delete":
      deleteTodo(e.target.parentNode, e.target.dataset.key);
      break;
    case "clear":
      let completed = 0;
      for (let item of todoData) {
        if (item.taskState == "completed") {completed++}
      }
      if (completed != 0) {showModalWindow("Do you want to delete completed tasks?", "question");}
      else {showModalWindow("No completed tasks.", "alert");}
      break;
  }
});

let dragEnterElementId = "";
let dragStartElementId = "";
stackList.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  dragStartElementId = e.dataTransfer.getData("text");
  let dragNode = document.getElementById(dragStartElementId);
  dragNode.classList.add("todo--selected");
});

stackList.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (stackList.childNodes.length > 1) {
    let cursorPosition = getMousePosition(e);
    let rect = stackList.getBoundingClientRect();
    if (cursorPosition.x < rect.left || cursorPosition.x > rect.right || cursorPosition.y > rect.bottom) {
      stackList.lastChild.classList.remove("todo--reference-last");
    }
  }
});

stackList.addEventListener("dragenter", (e) => {
  e.preventDefault();
  if (e.target.dataset.type == "todo") {
    dragEnterElementId = e.target.id;
  } else if (e.target.class == "stack") {
  } else {
    dragEnterElementId = e.target.parentNode.id;
  }
  // Se agrega el estilo para indicar que se desea cambiar un nodo al final de la lista
  if ((e.target.id == "stack-list") && (stackList.childNodes.length > 1) && (stackList.lastChild.id != dragStartElementId)) {
    stackList.lastChild.classList.add("todo--reference-last");
  } else {
    stackList.lastChild.classList.remove("todo--reference-last");
  }
});

stackList.addEventListener("dragend", (e) => {
  e.preventDefault();
  if (stackList.childNodes.length > 1) {
    stackList.lastChild.classList.remove("todo--reference-last");
  }
});

stackList.addEventListener("dragover", (e) => {
  e.preventDefault();
});

stackList.addEventListener("drop", (e) => {
  e.preventDefault();
  stackList.childNodes.forEach(child => child.classList.remove("todo--selected"))
  if (stackList.childNodes.length > 0)  {
    stackTodo.setAttribute("data-priority", parseInt(stackList.lastChild.dataset.priority) + 1);
    const id = e.dataTransfer.getData("text");
    const newNode = document.getElementById(id);
    let referenceNode = document.getElementById(dragEnterElementId);
    /* En este if se comprueba que los elementos tengan diferente o igual prioridad, de esta 
    forma se garantiza que solo se realice la actualización de prioridades solo si hay cambio 
    en el orden de las tareas */
  
    if (newNode.id != referenceNode.id) {
      // A portir de este caso se debe realizar la actualización de las prioridades
      const transaction = db.transaction(["todoList"], "readwrite");
      const objectStore = transaction.objectStore("todoList");
      const request = objectStore.openCursor();
      request.onsuccess = (e) => {
        const cursor = e.target.result; 
        if (cursor) {
          let item = cursor.value;
          if (parseInt(newNode.dataset.priority) < parseInt(referenceNode.dataset.priority)) {
            if (item.taskTitle == newNode.id) {
            item.taskPriority = parseInt(referenceNode.dataset.priority) - 1;
            objectStore.put(item);
            }
            if (item.taskTitle != newNode.id) {
              if (item.taskPriority > parseInt(newNode.dataset.priority) && item.taskPriority < parseInt(referenceNode.dataset.priority)) {
                item.taskPriority -= 1;
                objectStore.put(item);
              }
            }
          } else if (parseInt(newNode.dataset.priority) > parseInt(referenceNode.dataset.priority)) {
            if (item.taskTitle == newNode.id) {
              item.taskPriority = parseInt(referenceNode.dataset.priority);
              objectStore.put(item);
            }
            if (item.taskTitle != newNode.id) {
              if (item.taskPriority < parseInt(newNode.dataset.priority) && item.taskPriority >= parseInt(referenceNode.dataset.priority)) {
                item.taskPriority += 1;
                objectStore.put(item);
              }
            }
          }
          cursor.continue();
        } else {
          fillTodoData();
        }
      }
    }
    referenceNode.classList.remove("todo--reference");
  }
});

const indexedDB = window.indexedDB;
let db;
if (indexedDB) {
  const request = indexedDB.open("todoAppDB", 1);
  request.onsuccess = () => {
    db = request.result;
    fillTodoData();
  };
  request.onupgradeneeded = (e) => {
    db = e.target.result;
    const objectStore = db.createObjectStore("todoList", {
      keyPath: "taskTitle",
    });
  };
  request.onerror = (error) => {
    console.log("Error", error);
  };
}

const fillTodoData = () => {
  todoData = [];
  maxPriority = 0;
  const categoryElement = document.getElementsByClassName("component__category--active")[0];
  if (categoryElement.dataset.category == "all") {
    state = ["active", "completed"];
  } else if (categoryElement.dataset.category == "active") {
    state = ["active"];
  } else if (categoryElement.dataset.category == "completed") {
    state = ["completed"];
  }
  const transaction = db.transaction(["todoList"], "readonly");
  const objectStore = transaction.objectStore("todoList");
  const request = objectStore.openCursor();
  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      todoData.push(cursor.value);
      if (cursor.value.taskPriority > maxPriority)
        maxPriority = cursor.value.taskPriority;
      cursor.continue();
    } else {
      todoData.sort( (a, b) => {
        if (a.taskPriority < b.taskPriority) { return -1 }
        else if (a.taskPriority > b.taskPriority) { return 1 }
        else { return 0}
      });
      fillStackList(state);
    }
  };
};

const getMousePosition = (event) => {
  return {
    x: event.clientX,
    y: event.clientY
  }
}

const fillStackList = (state) => {
  const fragment = document.createDocumentFragment();
  stackList.textContent = "";
  for (let item of todoData) {
    if (state.includes(item.taskState)) {
      const todoContainer = document.createElement("DIV");
      const todoText = document.createElement("P");
      const buttonCheck = document.createElement("BUTTON");
      const buttonDelete = document.createElement("BUTTON");

      todoContainer.className = "todo";
      todoText.className = "todo__text";
      buttonCheck.classList = ["todo__button todo__button--check"];
      buttonDelete.classList = ["todo__button todo__button--delete"];
      todoText.textContent = item.taskTitle;
      buttonCheck.dataset.type = "check";
      buttonCheck.dataset.key = item.taskTitle;
      buttonCheck.setAttribute("aria-label", "check task");
      buttonDelete.dataset.type = "delete";
      buttonDelete.dataset.key = item.taskTitle;
      buttonDelete.setAttribute("aria-label", "delete task");
      todoContainer.appendChild(buttonCheck);
      todoContainer.appendChild(todoText);
      todoContainer.appendChild(buttonDelete);
      todoContainer.setAttribute("draggable", "true");
      todoContainer.setAttribute("data-type", "todo");
      todoContainer.setAttribute("id", item.taskTitle);
      todoContainer.setAttribute("data-state", item.taskState);
      todoContainer.setAttribute("data-priority", item.taskPriority);

      todoContainer.addEventListener("dragenter", (e) => {
        e.preventDefault();
        stackList.childNodes.forEach(child => child.classList.remove("todo--reference"))
        let rect = todoContainer.getBoundingClientRect();
        let positionMouse = getMousePosition(e);
        if (positionMouse.y < rect.bottom || positionMouse.y > rect.top) {
          todoContainer.classList.add("todo--reference");
        }
        if (dragStartElementId == todoContainer.id) {todoContainer.classList.remove("todo--reference")}
        if (todoContainer.previousSibling) {
          if (todoContainer.previousSibling.id == dragStartElementId) {
            todoContainer.classList.remove("todo--reference");
          }
        }
      });

      todoContainer.addEventListener("dragleave", (e) => {
        e.preventDefault();
        let rect = todoContainer.getBoundingClientRect();
        let positionMouse = getMousePosition(e);
        if (positionMouse.y > rect.bottom || positionMouse.y < rect.top || positionMouse.x < rect.left || positionMouse.x > rect.right) {
          todoContainer.classList.remove("todo--reference");
        }
      });

      fragment.appendChild(todoContainer);
      if (item.taskState == "completed") {
        todoContainer.classList.add("todo--checked");
      }
    }
  }
  stackList.appendChild(fragment);
  setItemsLeft();
};

const addNewTodo = (todo) => {
  if (todo != "") {
    let data = {
      taskTitle: todo,
      taskState: "active",
      taskPriority: maxPriority + 1,
    };
    const transaction = db.transaction(["todoList"], "readwrite");
    const objectStore = transaction.objectStore("todoList");
    const request = objectStore.add(data);
    request.onsuccess = () => {
      changeTodoCategory("active");
      fillTodoData();
      inputTodo.value = "";
      todoName = "";
    };
    request.onerror = (e) => {
      showModalWindow("The task already exists", "alert");
    };
  } else {
    showModalWindow("Title cannot be empty", "alert");
  }
};

/* Se modifica la prioridad en la lista de los elementos siguientes al 
que se elimina restando a una unidad cada uno */
const deleteTodo = (todo, key) => {
  let todoReference = todoData.find(item => item.taskTitle == key);
  const transaction = db.transaction(["todoList"], "readwrite");
  const objectStore = transaction.objectStore("todoList");
  const request = objectStore.openCursor();
  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      item = cursor.value;
      if (item.taskPriority > todoReference.taskPriority) {
        item.taskPriority = item.taskPriority -= 1;
        const request = objectStore.put(item);
      }
      cursor.continue();
    } else {
      const deleteRequest = objectStore.delete(key);
      deleteRequest.onsuccess = () => {fillTodoData()}
    }
  }
};

const clearCompleted = () => {
  const transaction = db.transaction(["todoList"], "readwrite");
  const objectStore = transaction.objectStore("todoList");
  const request = objectStore.openCursor();
  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.taskState == "completed") {
        objectStore.delete(cursor.value.taskTitle);
      }
      cursor.continue();
    } else {
      fillTodoData();
    }
  }
};

const setTodoState = (todoContainer, key) => {
  const transaction = db.transaction(["todoList"], "readwrite");
  const objectStore = transaction.objectStore("todoList");
  const getRequest = objectStore.get(key);
  getRequest.onsuccess = () => {
    let data = getRequest.result;
    todoContainer.classList.contains("todo--checked")
      ? (todoContainer.classList.remove("todo--checked"),
        (data.taskState = "active"))
      : (todoContainer.classList.add("todo--checked"),
        (data.taskState = "completed"));
    const putRequest = objectStore.put(data);
    putRequest.onsuccess = () => {
      setItemsLeft();
      fillTodoData();
    };
  };
};

const setItemsLeft = () => {
  const transaction = db.transaction(["todoList"], "readonly");
  const objectStore = transaction.objectStore("todoList");
  const request = objectStore.openCursor();
  let numberItems = 0;
  request.onsuccess = (e) => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.taskState == "active") {
        numberItems++;
      }
      cursor.continue();
    }
    itemsLeft.textContent = "";
    itemsLeft.textContent = numberItems;
  };
};

const changeTodoCategory = (category) => {
  switch (category) {
    case "all":
      categoryAll.classList.add("component__category--active");
      categoryActive.classList.remove("component__category--active");
      categoryCompleted.classList.remove("component__category--active");
      break;
    case "active":
      categoryAll.classList.remove("component__category--active");
      categoryActive.classList.add("component__category--active");
      categoryCompleted.classList.remove("component__category--active");
      break;
    case "completed":
      categoryAll.classList.remove("component__category--active");
      categoryActive.classList.remove("component__category--active");
      categoryCompleted.classList.add("component__category--active");
      break;
  }
};

const setTheme = (value) => {
  switch (value) {
    case "light":
      buttonTheme.classList.remove("component__button-theme--active");
      document.body.classList.remove("theme--dark");
      localStorage.setItem("theme", "light");
      break;

    case "dark":
      buttonTheme.classList.add("component__button-theme--active");
      document.body.classList.add("theme--dark");
      localStorage.setItem("theme", "dark");
      break;
  }
};

// Configuraciones para la ventana modal 

modalConfirmButton.addEventListener("click", () => {
  if (modalConfirmButton.dataset.action == "clear-completed") { clearCompleted() }
  modalWindow.classList.remove("modal--active");
  inputTodo.focus();
});

modalCancelButton.addEventListener("click", () => {
  modalWindow.classList.remove("modal--active");
  inputTodo.focus();
})

modalWindow.addEventListener("click", (e) => {
  if (e.target.dataset.modal != "content") {
    modalWindow.classList.remove("modal--active");
    inputTodo.focus();
  }
});

const showModalWindow = (message, type) => {
  modalMessage.textContent = message;
  modalConfirmButton.focus();
  switch (type) {
    case "alert":
      modalIcon.setAttribute("src", "assets/images/alert.svg");
      modalConfirmButton.setAttribute("data-action", "confirm");
      modalConfirmButton.style.display = "block";
      modalCancelButton.style.display = "none";
      break;
    case "question":
      modalIcon.setAttribute("src", "assets/images/question.svg");
      modalConfirmButton.setAttribute("data-action", "clear-completed");
      modalConfirmButton.style.display = "block";
      modalCancelButton.style.display = "block";
      break;
  }
  modalWindow.classList.add("modal--active");
}
