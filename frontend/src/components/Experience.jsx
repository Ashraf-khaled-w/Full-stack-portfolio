import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

const fallbackExperiences = [
  {
    company: 'Freelance',
    role: 'Web Developer',
    start_date: 'Dec 2023',
    end_date: 'Present',
    points: [
      'Architected a high-performance SPA for HR Management & CRM using React 19, Vite, and Tailwind CSS.',
      'Engineered complex client-side state management using TanStack Query, optimizing API integration and data caching.',
      'Developed interactive, real-time data visualization dashboards with Recharts to enhance HR metric reporting.',
      'Implemented secure Role-Based Access Control (RBAC) and dynamic client-side routing.'
    ]
  },
  {
    company: 'Cura Care',
    role: 'IT & Database Administrator',
    start_date: 'Jun 2024',
    end_date: 'Jan 2025',
    points: [
      'Optimized data tracking and reporting infrastructure through advanced Google Sheets automation and custom scripting.',
      'Managed company IT infrastructure, ensuring 99% system uptime and secure data handling.'
    ]
  }
];

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await api.getExperiences();
        const parsedData = data.map(exp => {
          let pts = exp.points;
          if (typeof pts === 'string') {
            try {
              pts = JSON.parse(pts);
            } catch (e) {
              pts = [pts];
            }
          }
          return { ...exp, points: pts };
        });
        setExperiences(parsedData.length > 0 ? parsedData : fallbackExperiences);
      } catch (error) {
        console.error('Error loading experiences, using fallback:', error);
        setExperiences(fallbackExperiences);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-t border-white/5 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Professional Trajectory
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            A chronological summary of my software development and database administration career.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="relative timeline-container pl-8 md:pl-0 space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id || index} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center">
                {/* Timeline node icon */}
                <div className="absolute left-[-20px] md:left-1/2 md:translate-x-[-50%] p-2 w-10 h-10 flex items-center justify-center rounded-full bg-dark-card border border-primary text-primary-light z-20 shadow-[0_0_10px_rgba(14,165,233,0.3)]">
                  <i className="fa-solid fa-briefcase text-sm" />
                </div>

                {/* Left/Right Column (Desktop Date) */}
                <div className={`hidden md:block w-[45%] ${index % 2 === 0 ? 'text-right order-1' : 'text-left order-2'}`}>
                  <span className="inline-flex items-center text-sm font-semibold text-primary-light bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                    <i className="fa-solid fa-calendar-days mr-1.5 text-xs" />
                    {exp.start_date} – {exp.end_date}
                  </span>
                </div>

                {/* Right Column (Card details) */}
                <div className={`w-full md:w-[45%] glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 ${index % 2 === 0 ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}>
                  {/* Mobile Date Tag */}
                  <div className="md:hidden mb-3">
                    <span className="inline-flex items-center text-xs font-semibold text-primary-light bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      <i className="fa-solid fa-calendar-days mr-1 text-xs" />
                      {exp.start_date} – {exp.end_date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  
                  <div className="flex items-center text-gray-400 text-sm mt-1 mb-4">
                    <i className="fa-solid fa-building mr-1.5 text-gray-500 text-xs" />
                    <span>{exp.company}</span>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((point, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-2.5 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Experience;
