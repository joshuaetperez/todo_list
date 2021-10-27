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

export default Group;
export { CreatedGroups, AllTasks };