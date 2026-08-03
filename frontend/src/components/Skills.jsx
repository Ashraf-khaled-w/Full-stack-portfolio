import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

const fallbackSkills = [
  { category: 'Languages', name: 'JavaScript (ES6+)', proficiency: 95 },
  { category: 'Languages', name: 'TypeScript', proficiency: 92 },
  { category: 'Languages', name: 'Python', proficiency: 85 },
  { category: 'Languages', name: 'SQL', proficiency: 90 },
  { category: 'Languages', name: 'Java', proficiency: 75 },
  { category: 'Frontend', name: 'React.js (19)', proficiency: 95 },
  { category: 'Frontend', name: 'Next.js', proficiency: 88 },
  { category: 'Frontend', name: 'Redux Toolkit', proficiency: 85 },
  { category: 'Frontend', name: 'Tailwind CSS', proficiency: 95 },
  { category: 'Frontend', name: 'Material UI', proficiency: 80 },
  { category: 'Backend & Databases', name: 'Node.js', proficiency: 92 },
  { category: 'Backend & Databases', name: 'Express.js', proficiency: 95 },
  { category: 'Backend & Databases', name: 'Prisma ORM', proficiency: 90 },
  { category: 'Backend & Databases', name: 'PostgreSQL (JSONB)', proficiency: 92 },
  { category: 'Backend & Databases', name: 'RESTful APIs', proficiency: 95 },
  { category: 'Tools & DevOps', name: 'Git & GitHub', proficiency: 90 },
  { category: 'Tools & DevOps', name: 'CI/CD', proficiency: 80 },
  { category: 'Tools & DevOps', name: 'Vite', proficiency: 92 },
  { category: 'Tools & DevOps', name: 'Docker', proficiency: 80 },
  { category: 'Tools & DevOps', name: 'Postman', proficiency: 90 },
  { category: 'Tools & DevOps', name: 'Linux', proficiency: 85 },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await api.getSkills();
        setSkills(data.length > 0 ? data : fallbackSkills);
      } catch (error) {
        console.error('Error loading skills, using fallback:', error);
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const categories = skills.reduce((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Category order
  const orderedCategories = [
    'Languages',
    'Frontend',
    'Backend & Databases',
    'Tools & DevOps',
    'Core Concepts'
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden border-t border-white/5 bg-[#0A0E1A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            Languages, frameworks, database systems, and dev tools I use to bring ideas to life.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orderedCategories.map((catName) => {
              const catSkills = categories[catName] || [];
              if (catSkills.length === 0) return null;

              return (
                <div key={catName} className="glass p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-primary-light mr-2.5 shadow-[0_0_8px_#38BDF8]"></span>
                    {catName}
                  </h3>

                  <div className="space-y-5">
                    {catSkills.map((skill) => (
                      <div key={skill.id || skill.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-300">{skill.name}</span>
                          <span className="text-primary-light font-medium">{skill.proficiency}%</span>
                        </div>
                        {/* Bar */}
                        <div className="h-2 w-full bg-[#151D2A] rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
