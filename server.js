require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // The following is optional and depends on your MySQL version and setup:
    // socketPath: '/cloudsql/' + process.env.DB_HOST
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-email', (req, res) => {
    const email = req.body.email;
    
    if (email) {
        const query = 'INSERT INTO emails (email) VALUES (?)';
        connection.query(query, [email], (err, results) => {
            if (err) {
                console.error('Error inserting into database', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).send('Email submitted successfully');
            }
        });
    } else {
        res.status(400).send('Email is required');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
