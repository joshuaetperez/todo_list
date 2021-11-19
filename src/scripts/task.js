import {format} from "date-fns";

// Task factory function
const Task = (name, groupName, dueDate, completedStatus) => {
  const taskDueDateString = format(dueDate, "MM/dd/yyyy");

  const getName = () => name;
  const getGroupName = () => groupName;
  const getDueDate = () => dueDate;
  const getDueDateString = () => taskDueDateString;
  const getCompletedStatus = () => completedStatus;

  const setGroupName = (newGroupName) => groupName = newGroupName;
  const setDueDate = (newDueDate) => dueDate = newDueDate;
  const changeCompletedStatus = () => (completedStatus) ? completedStatus = false : completedStatus = true;  

  return {getName, getGroupName, getDueDate, getDueDateString, getCompletedStatus, setGroupName, setDueDate, changeCompletedStatus};
};

export default Task;