const { app, dialog, Menu } = require("electron");
const fs = require("fs");
const path = require("path");

function showMessage(browserWindow) {
  dialog.showMessageBox({
    type: "info",
    message: "hello",
    detail: "detailed message",
  });
}

async function showSaveDialog() {
  dialog
    .showSaveDialog({
      defaultPath: path.join(app.getPath("downloads"), "memory-info.txt"),
    })
    .then(async (filename) => {
      console.log("filenam,e", filename);
      if (filename) {
        const memInfo = JSON.stringify(await process.getProcessMemoryInfo());
        fs.writeFile(filename.filePath, memInfo, "utf-8", (err) => {
          if (err) dialog.showErrorBox("Save Failed", err.message);
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

async function showOpenDialog() {
  dialog
    .showOpenDialog({
      defaultPath: app.getPath("downloads"),
      filters: [{ name: "Text Files", extensions: ["txt"] }],
    })
    .then(async (response) => {
      console.log("response", response);
      if (response) {
        console.log(fs.readFileSync(response.filePaths[0], "utf-8"));
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

module.exports = { showMessage, showOpenDialog, showSaveDialog };
