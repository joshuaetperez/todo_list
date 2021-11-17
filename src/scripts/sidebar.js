import "../style.css";
import {addDays, format, isWithinInterval, parseISO, startOfToday} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks, TodaysTasks, Next7DaysTasks } from "./group.js";
import { addGroupToPage, addTaskToGroupPage, insertDirectToAddTaskFormDiv } from "./groups-page.js";
import addTaskToPage from "./add-task-to-page.js";
import {CurrentTab, displayAllTasks, displayToday, displayNext7Days, displayGroups} from "./tab-pages.js";

export default function displaySidebar() {
  const contentDiv = document.querySelector("#content");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");
  contentDiv.appendChild(containerDiv);

  const sidebarDiv = document.createElement("div");
  const taskList = document.createElement("ul");
  const groupList = document.createElement("ul");
  sidebarDiv.className = "sidebar unselectable";
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

  // Invisible form field so that the pressing "Enter" on the "Add Groups" form does not submit the form and refresh the page
  const bogusFormField = document.createElement("input");
  bogusFormField.setAttribute("type", "text");
  bogusFormField.style.display = "none";

  // Adds an event listener to the "Add Task" button and the "Add Group" button which cau ses the form to appear
  addTaskTab.addEventListener("click", displayTaskForm);
  addGroupTab.addEventListener("click", displayGroupForm);

  // Adds an event listener to the "Submit" button which submit the form info and resets the form afterwards
  taskFormSubmit.addEventListener("click", taskSubmitEvent);
  groupFormSubmit.addEventListener("click", groupSubmitEvent);

  // Adds an event listener to the "Cancel" button hides the form
  taskFormCancel.addEventListener("click", () => addTabReset("task"));
  groupFormCancel.addEventListener("click", () => addTabReset("group"));

  // Adds an event listener to the form fields that submits the form when "Enter" is pressed
  taskFormName.addEventListener("keyup", submitWithEnter);
  taskFormGroup.addEventListener("keyup", submitWithEnter);
  taskFormDate.addEventListener("keyup", submitWithEnter);
  groupFormName.addEventListener("keyup", submitWithEnter);

  // Adds an event listener to the "Today", "Next 7 Days", "All Tasks", and "Group" tabs that open their respective pages
  allTasksTab.addEventListener("click", () => displayAllTasks());
  todayTab.addEventListener("click", () => displayToday());
  next7DaysTab.addEventListener("click", () => displayNext7Days());
  groupsTab.addEventListener("click", () => displayGroups());

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
  groupForm.appendChild(bogusFormField);
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

// Resets and hides the specified form
// Input: "task" or "group"
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
    const groupFormName = document.querySelector("#fname-group");
  
    addGroupTab.classList.remove("add-tab-border");
    groupForm.style.display = 'none';
    groupForm.reset();
    groupFormName.placeholder = "Name of Group";
  }
}

// Change color of "Add Task"/"Add Group" tab and form to red for a moment
// Input: "task" or "group"
function alertSubmitError(type) {
  let addTab;
  let form;
  if (type === "task") {
    addTab = document.querySelector("#add-task");
    form = document.querySelector("#task-form");
  }
  else if (type === "group") {
    addTab = document.querySelector("#add-group");
    form = document.querySelector("#group-form");
  }
  addTab.classList.add("missing-name-field");
  form.classList.add("missing-name-field");
  setTimeout(function() { 
    addTab.classList.remove("missing-name-field");
    form.classList.remove("missing-name-field");
  }, 500);
}

// When the "Add Task" button is pressed, display the form or hide the form if it is currently displayed
function displayTaskForm(e) {
  if (this.classList.contains("add-tab-border")) {
    addTabReset("task");
  }
  else {
    const taskForm = document.querySelector("#task-form");
    const taskFormName = document.querySelector("#fname-task");
    this.classList.add("add-tab-border");
    taskForm.style.display = 'flex'; 
    taskFormName.focus();
  }
}

// When the "Add Group" button is pressed, display the form or hide the form if it is currently displayed
function displayGroupForm(e) {
  if (this.classList.contains("add-tab-border")) {
    addTabReset("group");
  }
  else {
    const groupForm = document.querySelector("#group-form");
    const groupFormName = document.querySelector("#fname-group");
    this.classList.add("add-tab-border");
    groupForm.style.display = 'flex'; 
    groupFormName.focus();
  }
}

