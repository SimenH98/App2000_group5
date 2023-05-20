// Importing the express library
const express = require('express');
// Importing the auth controller
const authController = require('../controllers/auth');

const app = express();
// Creating a new router instance
const router = express.Router();
const mysql = require("mysql");

// Creating a MySQL connection object with the database credentials stored in environment variables
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

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

// Setting up a route for the pollsList page ('/pollsList')
router.get('/pollsList', authController.isLoggedIn, (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        // Rendering the 'profile' view
        res.render('pollsList', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});




// Setting up a route for the map page ('/map')
router.get('/map', authController.isLoggedIn, (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        // Rendering the 'map' view
        res.render('map', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});

// Setting up a route for the myPage page ('/myPage')
router.get('/myPage', authController.isLoggedIn, (req, res, next) => {
    console.log(req.user);
    if (req.user) {
        // Rendering the 'myPage' view
        res.render('myPage', {
            user: req.user
        });
    } else {
        res.redirect('/login');
    }

});

router.get('/createPoll', function (req, res, next) {
    res.render('createPoll', { title: 'create poll' });
})

router.post('/create', function (req, res, next) {
    const titleText = req.body.titleText;
    const descriptionText = req.body.descriptionText;
    const idCampus = req.body.idCampus;
    const idStudies = req.body.idStudies;
    const opAnswer = req.body.opAnswer;


    const sql = `INSERT INTO polls (titleText, descriptionText, idCampus, idStudies) VALUES ("${titleText}", "${descriptionText}", "${idCampus}", "${idStudies}")`;

    const sql1 = `INSERT INTO answer (opAnswer) VALUES ("${opAnswer})`

    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('creating record');
    })
    db.query(sql1, function (err, result) {
        if (err) throw err;
        console.log('record created');
        res.redirect('/pollList');
    })
})

router.get('/viewpoll', function (req, res, next) {

    const titleText = req.body.titleText;
    const descriptionText = req.body.descriptionText;
    const idCampus = req.body.idCampus;
    const idStudies = req.body.idStudies;
    const opAnswer = req.body.opAnswer

    const query = 'SELECT * FROM poll, answers ORDER BY id';
    db.query(query, function (err, rows, fields) {
        if (err) throw err;


    })
})

// Exporting the router so that it can be used in other files
module.exports = router;