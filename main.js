// Modules
const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");
const { loadViewFile } = require("./main/filesystem");
require("dotenv").config();
const { menu } = require("./main/menu");


let mainWindow;
ipcMain.on("app-event", (event, data) => {
 

  event.reply(data.channel, data.payload);
});
function createWindow() {
  let state = windowStateKeeper({
    defaultWidth: 850,
    defaultHeight: 450,
  });

  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 450,
    minHeight: 300,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });
  process.env.MAIN_WINDOW_ID = mainWindow.id;

  Menu.setApplicationMenu(menu);
  mainWindow.loadFile("./renderer/view/index.html");
  state.manage(mainWindow);
  mainWindow.webContents.on("did-finish-load", () => {
   
    loadViewFile();
  });



  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
