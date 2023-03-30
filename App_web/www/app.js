// Import required modules and libraries
const express = require("express"); // express framework
const path = require('path'); // built-in Node.js module for file path handling
const mysql = require("mysql"); // MySQL database library
const dotenv = require('dotenv'); // library for loading environment variables from .env file
const cookieParser = require('cookie-parser'); // cookie parsing library


// Load environment variables from .env file
dotenv.config({ path: './.env'});

// Initialize the express app
const app = express();

// Create MySQL database connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Define the public directory for static files like CSS and images
const publicDirectory = path.join(__dirname, './css');
const publicDirectory2 = path.join(__dirname, './anime-master');
const publicDirectory3 = path.join(__dirname, './js');
app.use(express.static(publicDirectory));
app.use(express.static(publicDirectory2));
app.use(express.static(publicDirectory3));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// Parse cookies
app.use(cookieParser());

// Set the view engine to use handlebars (hbs)
app.set('view engine', 'hbs');

// Connect to the MySQL database
db.connect( (Error) => {
    if(Error) {
        console.log(Error)
    } else {
        console.log("MYSQL connected...")
    }
})

// Define the routes for the app
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


// Start the app on port 5000
app.listen(5003, () => {
    console.log("server started on Port 5003");
})