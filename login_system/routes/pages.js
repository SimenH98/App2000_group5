// Importing the express library
const express = require('express');
// Importing the auth controller
const authController = require('../controllers/auth');

// Creating a new router instance
const router = express.Router();

// Setting up a route for the home page ('/')
router.get('/', authController.isLoggedIn, (req, res, next) => {
    // Rendering the 'index' view
    res.render('index', {
        user: req.user
    });
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

// Setting up a route for the profile page ('/profile')
router.get('/profile', authController.isLoggedIn, (req, res) => {
    
    if( req.user ) {
        // Rendering the 'profile' view
        res.render('profile', {
            user: req.user
        }); 
    } else {
        res.redirect('/login');
    }
    
});

// Exporting the router so that it can be used in other files
module.exports = router;
