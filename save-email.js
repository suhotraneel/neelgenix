const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    pool.query(`INSERT INTO emails (email) VALUES ($1)`, [email], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to save email' });
      } else {
        console.log(`Email saved: ${email}`);
        res.status(201).json({ message: 'Email saved successfully' });
        // Serve the index.html file
        const indexPath = path.join(process.cwd(), 'index.html');
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        res.setHeader('Content-Type', 'text/html');
        res.write(indexHtml);
        res.end();
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}