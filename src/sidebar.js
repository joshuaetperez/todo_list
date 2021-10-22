import './style.css';
import {format} from "date-fns";

export default function displaySidebar() {
  const contentDiv = document.querySelector("#content");
  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");
  contentDiv.appendChild(containerDiv);

  const sidebarDiv = document.createElement("div");
  sidebarDiv.classList.add("sidebar");

  const taskList = document.createElement("ul");
  const groupList = document.createElement("ul");
  taskList.classList.add("task-list");
  groupList.classList.add("group-list");

  const todayTab = document.createElement("li");
  const monthTab = document.createElement("li");
  const allTasksTab = document.createElement("li");
  const addTaskTab = document.createElement("li");
  const groupsTab = document.createElement("li");
  const addGroupTab = document.createElement("li");
  addTaskTab.classList.add("add-tab");
  addGroupTab.classList.add("add-tab");
  addTaskTab.id = "add-task";
  addGroupTab.id = "add-group";

  todayTab.textContent = "Today";
  monthTab.textContent = "Month";
  allTasksTab.textContent = "All Tasks";
  addTaskTab.textContent = "Add Task";
  groupsTab.textContent = "Groups";
  addGroupTab.textContent = "Add Group";

  const taskFormDiv = document.createElement("div");
  const taskFormButtonDiv = document.createElement("div");
  const taskForm = document.createElement("form");
  const taskFormTitle = document.createElement("input");
  const taskFormDate = document.createElement("input");
  const taskFormSubmit = document.createElement("input");
  const taskFormCancel = document.createElement("input");
  const todaysDate = format(new Date(), "yyyy-MM-dd");
  taskFormButtonDiv.classList.add("form-button-div");
  taskFormTitle.setAttribute("type", "text");
  taskFormDate.setAttribute("type", "date");
  taskFormSubmit.setAttribute("type", "submit");
  taskFormCancel.setAttribute("type", "button");
  // Need to have "display: none" first (later tho)
  taskFormDiv.classList.add("all-forms");
  taskForm.id = "task-form";
  taskFormTitle.id = "ftitle-task";
  taskFormDate.id = "fdate-task";
  taskFormSubmit.id = "fsubmit-task";
  taskFormCancel.id = "fcancel-task";
  taskFormTitle.placeholder = "Title of Task";
  taskFormTitle.maxLength = 100;
  taskFormDate.min = todaysDate;
  taskFormTitle.required = true;
  taskFormDate.required = true;
  taskFormDate.value = todaysDate;
  taskFormSubmit.value = "Submit";
  taskFormCancel.value = "Cancel";

  taskForm.appendChild(taskFormTitle);
  taskForm.appendChild(taskFormDate);
  taskFormButtonDiv.appendChild(taskFormSubmit);
  taskFormButtonDiv.appendChild(taskFormCancel);
  taskForm.appendChild(taskFormButtonDiv);
  taskFormDiv.appendChild(taskForm);

  taskList.appendChild(todayTab);
  taskList.appendChild(monthTab);
  taskList.appendChild(allTasksTab);
  taskList.appendChild(addTaskTab);
  taskList.appendChild(taskFormDiv);
  groupList.appendChild(groupsTab);
  groupList.appendChild(addGroupTab);

  sidebarDiv.appendChild(taskList);
  sidebarDiv.appendChild(groupList);
  containerDiv.appendChild(sidebarDiv);
}