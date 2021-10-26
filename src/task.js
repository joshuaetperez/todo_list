// Task factory function
const Task = (name, dueDate) => {
  let completedStatus = false;
  const getName = () => name;
  const getDueDate = () => dueDate;
  const getCompletedStatus = () => completedStatus;
  
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const changeCompletedStatus = () => (completedStatus) ? completedStatus = false : completedStatus = true;  

  return {getName, getDueDate, getCompletedStatus, setDueDate, changeCompletedStatus};
};

// Module for tasks that have not been assigned a group
const UngroupedTasks = (() => {
  const ungroupedTaskArr = [];

  const getArr = () => ungroupedTaskArr;
  const pushTask = (task) => ungroupedTaskArr.push(task);


  return {getArr, pushTask};
})();

export default Task;