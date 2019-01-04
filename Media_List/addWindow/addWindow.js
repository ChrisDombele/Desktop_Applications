const electron = require("electron");
const path = require("path");
const remote = electron.remote;
const { ipcRenderer } = require("electron");
const input = document.getElementById("item");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const form = document.querySelector("form");
form.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  const item = document.querySelector("#item").value;
  if (item === "") {
    alert("You must write something");
  } else {
    ipcRenderer.send("item:add", item);
  }
  //close the window here
  // let window = remote.getCurrentWindow();
  // window.close();
}

const closeBtn = document.getElementById("closeWindow");
closeBtn.addEventListener("click", function(event) {
  let window = remote.getCurrentWindow();
  window.close();
});

//Handles local storage of items

localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));

form.addEventListener("submit", function(e) {
  e.preventDefault();

  itemsArray.push(input.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  ipcRenderer.send(item);
  input.value = "";
});
data.forEach(item => {
  const item = document.querySelector("#item").value;
  ipcRenderer.send(item);
});
