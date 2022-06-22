window.addEventListener("load", () => {
  todoLists = JSON.parse(localStorage.getItem("todoLists")) || [];
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || "";

  nameInput.value = username;

  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newList = { title: e.target.elements.title.value };
    todoLists.push(newList);
    localStorage.setItem("todoLists", JSON.stringify(todoLists));

    // Reset the form
    e.target.reset();

    DisplayTodoLists();
  });

  DisplayTodoLists();
});

function DisplayTodoLists() {
  const todoListsDiv = document.querySelector(".todo-list");
  todoListsDiv.innerHTML = "";

  todoLists.forEach((todolist) => {
    const list = document.createElement("div");
    list.classList.add("list");

    const title = document.createElement("h3");
    const header = document.createElement("div");
    const action = document.createElement("div");
    const newTodo = document.createElement("div");
    const todoForm = document.createElement("form");
    const todoName = document.createElement("input");
    const addTodo = document.createElement("button");
    const deleteList = document.createElement("button");

    header.classList.add("list-header");
    deleteList.classList.add("delete");
    addTodo.classList.add("add");
    action.classList.add("actions");
    todoForm.classList.add("list-input");
    todoForm.classList.add("todoForm");
    todoName.classList.add("td-name");

    addTodo.type = "submit";
    todoName.type = "text";
    todoName.name = "content";
    todoName.placeholder = "e.g. Buy Milk";
    title.innerHTML = todolist.title;
    deleteList.innerHTML = "Delete";
    addTodo.innerHTML = "Add";

    todoForm.appendChild(todoName);
    todoForm.appendChild(addTodo);
    newTodo.appendChild(todoForm);
    action.appendChild(deleteList);
    header.appendChild(title);
    header.appendChild(action);
    list.appendChild(header);

    listTodos = todos.filter((td) => td.title == todolist.title);
    listTodos.forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const label = document.createElement("label");
      const input = document.createElement("input");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");

      input.type = "checkbox";
      input.checked = todo.done;
      content.classList.add("todo-content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");

      content.innerHTML = `<input class="pip" type="text" value="${todo.content}" readonly>`;
      edit.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";

      label.appendChild(input);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      list.appendChild(todoItem);

      if (todo.done) {
        todoItem.classList.add("done");
      }
      input.addEventListener("change", (e) => {
        todo.done = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (todo.done) {
          todoItem.classList.add("done");
        } else {
          todoItem.classList.remove("done");
        }

        DisplayTodoLists();
      });
      edit.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          DisplayTodoLists();
        });
      });
      deleteButton.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodoLists();
      });
    });

    list.appendChild(newTodo);
    todoListsDiv.appendChild(list);

    deleteList.addEventListener("click", (e) => {
      todoLists = todoLists.filter((t) => t != todolist);
      todos = todos.filter((t) => t.title != todolist.title);
      localStorage.setItem("todoLists", JSON.stringify(todoLists));
      DisplayTodoLists();
    });

    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const todo = {
        title: todolist.title,
        content: e.target.elements.content.value,
        done: false,
        createdAt: new Date().getTime(),
      };

      todos.push(todo);

      localStorage.setItem("todos", JSON.stringify(todos));

      // Reset the form
      e.target.reset();

      DisplayTodoLists();
    });
  });
}
