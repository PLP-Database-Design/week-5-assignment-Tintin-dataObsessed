/// Initialise dependencies for functionality
const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors'); // so app does not crash

app.use(express.json());
app.use(cors());
dotenv.config();

// Connect to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME // Use lowercase 'database'
});

// Check connection
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected as id:", db.threadId);

    // Set up EJS as the view engine
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    //  Question 1 ; GET METHOD
    app.get('/data', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });


    //  Question 2 ; GET METHOD
    app.get('/data2', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM providers', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });

    //  Question 3 ; GET METHOD
    app.get('/data3', (req, res) => {
        // Retrieve data from database
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                // Render the data in a template
                res.render('data', { results: results });
            }
        });
    });   




    // Send message to browser
    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        console.log('Sending a message to browser');
        app.get('/', (req, res) => {
            res.send('Server started successfully');
        });
    });
});