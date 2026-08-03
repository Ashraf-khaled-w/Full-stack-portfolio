import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../utils/api.js';

const Admin = () => {
  const { isAuthenticated, login, logout, loading: authLoading } = useAuth();
  
  // Login credentials
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('projects');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Editing state
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form inputs
  const [projectForm, setProjectForm] = useState({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', points: '' });
  const [imageFile, setImageFile] = useState(null);
  
  const [skillForm, setSkillForm] = useState({ category: 'Languages', name: '', proficiency: 100 });
  const [expForm, setExpForm] = useState({ company: '', role: '', start_date: '', end_date: '', points: '' });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', date: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let data = [];
      if (activeTab === 'projects') data = await api.getProjects();
      else if (activeTab === 'skills') data = await api.getSkills();
      else if (activeTab === 'experiences') data = await api.getExperiences();
      else if (activeTab === 'certifications') data = await api.getCertifications();
      else if (activeTab === 'messages') data = await api.getMessages();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!usernameInput || !passwordInput) {
      setLoginError('Please enter both username and password.');
      return;
    }
    setLoginSubmitting(true);
    try {
      await login(usernameInput, passwordInput);
    } catch (err) {
      setLoginError(err.message || 'Invalid username or password.');
    } finally {
      setLoginSubmitting(false);
    }
  };

  const showToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (activeTab === 'projects') await api.deleteProject(id);
      else if (activeTab === 'skills') await api.deleteSkill(id);
      else if (activeTab === 'experiences') await api.deleteExperience(id);
      else if (activeTab === 'certifications') await api.deleteCertification(id);
      showToast('Item deleted successfully.');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to delete item.');
    }
  };

  const openForm = (item = null) => {
    setEditingItem(item);
    setIsFormOpen(true);
    setError(null);

    if (activeTab === 'projects') {
      if (item) {
        let pts = '';
        if (item.details?.points) pts = item.details.points.join('\n');
        else if (typeof item.details === 'string') {
          try {
            const parsed = JSON.parse(item.details);
            pts = parsed.points?.join('\n') || '';
          } catch(e) {}
        }
        setProjectForm({
          title: item.title,
          description: item.description,
          tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack,
          github_url: item.github_url || '',
          demo_url: item.demo_url || '',
          points: pts
        });
      } else {
        setProjectForm({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', points: '' });
      }
      setImageFile(null);
    } else if (activeTab === 'skills') {
      if (item) setSkillForm({ category: item.category, name: item.name, proficiency: item.proficiency });
      else setSkillForm({ category: 'Languages', name: '', proficiency: 100 });
    } else if (activeTab === 'experiences') {
      if (item) {
        let pts = '';
        if (Array.isArray(item.points)) pts = item.points.join('\n');
        else if (typeof item.points === 'string') {
          try {
            pts = JSON.parse(item.points).join('\n');
          } catch(e) {
            pts = item.points;
          }
        }
        setExpForm({
          company: item.company,
          role: item.role,
          start_date: item.start_date,
          end_date: item.end_date,
          points: pts
        });
      } else {
        setExpForm({ company: '', role: '', start_date: '', end_date: '', points: '' });
      }
    } else if (activeTab === 'certifications') {
      if (item) setCertForm({ title: item.title, issuer: item.issuer, date: item.date });
      else setCertForm({ title: '', issuer: '', date: '' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (activeTab === 'projects') {
        const formData = new FormData();
        formData.append('title', projectForm.title);
        formData.append('description', projectForm.description);
        formData.append('tech_stack', projectForm.tech_stack);
        formData.append('github_url', projectForm.github_url);
        formData.append('demo_url', projectForm.demo_url);
        
        const ptsArray = projectForm.points.split('\n').filter(p => p.trim() !== '');
        formData.append('details', JSON.stringify({ points: ptsArray }));
        
        if (imageFile) {
          formData.append('image', imageFile);
        }

        if (editingItem && editingItem.id) {
          await api.updateProject(editingItem.id, formData);
          showToast('Project updated successfully.');
        } else {
          await api.addProject(formData);
          showToast('Project created successfully.');
        }
      } 
      else if (activeTab === 'skills') {
        if (editingItem && editingItem.id) {
          await api.updateSkill(editingItem.id, skillForm);
          showToast('Skill updated successfully.');
        } else {
          await api.addSkill(skillForm);
          showToast('Skill created successfully.');
        }
      } 
      else if (activeTab === 'experiences') {
        const ptsArray = expForm.points.split('\n').filter(p => p.trim() !== '');
        const payload = { ...expForm, points: ptsArray };
        if (editingItem && editingItem.id) {
          await api.updateExperience(editingItem.id, payload);
          showToast('Experience updated successfully.');
        } else {
          await api.addExperience(payload);
          showToast('Experience created successfully.');
        }
      } 
      else if (activeTab === 'certifications') {
        if (editingItem && editingItem.id) {
          await api.updateCertification(editingItem.id, certForm);
          showToast('Certification updated successfully.');
        } else {
          await api.addCertification(certForm);
          showToast('Certification created successfully.');
        }
      }

      setIsFormOpen(false);
      fetchData();
    } catch (err) {
      setError(err.message || 'Operation failed.');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080B11] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-[#080B11]">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl z-0"></div>

        <div className="max-w-md w-full glass p-8 rounded-2xl border border-white/5 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 w-14 h-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent-light mb-4">
              <i className="fa-solid fa-shield-halved text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Authentication</h2>
            <p className="text-sm text-gray-400 mt-1">Please sign in to access control systems</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Username</label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="ashraf"
                className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
              />
            </div>

            {loginError && (
              <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs">
                <i className="fa-solid fa-triangle-exclamation flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 transition cursor-pointer"
            >
              {loginSubmitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B11] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 border border-white/5 p-6 rounded-2xl mb-8 glass">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <i className="fa-solid fa-sliders mr-2.5 text-primary-light" />
              Portfolio Control Center
            </h2>
            <p className="text-sm text-gray-400">Add, edit, or delete items. Your updates reflect live on the website.</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center text-sm font-semibold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 border border-red-500/20 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <i className="fa-solid fa-right-from-bracket mr-2 text-xs" />
            Logout
          </button>
        </div>

        {/* Alerts / Toast */}
        {successMsg && (
          <div className="flex items-center space-x-2 bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm mb-6">
            <i className="fa-solid fa-circle-check flex-shrink-0 text-lg" />
            <span>{successMsg}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center space-x-2 bg-red-500/15 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6">
            <i className="fa-solid fa-triangle-exclamation flex-shrink-0 text-lg" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 glass p-4 rounded-2xl border border-white/5 space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
            {[
              { id: 'projects', name: 'Projects', iconClass: 'fa-solid fa-folder-open' },
              { id: 'skills', name: 'Skills', iconClass: 'fa-solid fa-code' },
              { id: 'experiences', name: 'Experience', iconClass: 'fa-solid fa-briefcase' },
              { id: 'certifications', name: 'Credentials', iconClass: 'fa-solid fa-award' },
              { id: 'messages', name: 'Inbox Messages', iconClass: 'fa-solid fa-message' },
            ].map(tab => {
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setIsFormOpen(false); }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl text-sm font-semibold transition whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary-light border border-primary/20 shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <i className={`${tab.iconClass} mr-2.5 flex-shrink-0 text-xs`} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Main Grid View */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white capitalize">{activeTab} List</h3>
              
              {activeTab !== 'messages' && !isFormOpen && (
                <button
                  onClick={() => openForm(null)}
                  className="flex items-center bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <i className="fa-solid fa-plus mr-2 text-xs" />
                  Add New {activeTab === 'experiences' ? 'Experience' : activeTab === 'certifications' ? 'Cert' : activeTab.slice(0, -1)}
                </button>
              )}
            </div>

            {/* FORM CONTAINER */}
            {isFormOpen && (
              <div className="glass p-6 rounded-2xl border border-white/10">
                <h4 className="text-lg font-bold text-white mb-4">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                </h4>
                
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {activeTab === 'projects' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            placeholder="React, Node.js, PostgreSQL"
                            value={projectForm.tech_stack}
                            onChange={e => setProjectForm({ ...projectForm, tech_stack: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Short Description</label>
                        <textarea
                          required
                          rows="3"
                          value={projectForm.description}
                          onChange={e => setProjectForm({ ...projectForm, description: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm resize-none"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">GitHub URL</label>
                          <input
                            type="url"
                            value={projectForm.github_url}
                            onChange={e => setProjectForm({ ...projectForm, github_url: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Live Demo URL</label>
                          <input
                            type="url"
                            value={projectForm.demo_url}
                            onChange={e => setProjectForm({ ...projectForm, demo_url: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs text-gray-400 uppercase font-semibold block">Project Image / Video</label>
                        <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg border border-white/5">
                          <i className="fa-solid fa-upload text-gray-400 text-sm" />
                          <input 
                            type="file"
                            onChange={e => setImageFile(e.target.files[0])}
                            className="text-xs text-gray-300 file:bg-primary file:hover:bg-primary-light file:border-none file:text-white file:py-1 file:px-3 file:rounded-md file:mr-3 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Architecture Highlight points (One per line)</label>
                        <textarea
                          rows="4"
                          value={projectForm.points}
                          onChange={e => setProjectForm({ ...projectForm, points: e.target.value })}
                          placeholder="Engineered a schema-less data modeling engine..."
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Category</label>
                        <select
                          value={skillForm.category}
                          onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm bg-dark-card"
                        >
                          <option value="Languages">Languages</option>
                          <option value="Frontend">Frontend</option>
                          <option value="Backend & Databases">Backend & Databases</option>
                          <option value="Tools & DevOps">Tools & DevOps</option>
                          <option value="Core Concepts">Core Concepts</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Skill Name</label>
                        <input
                          type="text"
                          required
                          value={skillForm.name}
                          onChange={e => setSkillForm({ ...skillForm, name: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Proficiency %</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          required
                          value={skillForm.proficiency}
                          onChange={e => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) || 100 })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {activeTab === 'experiences' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Company</label>
                          <input
                            type="text"
                            required
                            value={expForm.company}
                            onChange={e => setExpForm({ ...expForm, company: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Role</label>
                          <input
                            type="text"
                            required
                            value={expForm.role}
                            onChange={e => setExpForm({ ...expForm, role: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">Start Date</label>
                          <input
                            type="text"
                            required
                            value={expForm.start_date}
                            onChange={e => setExpForm({ ...expForm, start_date: e.target.value })}
                            placeholder="Dec 2023"
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400 uppercase font-semibold">End Date</label>
                          <input
                            type="text"
                            required
                            value={expForm.end_date}
                            onChange={e => setExpForm({ ...expForm, end_date: e.target.value })}
                            placeholder="Present / Jan 2025"
                            className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Accomplishments (One per line)</label>
                        <textarea
                          required
                          rows="4"
                          value={expForm.points}
                          onChange={e => setExpForm({ ...expForm, points: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>
                  )}

                  {activeTab === 'certifications' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Title</label>
                        <input
                          type="text"
                          required
                          value={certForm.title}
                          onChange={e => setCertForm({ ...certForm, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Issuer</label>
                        <input
                          type="text"
                          required
                          value={certForm.issuer}
                          onChange={e => setCertForm({ ...certForm, issuer: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-gray-400 uppercase font-semibold">Year</label>
                        <input
                          type="text"
                          required
                          value={certForm.date}
                          onChange={e => setCertForm({ ...certForm, date: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg glass-input text-white text-sm"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition cursor-pointer"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-gray-300 font-semibold text-sm transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* LIST OR LOADER VIEW */}
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-light"></div>
              </div>
            ) : items.length === 0 ? (
              <div className="glass p-12 rounded-2xl border border-white/5 text-center text-gray-500">
                No items found. Create some!
              </div>
            ) : (
              <div className="space-y-4">
                
                {activeTab === 'projects' && items.map(proj => (
                  <div key={proj.id} className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between gap-4 hover:border-white/10 transition">
                    <div>
                      <h4 className="text-lg font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{proj.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openForm(proj)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition cursor-pointer">
                        <i className="fa-solid fa-pen text-sm" />
                      </button>
                      <button onClick={() => handleDelete(proj.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition border border-red-500/20 cursor-pointer">
                        <i className="fa-solid fa-trash-can text-sm" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'skills' && items.map(skill => (
                  <div key={skill.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-primary-light bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full mr-3">
                        {skill.category}
                      </span>
                      <span className="font-bold text-white text-sm">{skill.name}</span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="text-sm font-semibold text-gray-400">{skill.proficiency}%</span>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openForm(skill)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition cursor-pointer">
                          <i className="fa-solid fa-pen text-xs" />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition cursor-pointer">
                          <i className="fa-solid fa-trash-can text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === 'experiences' && items.map(exp => (
                  <div key={exp.id} className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white">{exp.role} <span className="text-gray-400 text-xs font-normal">at {exp.company}</span></h4>
                      <p className="text-xs text-primary-light font-medium mt-1">{exp.start_date} – {exp.end_date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openForm(exp)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition cursor-pointer">
                        <i className="fa-solid fa-pen text-sm" />
                      </button>
                      <button onClick={() => handleDelete(exp.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition cursor-pointer">
                        <i className="fa-solid fa-trash-can text-sm" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'certifications' && items.map(cert => (
                  <div key={cert.id} className="glass p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{cert.issuer} ({cert.date})</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => openForm(cert)} className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 transition cursor-pointer">
                        <i className="fa-solid fa-pen text-xs" />
                      </button>
                      <button onClick={() => handleDelete(cert.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 transition cursor-pointer">
                        <i className="fa-solid fa-trash-can text-xs" />
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'messages' && items.map(msg => (
                  <div key={msg.id} className="glass p-5 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-2.5 gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-xs text-primary-light hover:underline font-semibold">{msg.email}</a>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Subject: {msg.subject}</p>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Admin;
