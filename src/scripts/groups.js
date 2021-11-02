import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks } from "./group.js";
import CurrentTab from "./current-tab.js";
import resetPage from "./reset-page.js";
import addTaskToPage from "./add-task-to-page.js";

// Sets up the "Groups" page
export default function displayGroups() {
  if (CurrentTab.getTab() === "Groups") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Groups");
  const CreatedGroupsArr = CreatedGroups.getArr();
  CreatedGroupsArr.forEach(group => {
    addGroupToPage(group);
    addAllTasksToGroupPage(group);
  });
}

// Adds a Group to the bottom of the "Groups" page
function addGroupToPage(group) {
  const groupName = group.getName();
  const containerDiv = document.querySelector(".main");
  const groupDiv = document.createElement("div");
  const groupNameDiv = document.createElement("div");
  const groupNameContainer = document.createElement("div");
  const groupTaskContainer = document.createElement("div");
  const groupDeleteIcon = document.createElement("button");
  groupDiv.classList.add("group-div");
  // groupNameContainer.classList.add("group-name-container");
  groupNameContainer.className = "unselectable group-name-container";
  groupTaskContainer.classList.add("group-task-container");
  groupNameDiv.classList.add("group-name");
  groupDeleteIcon.className = "remove material-icons";
  groupDeleteIcon.textContent = "delete";
  groupDeleteIcon.style.color = "grey";
  groupDiv.id = groupName;
  groupNameDiv.textContent = groupName;
  groupNameContainer.addEventListener("click", toggleGroupTaskList);

  groupNameContainer.appendChild(groupNameDiv);
  groupNameContainer.appendChild(groupDeleteIcon);
  groupDiv.appendChild(groupNameContainer);
  groupDiv.appendChild(groupTaskContainer);
  containerDiv.appendChild(groupDiv);
}

// Helper function that adds all the Tasks of a Group to a div
function addAllTasksToGroupPage(group) {
  const groupArr = group.getArr();
  const groupName = group.getName();
  const groupTaskContainer = document.querySelector(`#${groupName}`).lastChild;

  groupArr.forEach(task => addTaskToPage(task, groupTaskContainer, false));
}

// Adds the task to the bottom of the Tasks section of the Group it belongs to
function addTaskToGroupPage(task, group) {
  const groupName = group.getName();
  const groupTaskContainer = document.querySelector(`#${groupName}`).lastChild;

  addTaskToPage(task, groupTaskContainer, false);
}

// Clicking on the group div will show/hide its respective task list
function toggleGroupTaskList(e) {
  // Clicking on the "Trash" icon will not toggle the task list
  if (e.target.classList.contains("remove")) {
    return;
  }
  const groupTaskContainer = this.nextSibling;
  if (this.classList.contains("open-group-task-list")) {
    this.classList.remove("open-group-task-list");
    groupTaskContainer.style.display = "none";
  }
  else {
    this.classList.add("open-group-task-list");
    groupTaskContainer.style.display = "block";
  }
}

export { addGroupToPage, addTaskToGroupPage };