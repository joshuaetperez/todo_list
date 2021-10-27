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

export default Task;