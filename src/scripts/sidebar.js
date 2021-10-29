import '../style.css';
import {addDays, format, isWithinInterval, parseISO, startOfToday} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks, TodaysTasks, Next7DaysTasks } from './group.js';
import displayAllTasks from "./all-tasks.js";
import displayToday from './today.js';
import displayNext7Days from './next-7-days.js';

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
  const next7DaysTab = document.createElement("li");
  const allTasksTab = document.createElement("li");
  const addTaskTab = document.createElement("li");
  const groupsTab = document.createElement("li");
  const addGroupTab = document.createElement("li");
  addTaskTab.classList.add("add-tab");
  addGroupTab.classList.add("add-tab");
  addTaskTab.id = "add-task";
  addGroupTab.id = "add-group";

  todayTab.textContent = "Today";
  next7DaysTab.textContent = "Next 7 Days";
  allTasksTab.textContent = "All Tasks";
  addTaskTab.textContent = "Add Task";
  groupsTab.textContent = "Groups";
  addGroupTab.textContent = "Add Group";

  // Creates the form that appears when "Add Task" is clicked
  const taskFormDiv = document.createElement("div");
  const taskFormButtonDiv = document.createElement("div");
  const taskForm = document.createElement("form");
  const taskFormName = document.createElement("input");
  const taskFormDate = document.createElement("input");
  const taskFormGroup = document.createElement("input");
  const taskFormSubmit = document.createElement("input");
  const taskFormCancel = document.createElement("input");
  const todaysDate = format(new Date(), "yyyy-MM-dd");
  taskFormButtonDiv.classList.add("form-button-div");
  taskFormName.setAttribute("type", "text");
  taskFormDate.setAttribute("type", "date");
  taskFormGroup.setAttribute("type", "text");
  taskFormSubmit.setAttribute("type", "button");
  taskFormCancel.setAttribute("type", "button");
  taskFormDiv.classList.add("task-form-div");
  taskForm.id = "task-form";
  taskFormName.id = "fname-task";
  taskFormDate.id = "fdate-task";
  taskFormGroup.id = "fgroup-task";
  taskFormSubmit.id = "fsubmit-task";
  taskFormCancel.id = "fcancel-task";
  taskFormName.placeholder = "Name of Task";
  taskFormGroup.placeholder = "Group of Task (can be empty)";
  taskFormName.maxLength = 100;
  taskFormGroup.maxLength = 50;
  taskFormDate.min = todaysDate;
  taskFormName.required = true;
  taskFormDate.required = true;
  taskFormDate.value = todaysDate;
  taskFormSubmit.value = "Submit";
  taskFormCancel.value = "Cancel";

  // Creates the form that appears when "Add Group" is clicked
  const groupFormDiv = document.createElement("div");
  const groupFormButtonDiv = document.createElement("div");
  const groupForm = document.createElement("form");
  const groupFormName = document.createElement("input");
  const groupFormSubmit = document.createElement("input");
  const groupFormCancel = document.createElement("input");
  groupFormButtonDiv.classList.add("form-button-div");
  groupFormName.setAttribute("type", "text");
  groupFormSubmit.setAttribute("type", "button");
  groupFormCancel.setAttribute("type", "button");
  groupFormDiv.classList.add("group-form-div");
  groupForm.id = "group-form";
  groupFormName.id = "fname-group";
  groupFormSubmit.id = "fsubmit-group";
  groupFormCancel.id = "fcancel-group";
  groupFormName.placeholder = "Name of Group";
  groupFormName.maxLength = 50;
  groupFormName.required = true;
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

  // Adds an event listener to the "Today", "Next 7 Days", "All Tasks", and "Group" tabs that open their respective pages
  allTasksTab.addEventListener("click", allTasksTabEvent);
  todayTab.addEventListener("click", todayTabEvent);
  next7DaysTab.addEventListener("click", next7DaysTabEvent);

  // Creates the main section (the container that holds the content to the right of the sidebar)
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("main"); 

  // Appends all the elements to the sidebar section
  taskForm.appendChild(taskFormName);
  taskForm.appendChild(taskFormGroup);
  taskForm.appendChild(taskFormDate);
  taskFormButtonDiv.appendChild(taskFormSubmit);
  taskFormButtonDiv.appendChild(taskFormCancel);
  taskForm.appendChild(taskFormButtonDiv);
  taskFormDiv.appendChild(taskForm);

  groupForm.appendChild(groupFormName);
  groupFormButtonDiv.appendChild(groupFormSubmit);
  groupFormButtonDiv.appendChild(groupFormCancel);
  groupForm.appendChild(groupFormButtonDiv);
  groupFormDiv.appendChild(groupForm);

  taskList.appendChild(todayTab);
  taskList.appendChild(next7DaysTab);
  taskList.appendChild(allTasksTab);
  taskList.appendChild(addTaskTab);
  taskList.appendChild(taskFormDiv);
  groupList.appendChild(groupsTab);
  groupList.appendChild(addGroupTab);
  groupList.appendChild(groupFormDiv);

  sidebarDiv.appendChild(taskList);
  sidebarDiv.appendChild(groupList);
  containerDiv.appendChild(sidebarDiv);
  containerDiv.appendChild(mainDiv);
}

