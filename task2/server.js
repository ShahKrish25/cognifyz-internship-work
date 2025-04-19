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
    const { username, college, dept, year, hobby } = req.body;
    const errors = [];

    if (!username || !/^[a-zA-Z0-9_]{3,}$/.test(username)) {
        errors.push('Username must be at least 3 characters and contain only letters, numbers, or underscores.');
    }
    if (!college) {
        errors.push('College is required.');
    }
    if (!dept) {
        errors.push('Department is required.');
    }
    if (!['1st', '2nd', '3rd', '4th'].includes(year)) {
        errors.push('Invalid year of study.');
    }
    if (!hobby) {
        errors.push('Hobby is required.');
    }

    if (errors.length > 0) {
        // return res.render('index', {
        //     title: 'Krish',
        //     errors,
        //     formData: { username, college, dept, year, hobby }
        // });
        res.render('invalid', { title: 'Krish', errors });
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
    res.render('response', submission);
});

app.listen(3000, () => {
    console.log("Krish's server is running at http://localhost:3000");
});
