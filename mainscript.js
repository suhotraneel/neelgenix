const { Pool } = require('pg');

const pool = new Pool({
  user: 'YOUR_DB_USERNAME',
  host: 'YOUR_DB_HOST',
  database: 'YOUR_DB_NAME',
  password: 'YOUR_DB_PASSWORD',
  port: 5432,
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