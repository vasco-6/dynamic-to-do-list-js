document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            saveTasks();
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = '';

        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach((item) => {
            tasks.push(item.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach((taskText) => {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-btn';
            removeButton.onclick = () => {
                taskList.removeChild(listItem);
                saveTasks();
            };

            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);
        });
    }
});
