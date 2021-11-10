import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, Next7DaysTasks } from "./group.js";
import CurrentTab from "./current-tab.js";
import resetPage from "./reset-page.js";
import addTaskToPage from "./add-task-to-page.js";

// Sets up the "Next 7 Days" page
export default function displayNext7Days() {
  if (CurrentTab.getTab() === "Next 7 Days") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Next 7 Days");

  const containerDiv = document.querySelector(".main");
  const Next7DaysTasksArr = Next7DaysTasks.getArr();
  Next7DaysTasksArr.forEach(task => addTaskToPage(task, containerDiv));
}