const express = require('express');  // Import the Express.js library
const authController = require('../controllers/auth')  // Import the authController module

const router = express.Router();  // Create a new Router object

router.post('/register', authController.register )  // Set up a route to handle user registration

router.post('/login', authController.login )  // Set up a route to handle user login

router.get('/logout', authController.logout );

module.exports = router;  // Export the router object so it can be used by other modules