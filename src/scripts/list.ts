import { ipcRenderer } from "electron/renderer";

const ul: HTMLUListElement = document.querySelector("ul");

ipcRenderer.on("item:add", (_, item) => {
  const li = document.createElement("li");

  li.appendChild(document.createTextNode(item));
  ul.appendChild(li);
});
