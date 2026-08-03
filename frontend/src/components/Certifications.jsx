import React, { useState, useEffect } from 'react';
import api from '../utils/api.js';

const fallbackCertifications = [
  { title: 'React Web Developer', issuer: 'Root Academy', date: '2024' },
  { title: 'Python Programmer Bootcamp', issuer: '365 Data Science', date: '2023' },
  { title: 'Introduction to AI & Applications', issuer: 'Zewail City', date: '2023' }
];

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await api.getCertifications();
        setCertifications(data.length > 0 ? data : fallbackCertifications);
      } catch (error) {
        console.error('Error loading certifications, using fallback:', error);
        setCertifications(fallbackCertifications);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden border-t border-white/5 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Credentials & Certifications
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            Professional certifications and training programs completed.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={cert.id || index} 
                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/10 transition-colors"></div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/5 border border-white/5 text-primary group-hover:text-primary-light group-hover:bg-primary/10 transition-colors">
                    <i className="fa-solid fa-award text-xl" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-white leading-snug group-hover:text-primary-light transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-medium">{cert.issuer}</p>
                    
                    <div className="flex items-center text-xs text-gray-500 pt-2">
                      <i className="fa-solid fa-circle-check mr-1.5 text-emerald-500 text-xs" />
                      <span>Issued: {cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Certifications;
