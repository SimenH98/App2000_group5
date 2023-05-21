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
    const id = req.body.id;


    const query = 'SELECT * FROM polls ';
    console.log(req.user);

    db.query(query, function (err, rows, fields) {
        if (err) throw err;
        res.render('pollsList', { title: 'polls', polls: rows })
    });





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
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;


    const sql = `INSERT INTO polls (titleText, descriptionText, idCampus, idStudies, question1, question2, question3) VALUES ("${titleText}", "${descriptionText}", "${idCampus}", "${idStudies}", ("${question1}"), ("${question2}"), ("${question3}"))`;



    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log('creating record');
    })

})

router.get('/viewpoll', function (req, res, next) {

    const titleText = req.body.titleText;
    const descriptionText = req.body.descriptionText;
    const idCampus = req.body.idCampus;
    const idStudies = req.body.idStudies;
    const question1 = req.body.question1;
    const question2 = req.body.question2;
    const question3 = req.body.question3;

    let poll = {
        question: ("${titleText}"),
        answers: [
            ("${question1}"), ("${question2}"), ("${question3}")
        ],
        pollCount: 0,
        answersWeight: [0, 0, 0, 0],
        selectedAnswers: -1
    };

    let pollDOM = {
        question: document.querySelector(".poll .question"),
        answers: document.querySelector(".poll .answers")
    };


    const query = 'SELECT * FROM polls, answers ORDER BY id';
    db.query(query, function (err, rows, fields) {
        if (err) throw err;


    })


    pollDOM.question.innerText = poll.question;
    pollDOM.answers.innerHTML = poll.answers.map(function (answer, i) {
        return (`
    <div class="answer" onclick="markAnswer('${i}')">
    ${answer}
    <span class="percentage-bar"></span>
    <span class="percentage-value"></span>
    </div>
    
    `
        );
    }).join("");

    function markAnswer(i) {
        poll.selectedAnswer = +i;
        try {
            document.querySelector(".poll .answers .answer.select").classList.remove("selected");
        } catch (msg) { }
        document.querySelectorAll(".poll .answers .answer")[+i].classList.remove("selected");
        showResults();
    }

    function showResults() {
        let answers = document.querySelectorAll(".poll .answers .answer");
        for (let i = 0; i < answers.length; i++) {
            let percentage = 0;
            if (i == poll.selectedAnswer) {
                percentage = Math.round(
                    (poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1)
                );
            }
            else {
                percentage = Math.round(
                    (poll.answersWeight[i]) * 100 / (poll.pollCount + 1)
                );
            }
            answers[i].querySelector(".percentage-bar").style.width = percentage + "%";
            answers[i].querySelector(".percentage-value").innerText = percentage + "%";
        }
    }
    res.render('viewpoll', { title: 'viewpoll' });
})

// Exporting the router so that it can be used in other files
module.exports = router;