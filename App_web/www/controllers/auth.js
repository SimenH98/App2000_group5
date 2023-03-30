const mysql = require("mysql"); // Importing the MySQL module
const jwt = require('jsonwebtoken'); // Importing the JSON Web Token (JWT) module
const bcrypt = require('bcryptjs'); // Importing the Bcrypt module for password hashing
const { promisify } = require('util');
const { error } = require("console");

// Creating a MySQL connection object with the database credentials stored in environment variables
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// Exporting a function for handling the login route
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extracting the email and password from the request body

        // Checking if both email and password were provided
        if( !email || !password ) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
        }

        // Querying the database for a user with the provided email
        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            console.log(results);
            // Checking if a user with the provided email was found and if the provided password matches the hashed password in the database
            if( !results || results.length === 0 || !(await bcrypt.compare(password, results[0].password)) ) {
                // If the email or password is incorrect, render the login page with an error message
                res.status(401).render('login', {
                    message: 'Email or Password is incorrect'
                })
            } else {
                // If the email and password are correct, generate a JWT for the user and set it as a cookie
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions );
                res.status(200).redirect("/");
            }

        })
        
    } catch (error) {
        console.log(error); 
    }
}

// Exporting a function for handling the register route
exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body; // Extracting the name, email, password, and password confirmation from the request body

    // Querying the database to see if a user with the provided email already exists
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        // If a user with the provided email already exists, render the registration page with an error message
        if( results.length > 0 ) {
            return res.render('register', {
                message: 'That email is already in use'        
            })
        } else if( password !== passwordConfirm ) {
            // If the provided passwords do not match, render the registration page with an error message
            return res.render('register', {
                message: 'Passwords do not match'        
            });
        }

        // Hashing the password using Bcrypt
        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        // Insert the user data into the database
        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword }, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);

                // Render the registration page with a success message
                return res.render('register', {
                    message: 'User registered'        
                });
            }
        })

    });

}

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies);
     if( req.cookies.jwt) {
         try {
           //1) verify the token  
           const decoded = await promisify(jwt.verify)(req.cookies.jwt,
           process.env.JWT_SECRET
           );
             
           console.log(decoded);
           
           // Check if the user still exists
           db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
             console.log(result);
 
             if(!result) {
                 return next();
             }
 
             req.user = result[0];
             return next();
 
           });
         } catch (error) {
           console.log(error);
           return next();  
         }
     } else {
       next();  
     }
 }

 exports.logout = async (req, res,) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 2*1000),
        httpOnly: true
    });
    res.status(200).redirect('/');
}