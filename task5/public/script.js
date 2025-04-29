const API = "/api/tasks";

const input = document.getElementById("taskInput");
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

async function fetchTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <div class="flex justify-between items-center bg-gray-50 border border-gray-200 rounded px-4 py-2 shadow-sm hover:shadow-md transition">
    <span class="${
      task.done ? "line-through text-gray-400" : "text-gray-800"
    } font-medium">
      ${task.name}
    </span>
    <div class="flex gap-2">
      <button onclick="toggleDone(${task.id})"
        class="text-sm px-2 py-1 rounded bg-green-200 text-green-700 hover:bg-green-200 transition">
        ${task.done ? "Undo" : "Done"}
      </button>
      <button onclick="deleteTask(${task.id})"
        class="text-sm px-2 py-1 rounded bg-red-200 text-red-700 hover:bg-red-200 transition">
        Delete
      </button>
    </div>
  </div>
`;

    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value) {
    // alert("Please enter a task name.");
    input.classList.toggle("error");
    input.placeholder = "Please enter a task name.";
    setTimeout(() => {
      input.classList.toggle("error");
      input.placeholder = "Task name...";
    }, 2000);
    return;
  } else {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input.value }),
    });
    input.value = "";
    fetchTasks();
  }
}

async function toggleDone(id) {
  await fetch(`${API}/${id}`, { method: "PUT" });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
