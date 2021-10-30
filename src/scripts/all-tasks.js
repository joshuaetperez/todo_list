import '../style.css';
import {format} from "date-fns";
import Task from "./task.js";
import Group, { CreatedGroups, AllTasks } from "./group.js";
import CurrentTab from "./current-tab.js";
import resetPage from "./reset-page.js";
import addTaskToPage from "./add-task-to-page.js";

export default function displayAllTasks() {
  if (CurrentTab.getTab() === "All Tasks") {
    return;
  }
  resetPage();
  CurrentTab.setTab("All Tasks");
  const allTasksArr = AllTasks.getArr();
  allTasksArr.forEach(task => addTaskToPage(task));
}