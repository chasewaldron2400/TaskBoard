// Retrieve tasks and nextId from localStorage
let taskList = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
let nextId = localStorage.getItem("nextId") ? JSON.parse(localStorage.getItem("nextId")) : 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

console.log(generateTaskId())

// Todo: create a function to create a task card

function createTaskCard(task) {
    let card = `
    <div id="task-${task.id}" class="card mb-3 draggable" data-task-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <button type="button" class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>
  `;
  return card;
}
let taskContainer = document.getElementById('task-container');

for (const task of taskList) {
    let taskCardHTML = createTaskCard(task);
    taskContainer.innerHTML += taskCardHTML;
}

localStorage.setItem("nextId", JSON.stringify(nextId));

// console.log(createTaskCard(task))

// Todo: create a function to render the task list and make cards draggable
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
  }

function renderTaskList() {
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    taskList.forEach(task => {
        let card = createTaskCard(task);
        switch (task.status) {
            case 'todo':
                $('#todo-cards').append(card);
                break;
            case 'in-progress':
                $('#in-progress-cards').append(card);
                break;
            case 'done':
                $('#done-cards').append(card);
                break;
                default:
                    break;
        }
    });
    $('.draggable').draggable({
        revert: 'invalid',
        stack: '.draggable',
        containment: '.swim-lanes'
    });
}

// console.log(createTaskCard(task))

// Todo: create a function to handle adding a new task

function handleAddTask(event){
event.preventDefault();

let title = $('#taskTitle').val();
let description = $('#taskDescription').val();

if (title.trim() === '') {
    alert('Task title cannot be empty');
    return;
}

let newTask = {
    id: generateTaskId(),
    title: title,
    description: description,
    status: 'todo'
};

taskList.push(newTask);
saveToLocalStorage();
renderTaskList();

$('taskTitle').val('');
$('taskDescription').val('');

$('#formModal').modal('hide')
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let taskId = $(event.target).closest('.card').data('task-id');
    taskList = taskList.filter(task => task.id !== taskId);
    saveToLocalStorage();
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    $('.task-card').draggable({
        revert: 'invalid',
        stack: '.task-card',
        cursor: 'move'
    });

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
   
    $('#taskForm').submit(handleAddTask);

    $('#task-container').on('click', '.delete-task', handleDeleteTask);


});
