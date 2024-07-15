import pg from 'pg';
import { validate } from 'email-validator';

const { Pool } = pg;

const pool = new Pool({
  user: 'process.env.PGUSER',
  host: 'process.env.PGHOST',
  database: 'process.env.PGDATABASE',
  password: 'process.env.PGPASSWORD',
  port: 5432,
  maxConnections: 100,
  timeout: 90000,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
    done();
  }
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // Log the error using a logging library like Winston or Morgan
  logger.error(err);
});

const validateEmail = (email) => {
  return validate(email);
};

export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email inputn
  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const result = await pool.query(`INSERT INTO emails (email) VALUES ($1) RETURNING *`, [email]);
    res.status(201).json({ message: 'Email saved successfully!', data: result.rows[0] });
    console.log("Email", [email]);
  } catch (error) {
    if (error instanceof pg.Error) {
      // Handle pg-specific errors more efficiently
      console.error('Error saving email:', error.message);
      res.status(500).json({ error: 'Error saving email', details: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

// Close the pool on process termination
process.on('exit', () => {
  pool.end();
});