document.addEventListener("DOMContentLoaded", function () {
  loadTasks();

  document
    .getElementById("addTaskButton")
    .addEventListener("click", function () {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();

      if (taskText === "") {
        alert("Please enter a task.");
      } else {
        addTask(taskText);
        taskInput.value = "";
        saveTasks();
      }
    });
});

function addTask(text) {
  const taskList = document.getElementById("taskList");
  const noTasksMessage = document.getElementById("noTasksMessage");

  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "none";
  }

  const li = document.createElement("li");
  li.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    taskList.removeChild(li);
    if (taskList.children.length === 0) {
      noTasksMessage.style.display = "block";
    }
    saveTasks();
  });

  li.appendChild(removeButton);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(function (taskItem) {
    tasks.push(taskItem.firstChild.textContent);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  const noTasksMessage = document.getElementById("noTasksMessage");

  tasks.forEach(function (taskText) {
    addTask(taskText);
  });

  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "block";
  }
}
