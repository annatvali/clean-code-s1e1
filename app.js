const taskInput = document.querySelector(".task-entry__input");
const addButton = document.querySelectorAll(".btn")[0];
const incompleteTaskHolder = document.querySelector(".incomplete-task__list");
const completedTasksHolder = document.querySelector(".completed-task__list");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.className = "task__item";

  const checkBox = document.createElement("input");
  const label = document.createElement("label");

  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task__name";

  checkBox.type = "checkbox";
  checkBox.className = "task__input task__input_checkbox";
  editInput.type = "text";
  editInput.className = "task__input task__input_text";

  editButton.innerText = "Edit";
  editButton.className = "btn btn_edit";

  deleteButton.className = "btn btn_delete";
  deleteButtonImg.className = "btn-img";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.setAttribute("alt", "remove icon");
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
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
  const containsClass = listItem.classList.contains("task__item_edit");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task__item_edit");
};

const deleteTask = function () {
  console.log("Delete Task...");

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

const taskCompleted = function () {
  console.log("Complete Task...");

  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
  console.log("Incomplete Task...");

  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest = function () {
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  const checkBox = taskListItem.querySelector(".task__input_checkbox");
  const editButton = taskListItem.querySelector(".btn_edit");
  const deleteButton = taskListItem.querySelector(".btn_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}