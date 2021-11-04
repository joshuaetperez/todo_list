import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js"
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
  groupNameDiv.textContent = groupName;
  groupNameContainer.addEventListener("click", toggleGroupTaskList);
  groupDeleteIcon.addEventListener("click", deleteGroup);

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
  const groupTaskContainer = getGroupTaskContainer(groupName);

  groupArr.forEach(task => addTaskToPage(task, groupTaskContainer, false));
}

// Adds the task to the bottom of the Tasks section of the Group it belongs to
function addTaskToGroupPage(task, group) {
  const groupName = group.getName();
  const groupTaskContainer = getGroupTaskContainer(groupName);

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

// "Add Task" (to Group) div event listener 
// Shows the "Add Task" form (if not open already) and fills in the group name 
function directToAddTaskForm(e) {
  // Get group name (parent)
  // 
}

// Delete Group button event listener
function deleteGroup(e) {
  const deleteButton = e.target;

  // Get group name
  const groupName = deleteButton.previousSibling.textContent;

  // Remove all group tasks from AllTasks, Next7Days, and Today
  const groupToDelete = CreatedGroups.getGroup(groupName);
  const groupToDeleteArr = groupToDelete.getArr();
  groupToDeleteArr.forEach(task => {
    const taskName = task.getName();
    AllTasks.removeTask(taskName, groupName);
    Next7DaysTasks.removeTask(taskName, groupName);
    TodaysTasks.removeTask(taskName, groupName);
  });

  // Remove the group from CreatedGroups
  CreatedGroups.removeGroup(groupName);

  // Remove the group div from the DOM
  const groupDivToDelete = deleteButton.parentNode.parentNode;
  groupDivToDelete.remove();  
}

// Returns the groupTaskContainer of a group of the given name
function getGroupTaskContainer(groupName) {
  const groupDivs = document.querySelectorAll(".group-div");
  for (let i = 0; i < groupDivs.length; i++) {
    const groupDiv = groupDivs.item(i);
    const groupDivName = groupDiv.firstChild.firstChild.textContent;
    if (groupDivName === groupName) {
      return groupDiv.lastChild;
    }
  }
}

export { addGroupToPage, addTaskToGroupPage };