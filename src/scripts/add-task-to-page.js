import { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js"
import { CurrentTab } from "./tab-pages.js";

// Adds a Task to the bottom of the specified container
export default function addTaskToPage(task, containerDiv) {
  const taskDiv = document.createElement("div");
  const taskFlexDiv = document.createElement("div");
  const crossDiv = document.createElement("div");
  const contentDiv = document.createElement("div");
  const leftSideDiv = document.createElement("div");
  const rightSideDiv = document.createElement("div");
  const taskNameDiv = document.createElement("div");
  const groupNameP = document.createElement("p");
  const taskDueDateP = document.createElement("p");
  const removeButton = document.createElement("button");
  const taskName = task.getName();
  const groupName = task.getGroupName();
  const taskDueDate = task.getDueDate();
  taskDiv.classList.add("task-div");
  taskFlexDiv.classList.add("task-flex-div");
  crossDiv.classList.add("cross-div");
  contentDiv.classList.add("content-div");
  leftSideDiv.classList.add("left-side-div");
  rightSideDiv.classList.add("right-side-div");
  taskNameDiv.textContent = taskName;
  taskDueDateP.textContent = taskDueDate;

  const isGroupsPage = CurrentTab.getTab() === "Groups";
  // If a Group name was provided and user is not on the "Groups" page, add the Group name to the right side of the Task div 
  if ((groupName !== "") && (!isGroupsPage)) {
    groupNameP.classList.add("right-side-group");
    groupNameP.textContent = `${groupName}`;
  }

  // Create a "Remove Task" button (X)
  removeButton.className = "remove unselectable material-icons";
  removeButton.textContent = "close";
  removeButton.addEventListener("click", deleteTask);

  // If the task has been completed, add a cross over it
  if (task.getCompletedStatus()) {
    const brCross = document.createElement("hr");
    brCross.classList.add("hr-cross");
    crossDiv.insertBefore(brCross, crossDiv.firstChild);
  }
  // Else, make the "Remove Task" button (X) invisible
  else {
    removeButton.classList.add("invisible");
  }
  crossDiv.addEventListener("click", toggleCrossTask);

  leftSideDiv.appendChild(taskNameDiv);
  if (!isGroupsPage) rightSideDiv.appendChild(groupNameP);
  rightSideDiv.appendChild(taskDueDateP);

  contentDiv.appendChild(leftSideDiv);
  contentDiv.appendChild(rightSideDiv);
  crossDiv.appendChild(contentDiv);
  taskFlexDiv.appendChild(crossDiv);
  taskFlexDiv.appendChild(removeButton);
  taskDiv.appendChild(taskFlexDiv);
  
  // If the user is on the "Groups" page, insert the Task above the "+ Add Task" div
  if (isGroupsPage) {
    const directToAddTaskFormDiv = containerDiv.lastChild;
    containerDiv.insertBefore(taskDiv, directToAddTaskFormDiv)
  }
  // Else, just insert it on the bottom
  else {
    containerDiv.appendChild(taskDiv);
  }
}

// Button event listener that deletes the Task
function deleteTask(e) {
  const removeButton = e.target;
  const contentDiv = removeButton.previousSibling.lastChild;
  const leftSideDiv = contentDiv.firstChild;
  const rightSideDiv = contentDiv.lastChild;

  // Get Task name
  const taskName = leftSideDiv.firstChild.textContent;
  let groupName;

  // Gets value of groupName based on whether the user is on the "Groups" page or not
  const isGroupsPage = CurrentTab.getTab() === "Groups";
  if (isGroupsPage) {
    groupName = removeButton.parentNode.parentNode.parentNode.previousSibling.firstChild.textContent;
  }
  else {
    groupName = rightSideDiv.firstChild.textContent;
  }

  // Remove it from AllTasks, Next7DaysTasks, TodayTasks, and from its Group (if it belongs in one)
  AllTasks.removeTask(taskName, groupName);
  Next7DaysTasks.removeTask(taskName, groupName);
  TodaysTasks.removeTask(taskName, groupName);
  if (groupName !== "") {
    const createdGroup = CreatedGroups.getGroup(groupName);
    createdGroup.removeTask(taskName);
  }

  // Remove it from the DOM of the page (Today, Next 7 Days, All Tasks, Groups)
  const taskDivToRemove = removeButton.parentNode.parentNode;
  taskDivToRemove.remove();  
}

// Event listener that toggles cross status of a Task
function toggleCrossTask(e) {
  const crossDiv = this;
  const contentDiv = crossDiv.lastChild;

  const taskName = contentDiv.firstChild.firstChild.textContent;
  let groupName;

  // Gets value of groupName based on whether the user is on the "Groups" page or not
  const isGroupPage = CurrentTab.getTab() === "Groups"; 
  if (isGroupPage) {
    groupName = crossDiv.parentNode.parentNode.parentNode.previousSibling.firstChild.textContent;
  }
  else {
    groupName = contentDiv.lastChild.firstChild.textContent;
  }

  // Find task from AllTasks and check its completeStatus
  const task = AllTasks.getTask(taskName, groupName);
  task.changeCompletedStatus();

  const removeButton = crossDiv.nextSibling;
  // If the task has not been crossed out, cross it out and make the "Remove Task" button (X) invisible
  if (crossDiv.firstChild.tagName !== "HR") {
    const brCross = document.createElement("hr");
    brCross.classList.add("hr-cross");
    crossDiv.insertBefore(brCross, crossDiv.firstChild);
    removeButton.classList.remove("invisible");
  }
  // Else, remove the cross and make the "Remove Task" button (X) visible
  else {
    crossDiv.removeChild(crossDiv.firstChild);
    removeButton.classList.add("invisible");
  }
}