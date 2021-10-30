import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, TodaysTasks } from './group.js';
import CurrentTab from './current-tab.js';
import resetPage from './reset-page.js';
import addTaskToPage from "./add-task-to-page.js";

export default function displayToday() {
  if (CurrentTab.getTab() === "Today") {
    return;
  }
  resetPage();
  CurrentTab.setTab("Today");
  const TodaysTasksArr = TodaysTasks.getArr();
  TodaysTasksArr.forEach(task => addTaskToPage(task));
}