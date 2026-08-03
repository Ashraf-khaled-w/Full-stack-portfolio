import React, { useState, useEffect } from 'react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Home', iconClass: 'fa-solid fa-house' },
    { id: 'about', name: 'About', iconClass: 'fa-solid fa-user' },
    { id: 'skills', name: 'Skills', iconClass: 'fa-solid fa-code' },
    { id: 'experience', name: 'Experience', iconClass: 'fa-solid fa-briefcase' },
    { id: 'projects', name: 'Projects', iconClass: 'fa-solid fa-laptop-code' },
    { id: 'certifications', name: 'Certifications', iconClass: 'fa-solid fa-award' },
    { id: 'contact', name: 'Contact', iconClass: 'fa-solid fa-envelope' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Name */}
          <div className="flex-shrink-0 cursor-pointer flex flex-col justify-center" onClick={() => handleNavClick('hero')}>
            <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent tracking-wider leading-none">
              ASHRAF KHALED
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wider uppercase mt-1 opacity-80 leading-none">
              Full-Stack Software Engineer
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => {
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2 lg:px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 ${
                    activeTab === link.id
                      ? 'text-primary-light bg-white/5 border border-white/5 shadow-inner'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 ml-2 lg:ml-4 rounded-lg text-xs lg:text-sm font-semibold border border-accent/30 hover:border-accent text-accent-light hover:text-white hover:bg-accent/10 transition-all duration-200 ${
                activeTab === 'admin' ? 'bg-accent/20 border-accent text-white' : ''
              }`}
            >
              Admin Portal
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition cursor-pointer"
            >
              {isOpen ? <i className="fa-solid fa-xmark text-xl" /> : <i className="fa-solid fa-bars text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div className={`md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-[#080B11]/95 backdrop-blur-xl border-t border-white/5 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => {
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeTab === link.id
                    ? 'text-primary-light bg-white/5 border border-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <i className={`${link.iconClass} mr-3 text-sm`} />
                {link.name}
              </button>
            );
          })}
          <div className="pt-4 border-t border-white/5 mt-4">
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center w-full px-4 py-3 rounded-lg text-base font-medium text-accent-light border border-accent/20 hover:bg-accent/10 transition-all ${
                activeTab === 'admin' ? 'bg-accent/20 border-accent text-white' : ''
              }`}
            >
              <i className="fa-solid fa-shield-halved mr-3 text-sm" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
