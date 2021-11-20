import {addDays, compareAsc, isEqual, isWithinInterval, parseJSON, startOfToday} from "date-fns";
import Task from "./task.js";

// Group factory function
const Group = (name) => {
  let taskArr = [];
  let taskListOpenStatus = false;

  const getName = () => name;
  const getArr = () => taskArr;
  const isTaskListOpen = () => taskListOpenStatus;
  const setName = (newName) => name = newName;
  const pushTask = (task) => {
    const taskDueDate = task.getDueDate();
    for (let i = 0; i < taskArr.length; i++) {
      const elemDueDate = taskArr[i].getDueDate();
      if (compareAsc(taskDueDate, elemDueDate) === -1) {
        taskArr.splice(i, 0, task);
        return;
      }
    }
    taskArr.push(task);
  };
  const appendTask = (task) => taskArr.push(task);
  const removeTask = (taskName) => {
    const index = taskArr.findIndex(elem => elem.getName() === taskName);
    if (index >= 0) {
      taskArr.splice(index, 1);
    }
  };
  const toggleTaskListStatus = () => taskListOpenStatus = (taskListOpenStatus) ? false : true;

  return {getName, getArr, isTaskListOpen, setName, pushTask, appendTask, removeTask, toggleTaskListStatus};
}

// Module that contains all created groups
const CreatedGroups = (() => {
  const createdGroupsArr = [];

  const getArr = () => createdGroupsArr;
  const getGroup = (groupName) => {
    const hasGroupName = (createdGroup) => createdGroup.getName() === groupName;
    return (createdGroupsArr.find(hasGroupName) || "");
  }
  const getGroupIndex = (groupName) => {
    const hasGroupName = (createdGroup) => createdGroup.getName() === groupName;
    return createdGroupsArr.findIndex(hasGroupName);
  }
  const pushGroup = (group) => {
    const groupsArrLS = JSON.parse(localStorage.getItem("groups")) || [];
    const groupName = group.getName();
    for (let i = 0; i < createdGroupsArr.length; i++) {
      const elemName = createdGroupsArr[i].getName();
      if (groupName < elemName) {
        createdGroupsArr.splice(i, 0, group);
        groupsArrLS.splice(i, 0 , groupName);
        localStorage.setItem("groups", JSON.stringify(groupsArrLS));
        return;
      }
    }
    createdGroupsArr.push(group);
    groupsArrLS.push(groupName);
    localStorage.setItem("groups", JSON.stringify(groupsArrLS));
  };
  const removeGroup = (groupName) => {
    const groupsArrLS = JSON.parse(localStorage.getItem("groups")) || [];
    const groupIndex = getGroupIndex(groupName);
    createdGroupsArr.splice(groupIndex, 1);
    groupsArrLS.splice(groupIndex, 1);
    localStorage.setItem("groups", JSON.stringify(groupsArrLS));
  }
  const populateArr = () => {
    const groupsArrLS = JSON.parse(localStorage.getItem("groups")) || [];
    groupsArrLS.forEach(name => {
      const group = Group(name);
      createdGroupsArr.push(group);
    });
  }

  // Call populateArr
  populateArr();

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
  const pushTask = (task) => {
    const allTasksArrLS = JSON.parse(localStorage.getItem("allTasks")) || [];
    const taskName = task.getName();
    const taskDueDate = task.getDueDate();
    const groupName = task.getGroupName();
    const taskCompletedStatus = task.getCompletedStatus();
    const allTasksObj = {taskName, groupName, taskDueDate, taskCompletedStatus};
    for (let i = 0; i < allTasksArr.length; i++) {
      const elem = allTasksArr[i];
      const elemDueDate = elem.getDueDate();
      const elemGroupName = elem.getGroupName();
      if (((compareAsc(taskDueDate, elemDueDate) === 0) && (groupName < elemGroupName)) || (compareAsc(taskDueDate, elemDueDate) === -1)) {
        allTasksArr.splice(i, 0, task);
        allTasksArrLS.splice(i, 0 , allTasksObj);
        localStorage.setItem("allTasks", JSON.stringify(allTasksArrLS));
        return;
      }
    }
    allTasksArr.push(task);
    allTasksArrLS.push(allTasksObj);
    localStorage.setItem("allTasks", JSON.stringify(allTasksArrLS));
  };
  const removeTask = (taskName, groupName) => {
    const index = allTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    if (index >= 0) {
      const allTasksArrLS = JSON.parse(localStorage.getItem("allTasks")) || [];
      allTasksArr.splice(index, 1);
      allTasksArrLS.splice(index, 1);
      localStorage.setItem("allTasks", JSON.stringify(allTasksArrLS));
    }
  };
  const isDuplicate = (taskName, groupName) => {
    const index = allTasksArr.findIndex(elem => (elem.getName() === taskName) && (elem.getGroupName() === groupName));
    return (index >= 0);
  };
  const populateArr = () => {
    const allTasksArrLS = JSON.parse(localStorage.getItem("allTasks")) || [];
    allTasksArrLS.forEach(obj => {
      const taskName = obj.taskName;
      const groupName = obj.groupName;
      const taskDueDate = parseJSON(obj.taskDueDate);
      const taskCompletedStatus = (obj.taskCompletedStatus == "true") ? true : false; 
      const task = Task(taskName, groupName, taskDueDate, taskCompletedStatus);
      const group = CreatedGroups.getGroup(groupName);
      allTasksArr.push(task);
      if (group !== "") group.appendTask(task);
    });
  }

  // Call populateArr
  populateArr();

  return {getArr, getTask, pushTask, removeTask, isDuplicate};
})();

// Module for tasks due today
const TodaysTasks = (() => {
  const todaysTasksArr = [];

  const getArr = () => todaysTasksArr;
  const pushTask = (task) => {
    const groupName = task.getGroupName();
    for (let i = 0; i < todaysTasksArr.length; i++) {
      const elem = todaysTasksArr[i];
      const elemGroupName = elem.getGroupName();
      if (groupName < elemGroupName) {
        todaysTasksArr.splice(i, 0, task);
        return;
      }
    }
    todaysTasksArr.push(task);
  };
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
  const pushTask = (task) => {
    const taskDueDate = task.getDueDate();
    const groupName = task.getGroupName();
    for (let i = 0; i < next7DaysTasksArr.length; i++) {
      const elem = next7DaysTasksArr[i];
      const elemDueDate = elem.getDueDate();
      const elemGroupName = elem.getGroupName();
      if (((compareAsc(taskDueDate, elemDueDate) === 0) && (groupName < elemGroupName)) || (compareAsc(taskDueDate, elemDueDate) === -1)) {
        next7DaysTasksArr.splice(i, 0, task);
        return;
      }
    }
    next7DaysTasksArr.push(task);
  };
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