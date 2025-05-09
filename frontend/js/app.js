document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const task = document.getElementById("taskInput").value;

  fetch("/api/tasks.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Task added successfully!");
        loadTasks();
      } else {
        alert("Failed to add task.");
      }
    });
});

function loadTasks() {
  fetch("/api/tasks.php")
    .then((response) => response.json())
    .then((tasks) => {
      const tbody = document.querySelector("#taskTable tbody");
      tbody.innerHTML = "";
      tasks.forEach((task) => {
        const row = `<tr><td>${task.task}</td><td>${task.status}</td></tr>`;
        tbody.innerHTML += row;
      });
    });
}

loadTasks();
