import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItemConstructorOptions,
} from "electron";
import * as path from "path";
import { createFormWindow } from "./form";

const createMenuTemplate = (
  parentWin: BrowserWindow
): MenuItemConstructorOptions[] => {
  return [
    {
      label: "File",
      submenu: [
        {
          label: "New item",
          click: () => {
            createFormWindow(parentWin);
          },
        },
        {
          label: "Quit",
          accelerator: "CommandOrControl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    process.env.NODE_ENV !== "production" && {
      label: "Developers Tools",
      submenu: [
        {
          label: "Toggle DevTools",
          accelerator: "CommandOrControl+Shift+I",
          click: (_, win) => {
            win.webContents.toggleDevTools();
          },
        },
        { role: "reload" },
      ],
    },
  ];
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, "/scripts/preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "/views/index.html"));

  return mainWindow;
};

app.on("ready", () => {
  let win = createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) win = createWindow();
  });

  const menu = Menu.buildFromTemplate(createMenuTemplate(win));
  Menu.setApplicationMenu(menu);

  ipcMain.on("item:add", (e, data) => {
    win.webContents.send("item:add", data);
    BrowserWindow.fromWebContents(e.sender).close();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
