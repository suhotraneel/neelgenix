const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

document.getElementById('emailForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  pool.query(`INSERT INTO emails (email) VALUES ($1)`, [email], (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Email saved: ${email}`);
    }
  });
});

const detectHover = document.getElementById('detecthover');
const effectHover = document.getElementById('effecthover');

detectHover.addEventListener('mouseover', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFF903');
});

detectHover.addEventListener('mouseout', () => {
    effectHover.querySelector('path').setAttribute('stroke', '#FFFFFF');
});