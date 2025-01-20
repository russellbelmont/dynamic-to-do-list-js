document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');  // The "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for new tasks
    const taskList = document.getElementById('task-list');      // Unordered list to display tasks

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Get stored tasks or default to empty array
        storedTasks.forEach(taskText => addTask(taskText, false));  // Add each task to the DOM
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        // If the taskText is empty, do nothing
        if (taskText.trim() === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item (<li>)
        const newTask = document.createElement('li');
        newTask.textContent = taskText;  // Set the text of the list item to the task

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');  // Add class to style the remove button

        // Add event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(newTask);  // Remove the task from the DOM
            removeTaskFromLocalStorage(taskText); // Also remove from Local Storage
        };

        // Append the remove button to the task
        newTask.appendChild(removeButton);

        // Append the new task to the task list
        taskList.appendChild(newTask);

        // Save the task to Local Storage if required
        if (save) {
            saveTaskToLocalStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = "";
    }

    // Function to save a task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // Get existing tasks from Local Storage
        storedTasks.push(taskText);  // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  // Save the updated tasks array to Local Storage
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // Get existing tasks from Local Storage
        const updatedTasks = storedTasks.filter(task => task !== taskText);  // Filter out the removed task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save the updated tasks array to Local Storage
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();  // Get the task text and trim it
        addTask(taskText);  // Add the task if it's not empty
    });

    // Event listener for the "Enter" key press in the input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {  // Check if the "Enter" key is pressed
            const taskText = taskInput.value.trim();  // Get the task text and trim it
            addTask(taskText);  // Add the task if it's not empty
        }
    });

    // Load tasks from Local Storage when the page is loaded
    loadTasks();
});
