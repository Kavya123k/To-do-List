
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', manageTask);

    function addTask(e) {
        e.preventDefault();

        const taskText = taskInput.value;
        if (taskText === '') return;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);

        taskInput.value = '';
    }

    function manageTask(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        } else if (e.target.classList.contains('complete-btn')) {
            e.target.parentElement.classList.toggle('completed');
        } else if (e.target.classList.contains('edit-btn')) {
            const li = e.target.parentElement;
            const span = li.querySelector('span');
            const newText = prompt('Edit your task:', span.textContent);
            if (newText !== null) {
                span.textContent = newText;
            }
        }
    }
});