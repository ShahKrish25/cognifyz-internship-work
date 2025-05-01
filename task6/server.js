const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./models/Task');
const User = require('./models/User');
const auth = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
const dbUrl = 'mongodb+srv://krish:HoARFeJKjlgeOpCB@task6cluster.khxdbks.mongodb.net/';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'myKey2509', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });    
    }
});

// Get all tasks (authenticated)
app.get('/api/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new task (authenticated)
app.post('/api/tasks', auth, async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Task name required' });
    }
    try {
        const task = new Task({ name, user: req.user.userId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a task (authenticated)
app.put('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.done = !task.done;
        await task.save();
        res.json({ message: 'Updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a task (authenticated)
app.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));