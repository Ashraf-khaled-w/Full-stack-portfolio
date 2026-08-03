import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

const fallbackProjects = [
  {
    title: 'DataForge',
    description: 'Full-Stack Custom Data Modeling Platform',
    tech_stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Neon', 'Prisma'],
    github_url: 'https://github.com/Ashraf-khaled-w',
    demo_url: 'https://github.com/Ashraf-khaled-w',
    image_url: 'dataforge.png',
    details: {
      points: [
        'Engineered a schema-less data modeling engine using PostgreSQL JSONB, allowing dynamic user-defined data structures without migration overhead.',
        'Developed an in-memory high-performance ingestion pipeline using SheetJS and Multer, enabling bulk insertion of thousands of records in milliseconds.',
        'Implemented secure, stateless authentication using HTTP-only cookies and SameSite protection to prevent XSS/CSRF.',
        'Designed a resource-constrained engine to dynamically enforce subscription-based limits (Free, Pro, Team).',
        'Concurrent Session Limiting: Engineered a database-backed session state management system restricting active logins to a maximum of one concurrent device, invalidating existing user session tokens automatically upon new logins to prevent password/account sharing.',
        'Workspace Activity Audit Logging: Designed a structured activity audit engine recording all state-modifying database transactions (insertions, deletions, configuration updates, and bulk imports) with timestamps and active user IDs, displaying interactive change history logs to improve data integrity and compliance visibility.'
      ]
    }
  },
  {
    title: 'Lead Report Handler',
    description: 'Telesales Analytics Tool',
    tech_stack: ['React', 'Hooks', 'LocalStorage', 'Tailwind CSS'],
    github_url: 'https://github.com/Ashraf-khaled-w',
    demo_url: 'https://github.com/Ashraf-khaled-w',
    image_url: 'lead_report_handler.png',
    details: {
      points: [
        'Built a high-speed React application for real-time sales performance tracking and conversion analytics.',
        'Automated end-of-day metric reporting by implementing custom math engines for instant outreach calculations.'
      ]
    }
  },
  {
    title: 'Express & EJS Blog Platform',
    description: 'Event-Driven Content Management System',
    tech_stack: ['Node.js', 'Express', 'EJS', 'PostgreSQL'],
    github_url: 'https://github.com/Ashraf-khaled-w',
    demo_url: 'https://github.com/Ashraf-khaled-w',
    image_url: 'ejs_blog_platform.png',
    details: {
      points: [
        'Asynchronous Event Queue: Designed and implemented an event-driven task queue using Node.js EventEmitters to offload background tasks (such as sending user mail alerts, compiling analytics logs, and running automated cleanup routines) out of the main request-response cycle, significantly reducing API response latency.',
        'Server-Side Rendering (SSR): Built a dynamic frontend view rendering engine using EJS (Embedded JavaScript Templates) and Express, maximizing SEO indexing and minimizing initial page-load times compared to client-rendered applications.',
        'RESTful CRUD Architecture: Engineered RESTful endpoints for user registration, blog post curation, category tagging, and comment moderation, enforcing secure data validation rules at the server boundary.',
        'Structured Storage & Routing: Configured relational/JSON data schemas to persist blog entries, utilizing modular route middleware to manage authentication states and authorization rules.'
      ]
    }
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        const parsedData = data.map(proj => {
          let det = proj.details;
          if (typeof det === 'string') {
            try {
              det = JSON.parse(det);
            } catch (e) {
              det = { points: [det] };
            }
          }
          return { ...proj, details: det };
        });
        setProjects(parsedData.length > 0 ? parsedData : fallbackProjects);
      } catch (error) {
        console.error('Error loading projects, using fallback:', error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);


  const getGradientHeader = (title) => {
    const gradients = [
      'from-sky-500 to-indigo-600',
      'from-violet-500 to-purple-600',
      'from-fuchsia-500 to-pink-600',
      'from-emerald-500 to-teal-600'
    ];
    const index = title.length % gradients.length;
    return gradients[index];
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t border-white/5 bg-[#0A0E1A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            A showcase of some full-stack systems and tools I have engineered.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              const imgUrl = api.getImageUrl(project.image_url);

              return (
                <div key={project.id || idx} className="glass-card rounded-2xl overflow-hidden border border-white/5 flex flex-col h-full group">
                  
                  {/* Card Header (Image or Gradient) */}
                  <div className="h-48 relative overflow-hidden flex-shrink-0">
                    {imgUrl ? (
                      <img 
                        src={imgUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${getGradientHeader(project.title)} flex items-center justify-center p-6 text-white`}
                      style={{ display: imgUrl ? 'none' : 'flex' }}
                    >
                      <i className="fa-solid fa-layer-group text-6xl opacity-20 absolute right-4 bottom-4" />
                      <h3 className="text-2xl font-bold text-center drop-shadow-md">{project.title}</h3>
                    </div>

                    {/* Tech tag overlay */}
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 2).map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold bg-dark-bg/85 backdrop-blur-md text-primary-light border border-white/10 px-2 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack List */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech_stack.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/5 text-gray-300 border border-white/5 px-2.5 py-0.5 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center text-xs font-semibold text-primary-light hover:text-white transition duration-200 cursor-pointer"
                      >
                        <i className="fa-solid fa-list-check mr-1.5 text-xs" />
                        View Architecture
                      </button>

                      <div className="flex items-center space-x-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                            title="View Code"
                          >
                            <i className="fa-brands fa-github text-sm" />
                          </a>
                        )}
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition"
                            title="Live Demo"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            ></div>

            {/* Modal Box */}
            <div className="relative glass w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>

              <div className="p-8">
                <span className="text-xs font-bold text-primary-light bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Architecture Highlights
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{selectedProject.description}</p>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                  {selectedProject.details?.points ? (
                    selectedProject.details.points.map((point, i) => (
                      <div key={i} className="flex items-start bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition duration-200">
                        <span className="w-2 h-2 rounded-full bg-accent-light mt-1.5 mr-3 flex-shrink-0"></span>
                        <p className="text-sm text-gray-300 leading-relaxed">{point}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">No details available.</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5">
                  {selectedProject.tech_stack.map((tech, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary-light border border-primary/20 px-2.5 py-0.5 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
