document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');  // The "Add Task" button
    const taskInput = document.getElementById('task-input');    // Input field for new tasks
    const taskList = document.getElementById('task-list');      // Unordered list to display tasks

    // Function to add a task to the list
    function addTask() {
        const taskText = taskInput.value.trim();  // Get and trim the task input value

        // If the input is not empty
        if (taskText !== "") {
            // Create a new list item (<li>)
            const newTask = document.createElement('li');
            newTask.textContent = taskText;  // Set the text of the list item to the task

            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');  // Add styling class to the button

            // Event listener to remove the task when the button is clicked
            removeButton.onclick = function () {
                taskList.removeChild(newTask);  // Remove the task from the list
            };

            // Append the remove button to the new list item
            newTask.appendChild(removeButton);

            // Append the new task to the task list
            taskList.appendChild(newTask);

            // Clear the input field after adding the task
            taskInput.value = "";
        } else {
            alert("Please enter a task!");  // Alert the user if the input is empty
        }
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for the "Enter" key press in the input field to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();  // Call addTask function when Enter is pressed
        }
    });
});
