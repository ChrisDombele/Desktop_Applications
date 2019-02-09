const electron = require("electron");
const path = require("path");
const remote = electron.remote;
const { ipcRenderer } = require("electron");

const form = document.querySelector("form");
var window = remote.getCurrentWindow();

form.addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault();
  const item = document.querySelector("#item").value;
  ipcRenderer.send("item:add", item);
  window.close();
}