// When the "Submit" button in the "Add Task" section is pressed, submit the form info
function taskSubmitEvent(e) {
  const containerDiv = document.querySelector(".main");
  const taskFormName = document.querySelector("#fname-task");
  const taskFormDate = document.querySelector("#fdate-task");
  const taskFormGroup = document.querySelector("#fgroup-task");
  const taskName = taskFormName.value;
  const groupName = taskFormGroup.value;

  // If task name field is empty, signal error and return
  if (taskName === "") {
    alertSubmitError("task");
    taskFormName.placeholder = "Must include a Task name";
    return;
  }

  // If the Group already exists, signal error and return
  const isTaskDuplicate = AllTasks.isDuplicate(taskName, groupName);
  if (isTaskDuplicate) {
    alertSubmitError("task");
    taskFormName.placeholder = "Task already exists";
    taskFormName.value = "";
    return;
  }

  // Create the task
  const newTaskDateString = parseISO(taskFormDate.value);
  const newTask = Task(taskName, "", newTaskDateString);

  // If the user has input a group name, insert the task to the associated Group
  if (groupName !== "") {
    // If the group already exists, just insert the task in the group
    let taskGroup;
    const groupIndex = CreatedGroups.getGroupIndex(groupName);
    if (groupIndex > -1) {
      taskGroup = CreatedGroups.getArr()[groupIndex];
      taskGroup.pushTask(newTask);
    }
    // Else, create a new Group to insert the Task in and insert the Group in CreatedGroups
    else {
      taskGroup = Group(groupName);
      taskGroup.pushTask(newTask);
      CreatedGroups.pushGroup(taskGroup);
      if (CurrentTab.getTab() === "Groups") {
        addGroupToPage(taskGroup);
        insertDirectToAddTaskFormDiv(groupName);
      }
    }
    newTask.setGroupName(groupName);
    if (CurrentTab.getTab() === "Groups") addTaskToGroupPage(newTask, taskGroup);
  }

  // Insert the Task to the AllTasks group
  AllTasks.pushTask(newTask);
  if (CurrentTab.getTab() === "All Tasks") addTaskToPage(newTask, containerDiv);

  // If the Task due date is within the next 7 days, insert the Task to the Next7DaysTasks Group
  const todaysDate = startOfToday();
  const SevenDaysFromNowDate = addDays(todaysDate, 6);
  if (isWithinInterval(parseISO(taskFormDate.value), {start: todaysDate, end: SevenDaysFromNowDate})) {
    Next7DaysTasks.pushTask(newTask);
    if (CurrentTab.getTab() === "Next 7 Days") addTaskToPage(newTask, containerDiv);
  }

  // If the Task due date is today, insert the Task to the TodaysTasks Group
  const todaysDateString = format(new Date(), "MM/dd/yyyy");
  if (newTask.getDueDateString() === todaysDateString) {
    TodaysTasks.pushTask(newTask);
    if (CurrentTab.getTab() === "Today") addTaskToPage(newTask, containerDiv);
  }

  taskFormName.placeholder = "Name of Task";
  taskFormName.value = "";
  taskFormName.focus();
}

// When the "Submit" button in the "Add Group" section is pressed, submit the form info
function groupSubmitEvent(e) {
  const groupFormName = document.querySelector("#fname-group");
  const groupName = groupFormName.value;

  // If group name field is empty, signal error and return
  if (groupName === "") {
    alertSubmitError("group");
    groupFormName.placeholder = "Must include a Group name";
    return;
  }

  // If the Group already exists, signal error and return
  const groupIndex = CreatedGroups.getGroupIndex(groupName);
  if (groupIndex > -1) {
    alertSubmitError("group");
    groupFormName.placeholder = "Group already exists";
    groupFormName.value = "";
    return;
  }
  // Else, create a new Group to insert in CreatedGroups
  else {
    const taskGroup = Group(groupName);
    CreatedGroups.pushGroup(taskGroup);
    if (CurrentTab.getTab() === "Groups") {
      addGroupToPage(taskGroup);
      insertDirectToAddTaskFormDiv(groupName);
    }
  }

  groupFormName.placeholder = "Name of Group";
  groupFormName.value = "";
  groupFormName.focus();
}

// When the user presses the "Enter" key while on one of the form fields, the form will submit
function submitWithEnter(e) {
  if (e.keyCode === 13) {
    const formID = this.parentNode.id;
    if (formID === "task-form") {
      document.querySelector("#fsubmit-task").click();
    }
    else if (formID === "group-form") {
      document.querySelector("#fsubmit-group").click();
    }
  }
};