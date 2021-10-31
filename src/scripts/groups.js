import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks } from "./group.js";
import CurrentTab from "./current-tab.js";
import resetPage from "./reset-page.js";
import addTaskToPage from "./add-task-to-page.js";

export default function displayGroups() {
  if (CurrentTab.getTab() === "Groups") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Groups");
  const CreatedGroupsArr = CreatedGroups.getArr();
  CreatedGroupsArr.forEach(group => addGroupToPage(group));
}

// Adds a group to the bottom of the "Groups" page
function addGroupToPage(group) {
  const containerDiv = document.querySelector(".main");
  const groupDiv = document.createElement("div");
  // const rightSideDiv = document.createElement("div");
  const groupName = document.createElement("div");
  // const removeButton = document.createElement('button');
  groupDiv.classList.add("task-div");
  // rightSideDiv.classList.add("right-side-div");
  groupName.textContent = group.getName();

  // removeButton.className = 'remove material-icons';
  // removeButton.textContent = 'close';

  // rightSideDiv.appendChild(groupDueDate);
  // rightSideDiv.appendChild(removeButton);

  groupDiv.appendChild(groupName);
  // groupDiv.appendChild(rightSideDiv);
  containerDiv.appendChild(groupDiv);
}

export { addGroupToPage };