// Adds a task to the bottom of the specified container
// Input: a Task object, the DOM container, and a boolean specifying whether the Group name should be added next to the Task name
export default function addTaskToPage(task, containerDiv, addGroupName) {
  const taskDiv = document.createElement("div");
  const rightSideDiv = document.createElement("div");
  const taskName = document.createElement("div");
  const taskDueDate = document.createElement("p");
  const removeButton = document.createElement("button");
  const groupName = task.getGroupName();
  taskDiv.classList.add("task-div");
  rightSideDiv.classList.add("right-side-div");
  taskName.textContent = task.getName();
  taskDueDate.textContent = task.getDueDate();

  if ((groupName !== "") && (addGroupName === true)) {
    taskName.textContent += ` (${groupName})`;
  }

  removeButton.className = "remove unselectable material-icons";
  removeButton.textContent = "close";

  rightSideDiv.appendChild(taskDueDate);
  rightSideDiv.appendChild(removeButton);

  taskDiv.appendChild(taskName);
  taskDiv.appendChild(rightSideDiv);
  containerDiv.appendChild(taskDiv);
}