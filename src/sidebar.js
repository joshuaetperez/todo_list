import './style.css';
import {format} from "date-fns";

export default function displaySidebar() {
  const contentDiv = document.querySelector("#content");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");
  contentDiv.appendChild(containerDiv);

  const sidebarDiv = document.createElement("div");
  const taskList = document.createElement("ul");
  const groupList = document.createElement("ul");
  sidebarDiv.classList.add("sidebar");
  taskList.classList.add("task-list");
  groupList.classList.add("group-list");

  // Creates the tabs for taskList and groupList
  const todayTab = document.createElement("li");
  const monthTab = document.createElement("li");
  const allTasksTab = document.createElement("li");
  const addTaskTab = document.createElement("li");
  const groupsTab = document.createElement("li");
  const addGroupTab = document.createElement("li");
  addTaskTab.classList.add("add-tab");
  addGroupTab.classList.add("add-tab");
  addTaskTab.id = "add-task";
  addGroupTab.id = "add-group";

  todayTab.textContent = "Today";
  monthTab.textContent = "Month";
  allTasksTab.textContent = "All Tasks";
  addTaskTab.textContent = "Add Task";
  groupsTab.textContent = "Groups";
  addGroupTab.textContent = "Add Group";

  // Creates the form that appears when "Add Task" is clicked
  const taskFormDiv = document.createElement("div");
  const taskFormButtonDiv = document.createElement("div");
  const taskForm = document.createElement("form");
  const taskFormTitle = document.createElement("input");
  const taskFormDate = document.createElement("input");
  const taskFormGroup = document.createElement("input");
  const taskFormSubmit = document.createElement("input");
  const taskFormCancel = document.createElement("input");
  const todaysDate = format(new Date(), "yyyy-MM-dd");
  taskFormButtonDiv.classList.add("form-button-div");
  taskFormTitle.setAttribute("type", "text");
  taskFormDate.setAttribute("type", "date");
  taskFormGroup.setAttribute("type", "text");
  taskFormSubmit.setAttribute("type", "button");
  taskFormCancel.setAttribute("type", "button");
  taskFormDiv.classList.add("task-form-div");
  taskForm.id = "task-form";
  taskFormTitle.id = "ftitle-task";
  taskFormDate.id = "fdate-task";
  taskFormGroup.id = "fgroup-task";
  taskFormSubmit.id = "fsubmit-task";
  taskFormCancel.id = "fcancel-task";
  taskFormTitle.placeholder = "Title of Task";
  taskFormGroup.placeholder = "Group of Task (can be empty)";
  taskFormTitle.maxLength = 100;
  taskFormGroup.maxLength = 50;
  taskFormDate.min = todaysDate;
  taskFormTitle.required = true;
  taskFormDate.required = true;
  taskFormDate.value = todaysDate;
  taskFormSubmit.value = "Submit";
  taskFormCancel.value = "Cancel";

  // Creates the form that appears when "Add Group" is clicked
  const groupFormDiv = document.createElement("div");
  const groupFormButtonDiv = document.createElement("div");
  const groupForm = document.createElement("form");
  const groupFormTitle = document.createElement("input");
  const groupFormSubmit = document.createElement("input");
  const groupFormCancel = document.createElement("input");
  groupFormButtonDiv.classList.add("form-button-div");
  groupFormTitle.setAttribute("type", "text");
  groupFormSubmit.setAttribute("type", "button");
  groupFormCancel.setAttribute("type", "button");
  groupFormDiv.classList.add("group-form-div");
  groupForm.id = "group-form";
  groupFormTitle.id = "ftitle-group";
  groupFormSubmit.id = "fsubmit-group";
  groupFormCancel.id = "fcancel-group";
  groupFormTitle.placeholder = "Title of Group";
  groupFormTitle.maxLength = 50;
  groupFormTitle.required = true;
  groupFormSubmit.value = "Submit";
  groupFormCancel.value = "Cancel";

  // Adds an event listener to the "Add Task" button and the "Add Group" button which cau ses the form to appear
  addTaskTab.addEventListener("click", displayTaskForm);
  addGroupTab.addEventListener("click", displayGroupForm);

  // Adds an event listener to the "Submit" button which submit the form info and resets the form afterwards
  taskFormSubmit.addEventListener("click", taskSubmitEvent);
  groupFormSubmit.addEventListener("click", groupSubmitEvent);

  // Adds an event listener to the "Cancel" button hides the form
  taskFormCancel.addEventListener("click", taskCancelEvent);
  groupFormCancel.addEventListener("click", groupCancelEvent);

  // Appends all the elements to the sidebar section
  taskForm.appendChild(taskFormTitle);
  taskForm.appendChild(taskFormGroup);
  taskForm.appendChild(taskFormDate);
  taskFormButtonDiv.appendChild(taskFormSubmit);
  taskFormButtonDiv.appendChild(taskFormCancel);
  taskForm.appendChild(taskFormButtonDiv);
  taskFormDiv.appendChild(taskForm);

  groupForm.appendChild(groupFormTitle);
  groupFormButtonDiv.appendChild(groupFormSubmit);
  groupFormButtonDiv.appendChild(groupFormCancel);
  groupForm.appendChild(groupFormButtonDiv);
  groupFormDiv.appendChild(groupForm);

  taskList.appendChild(todayTab);
  taskList.appendChild(monthTab);
  taskList.appendChild(allTasksTab);
  taskList.appendChild(addTaskTab);
  taskList.appendChild(taskFormDiv);
  groupList.appendChild(groupsTab);
  groupList.appendChild(addGroupTab);
  groupList.appendChild(groupFormDiv);

  sidebarDiv.appendChild(taskList);
  sidebarDiv.appendChild(groupList);
  containerDiv.appendChild(sidebarDiv);
}

