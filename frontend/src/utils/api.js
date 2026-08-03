const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-backend-riln.onrender.com/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Health check endpoint
  async checkHealth() {
    const baseUrl = API_BASE_URL.replace('/api', '');
    const res = await fetch(`${baseUrl}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  // Resolve upload image URLs dynamically
  getImageUrl(url) {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const baseUrl = API_BASE_URL.replace('/api', '');
    return `${baseUrl}${url}`;
  },

  // Public GET endpoints
  async getSkills() {
    const res = await fetch(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('Failed to fetch skills');
    return res.json();
  },
  async getExperiences() {
    const res = await fetch(`${API_BASE_URL}/experiences`);
    if (!res.ok) throw new Error('Failed to fetch experiences');
    return res.json();
  },
  async getProjects() {
    const res = await fetch(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },
  async getCertifications() {
    const res = await fetch(`${API_BASE_URL}/certifications`);
    if (!res.ok) throw new Error('Failed to fetch certifications');
    return res.json();
  },

  // Auth endpoint
  async login(username, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  // Public message submission
  async sendMessage(messageData) {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to send message');
    return data;
  },

  // Protected Admin CRUD endpoints
  // Skills
  async addSkill(skill) {
    const res = await fetch(`${API_BASE_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(skill)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add skill');
    return data;
  },
  async updateSkill(id, skill) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(skill)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update skill');
    return data;
  },
  async deleteSkill(id) {
    const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete skill');
    return res.json();
  },

  // Experiences
  async addExperience(exp) {
    const res = await fetch(`${API_BASE_URL}/experiences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(exp)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add experience');
    return data;
  },
  async updateExperience(id, exp) {
    const res = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(exp)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update experience');
    return data;
  },
  async deleteExperience(id) {
    const res = await fetch(`${API_BASE_URL}/experiences/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete experience');
    return res.json();
  },

  // Projects (FormData for multipart file upload support)
  async addProject(formData) {
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(), // Let Fetch set content-type with boundary automatically
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add project');
    return data;
  },
  async updateProject(id, formData) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update project');
    return data;
  },
  async deleteProject(id) {
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete project');
    return res.json();
  },

  // Certifications
  async addCertification(cert) {
    const res = await fetch(`${API_BASE_URL}/certifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(cert)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add certification');
    return data;
  },
  async updateCertification(id, cert) {
    const res = await fetch(`${API_BASE_URL}/certifications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getHeaders() },
      body: JSON.stringify(cert)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update certification');
    return data;
  },
  async deleteCertification(id) {
    const res = await fetch(`${API_BASE_URL}/certifications/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to delete certification');
    return res.json();
  },

  // Messages (Admin only)
  async getMessages() {
    const res = await fetch(`${API_BASE_URL}/messages`, {
      method: 'GET',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch messages');
    return data;
  },

  async deleteMessage(id) {
    const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete message');
    return data;
  }
};
export default api;
