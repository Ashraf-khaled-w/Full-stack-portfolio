import React from 'react';

const Hero = () => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow z-0" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        {/* Available for hire tag */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Available for New Roles</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="block text-white">Ashraf Khaled</span>
          <span className="block mt-1 bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent text-glow-primary">
            Sulaiman
          </span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-6">
          Full-Stack Software Engineer
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-Stack Software Engineer with over 2 years of experience building high-performance web applications.
          Expertise in React.js, Next.js, Node.js, and PostgreSQL. Proven ability to bridge the gap between complex
          business requirements and technical solutions.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => handleScroll('projects')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-semibold shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Explore Projects
          </button>
          <a
            href="/Ashraf_Khaled_Sulaiman_CV.pdf"
            download="Ashraf_Khaled_Sulaiman_CV.pdf"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-accent to-accent-dark hover:from-accent-light hover:to-accent text-white font-semibold shadow-lg hover:shadow-accent/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center cursor-pointer"
          >
            <i className="fa-solid fa-download mr-2 text-xs" />
            Download CV
          </a>
          <button
            onClick={() => handleScroll('contact')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get In Touch
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center space-x-6 mb-16">
          <a
            href="https://github.com/Ashraf-khaled-w"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            title="GitHub Profile"
          >
            <i className="fa-brands fa-github text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/ashraf-khaled-dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            title="LinkedIn Profile"
          >
            <i className="fa-brands fa-linkedin-in text-xl" />
          </a>
          <a
            href="mailto:ashraf.khaled.w@gmail.com"
            className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            title="Email Me"
          >
            <i className="fa-solid fa-envelope text-xl" />
          </a>
          <a
            href="tel:+201093856925"
            className="p-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
            title="Call Me"
          >
            <i className="fa-solid fa-phone text-xl" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => handleScroll('about')}
          className="animate-bounce inline-flex p-2 rounded-full border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <i className="fa-solid fa-arrow-down text-sm" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
