import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks } from './group.js';
import resetPage from './reset-page.js';

export default function displayAllTasks() {
  resetPage();

  const containerDiv = document.querySelector(".main");

  const allTasksArr = AllTasks.getArr();
  allTasksArr.forEach(task => {
    const taskDiv = document.createElement("div");
    const rightSideDiv = document.createElement("div");
    const taskName = document.createElement("div");
    const taskDueDate = document.createElement("p");
    const removeButton = document.createElement('button');
    taskDiv.classList.add("task-div");
    rightSideDiv.classList.add("right-side-div");
    taskName.textContent = task.getName();
    taskDueDate.textContent = task.getDueDate();

    removeButton.className = 'remove material-icons';
    removeButton.textContent = 'close';

    rightSideDiv.appendChild(taskDueDate);
    rightSideDiv.appendChild(removeButton);

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(rightSideDiv);
    containerDiv.appendChild(taskDiv);
  });
}