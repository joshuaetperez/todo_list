import './style.css';

export default function displayFooter() {
  const contentDiv = document.querySelector("#content");

  const footerDiv = document.createElement("div");
  footerDiv.classList.add("footer");
  footerDiv.textContent = "This is the footer";

  contentDiv.appendChild(footerDiv);
}