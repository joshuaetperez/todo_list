import './style.css';

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

  todayTab.textContent = "Today";
  monthTab.textContent = "Month";
  allTasksTab.textContent = "All Tasks";
  addTaskTab.textContent = "Add Task";
  groupsTab.textContent = "Groups";
  addGroupTab.textContent = "Add Group";

  taskList.appendChild(todayTab);
  taskList.appendChild(monthTab);
  taskList.appendChild(allTasksTab);
  taskList.appendChild(addTaskTab);
  groupList.appendChild(groupsTab);
  groupList.appendChild(addGroupTab);

  sidebarDiv.appendChild(taskList);
  sidebarDiv.appendChild(groupList);
  containerDiv.appendChild(sidebarDiv);
}