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
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

const editTask = function () {
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
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

const toggleTaskStatus = function (sourceHolder, destinationHolder, eventHandler) {
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
}

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".task__input_checkbox");
  const editButton = taskListItem.querySelector(".btn_edit");
  const deleteButton = taskListItem.querySelector(".btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

function bindEventsToChildren(holder, eventHandler) {
  Array.from(holder.children).forEach(child => bindTaskEvents(child, eventHandler));
}

bindEventsToChildren(incompleteTaskHolder, taskCompleted);
bindEventsToChildren(completedTasksHolder, taskIncomplete)