const express = require('express');
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'matrix@2022',
    port: 3306, // Change this to your MySQL port (usually 3306)
});

db.connect((err) => {
    if (err) {
        console.log('MySQL connection error:', err);
        throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB route
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS nodemysql';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            res.status(500).send('Error creating database.');
            return;
        }
        console.log(result);
        res.send('Database created or already exists.');
    });
});

const port = 3000; // This is the port for your Express server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
