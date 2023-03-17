// Importing the express library
const express = require('express');

// Creating a new router instance
const router = express.Router();

// Setting up a route for the home page ('/')
router.get('/', (req, res, next) => {
    // Rendering the 'index' view
    res.render('index');
});

// Setting up a route for the registration page ('/register')
router.get('/register', (req, res, next) => {
    // Rendering the 'register' view
    res.render('register');
});

// Setting up a route for the login page ('/login')
router.get('/login', (req, res, next) => {
    // Rendering the 'login' view
    res.render('login');
});

// Exporting the router so that it can be used in other files
module.exports = router;
