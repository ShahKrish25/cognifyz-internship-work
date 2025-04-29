const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

const dataFilePath = path.join(__dirname, 'data.json');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load tasks from data.json
let tasks = [];
if (fs.existsSync(dataFilePath)) {
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    tasks = JSON.parse(fileData);
}

// Helper function to save tasks to data.json
const saveTasksToFile = () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const task = { id: Date.now(), name: req.body.name, done: false };
    tasks.push(task);
    saveTasksToFile();
    res.status(201).json(task);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    saveTasksToFile();
    res.json({ message: 'Updated' });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToFile();
    res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));