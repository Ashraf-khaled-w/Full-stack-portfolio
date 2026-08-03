import pool from '../config/db.js';

export const getSkills = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY category, name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ message: 'Error fetching skills' });
  }
};

export const addSkill = async (req, res) => {
  const { category, name, proficiency } = req.body;
  if (!category || !name) {
    return res.status(400).json({ message: 'Category and name are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO skills (category, name, proficiency) VALUES ($1, $2, $3) RETURNING *',
      [category, name, proficiency || 100]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding skill:', error);
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ message: 'Skill name must be unique' });
    }
    res.status(500).json({ message: 'Error adding skill' });
  }
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { category, name, proficiency } = req.body;

  if (!category || !name) {
    return res.status(400).json({ message: 'Category and name are required' });
  }

  try {
    const result = await pool.query(
      'UPDATE skills SET category = $1, name = $2, proficiency = $3 WHERE id = $4 RETURNING *',
      [category, name, proficiency || 100, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Error updating skill' });
  }
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('Error deleting skill:', error);
    res.status(500).json({ message: 'Error deleting skill' });
  }
};
