const API = "/api/tasks";

async function fetchTasks() {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
        const res = await fetch(API, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const tasks = await res.json();
        const list = document.getElementById("taskList");
        list.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="flex justify-between items-center bg-gray-50 border border-gray-200 rounded px-4 py-2 shadow-sm hover:shadow-md transition">
                    <span class="${task.done ? "line-through text-gray-400" : "text-gray-800"} font-medium">
                        ${task.name}
                    </span>
                    <div class="flex gap-2">
                        <button onclick="toggleDone('${task._id}')"
                            class="text-sm px-2 py-1 rounded bg-green-200 text-green-700 hover:bg-green-300 transition">
                            ${task.done ? "Undo" : "Done"}
                        </button>
                        <button onclick="deleteTask('${task._id}')"
                            class="text-sm px-2 py-1 rounded bg-red-200 text-red-700 hover:bg-red-300 transition">
                            Delete
                        </button>
                    </div>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        showError('auth-error', 'Failed to load tasks. Please log in again.');
        logout();
    }
}

async function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) {
        input.classList.add("error");
        input.placeholder = "Please enter a task name.";
        setTimeout(() => {
            input.classList.remove("error");
            input.placeholder = "New Task";
        }, 2000);
        return;
    }
    try {
        const token = localStorage.getItem('token');
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ name: input.value })
        });
        input.value = "";
        fetchTasks();
    } catch (err) {
        showError('auth-error', 'Failed to add task. Please log in again.');
    }
}

async function toggleDone(id) {
    const token = localStorage.getItem('token');
    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
    });
    fetchTasks();
}

async function deleteTask(id) {
    const token = localStorage.getItem('token');
    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    fetchTasks();
}

async function login() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if (!username.value || !password.value) {
        showError('auth-error', 'Please enter username and password.');
        [username, password].forEach(input => {
            if (!input.value) {
                input.classList.add('error');
                setTimeout(() => input.classList.remove('error'), 2000);
            }
        });
        return;
    }
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Login failed');
        }
        localStorage.setItem('token', data.token);
        username.value = '';
        password.value = '';
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('task-section').classList.remove('hidden');
        fetchTasks();
    } catch (err) {
        showError('auth-error', err.message);
    }
}

async function register() {
    const username = document.getElementById('reg-username');
    const password = document.getElementById('reg-password');
    if (!username.value || !password.value) {
        showError('auth-error', 'Please enter username and password.');
        [username, password].forEach(input => {
            if (!input.value) {
                input.classList.add('error');
                setTimeout(() => input.classList.remove('error'), 2000);
            }
        });
        return;
    }
    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value })
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        showError('auth-error', 'Registration successful! Please log in.', 'text-green-500');
        showLogin();
    } catch (err) {
        showError('auth-error', err.message);
    }
}

function logout() {
    localStorage.removeItem('token');
    document.getElementById('task-section').classList.add('hidden');
    document.getElementById('auth-section').classList.remove('hidden');
    document.getElementById('taskList').innerHTML = '';
}

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
}

function showError(id, message, className = 'text-red-500') {
    const error = document.getElementById(id);
    error.textContent = message;
    error.className = className;
    error.classList.remove('hidden');
    setTimeout(() => error.classList.add('hidden'), 3000);
}

// Initial check
if (localStorage.getItem('token')) {
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('task-section').classList.remove('hidden');
    fetchTasks();
}