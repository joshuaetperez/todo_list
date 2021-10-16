import {format} from "date-fns";

// Task factory function
const Task = (name, dueDate) => {
  let crossedOut = false;
  const getName = () => name;
  const getDueDate = () => dueDate;
  const getCrossedOutStatus = () => crossedOut;
  
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const changeCrossedOutStatus = () => (crossedOut) ? crossedOut = false : crossedOut = true;  

  return {getName, getDueDate, getCrossedOutStatus, setDueDate, changeCrossedOutStatus};
};

// Group factory function
const Group = (name, dueDate) => {
  let groupArr = [];
  const getName = () => name;
  const getDueDate = () => dueDate;
  const getArr = () => groupArr;
  // Debugging function: will probably remove later 
  const getTaskNames = () => groupArr.forEach(task => console.log(task.getName()));

  const setName = (newName) => name = newName;
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const pushTask = (task) => groupArr.push(task);
  const deleteTask = (task) => {
    const index = groupArr.findIndex(elem => elem.getName() === task.getName());
    if (index >= 0) {
      groupArr.splice(index, 1);
    }
  };

  return {getName, getDueDate, getArr, getTaskNames, setName, setDueDate, pushTask, deleteTask};
}


// Debugging Task and Group

// const groupDate = format(new Date(), "MM/dd/yyyy");
// const group1 = Group("Group 1", groupDate);

// const task1Date = format(new Date(2021, 10, 1), "MM/dd/yyyy");
// const task1 = Task("Take out the trash", task1Date);
// const task2Date = format(new Date(2021, 10, 2), "MM/dd/yyyy");
// const task2 = Task("Do the dishes", task2Date);
// const task3Date = format(new Date(2021, 10, 3), "MM/dd/yyyy");
// const task3 = Task("Clean the house", task3Date);
// const task4Date = format(new Date(2021, 10, 4), "MM/dd/yyyy");
// const task4 = Task("Go grocery shopping", task4Date);
// const task5Date = format(new Date(2021, 10, 5), "MM/dd/yyyy");
// const task5 = Task("Do homework", task5Date);

// group1.pushTask(task1);
// group1.pushTask(task2);
// group1.pushTask(task3);
// group1.pushTask(task4);
// group1.pushTask(task5);

// console.log(group1.getArr());

// group1.deleteTask(task3);
// console.log(group1.getArr());
// group1.getTaskNames();