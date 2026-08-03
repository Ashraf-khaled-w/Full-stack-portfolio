import React from 'react';

const About = () => {
  const highlights = [
    { iconClass: 'fa-solid fa-circle-nodes', title: 'System Architecture', desc: 'Designing robust, scalable backends and schema-less data structures.' },
    { iconClass: 'fa-solid fa-terminal', title: 'Clean ES6+ Logic', desc: 'Writing highly performant modern JavaScript and React codebases.' },
    { iconClass: 'fa-solid fa-shield-halved', title: 'Security & Auth', desc: 'Implementing HTTP-only cookies, session limits, and secure RBAC.' },
    { iconClass: 'fa-solid fa-microchip', title: 'Optimized Workflows', desc: 'Offloading backend tasks using event queues and caching data.' }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Bio Card */}
          <div className="lg:col-span-5 glass p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary-light">
                <i className="fa-solid fa-user text-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Ashraf Khaled Sulaiman</h3>
                <p className="text-sm text-gray-400">Full-Stack Engineer</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              I am a results-driven developer based in Cairo, Egypt. I specialize in building end-to-end web applications with custom data modeling engines, optimized APIs, and seamless, interactive user interfaces.
            </p>

            {/* Quick Details */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center text-gray-300">
                <i className="fa-solid fa-location-dot text-primary-light mr-3.5 w-4 text-center flex-shrink-0" />
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center text-gray-300">
                <i className="fa-solid fa-graduation-cap text-primary-light mr-3.5 w-4 text-center flex-shrink-0" />
                <div>
                  <p className="font-semibold">B.Sc. in Computer Science</p>
                  <p className="text-xs text-gray-400">Tanta University, 2019 - 2024</p>
                </div>
              </div>
              <div className="flex items-center text-gray-300">
                <i className="fa-solid fa-calendar-days text-primary-light mr-3.5 w-4 text-center flex-shrink-0" />
                <span>2+ Years Engineering Experience</span>
              </div>
              
              <div className="pt-2">
                <a
                  href="/Ashraf_Khaled_Sulaiman_CV.pdf"
                  download="Ashraf_Khaled_Sulaiman_CV.pdf"
                  className="w-full py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary-light font-semibold hover:bg-primary/25 hover:text-white transition duration-300 flex items-center justify-center text-sm cursor-pointer"
                >
                  <i className="fa-solid fa-download mr-2 text-xs" />
                  Download CV Resume
                </a>
              </div>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Core Competencies & Architecture</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => {
                return (
                  <div key={idx} className="glass-card p-6 rounded-xl border border-white/5 relative group hover:border-primary/30">
                    <div className="p-3 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/5 border border-white/5 text-primary group-hover:text-primary-light group-hover:bg-primary/10 transition duration-300 mb-4">
                      <i className={`${item.iconClass} text-xl`} />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
