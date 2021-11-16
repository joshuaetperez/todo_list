import '../style.css';
import { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js"
import addTaskToPage from "./add-task-to-page.js";
import { CurrentTab, resetPage, displayTitle } from "./tab-pages.js";

// Sets up the "Groups" page
export default function displayGroups() {
  if (CurrentTab.getTab() === "Groups") {
    return;
  }
  CurrentTab.setTab("Groups");
  resetPage();
  displayTitle("Groups");

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

  // Insert "Add Task" div first
  insertDirectToAddTaskFormDiv(groupName);

  // Groups tasks are inserted above the "Add Task" div in order
  groupArr.forEach(task => addTaskToPage(task, groupTaskContainer));
}

// Adds the task to the bottom of the Tasks section of the Group it belongs to
function addTaskToGroupPage(task, group) {
  const groupName = group.getName();
  const groupTaskContainer = getGroupTaskContainer(groupName);

  addTaskToPage(task, groupTaskContainer);
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

// Inserts a "Add Task" div at the bottom of the groupTaskContainer
function insertDirectToAddTaskFormDiv(groupName) {
  const groupTaskContainer = getGroupTaskContainer(groupName);
  const directDiv = document.createElement("div");
  directDiv.classList.add("direct-to-form-div");
  directDiv.textContent = "+ Add Task";
  directDiv.addEventListener("click", directToAddTaskForm);
  groupTaskContainer.appendChild(directDiv);
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

// Shows the "Add Task" form (if not open already) and fills in the group name 
function directToAddTaskForm(e) {
  // Get group name
  const directDiv = e.target;
  const groupName = directDiv.parentNode.previousSibling.firstChild.textContent;

  // Open "Add Task" form (if not already open)
  const taskForm = document.querySelector("#task-form");
  const addTaskTab = document.querySelector("#add-task");
  const taskFormName = document.querySelector("#fname-task");
  const taskFormGroup = document.querySelector("#fgroup-task");
  if (!addTaskTab.classList.contains("add-tab-border")) {
    addTaskTab.classList.add("add-tab-border");
    taskForm.style.display = 'flex'; 
  }

  // Change taskForm fields
  taskFormName.value = "";
  taskFormGroup.value = groupName;

  // Put text cursor on "Name of Task" field
  taskFormName.focus();

  // Change color of "Add Task" to get the user's attention
  alertDirectToForm();
}

// Change color of "Add Task" tab and form to yellow for a moment
function alertDirectToForm() {
  const addTaskTab = document.querySelector("#add-task");
  const taskForm = document.querySelector("#task-form");

  addTaskTab.classList.add("direct-to-form");
  taskForm.classList.add("direct-to-form");
  setTimeout(function() { 
    addTaskTab.classList.remove("direct-to-form");
    taskForm.classList.remove("direct-to-form");
  }, 500);
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

export { addGroupToPage, addTaskToGroupPage, insertDirectToAddTaskFormDiv };