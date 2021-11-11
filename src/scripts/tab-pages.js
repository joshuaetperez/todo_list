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

// Sets up the "All Tasks" page
function displayAllTasks() {
  if (CurrentTab.getTab() === "All Tasks") {
    return;
  }
  resetPage();
  CurrentTab.setTab("All Tasks");

  const containerDiv = document.querySelector(".main");
  const allTasksArr = AllTasks.getArr();
  allTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Sets up the "Today" page
function displayToday() {
  if (CurrentTab.getTab() === "Today") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Today");

  const containerDiv = document.querySelector(".main");
  const TodaysTasksArr = TodaysTasks.getArr();
  TodaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

// Sets up the "Next 7 Days" page
function displayNext7Days() {
  if (CurrentTab.getTab() === "Next 7 Days") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Next 7 Days");

  const containerDiv = document.querySelector(".main");
  const Next7DaysTasksArr = Next7DaysTasks.getArr();
  Next7DaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
};

export {CurrentTab, resetPage, displayAllTasks, displayToday, displayNext7Days};