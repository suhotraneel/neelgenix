import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
});

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email input
  if (!email ||!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const result = await pool.query(`INSERT INTO emails (email) VALUES ($1) RETURNING *`, [email]);
    res.status(201).json({ message: 'Email saved successfully!' });
  } catch (error) {
    console.error('Error saving email:', error);
    console.error('SQL Query:', `INSERT INTO emails (email) VALUES ($1) RETURNING *`, [email]);
    res.status(500).json({ error: 'Error saving email' });
  }
}