// Resets and hides the specified form (task/group)
function addTabReset(type) {
  if (type === "task") {
    const addTaskTab = document.querySelector("#add-task");
    const taskForm = document.querySelector("#task-form");
    addTaskTab.classList.remove("add-tab-border");
    taskForm.style.display = 'none';
    taskForm.reset();

    const todaysDate = format(new Date(), "yyyy-MM-dd");
    const taskFormDate = document.querySelector("#fdate-task");
    taskFormDate.value = todaysDate;
  }
  else if (type === "group") {
    const addGroupTab = document.querySelector("#add-group");
    const groupForm = document.querySelector("#group-form");
  
    addGroupTab.classList.remove("add-tab-border");
    groupForm.style.display = 'none';
    groupForm.reset();
  }
}

// When the "Add Task" button is pressed, display the form or hide the form if it is currently displayed
function displayTaskForm(e) {
  const taskForm = document.querySelector("#task-form");
  if (this.classList.contains("add-tab-border")) {
    addTabReset("task");
  }
  else {
    this.classList.add("add-tab-border");
    taskForm.style.display = 'flex'; 
  }
}

// When the "Add Group" button is pressed, display the form or hide the form if it is currently displayed
function displayGroupForm(e) {
  const groupForm = document.querySelector("#group-form");
  if (this.classList.contains("add-tab-border")) {
    addTabReset("group");
  }
  else {
    this.classList.add("add-tab-border");
    groupForm.style.display = 'flex'; 
  }
}

// When the "Submit" button in the "Add Task" section is pressed, submit the form info
function taskSubmitEvent(e) {
  const addTaskTab = document.querySelector("#add-task");
  const taskForm = document.querySelector("#task-form");
  const taskFormTitle = document.querySelector("#ftitle-task");

  // SUBMIT TASK INFO HERE

  taskFormTitle.value = "";
}

// When the "Submit" button in the "Add Group" section is pressed, submit the form info
function groupSubmitEvent(e) {
  const addTaskGroup = document.querySelector("#add-group");
  const groupForm = document.querySelector("#group-form");
  const groupFormTitle = document.querySelector("#ftitle-group");

  // SUBMIT GROUP INFO HERE

  groupFormTitle.value = "";
}

// When the "Cancel" button in the "Add Task" section is pressed, hide the form
function taskCancelEvent(e) {
  addTabReset("task");
}

// When the "Cancel" button in the "Add Group" section is pressed, hide the form
function groupCancelEvent(e) {
  addTabReset("group");
}