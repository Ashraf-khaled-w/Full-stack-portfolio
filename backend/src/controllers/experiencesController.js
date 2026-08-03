import pool from '../config/db.js';

export const getExperiences = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiences ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Error fetching experiences' });
  }
};

export const addExperience = async (req, res) => {
  const { company, role, start_date, end_date, points } = req.body;

  if (!company || !role || !start_date || !end_date || !points) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const pointsJson = typeof points === 'string' ? points : JSON.stringify(points);
    const result = await pool.query(
      'INSERT INTO experiences (company, role, start_date, end_date, points) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [company, role, start_date, end_date, pointsJson]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding experience:', error);
    res.status(500).json({ message: 'Error adding experience' });
  }
};

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, role, start_date, end_date, points } = req.body;

  if (!company || !role || !start_date || !end_date || !points) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const pointsJson = typeof points === 'string' ? points : JSON.stringify(points);
    const result = await pool.query(
      'UPDATE experiences SET company = $1, role = $2, start_date = $3, end_date = $4, points = $5 WHERE id = $6 RETURNING *',
      [company, role, start_date, end_date, pointsJson, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating experience:', error);
    res.status(500).json({ message: 'Error updating experience' });
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM experiences WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Error deleting experience:', error);
    res.status(500).json({ message: 'Error deleting experience' });
  }
};
