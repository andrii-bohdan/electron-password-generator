const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  handle: (channel, callable, event, data) =>
    ipcRenderer.on(channel, callable(event, data)),
  toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
});
