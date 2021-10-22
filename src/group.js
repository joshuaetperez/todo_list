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

export default Group;