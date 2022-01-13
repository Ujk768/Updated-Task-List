let btnAdd = document.getElementById('btnAdd');
let btnDelete = document.getElementById('btnDelete');
let btnSort = document.getElementById('btnSort');
let btnClearInput = document.getElementById('btnClearInput');
let inpTask = document.getElementById('input');
let taskList = document.getElementById('taskList');
let tempSortListTask = document.createElement('input');
let tasks = [];
let doneTasks = [];
let tempTasks = [];

//saves the task list to the local browser
function saveTaskList() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function retrieveList() {
  let retrievedTasks = localStorage.getItem('tasks');
  if (retrievedTasks) {
    tasks = JSON.parse(retrievedTasks);
  }
}

//takes input from user and adds it to the tasks array
function addTask() {
  let taskToAdd = document.getElementById('input');
  //adds the string value from the input field

  let taskToAddValue = taskToAdd.value;
  if (taskToAddValue === '') {
    alert('Input field empty');
    return;
  }
  tasks.push(taskToAddValue);
}
//take elements from the tasks array and add it to the list then push that list to the main val
function addTaskToList() {
  taskList.innerHTML = '';
  for (let i = 0; i < tasks.length; i++) {
    let listTask = document.createElement('li');
    //adding movement buttons
    //adding upward movement button
    if (i != 0) {
      let btnUp = document.createElement('button');
      btnUp.type = 'button';
      btnUp.className = 'fas fa-angle-up';
      btnUp.style.padding = '5px';
      btnUp.style.margin = '5px';
      btnUp.style.color = 'blue';

      btnUp.addEventListener('click', function () {
        let temp = tasks[i];
        tasks[i] = tasks[i - 1];
        tasks[i - 1] = temp;
        // we have to call the function again so that the changes made can be applied this is done recursively
        //because we have changed the order of items in task array calling adding tinto list will again clear the
        //entire list made and add the elements in the correct order
        addTaskToList();
      });
      listTask.appendChild(btnUp);
    }
    //adding downward movement button
    if (i != tasks.length - 1) {
      let btnDown = document.createElement('button');
      btnDown.type = 'button';
      btnDown.className = 'fas fa-angle-down';
      btnDown.style.padding = '5px';
      btnDown.style.margin = '5px';
      btnDown.style.color = 'blue';
      btnDown.addEventListener('click', function () {
        let temp = tasks[i];
        tasks[i] = tasks[i + 1];
        tasks[i + 1] = temp;
        // we have to call the function again so that the changes made can be applied this is done recursively
        //because we have changed the order of items in task array calling adding tinto list will again clear the
        //entire list made and add the elements in the correct order
        addTaskToList();
      });
      listTask.appendChild(btnDown);
    }

    //adding a checkbox to the list
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = 1;
    checkbox.name = 'todo[]';
    checkbox.classList.add('myCheckBox');
    //append the child to the list created
    listTask.appendChild(checkbox);
    let text = tasks[i];
    //append the text created to the list created
    listTask.appendChild(document.createTextNode(text));
    taskList.appendChild(listTask);
    saveTaskList();
  }
}

//function to add item to the tasks array
btnAdd.onclick = function () {
  addTask();
  addTaskToList();
  saveTaskList();
};
//function to clear value in the input field
btnClearInput.onclick = function () {
  let inputval = document.getElementById('input');
  inputval.value = '';
};

document.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    addTask();
    addTaskToList();
    saveTaskList();
  }
});
// function to delete tasks which have been completed
function deleteTasks() {
  tempTasks = [];
  //iterate thorugh all the task elements to check which elements have been checked
  checkedTasks();
  for (let i = 0; i < tasks.length; i++) {
    for (let j = 0; j < doneTasks.length; j++) {
      if (tasks[i] === doneTasks[j]) {
        i++;
      }
    }
    if (i < tasks.length) {
      tempTasks.push(tasks[i]);
    }
  }

  tasks = tempTasks;

  addTaskToList();
  saveTaskList();
}
//tasks which have been checked
function checkedTasks() {
  doneTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    let isCheck = document.getElementsByClassName('myCheckBox')[i].checked;
    if (isCheck) {
      //if the element checkbox is ticked then push it to the donetasks array
      doneTasks.push(tasks[i]);
    }
  }
}

// Sort tasks based on completion
function sortTasks() {
  deleteTasks();
  for (let i = 0; i < doneTasks.length; i++) {
    tasks.push(doneTasks[i]);
  }

  addTaskToList();

  for (let j = tasks.length - doneTasks.length; j < tasks.length; j++) {
    document.getElementsByClassName('myCheckBox')[j].checked = true;
  }
  saveTaskList();
}

btnSort.onclick = sortTasks;

btnDelete.onclick = deleteTasks;

//get the previously stored contents from window.local strorage
retrieveList();
//add those tasks into the tasks array beforehand
addTaskToList();
