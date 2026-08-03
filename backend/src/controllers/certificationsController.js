import pool from '../config/db.js';

export const getCertifications = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM certifications ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ message: 'Error fetching certifications' });
  }
};

export const addCertification = async (req, res) => {
  const { title, issuer, date } = req.body;

  if (!title || !issuer || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO certifications (title, issuer, date) VALUES ($1, $2, $3) RETURNING *',
      [title, issuer, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding certification:', error);
    res.status(500).json({ message: 'Error adding certification' });
  }
};

export const updateCertification = async (req, res) => {
  const { id } = req.params;
  const { title, issuer, date } = req.body;

  if (!title || !issuer || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE certifications SET title = $1, issuer = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, issuer, date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating certification:', error);
    res.status(500).json({ message: 'Error updating certification' });
  }
};

export const deleteCertification = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Certification not found' });
    }
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Error deleting certification:', error);
    res.status(500).json({ message: 'Error deleting certification' });
  }
};
