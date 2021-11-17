import "../style.css";
import { AllTasks, TodaysTasks, Next7DaysTasks, CreatedGroups } from "./group.js";
import addTaskToPage from "./add-task-to-page.js";
import { addGroupToPage, addAllTasksToGroupPage } from "./groups-page.js";

// Module that keeps track of the current tab
const CurrentTab = (() => {
  let tab = ""; // Will be set to "Today" when website starts

  const getTab = () => tab;
  const setTab = (newTab) => {
    if (newTab === "Today" || newTab === "Next 7 Days" || newTab === "All Tasks" || newTab === "Groups") tab = newTab;
  }; 

  return {getTab, setTab};
})();


// Module that keeps track of the current sort direction
const CurrentSortDirection = (() => {
  let isAscSortDirection = true; // Starts with ascending sort order

  const isAscOrder = () => isAscSortDirection;
  const toggleSortDirection = () => isAscSortDirection = (isAscSortDirection) ? false : true;

  return {isAscOrder, toggleSortDirection};
})();

// Resets the contents of the page (more specifically the content container) when any of the "Today", "Next 7 Days", "All Tasks", and "Groups" tabs are clicked
function resetPage() {
  document.querySelector(".main").innerHTML = "";
}

// Sets up the title header on the top of the page with a "Sort" field
function displayTitle(tabPage) {
  const containerDiv = document.querySelector(".main");
  const titleDiv = document.createElement("div");
  const titleHeader = document.createElement("h3");
  titleDiv.classList.add("titleDiv");
  titleHeader.textContent = `${tabPage}`;

  if (CurrentTab.getTab() === "Today") {
    titleDiv.appendChild(titleHeader);
    containerDiv.appendChild(titleDiv);
  }
  else {
    const sortDiv = document.createElement("div");
    const sortLabel = document.createElement("div");
    const sortDirection = document.createElement("button");
    sortDiv.classList.add("sortDiv");
    sortLabel.textContent = "Due Date";
    sortDirection.className = "sort-direction unselectable material-icons";
    sortDirection.textContent = (CurrentSortDirection.isAscOrder()) ? "expand_more" : "expand_less";
  
    sortDiv.appendChild(sortLabel);
    sortDiv.appendChild(sortDirection);
    sortDiv.addEventListener("click", sortEntries);
    titleDiv.appendChild(titleHeader);
    titleDiv.appendChild(sortDiv);
    containerDiv.appendChild(titleDiv);
  }
}

// Sets up the "All Tasks" page
function displayAllTasks() {
  CurrentTab.setTab("All Tasks");
  resetPage();
  displayTitle("All Tasks");

  // Displays tasks based on sorting order
  const containerDiv = document.querySelector(".main");
  const allTasksArr = AllTasks.getArr();
  if (CurrentSortDirection.isAscOrder()) {
    allTasksArr.forEach(task => addTaskToPage(task, containerDiv));
  }
  else {
    for (let i = allTasksArr.length - 1; i >= 0; i--) {
      const task = allTasksArr[i];
      addTaskToPage(task, containerDiv);
    }
  }
};

// Sets up the "Today" page
function displayToday() {
  if (CurrentTab.getTab() === "Today") {
    return;
  }
  CurrentTab.setTab("Today");
  resetPage();
  displayTitle("Today");

  // Displays tasks on the page
  const containerDiv = document.querySelector(".main");
  const todaysTasksArr = TodaysTasks.getArr();
  todaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Sets up the "Next 7 Days" page
function displayNext7Days() {
  CurrentTab.setTab("Next 7 Days");
  resetPage();
  displayTitle("Next 7 Days");

  // Displays tasks based on sorting order
  const containerDiv = document.querySelector(".main");
  const next7DaysTasksArr = Next7DaysTasks.getArr();
  if (CurrentSortDirection.isAscOrder()) {
    next7DaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
  }
  else {
    for (let i = next7DaysTasksArr.length - 1; i >= 0; i--) {
      const task = next7DaysTasksArr[i];
      addTaskToPage(task, containerDiv);
    }
  }
};

// Sets up the "Groups" page
export default function displayGroups() {
  CurrentTab.setTab("Groups");
  resetPage();
  displayTitle("Groups");

  const CreatedGroupsArr = CreatedGroups.getArr();
  CreatedGroupsArr.forEach(group => {
    addGroupToPage(group);
    addAllTasksToGroupPage(group);
  });
}

// Displays tasks/groups based in either ascending or descending order
function sortEntries(e) {
  CurrentSortDirection.toggleSortDirection();
  const currentTab = CurrentTab.getTab();
  if (currentTab === "Next 7 Days") displayNext7Days();
  else if (currentTab === "All Tasks") displayAllTasks();
  else if (currentTab === "Groups") displayGroups();
}

export {CurrentTab, CurrentSortDirection, resetPage, displayTitle, displayAllTasks, displayToday, displayNext7Days, displayGroups};