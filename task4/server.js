const express = require('express');
const app = express();
const path = require('path');

// Temporary in-memory store
let submissions = [];

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Krish', errors: [], formData: {} });
});

app.post('/process', (req, res) => {
    const { username, password, college, dept, year, hobby } = req.body;
    const errors = [];

    if (!username || !/^[a-zA-Z0-9_]{3,}$/.test(username)) {
        errors.push('Username must be at least 3 characters and contain only letters, numbers, or underscores.');
    }
    if (!password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
        errors.push('Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
    }
    if (!college || !/^[A-Z][a-zA-Z\s]*$/.test(college) || /^\d+$/.test(college)) {
        errors.push('College must start with a capital letter and contain only letters and spaces.');
    }
    const validDepts = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Chemical'];
    if (!dept || !validDepts.includes(dept)) {
        errors.push(`Department must be one of: ${validDepts.join(', ')}`);
    }
    if (!['1st', '2nd', '3rd', '4th'].includes(year)) {
        errors.push('Invalid year of study.');
    }
    if (!hobby || hobby.length > 50) {
        errors.push('Hobby is required and must be 50 characters or less.');
    }

    if (errors.length > 0) {
        return res.render('index', {
            title: 'Krish',
            errors,
            formData: { username, college, dept, year, hobby }
        });
    }

    const submission = {
        username,
        college,
        dept,
        year,
        hobby,
        date: new Date().toLocaleString()
    };
    submissions.push(submission);
    // console.log('Current submissions:', submissions);
    res.render('result', submission);
});

app.get('/history', (req, res) => {
    res.json(submissions);
});

app.delete('/history', (req, res) => {
    submissions = [];
    res.sendStatus(200);
})
app.listen(3000, () => {
    console.log("Krish's server is running at http://localhost:3000");
});