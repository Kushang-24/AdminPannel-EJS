const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

const middleware = (req, res, next) => {
    console.log("hello");
    let age = req.query.age;
    if (age >= 18) {
        return next();
    }
    return res.redirect('/');
};

app.get('/', (req, res) => {
    return res.render('layout');
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const pages = ['form-basic', 'ui-buttons', 'ui-alerts', 'ui-card', 'ui-forms',
        'ui-typography', 'authentication-login', 'authentication-register', 'icon-tabler', 'sample-page'
    ];
    if (!pages.includes(page)) {
        return res.status(404).send('Page not found');
    }
    return res.render(`./pages/${page}`);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log('Server not started');
        return false;
    }
    console.log("Server started");
});