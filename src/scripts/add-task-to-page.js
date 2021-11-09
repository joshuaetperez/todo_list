import Group, { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js"
import CurrentTab from "./current-tab.js";

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

  // If the task has been completed, add a cross over it
  if (task.getCompletedStatus()) {
    const brCross = document.createElement("hr");
    brCross.classList.add("hr-cross");
    crossDiv.insertBefore(brCross, crossDiv.firstChild);
  }
  crossDiv.addEventListener("click", toggleCrossTask);

  removeButton.className = "remove unselectable material-icons";
  removeButton.textContent = "close";
  removeButton.addEventListener("click", deleteTask);

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

  // Get task name (contentDiv -> firstChild -> firstChild -> text)
  // Get group name
  //     1. If on a task page: contentDiv -> lastChild -> firstChild -> text
  //     2. If on Groups page: crossDiv -> parentNode -> parentNode -> parentNode -> previousSibling -> firstChild -> text
  // Find task from AllTasks and check its completeStatus
  // Call changeCompletedStatus
  const taskName = contentDiv.firstChild.firstChild.textContent;
  let groupName;

  const isGroupPage = CurrentTab.getTab() === "Groups"; 
  if (isGroupPage) {
    groupName = crossDiv.parentNode.parentNode.parentNode.previousSibling.firstChild.textContent;
  }
  else {
    groupName = contentDiv.lastChild.firstChild.textContent;
  }

  const task = AllTasks.getTask(taskName, groupName);
  task.changeCompletedStatus();

  // If the task has not been crossed out, cross it out
  if (crossDiv.firstChild.tagName !== "HR") {
    const brCross = document.createElement("hr");
    brCross.classList.add("hr-cross");
    crossDiv.insertBefore(brCross, crossDiv.firstChild);
  }
  // Else, remove the cross
  else {
    crossDiv.removeChild(crossDiv.firstChild);
  }
}