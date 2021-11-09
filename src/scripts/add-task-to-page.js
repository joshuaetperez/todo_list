import Group, { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js"

// Adds a task to the bottom of the specified container
// Input: a Task object, the DOM container, and a boolean specifying whether the Group name should be added next to the due date
export default function addTaskToPage(task, containerDiv, addGroupName) {
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
  const groupName = task.getGroupName();
  taskDiv.classList.add("task-div");
  taskFlexDiv.classList.add("task-flex-div");
  crossDiv.classList.add("cross-div");
  contentDiv.classList.add("content-div");
  leftSideDiv.classList.add("left-side-div");
  rightSideDiv.classList.add("right-side-div");
  taskNameDiv.textContent = task.getName();
  taskDueDateP.textContent = task.getDueDate();

  // If a group name was provided and needs to be displayed, add it to the rightSideDiv
  if ((groupName !== "") && (addGroupName)) {
    groupNameP.classList.add("right-side-group");
    groupNameP.textContent = `${groupName}`;
  }

  crossDiv.addEventListener("click", toggleCrossTask);

  removeButton.className = "remove unselectable material-icons";
  removeButton.textContent = "close";
  removeButton.addEventListener("click", deleteTask);
  removeButton.myParam = addGroupName;

  leftSideDiv.appendChild(taskNameDiv);
  if (addGroupName === true) rightSideDiv.appendChild(groupNameP);
  rightSideDiv.appendChild(taskDueDateP);

  contentDiv.appendChild(leftSideDiv);
  contentDiv.appendChild(rightSideDiv);
  crossDiv.appendChild(contentDiv);
  taskFlexDiv.appendChild(crossDiv);
  taskFlexDiv.appendChild(removeButton);
  taskDiv.appendChild(taskFlexDiv);
  

  if (addGroupName) {
    containerDiv.appendChild(taskDiv);
  }
  else {
    const directToAddTaskFormDiv = containerDiv.lastChild;
    containerDiv.insertBefore(taskDiv, directToAddTaskFormDiv)
  }
}

// Button event listener that deletes the task
function deleteTask(e) {
  const removeButton = e.target;
  const contentDiv = removeButton.previousSibling.lastChild;
  const leftSideDiv = contentDiv.firstChild;
  const rightSideDiv = contentDiv.lastChild;

  // Get Task name
  const taskName = leftSideDiv.firstChild.textContent;
  let groupName;

  // Gets value of groupName based on whether there is a group name <p> tag to the left of the due date <p> tag 
  const includesGroupP = e.target.myParam;
  if (includesGroupP) {
    groupName = rightSideDiv.firstChild.textContent;
  }
  else {
    groupName = removeButton.parentNode.parentNode.parentNode.previousSibling.firstChild.textContent;
  }

  // Remove it from AllTasks, Next7DaysTasks, TodayTasks, and from its Group (if it belongs in one)
  console.log(groupName);
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

// Event listener that toggles cross status of a task
function toggleCrossTask(e) {
  const crossDiv = this;
  const brCross = document.createElement("hr");
  brCross.classList.add("hr-cross");

  // If the task has not been crossed out, cross it out
  if (crossDiv.firstChild.tagName !== "HR") {
    crossDiv.insertBefore(brCross, crossDiv.lastChild);
  }
  // Else, remove the cross
  else {
    crossDiv.removeChild(crossDiv.firstChild);
  }

  
}