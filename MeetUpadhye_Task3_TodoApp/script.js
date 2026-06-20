let pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

function saveTasks(){
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function addTask(){

    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if(taskText === ""){
        alert("Please enter a task");
        return;
    }

    pendingTasks.push({
        text: taskText,
        addedAt: new Date().toLocaleString()
    });

    input.value = "";

    saveTasks();
    renderTasks();
}

function renderTasks(){

    const pendingList = document.getElementById("pendingTasks");
    const completedList = document.getElementById("completedTasks");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    pendingTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <strong>${task.text}</strong>
                <div class="task-date">
                    Added: ${task.addedAt}
                </div>
            </div>

            <div class="task-buttons">
                <button class="complete-btn" onclick="completeTask(${index})">
                    Complete
                </button>

                <button class="edit-btn" onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deletePendingTask(${index})">
                    Delete
                </button>
            </div>
        `;

        pendingList.appendChild(li);
    });

    completedTasks.forEach((task,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-info">
                <strong>✓ ${task.text}</strong>
                <div class="task-date">
                    Completed: ${task.completedAt}
                </div>
            </div>

            <div class="task-buttons">
                <button class="delete-btn" onclick="deleteCompletedTask(${index})">
                    Delete
                </button>
            </div>
        `;

        completedList.appendChild(li);
    });

}

function completeTask(index){

    const task = pendingTasks[index];

    completedTasks.push({
        text: task.text,
        completedAt: new Date().toLocaleString()
    });

    pendingTasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function editTask(index){

    const newTask = prompt(
        "Edit Task:",
        pendingTasks[index].text
    );

    if(newTask !== null && newTask.trim() !== ""){

        pendingTasks[index].text = newTask;

        saveTasks();
        renderTasks();
    }
}

function deletePendingTask(index){

    pendingTasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function deleteCompletedTask(index){

    completedTasks.splice(index,1);

    saveTasks();
    renderTasks();
}

renderTasks();