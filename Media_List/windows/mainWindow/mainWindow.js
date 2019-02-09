const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const url = require("url");
const path = require("path");
const { ipcRenderer } = electron;
const Store = require("../../store.js");

let addWin;
let removeWin;

const addButton = document.getElementById("Add");

addButton.addEventListener("click", function(event) {
  addWin = new BrowserWindow({
    alwaysOnTop: true,
    width: 400,
    height: 200
  });

  // Load the index.html of the app
  addWin.loadURL(
    url.format({
      pathname: path.join(__dirname, "../addWindow/addWindow.html"),
      protocol: "file:",
      slashes: true
    })
  );

  addWin.on("close", function() {
    addWin = null;
  });
  addWin.show();
});

const store = new Store({
  configName: "user-preferences",
  list: {}
});

ipcRenderer.on("item:add", (event, item) => {
  console.log(item);
  store.set(item, item);
});
