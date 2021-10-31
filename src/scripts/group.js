import {addDays, format, isEqual, isWithinInterval, parse, startOfToday} from "date-fns";
import Task from "./task.js";

// Group factory function
const Group = (name) => {
  let taskArr = [];
  const getName = () => name;
  const getArr = () => taskArr;
  // Debugging function: will probably remove later 
  const getTaskNames = () => taskArr.forEach(task => console.log(task.getName()));

  const setName = (newName) => name = newName;
  const pushTask = (task) => taskArr.push(task);
  const deleteTask = (task) => {
    const index = taskArr.findIndex(elem => elem.getName() === task.getName());
    if (index >= 0) {
      taskArr.splice(index, 1);
    }
  };

  return {getName, getArr, getTaskNames, setName, pushTask, deleteTask};
}

// Module that contains all created groups
const CreatedGroups = (() => {
  const CreatedGroupsArr = [];

  const getArr = () => CreatedGroupsArr;
  const pushGroup = (group) => CreatedGroupsArr.push(group);
  const getGroupIndex = (groupName) => {
    const hasGroupName = (createdGroup) => createdGroup.getName() === groupName;
    return CreatedGroupsArr.findIndex(hasGroupName);
  }

  return {getArr, pushGroup, getGroupIndex};
})();

// Module for all tasks
const AllTasks = (() => {
  const allTasksArr = [];

  const getArr = () => allTasksArr;
  const pushTask = (task) => allTasksArr.push(task);

   // TEMPORARY DATA FOR DEBEUGGING
  const task1Date = format(new Date(2021, 10, 10), "MM/dd/yyyy");
  const task1 = Task("Take out the trash", "", task1Date);
  const task2Date = format(new Date(2021, 10, 11), "MM/dd/yyyy");
  const task2 = Task("Do the dishes", "Cleaning", task2Date);
  const task3Date = format(new Date(2021, 10, 12), "MM/dd/yyyy");
  const task3 = Task("Clean the house", "Cleaning", task3Date);
  const task4Date = format(new Date(2021, 10, 13), "MM/dd/yyyy");
  const task4 = Task("Go grocery shopping", "", task4Date);
  const task5Date = format(new Date(2021, 10, 14), "MM/dd/yyyy");
  const task5 = Task("Do homework", "", task5Date);
  const task6Date = format(new Date(), "MM/dd/yyyy");
  const task6 = Task("Clip fingernails", "School", task6Date);
  const task7Date = format(new Date(), "MM/dd/yyyy");
  const task7 = Task("Read from the textbook", "School", task7Date);
  allTasksArr.push(task1);
  allTasksArr.push(task2);
  allTasksArr.push(task3);
  allTasksArr.push(task4);
  allTasksArr.push(task5);
  allTasksArr.push(task6);
  allTasksArr.push(task7);
  const cleaningGroup = Group("Cleaning");
  const schoolGroup = Group("School");
  cleaningGroup.pushTask(task2);
  cleaningGroup.pushTask(task3);
  schoolGroup.pushTask(task6);
  schoolGroup.pushTask(task7); 
  CreatedGroups.pushGroup(cleaningGroup);
  CreatedGroups.pushGroup(schoolGroup);

  return {getArr, pushTask};
})();

// Module for tasks due today
const TodaysTasks = (() => {
  const todaysTasksArr = [];

  const getArr = () => todaysTasksArr;
  const pushTask = (task) => todaysTasksArr.push(task);
  const populateArr = () => {
    const todaysDate = startOfToday();
    const allTasksArr = AllTasks.getArr();

    allTasksArr.forEach(task => {
      const parsedDueDate = parse(task.getDueDate(), 'MM/dd/yyyy', new Date());
      if (isEqual(parsedDueDate, todaysDate)) todaysTasksArr.push(task);
    });
  }

  // Call populateArr
  populateArr();

  return {getArr, pushTask};
})();

// Module for tasks due in the next 7 days
const Next7DaysTasks = (() => {
  const next7DaysTasksArr = [];

  const getArr = () => next7DaysTasksArr;
  const pushTask = (task) => next7DaysTasksArr.push(task);
  const populateArr = () => {
    const todaysDate = startOfToday();
    const SevenDaysFromNowDate = addDays(todaysDate, 6);
    const allTasksArr = AllTasks.getArr();

    allTasksArr.forEach(task => {
      const parsedDueDate = parse(task.getDueDate(), 'MM/dd/yyyy', new Date());
      if (isWithinInterval(parsedDueDate, {start: todaysDate, end: SevenDaysFromNowDate})) next7DaysTasksArr.push(task);
    });
  }

  // Call populateArr
  populateArr();

  return {getArr, pushTask};
})();

export default Group;
export { AllTasks, CreatedGroups, TodaysTasks, Next7DaysTasks};