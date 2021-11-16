import '../style.css';
import { AllTasks, TodaysTasks, Next7DaysTasks } from './group.js';
import addTaskToPage from "./add-task-to-page.js";

// Module that keeps track of the current tab
const CurrentTab = (() => {
  let tab = ""; // Will be set to "Today" when website starts

  const getTab = () => tab;
  const setTab = (newTab) => {
    if (newTab === "Today" || newTab === "Next 7 Days" || newTab === "All Tasks" || newTab === "Groups") tab = newTab;
  }; 

  return {getTab, setTab};
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
    sortDirection.textContent = "expand_more";
  
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
  if (CurrentTab.getTab() === "All Tasks") {
    return;
  }
  CurrentTab.setTab("All Tasks");
  resetPage();
  displayTitle("All Tasks");

  const containerDiv = document.querySelector(".main");
  const allTasksArr = AllTasks.getArr();
  allTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Sets up the "Today" page
function displayToday() {
  if (CurrentTab.getTab() === "Today") {
    return;
  }
  CurrentTab.setTab("Today");
  resetPage();
  displayTitle("Today");

  const containerDiv = document.querySelector(".main");
  const TodaysTasksArr = TodaysTasks.getArr();
  TodaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Sets up the "Next 7 Days" page
function displayNext7Days() {
  if (CurrentTab.getTab() === "Next 7 Days") {
    return;
  }
  CurrentTab.setTab("Next 7 Days");
  resetPage();
  displayTitle("Next 7 Days");

  const containerDiv = document.querySelector(".main");
  const Next7DaysTasksArr = Next7DaysTasks.getArr();
  Next7DaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Displays tasks/groups based in either ascending or descending order
function sortEntries(e) {
  const sortDirection = document.querySelector(".sort-direction");
  if (sortDirection.textContent === "expand_more") {
    sortDirection.textContent = "expand_less";
  }
  else if (sortDirection.textContent === "expand_less") {
    sortDirection.textContent = "expand_more";
  }
}

export {CurrentTab, resetPage, displayTitle, displayAllTasks, displayToday, displayNext7Days};