import React, { useState, useEffect } from 'react';
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
import api from './utils/api.js';

function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [serverWaking, setServerWaking] = useState(true);
  const [wakeAttempt, setWakeAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const verifyServer = async () => {
      try {
        await api.checkHealth();
        if (active) {
          setServerWaking(false);
        }
      } catch (err) {
        console.log('Server is sleeping or starting up, retrying...');
        if (active) {
          setWakeAttempt(prev => prev + 1);
          setTimeout(verifyServer, 3000); // Retry every 3 seconds
        }
      }
    };
    verifyServer();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'admin' || serverWaking) return;

    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -35% 0px', // Triggers when section occupies the middle 30% of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Delay slightly to ensure elements are fully painted in DOM
    const timerId = setTimeout(() => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timerId);
      observer.disconnect();
    };
  }, [activeTab, serverWaking]);

  if (serverWaking) {
    return (
      <div className="min-h-screen bg-[#080B11] text-gray-200 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Background glow shapes */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-md w-full text-center relative z-10 space-y-8 glass p-8 rounded-2xl border border-white/5 shadow-2xl">
          <div className="space-y-4">
            <span className="text-xl font-bold bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent tracking-wider">
              ASHRAF KHALED
            </span>
            <h2 className="text-xl font-bold text-white">Connecting Secure Server</h2>
            <div className="flex items-center justify-center py-6">
              {/* Spinner */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-white/5 border-t-primary-light animate-spin"></div>
                <i className="fa-solid fa-server text-xl text-primary-light animate-bounce" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-300 font-medium">
              Please wait a moment while the backend container wakes up.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Render's free tier automatically sleeps after 15 minutes of inactivity. Cold starts can take up to 50 seconds.
            </p>
            {wakeAttempt > 0 && (
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-[10px] text-primary-light border border-white/5">
                <i className="fa-solid fa-spinner fa-spin mr-1.5" />
                Connection attempt: {wakeAttempt}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

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