// Resets and hides the specified form (task/group)
function addTabReset(type) {
  if (type === "task") {
    const addTaskTab = document.querySelector("#add-task");
    const taskForm = document.querySelector("#task-form");
    const taskFormName = document.querySelector("#fname-task");
    addTaskTab.classList.remove("add-tab-border");
    taskForm.style.display = 'none';
    taskForm.reset();
    taskFormName.placeholder = "Name of Task";

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
  const taskFormName = document.querySelector("#fname-task");
  const taskFormDate = document.querySelector("#fdate-task");
  const taskFormGroup = document.querySelector("#fgroup-task");

  // If task name field is empty, signal error and do nothing
  if (taskFormName.value === "") {
    addTaskTab.classList.add("missing-name-field");
    taskForm.classList.add("missing-name-field");
    setTimeout(function() { 
      addTaskTab.classList.remove("missing-name-field");
      taskForm.classList.remove("missing-name-field");
    }, 500);
    taskFormName.placeholder = "Must include a Task name";
    return;
  }

  const newTaskDateString = format(parseISO(taskFormDate.value), "MM/dd/yyyy");
  const newTask = Task(taskFormName.value, "", newTaskDateString);

  // If the user has input a group, insert the task to the associated Group
  if (taskFormGroup.value !== "") {
    // Still need to check if group exists and stuff
    // If is does NOT exist, create it and push it in CreatedGroups

    const newGroup = Group(taskFormGroup.value);
    newGroup.pushTask(newTask);
    newTask.setGroupName(newGroup.getName());
    CreatedGroups.pushGroup(newGroup);
  }
  AllTasks.pushTask(newTask);

  // If the task due date is within the next 7 days, insert the task to the Next7DaysTasks Group
  const todaysDate = startOfToday();
  const SevenDaysFromNowDate = addDays(todaysDate, 6);
  console.log(SevenDaysFromNowDate);
  if (isWithinInterval(parseISO(taskFormDate.value), {start: todaysDate, end: SevenDaysFromNowDate})) {
    Next7DaysTasks.pushTask(newTask);
  }

  // If the task due date is today, insert the task to the TodaysTasks Group
  const todaysDateString = format(new Date(), "MM/dd/yyyy");
  if (newTask.getDueDate() === todaysDateString) {
    TodaysTasks.pushTask(newTask);
  }

  taskFormName.placeholder = "Name of Task";
  taskFormName.value = "";
}

// When the "Submit" button in the "Add Group" section is pressed, submit the form info
function groupSubmitEvent(e) {
  const addTaskGroup = document.querySelector("#add-group");
  const groupForm = document.querySelector("#group-form");
  const groupFormName = document.querySelector("#fname-group");

  // SUBMIT GROUP INFO HERE

  groupFormName.value = "";
}

// When the "Cancel" button in the "Add Task" section is pressed, hide the form
function taskCancelEvent(e) {
  addTabReset("task");
}

// When the "Cancel" button in the "Add Group" section is pressed, hide the form
function groupCancelEvent(e) {
  addTabReset("group");
}

// When the "All Tasks" button is pressed, call the "all-tasks" module
function allTasksTabEvent(e) {
  displayAllTasks();
}

// When the "All Tasks" button is pressed, call the "today" module
function todayTabEvent() {
  displayToday();
}

// When the "Next 7 days" button is pressed, call the "today" module
function next7DaysTabEvent() {
  displayNext7Days();
}