import pool from '../config/db.js';

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const addProject = async (req, res) => {
  const { title, description, tech_stack, github_url, demo_url, details } = req.body;
  let image_url = req.body.image_url || '';

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }

  try {
    let techStackArray = [];
    if (tech_stack) {
      techStackArray = Array.isArray(tech_stack)
        ? tech_stack
        : tech_stack.split(',').map(item => item.trim());
    }

    const detailsJson = typeof details === 'string' ? details : JSON.stringify(details || { points: [] });

    const result = await pool.query(
      'INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url, details) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, techStackArray, github_url || '', demo_url || '', image_url, detailsJson]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Error adding project' });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, tech_stack, github_url, demo_url, details } = req.body;
  let image_url = req.body.image_url;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  if (req.file) {
    image_url = `/uploads/${req.file.filename}`;
  }

  try {
    let techStackArray = [];
    if (tech_stack) {
      techStackArray = Array.isArray(tech_stack)
        ? tech_stack
        : tech_stack.split(',').map(item => item.trim());
    }

    const detailsJson = typeof details === 'string' ? details : JSON.stringify(details || { points: [] });

    let query = '';
    let params = [];

    if (image_url !== undefined) {
      query = 'UPDATE projects SET title = $1, description = $2, tech_stack = $3, github_url = $4, demo_url = $5, image_url = $6, details = $7 WHERE id = $8 RETURNING *';
      params = [title, description, techStackArray, github_url || '', demo_url || '', image_url, detailsJson, id];
    } else {
      query = 'UPDATE projects SET title = $1, description = $2, tech_stack = $3, github_url = $4, demo_url = $5, details = $6 WHERE id = $7 RETURNING *';
      params = [title, description, techStackArray, github_url || '', demo_url || '', detailsJson, id];
    }

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project' });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
};
