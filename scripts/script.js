const inputTask = document.querySelector(".user-input");
const addTask = document.querySelector(".user-confirm");
const filter = document.querySelector("#filter");
const show = document.querySelector(".show");
let myTasks = [];


show.addEventListener("click", (event) => {
    const id = event.target.id;
    if (id === "done-btn") {
        doneTaskFunction(event);
    } else if (id === "remove-btn") {
        removeTaskFunction(event);
    } else if (id === "edit-btn") {
        editTaskFunction(event);
    }
})

function doneTaskFunction(event) {
    const parent = event.target.parentElement.parentElement;
    const taskText = event.target.parentElement.previousElementSibling.value;
    console.log(taskText);
    completedTaskStyle(parent);

    myTasks = JSON.parse(localStorage.getItem("Data"));
    myTasks.forEach(item => {
        if (item.text == taskText) {
            item.status === "unDone" ? item.status = "done" : item.status = "unDone";
            localStorage.setItem('Data', JSON.stringify(myTasks));
        }
    });
}

function removeTaskFunction(event) {
    const parent = event.target.parentElement.parentElement;
    parent.remove(); // remove the element of selected task
    const taskText = event.target.parentElement.previousElementSibling.innerText;
    myTasks = JSON.parse(localStorage.getItem("Data"));
    const newData = myTasks.filter(item => item.text != taskText);
    localStorage.setItem('Data', JSON.stringify(newData));
}

let previousTask ;
function editTaskFunction(event) {
    const taskElement = event.target.parentElement.previousElementSibling;
    console.log()
    if (event.target.classList[1] == null) {
        previousTask = taskElement.value;
        taskElement.removeAttribute("readonly");
        event.target.classList.add("active");
    } else if(event.target.classList[1] == "active"){
        changeTaskText(previousTask , taskElement.value);
        taskElement.setAttribute("readonly" , '');
        event.target.classList.remove("active");
    }

}

function changeTaskText(previousText , currentText){
    myTasks = JSON.parse(localStorage.getItem('Data'));
    myTasks.forEach(item => {
        item.text == previousText ? item.text = currentText : null;
    });
    localStorage.setItem('Data' , JSON.stringify(myTasks));
}

function addTaskFunction() {
    const task = inputTask.value.trim();
    if (task.length > 0) {
        const taskData = {
            text: task,
            status: "unDone"
        }

        if (localStorage.getItem('Data') == null) {
            myTasks.push(taskData);
            localStorage.setItem('Data', JSON.stringify(myTasks));
        } else {
            myTasks = JSON.parse(localStorage.getItem("Data"));
            myTasks.push(taskData);
            localStorage.setItem('Data', JSON.stringify(myTasks));
        }
        buildList(task);
    }
    inputTask.value = '';
}

function buildList(task, status) { //build a list of tasks

    const newArticle = document.createElement("article");
    newArticle.classList.add("show-task");
    newArticle.innerHTML = `
    <textarea class="task-exp" cols="45" rows="4" spellcheck="false" readonly>${task}</textarea>
                <div class="task-buttons">
                    <button class="mark-done" id="done-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                        </svg>
                    </button>
                    <button class="remove-task" id="remove-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                        </svg>
                    </button>
                    <button class="edit-task" id="edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                        </svg>
                    </button>
                </div>
    `
    show.appendChild(newArticle);

    status == "done" ? completedTaskStyle(newArticle) : null;
    // set complete style if task was selected as done
}

function loadData() { //load Data and tasks after reload
    if (localStorage.getItem('Data') != null) {
        JSON.parse(localStorage.getItem("Data")).forEach(item => {
            buildList(item.text, item.status);
        });
    }
}

function completedTaskStyle(element) {
    element.classList.toggle("done");
}

function filterList() {
    const value = filter.value;
    switch (value) {
        case "all":
            show.innerHTML = "";
            loadData();
            break;

        case "completed":
            show.innerHTML = "";
            if (localStorage.getItem('Data') != null) {
                JSON.parse(localStorage.getItem("Data")).forEach(item => {
                    item.status == "done" ? buildList(item.text, item.status) : null;
                });
            }
            break;

        case "uncompleted":
            show.innerHTML = "";
            if (localStorage.getItem('Data') != null) {
                JSON.parse(localStorage.getItem("Data")).forEach(item => {
                    item.status == "unDone" ? buildList(item.text, item.status) : null;
                });
            }
            break;
    }
}

addTask.addEventListener("click", (event) => {
    event.preventDefault();
    addTaskFunction();
});
inputTask.addEventListener("keydown", (event) => event.key == "Enter" ? addTaskFunction() : null);
filter.addEventListener("change", filterList);

loadData();


