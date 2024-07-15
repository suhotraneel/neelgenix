import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'SuhotraNeel',
  host: '34.172.70.137',
  database: 'pgsubscribe',
  password: 'Project@2003TRAPS',
  port: 5432,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const result = await pool.query(`INSERT INTO emails (email) VALUES ($1) RETURNING *`, [email]);
    res.status(201).json({ message: 'Email saved successfully!' });
  } catch (error) {
    console.error('Error saving email:', error);
    console.error('SQL Query:', `INSERT INTO emails (email) VALUES ($1) RETURNING *`, [email]);
    res.status(500).json({ error: 'Error saving email' });
  }
}