import {format, parseISO} from "date-fns";

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
  const groupArr = [];

  const getArr = () => groupArr;
  const pushGroup = (group) => groupArr.push(group);

  return {getArr, pushGroup};
})();

// Module for all tasks
const AllTasks = (() => {
  const allTasksArr = [];

  const getArr = () => allTasksArr;
  const pushTask = (task) => allTasksArr.push(task);

  return {getArr, pushTask};
})();

// Module for tasks due today
const TodaysTasks = (() => {
  const todaysTasksArr = [];

  const getArr = () => todaysTasksArr;
  const pushTask = (task) => todaysTasksArr.push(task);
  const populateArr = () => {
    const todaysDate = new Date();
    const allTasksArr = AllTasks.getArr();

    allTasksArr.forEach(task => {
      if (task.getDueDate() === todaysDate) todaysTasksArr.push(task);
    });
  }

  return {getArr, pushTask, populateArr};
})();

export default Group;
export { CreatedGroups, AllTasks, TodaysTasks };