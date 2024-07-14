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
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the application if the connection fails
  }
  console.log('Connected to the MySQL database.');
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-email', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Validate email format using a regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const query = 'INSERT INTO emails (email) VALUES (?)';
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error inserting into database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log('Email submitted successfully:', email);
    res.status(200).json({ message: 'Email submitted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});