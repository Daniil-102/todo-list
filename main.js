const inp = document.querySelector('.task__input');
const add = document.querySelector('.task__add');
const items = document.querySelector('.todo-list__items');
const item = document.querySelector('.todo-list__item');
const list = document.querySelector('.todo-list');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task));
} 

chekEmptyList();

add.addEventListener('click', addTask);
items.addEventListener('click', deleteTask);
items.addEventListener('click', doneTask);


function addTask () {
    if (inp.value.length > 0) {
        const newTask = {
            id: Date.now(),
            text: inp.value,
            done: false
        }
        tasks.push(newTask)
        
        inp.value='';
        inp.focus()

        renderTask(newTask)
        chekEmptyList()
        saveToLocalStorage()
    }
    
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const item = event.target.closest('.todo-list__item');
    const id = item.id;

    const index = tasks.findIndex((task) => task.id == id);

    tasks.splice(index, 1)

    saveToLocalStorage()

    item.remove();

    chekEmptyList()
    
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const item = event.target.closest('.todo-list__item');

    const id = item.id;
    const task = tasks.find((task) => task.id==id);
    task.done = !task.done;
    
    saveToLocalStorage()


    const title = item.querySelector('.todo-list__item-name');
    title.classList.toggle('done'); 

}    

function chekEmptyList() {
    if (tasks.length === 0) {
        const emptyList = `<h3 class="todo-list__title">Список дел пуст</h3>`;
        list.insertAdjacentHTML('afterbegin', emptyList)
    }

    if (tasks.length > 0) {
        const empty = document.querySelector('.todo-list__title');
        empty ? empty.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "todo-list__item-name done" : "todo-list__item-name"

    const taskHTML = `
                <div id="${task.id}" class="todo-list__item">
                    <span class="${cssClass}">${task.text}</span>
                    <div class="todo-list__item-buttons">
                        <button data-action="done" class="todo-list__item-done" type="button">
                            <img class="img-done" src="img/done.png" alt="done">
                        </button>
                        <button data-action="delete" class="todo-list__item-delete" type="button">
                            <img class="img-delete" src="img/del.png" alt="del">
                        </button>
                    </div>
                </div>`;
    items.insertAdjacentHTML('beforeend', taskHTML)
}

































