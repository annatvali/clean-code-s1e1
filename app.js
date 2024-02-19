var taskInput=document.querySelector(".task-entry__input");
var addButton=document.querySelectorAll(".btn")[0];
var incompleteTaskHolder=document.querySelector(".incomplete-task__list");
var completedTasksHolder=document.querySelector(".completed-task__list");

var createNewTaskElement=function(taskString){
  var listItem=document.createElement("li");
  listItem.className="task__item";

  var checkBox=document.createElement("input");
  var label=document.createElement("label");

  var editInput=document.createElement("input");
  var editButton=document.createElement("button");

  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  label.innerText=taskString;
  label.className="task__name";

  checkBox.type="checkbox";
  checkBox.className="task__input task__input_checkbox";
  editInput.type="text";
  editInput.className="task__input task__input_text";

  editButton.innerText="Edit";
  editButton.className="btn btn_edit";

  deleteButton.className="btn btn_delete";
  deleteButtonImg.className = "btn-img";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.setAttribute("alt","remove icon");
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask=function(){
  console.log("Add Task...");

  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";
}

var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem=this.parentNode;
  var editInput=listItem.querySelector(".task__input_text");
  var label=listItem.querySelector(".task__name");
  var editBtn=listItem.querySelector(".btn_edit");
  var containsClass=listItem.classList.contains("task__item_edit");

  if(containsClass){
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  listItem.classList.toggle("task__item_edit");
};

var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted=function(){
  console.log("Complete Task...");

  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete=function(){
  console.log("Incomplete Task...");

  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");

  var checkBox=taskListItem.querySelector(".task__input_checkbox");
  var editButton=taskListItem.querySelector(".btn_edit");
  var deleteButton=taskListItem.querySelector(".btn_delete");

  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}