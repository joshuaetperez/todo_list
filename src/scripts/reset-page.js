import CurrentTab from "./current-tab.js";

// Resets the contents of the page (more specifically the content container) when any of the "Today", "Month", "All Tasks", and "Groups" tabs are clicked
export default function resetPage() {
  document.querySelector(".main").innerHTML = "";
}