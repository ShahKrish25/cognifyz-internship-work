const express = require('express');
const app = express();

app.set('views', './templates');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get(('/'), (req, res) => {
    res.render('index', { title: 'Krish' });
})

app.post(('/process'), (req, res) => {
    const username = req.body.username;
    const hobby = req.body.hobby;
    const date = new Date().toLocaleString();
    res.render('response', { username, hobby, date });
})

app.listen(3000, () => {
    console.log('The server is live at http://localhost:3000');
});