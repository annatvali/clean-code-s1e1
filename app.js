const taskInput = document.querySelector(".task-entry__input");
const addButton = document.querySelectorAll(".btn")[0];
const incompleteTaskHolder = document.querySelector(".incomplete-task__list");
const completedTasksHolder = document.querySelector(".completed-task__list");

function createElement(type, className, innerText) {
  const element = document.createElement(type);
  element.className = className;
  if (innerText) element.innerText = innerText;
  return element;
}

const createNewTaskElement = function (taskString) {
  const listItem = createElement("li", "task__item");
  const checkBox = createElement("input", "task__input task__input_checkbox");
  const label = createElement("label", "task__name", taskString);
  const editInput = createElement("input", "task__input task__input_text");
  const editButton = createElement("button", "btn btn_edit", "Edit");
  const deleteButton = createElement("button", "btn btn_delete");
  const deleteButtonImg = createElement("img", "btn-img");

  checkBox.type = "checkbox";
  editInput.type = "text";

  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.setAttribute("alt", "remove icon");
  deleteButton.appendChild(deleteButtonImg);

  [checkBox, label, editInput, editButton, deleteButton].forEach(function (element) {
    listItem.appendChild(element);
  });

  return listItem;
}

const addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

const editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = this.parentNode;
  const editInput = listItem.querySelector(".task__input_text");
  const label = listItem.querySelector(".task__name");
  const editBtn = listItem.querySelector(".btn_edit");
  const isEditMode = listItem.classList.contains("task__item_edit");

  const text = isEditMode ? editInput.value : label.innerText;
  const buttonText = isEditMode ? "Edit" : "Save";

  if (isEditMode) {
    label.innerText = text;
  } else {
    editInput.value = text;
  }

  editBtn.innerText = buttonText;
  listItem.classList.toggle("task__item_edit");
};

const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const toggleTaskStatus = function (sourceHolder, destinationHolder, eventHandler) {
  console.log("Toggle Task Status...");

  const listItem = this.parentNode;
  sourceHolder.removeChild(listItem);
  destinationHolder.appendChild(listItem);
  bindTaskEvents(listItem, eventHandler);
}

const taskCompleted = function () {
  toggleTaskStatus.call(this, incompleteTaskHolder, completedTasksHolder, taskIncomplete);
}

const taskIncomplete = function () {
  toggleTaskStatus.call(this, completedTasksHolder, incompleteTaskHolder, taskCompleted);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = function () {
  addTask();
  ajaxRequest();
};

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".task__input_checkbox");
  const editButton = taskListItem.querySelector(".btn_edit");
  const deleteButton = taskListItem.querySelector(".btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

function bindEventsToChildren(holder, eventHandler) {
  for (let i = 0; i < holder.children.length; i++) {
    bindTaskEvents(holder.children[i], eventHandler);
  }
}

bindEventsToChildren(incompleteTaskHolder, taskCompleted);
bindEventsToChildren(completedTasksHolder, taskIncomplete);