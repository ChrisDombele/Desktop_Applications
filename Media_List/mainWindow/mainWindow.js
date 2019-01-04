const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const { ipcRenderer } = require("electron");

let addWin;
let removeWin;

const addButton = document.getElementById("Add");

addButton.addEventListener("click", function(event) {
  const modalPath = path.join(
    "file://",
    __dirname,
    "../addWindow/addWindow.html"
  );
  addWin = new BrowserWindow({ alwaysOnTop: true, width: 400, height: 200 });
  addWin.on("close", function() {
    addWin = null;
  });
  addWin.loadURL(modalPath);
  addWin.show();
  // addWin.webContents.openDevTools()
});

//Add items to list
const ul = document.querySelector("ul");

ipcRenderer.on("item:add", function(e, item) {
  const li = document.createElement("li");
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});
