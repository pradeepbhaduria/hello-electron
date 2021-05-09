const updateVersions = (versions) => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, versions[type]);
  }
};

window.addEventListener("DOMContentLoaded", async (event) => {
  // IPC invocation
  console.log("ipc response", await window.sabre.invokeIPC());
  // IPC async calls
  window.sabre.onAsyncReply((event, msg) => console.log(" IPC message", msg));
  window.sabre.sendMessage("ping");
  //
  updateVersions(window.sabre.getVersions());
});
