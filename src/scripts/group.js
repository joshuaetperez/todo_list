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
  const removeTask = (taskName) => {
    const index = taskArr.findIndex(elem => elem.getName() === taskName);
    if (index >= 0) {
      taskArr.splice(index, 1);
    }
  };

  return {getName, getArr, getTaskNames, setName, pushTask, removeTask};
}

// Module that contains all created groups
const CreatedGroups = (() => {
  const CreatedGroupsArr = [];

  const getArr = () => CreatedGroupsArr;
  const getGroup = (groupName) => {
    const hasGroupName = (createdGroup) => createdGroup.getName() === groupName;
    return CreatedGroupsArr.find(hasGroupName);
  }
  const getGroupIndex = (groupName) => {
    const hasGroupName = (createdGroup) => createdGroup.getName() === groupName;
    return CreatedGroupsArr.findIndex(hasGroupName);
  }
  const pushGroup = (group) => CreatedGroupsArr.push(group);
  const removeGroup = (groupName) => {
    const groupIndex = getGroupIndex(groupName);
    CreatedGroupsArr.splice(groupIndex, 1);
  }

  return {getArr, getGroup, getGroupIndex, pushGroup, removeGroup};
})();

// Module for all tasks
const AllTasks = (() => {
  const allTasksArr = [];

  const getArr = () => allTasksArr;
  const getTask = (taskName, groupName) => {
    const index = allTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      return allTasksArr[index];
    }
  };
  const pushTask = (task) => allTasksArr.push(task);
  const removeTask = (taskName, groupName) => {
    const index = allTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      allTasksArr.splice(index, 1);
    }
  };
  const isDuplicate = (taskName, groupName) => {
    const index = allTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      return true;
    }
    return false;
  };

   // TEMPORARY DATA FOR DEBEUGGING
  const task1Date = new Date(2021, 10, 10);
  const task1 = Task("Take out the trash", "", task1Date);
  const task2Date = new Date(2021, 10, 11);
  const task2 = Task("Do the dishes", "Cleaning", task2Date);
  const task3Date = new Date(2021, 10, 12);
  const task3 = Task("Clean the house", "Cleaning", task3Date);
  const task4Date = new Date(2021, 10, 13);
  const task4 = Task("Go grocery shopping", "", task4Date);
  const task5Date = new Date(2021, 10, 14);
  const task5 = Task("Do homework", "", task5Date);
  const task6Date = startOfToday();
  const task6 = Task("Clip fingernails", "School", task6Date);
  const task7Date = startOfToday();
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

  return {getArr, getTask, pushTask, removeTask, isDuplicate};
})();

// Module for tasks due today
const TodaysTasks = (() => {
  const todaysTasksArr = [];

  const getArr = () => todaysTasksArr;
  const pushTask = (task) => todaysTasksArr.push(task);
  const removeTask = (taskName, groupName) => {
    const index = todaysTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      todaysTasksArr.splice(index, 1);
    }
  };
  const populateArr = () => {
    const todaysDate = startOfToday();
    const allTasksArr = AllTasks.getArr();

    allTasksArr.forEach(task => {
      const taskDueDate = task.getDueDate();
      if (isEqual(taskDueDate, todaysDate)) todaysTasksArr.push(task);
    });
  }

  // Call populateArr
  populateArr();

  return {getArr, pushTask, removeTask};
})();

// Module for tasks due in the next 7 days
const Next7DaysTasks = (() => {
  const next7DaysTasksArr = [];

  const getArr = () => next7DaysTasksArr;
  const pushTask = (task) => next7DaysTasksArr.push(task);
  const removeTask = (taskName, groupName) => {
    const index = next7DaysTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      next7DaysTasksArr.splice(index, 1);
    }
  };
  const populateArr = () => {
    const todaysDate = startOfToday();
    const SevenDaysFromNowDate = addDays(todaysDate, 6);
    const allTasksArr = AllTasks.getArr();

    allTasksArr.forEach(task => {
      const taskDueDate = task.getDueDate();
      if (isWithinInterval(taskDueDate, {start: todaysDate, end: SevenDaysFromNowDate})) next7DaysTasksArr.push(task);
    });
  }

  // Call populateArr
  populateArr();

  return {getArr, pushTask, removeTask};
})();

export default Group;
export { AllTasks, CreatedGroups, TodaysTasks, Next7DaysTasks};