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
        addTask(taskText, false);
        taskInput.value = "";
        saveTasks();
      }
    });
});

function addTask(text, completed) {
  const taskList = document.getElementById("taskList");
  const noTasksMessage = document.getElementById("noTasksMessage");

  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "none";
  }

  const li = document.createElement("li");
  li.classList.add("visible");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.title = completed ? "Unmark" : "Mark as completed";

  checkbox.addEventListener("change", function () {
    checkbox.title = checkbox.checked ? "Unmark" : "Mark as completed";
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  li.classList.toggle("completed", completed);

  const taskText = document.createElement("span");
  taskText.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    li.classList.add("removing");
    li.addEventListener("transitionend", function () {
      taskList.removeChild(li);
      if (taskList.children.length === 0) {
        noTasksMessage.style.display = "block";
      }
      saveTasks();
    });
  });

  li.appendChild(checkbox);
  li.appendChild(taskText);
  li.appendChild(removeButton);

  taskList.insertBefore(li, taskList.firstChild);

  setTimeout(() => li.classList.add("visible"), 10);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(function (taskItem) {
    const taskText = taskItem.querySelector("span").textContent;
    const isCompleted = taskItem.querySelector(
      "input[type='checkbox']"
    ).checked;
    tasks.unshift({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  const noTasksMessage = document.getElementById("noTasksMessage");

  tasks.forEach(function (task) {
    addTask(task.text, task.completed);
  });

  if (taskList.children.length === 0) {
    noTasksMessage.style.display = "block";
  }
}
