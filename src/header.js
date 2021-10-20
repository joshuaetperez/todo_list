import './style.css';

export default function displayHeader() {
  const contentDiv = document.querySelector("#content");

  const headerDiv = document.createElement("div");
  headerDiv.classList.add("header");
  headerDiv.textContent = "Todo list";

  contentDiv.appendChild(headerDiv);
}