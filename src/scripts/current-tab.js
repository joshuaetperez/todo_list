// Module that keeps track of the current tab
const CurrentTab = (() => {
  let tab = "Today";

  const getTab = () => tab;
  const setTab = (newTab) => {
    if (newTab === "Today" || newTab === "Next 7 Days" || newTab === "All Tasks" || newTab === "Groups") tab = newTab;
  }; 

  return {getTab, setTab};
})();

export default CurrentTab;