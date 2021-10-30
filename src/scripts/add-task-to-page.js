// Adds a task to the bottom of the todo list page
export default function addTaskToPage(task) {
  const containerDiv = document.querySelector(".main");
  const taskDiv = document.createElement("div");
  const rightSideDiv = document.createElement("div");
  const taskName = document.createElement("div");
  const taskDueDate = document.createElement("p");
  const removeButton = document.createElement('button');
  const groupName = task.getGroupName();
  taskDiv.classList.add("task-div");
  rightSideDiv.classList.add("right-side-div");
  taskName.textContent = task.getName();
  taskDueDate.textContent = task.getDueDate();

  if (groupName !== "") {
    taskName.textContent += ` (${groupName})`;
  }

  removeButton.className = 'remove material-icons';
  removeButton.textContent = 'close';

  rightSideDiv.appendChild(taskDueDate);
  rightSideDiv.appendChild(removeButton);

  taskDiv.appendChild(taskName);
  taskDiv.appendChild(rightSideDiv);
  containerDiv.appendChild(taskDiv);
}