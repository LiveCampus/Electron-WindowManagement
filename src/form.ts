import { BrowserWindow } from "electron";
import * as path from "path";

const createWindow = (parentWin: BrowserWindow) => {
  const formWindow = new BrowserWindow({
    parent: parentWin,
    width: 300,
    height: 300,
    title: "Formulaire",
    webPreferences: {
      preload: path.join(__dirname, "scripts/preload-form.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  formWindow.loadFile(path.join(__dirname, "views/form.html"));
};

export { createWindow as createFormWindow };
