const inputTask = document.querySelector(".user-input");
const addTask = document.querySelector(".user-confirm");
const filter = document.querySelector("#filter");
const showTask = document.querySelector(".show");
let removeTask, doneTask;
let myTasks = [];



function doneTaskFunction(event) {
    const parent = event.target.parentElement.parentElement;
    completedTaskStyle(parent);
    localStorage[parent.innerText] == "unDone" ? localStorage[parent.innerText] = "done" : localStorage[parent.innerText] = "unDone";
}

function removeTaskFunction(event) {
    const parent = event.target.parentElement.parentElement;
    parent.remove(); // remove the element of selected task
    const taskText = event.target.parentElement.previousElementSibling.innerText;
    localStorage.removeItem(taskText);
    myTasks.splice(myTasks.indexOf(taskText), 1); // remove the task from array and local storage
}

function addTaskFunction() {
    if (!myTasks.includes(inputTask.value)) localStorage.setItem(inputTask.value, "unDone");
    inputTask.value = "";

    Object.keys(localStorage).forEach(key => { //add new task to task Array
        if (!myTasks.includes(key)) {
            myTasks.push(key);
            buildList(key);
        }
    });

    selectNewBtns();
    console.log(myTasks);
}

function buildList(task) { //build a list of tasks

    const newArticle = document.createElement("article");
    newArticle.classList.add("show-task");
    showTask.appendChild(newArticle);

    const taskExp = document.createElement("div");
    taskExp.classList.add("task-exp");
    taskExp.innerText = task;
    newArticle.appendChild(taskExp);

    const taskBtns = document.createElement("div");
    taskBtns.classList.add("task-buttons");
    newArticle.appendChild(taskBtns);

    const markTask = document.createElement("button");
    markTask.classList.add("mark-done");
    taskBtns.appendChild(markTask);

    const removeTask = document.createElement("button");
    removeTask.classList.add("remove-task");
    taskBtns.appendChild(removeTask);

    localStorage[task] == "done" ? completedTaskStyle(newArticle) : null;
    // set complete style if task was selected as done
}

function selectNewBtns() {
    doneTask = document.querySelectorAll(".mark-done");
    doneTask.forEach(element => element.addEventListener("click", doneTaskFunction));
    removeTask = document.querySelectorAll(".remove-task");
    removeTask.forEach(element => element.addEventListener("click", removeTaskFunction));
}

function setData() { //set Data and tasks after reload
    const oerderdKeys = Object.keys(localStorage);
    oerderdKeys.sort(); //to keep the tasks in order of Alphabet after reload the site
    oerderdKeys.forEach(key => {
        myTasks.push(key);
        buildList(key);
    });
    selectNewBtns(); // select new created buttons 
}

function completedTaskStyle(element) {
    element.classList.toggle("completed");
}

function filterList() {
    const value = filter.value;
    switch (value) {
        case "all":
            showTask.innerHTML = "";
            setData();
            break;
        case "completed":
            showTask.innerHTML = "";

            const completedKeys = Object.keys(localStorage);
            completedKeys.sort(); //to keep the tasks in order of Alphabet after reload the site
            completedKeys.forEach(key => {
                if (localStorage[key] == "done") {
                    buildList(key);
                }
            });
            selectNewBtns();
            break;
        case "uncompleted":
            showTask.innerHTML = "";
            const uncompletedKeys = Object.keys(localStorage);
            uncompletedKeys.sort(); //to keep the tasks in order of Alphabet after reload the site
            uncompletedKeys.forEach(key => {
                if (localStorage[key] == "unDone") {
                    buildList(key);
                }
            });
            selectNewBtns();
            break;
    }
}

addTask.addEventListener("click", addTaskFunction);
inputTask.addEventListener("keydown", (event) => event.key == "Enter" ? addTaskFunction() : null);
filter.addEventListener("click", filterList);

setData();


