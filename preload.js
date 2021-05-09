const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sabre", {
  getVersions: () => {
    console.log("process", process);
    return process.versions;
  },
  invokeIPC: () => ipcRenderer.invoke("ipc-call", "arg1", "arg2"),
  onAsyncReply: (cb) => {
    ipcRenderer.on("asynchronous-reply", cb);
  },
  sendMessage: (msg) => ipcRenderer.send("asynchronous-message", msg),
});
