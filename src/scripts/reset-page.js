// Resets the contents of the page (more specifically the content container) when any of the "Today", "Month", "All Tasks", and "Groups" tabs are clicked
// (TODO) Does not do anything if the same tab is clicked sequentially
export default function resetPage() {
  document.querySelector(".main").innerHTML = "";
}