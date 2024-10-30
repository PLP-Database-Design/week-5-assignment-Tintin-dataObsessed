//Initialise dependencies for functionality

const express = require('express')
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');
const cors = require('cors'); // so app does not crash

app.use(express.json());
app.use(cors());
dotenv.config();


//Connect to the database
const db = mysql.createconnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        DATABASE: process.env.DB_NAME
    }
);

//check connection
db.connect((err) => {
    if(err) return console.log ("error in connecting");
    console.log("Connected as id:", db.threadId)


    //send message to browser

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`);

        console.log('sending a message to browser');
        app.get('/',(req,res) => {
            res.send('Server started successfully')
        })
    });
});