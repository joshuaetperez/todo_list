import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks } from "./group.js";
import CurrentTab from "./current-tab.js";
import resetPage from "./reset-page.js";
import addTaskToPage from "./add-task-to-page.js";

// Sets up the "Groupss" page
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
  const groupTaskContainer = document.createElement("div");
  groupDiv.classList.add("group-div");
  groupTaskContainer.classList.add("group-task-container");
  groupDiv.id = groupName;
  groupNameDiv.textContent = groupName;

  groupDiv.appendChild(groupNameDiv);
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

export { addGroupToPage, addTaskToGroupPage };