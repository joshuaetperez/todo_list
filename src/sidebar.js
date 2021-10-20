import './style.css';

export default function displaySidebar() {
  const containerDiv = document.querySelector(".container");

  const sidebarDiv = document.createElement("div");
  sidebarDiv.classList.add("sidebar");

  const sidebarList = document.createElement("ul");
  sidebarList.classList.add("sidebar-list");

  const todayTab = document.createElement("li");
  const monthTab = document.createElement("li");
  const allTasksTab = document.createElement("li");
  const addTaskTab = document.createElement("li");
  const groupsTab = document.createElement("li");
  const addGroupTab = document.createElement("li");

  todayTab.textContent = "Today";
  monthTab.textContent = "Month";
  allTasksTab.textContent = "All Tasks";
  addTaskTab.textContent = "Add Task";
  groupsTab.textContent = "Groups";
  addGroupTab.textContent = "Add Group";

  sidebarList.appendChild(todayTab);
  sidebarList.appendChild(monthTab);
  sidebarList.appendChild(allTasksTab);
  sidebarList.appendChild(addTaskTab);
  sidebarList.appendChild(groupsTab);
  sidebarList.appendChild(addGroupTab);

  sidebarDiv.appendChild(sidebarList);
  containerDiv.appendChild(sidebarDiv);

  const otherDiv = document.createElement("div");
  otherDiv.classList.add("main");
  otherDiv.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, aspernatur. Dolores, maxime? Exercitationem esse debitis perspiciatis odit dolor natus quae soluta possimus nobis quis! Repellat ex nemo laborum et omnis.";
  containerDiv.appendChild(otherDiv);
}