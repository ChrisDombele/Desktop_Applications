const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const url = require("url");
const path = require("path");
const { ipcRenderer } = electron;
const Store = require("../../store.js");
const fs = require("fs");

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

const ul = document.querySelector("ul");

ipcRenderer.on("item:add", function(e, item) {
  const li = document.createElement("li");
  const itemText = document.createTextNode(item);
  li.appendChild(itemText);
  ul.appendChild(li);
});

const store = new Store({ configName: "user-preferences" });

let obj;
fs.readFile(store.path, "utf8", function(err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  add(obj);
});

function add(data) {
  const values = Object.values(data);

  for (var i = 0; i < values.length; i++) {
    const li = document.createElement("li");
    const itemText = document.createTextNode(values[i]);
    li.appendChild(itemText);
    ul.appendChild(li);
  }
}
