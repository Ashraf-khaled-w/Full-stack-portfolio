import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Admin from './pages/Admin.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <AuthProvider>
      <div className="bg-[#080B11] text-gray-200 min-h-screen relative font-sans">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'admin' ? (
          <Admin />
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </>
        )}

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-gray-500 border-t border-white/5 relative z-10 bg-[#080B11]">
          <p>© {new Date().getFullYear()} Ashraf Khaled Sulaiman. All rights reserved.</p>
          <p className="mt-1 text-gray-600">Built with React, Tailwind CSS, Express, and PostgreSQL (Neon).</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
