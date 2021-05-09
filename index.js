const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { setMainMenu } = require("./main-menu");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  //   win.loadURL("http://localhost:9999");
  setMainMenu();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  ipcMain.on("asynchronous-message", (event, arg) => {
    event.reply("asynchronous-reply", "pong");
  });

  // ipcMain.on("synchronous-message", (event, arg) => {
  //   event.returnValue = "pong";
  // });

  ipcMain.handle("ipc-call", async (event, ...args) => {
    // const result = await somePromise(...args)
    return "hello IPC";
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
