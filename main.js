let form = document.querySelector("form");
let itemsContainer = document.querySelector(".list");
let textInput = document.querySelector(".text");
let arrOfItems = [];
if (localStorage.getItem("task")) {
  arrOfItems = JSON.parse(localStorage.getItem("task"));
  getFromLocalStorage();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputData = textInput.value;
  if (inputData != "") {
    addTaskToArray(inputData);
    textInput.value = "";
  }
});

function addTaskToArray(data) {
  let task = {
    id: Date.now(),
    text: data,
  };
  arrOfItems.push(task);
  addToLocalStorage(arrOfItems);
  addToPage(arrOfItems);
}
itemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeFromLocalStorage(e.target.parentElement.getAttribute("id"));
    e.target.parentElement.remove();
  }
});

function addToPage(arrOfItems) {
  itemsContainer.innerHTML = "";
  arrOfItems.forEach((task) => {
    let div = document.createElement("div");
    div.className = "item";
    div.setAttribute("id", task.id);
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(task.text));
    let button = document.createElement("button");
    button.className = "delete";
    button.innerHTML = "Delete";
    div.append(p, button);
    itemsContainer.appendChild(div);
  });
}
function removeFromLocalStorage(taskid) {
  arrOfItems = arrOfItems.filter((task) => task.id != taskid);
  addToLocalStorage(arrOfItems);
}
function addToLocalStorage(arrOfTasks) {
  localStorage.setItem("task", JSON.stringify(arrOfTasks));
}
function getFromLocalStorage() {
  let data = localStorage.getItem("task");
  if (data) {
    let arrOfData = JSON.parse(data);
    addToPage(arrOfData);
  }
}
