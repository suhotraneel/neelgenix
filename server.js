// server.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.post('/save-email', (req, res) => {
  const email = req.body.email;
  pool.query(`INSERT INTO emails (email) VALUES ($1)`, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error saving email' });
    } else {
      console.log(`Email saved: ${email}`);
      res.send({ message: 'Email saved successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});