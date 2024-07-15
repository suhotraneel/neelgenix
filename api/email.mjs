import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'SuhotraNeel',
  host: '34.172.70.137',
  database: 'pgsubscribe',
  password: 'Project@2003TRAPS',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
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
    res.status(201).json({ message: 'Email saved successfully!', data: result.rows[0] });
    console.log("Email", [email]);
  } catch (error) {
    console.error('Error saving email:', error.message);
    res.status(500).json({ error: 'Error saving email', details: error.message });
  }
}

// Close the pool on process termination
process.on('exit', () => {
  pool.end();
});