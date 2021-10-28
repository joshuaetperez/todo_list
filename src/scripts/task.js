// Task factory function
const Task = (name, groupName, dueDate) => {
  let completedStatus = false;
  const getName = () => name;
  const getGroupName = () => groupName;
  const getDueDate = () => dueDate;
  const getCompletedStatus = () => completedStatus;

  const setGroupName = (newGroupName) => groupName = newGroupName;
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const changeCompletedStatus = () => (completedStatus) ? completedStatus = false : completedStatus = true;  

  return {getName, getGroupName, getDueDate, getCompletedStatus, setGroupName, setDueDate, changeCompletedStatus};
};

export default Task;