const { app, BrowserWindow, nativeTheme, ipcMain } = require("electron");
const path = require("path");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./src/preload.js"),
    },
  });

  win.webContents.openDevTools();
  win.loadFile("./index.html");

  ipcMain.handle("dark-mode:toggle", async () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });
}

app.whenReady().then(() => {
  nativeTheme.themeSource = "light";
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("generate-password", async (event, password) => {
  const minLength = password.length > 12 ? password.length : 12;
  const randomPassword = strongPasswordGenerator(password, minLength);
  win.webContents.send("generate-password", randomPassword);
});

function strongPasswordGenerator(password, salt = 8) {
  let signs = ["#", "%", "?", "!", "/", "", "#"];
  let numbers;
  let capital;
  let small;

  if (isNumber(password)) {
    capital = ["A", "B", "C", "D", "E", "F", "G"];
    small = ["a", "b", "c", "d", "e", "f", "g"];
    numbers = [...password.split("")];
  } else {
    capital = password.toUpperCase();
    small = password.toLowerCase();
    numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  }

  const mixDigits = [...signs, ...numbers, ...capital, ...small];
  let strongPass = [];

  for (let i = 0; i < mixDigits.length; i++) {
    let hash = Math.floor(Math.random() * mixDigits.length);
    strongPass.push(mixDigits[hash]);
  }
  return strongPass.join("").trim().slice(0, salt);
}

function isNumber(val) {
  return /^\d+$/.test(val);
}
