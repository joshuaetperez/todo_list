import './style.css';

export default function displayContainer() {
  const contentDiv = document.querySelector("#content");

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container");

  contentDiv.appendChild(containerDiv);
}