import { ipcRenderer } from "electron/renderer";

window.addEventListener("DOMContentLoaded", () => {
  const form: HTMLFormElement = document.querySelector("#add-item");

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const data = new FormData(form);
    const item = data.get("item-name");

    ipcRenderer.send("item:add", item);
  });
});
