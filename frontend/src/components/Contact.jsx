import React, { useState } from 'react';
import api from '../utils/api.js';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ submitting: false, success: false, error: 'All fields are required.' });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    try {
      await api.sendMessage(formData);
      setStatus({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
    } catch (err) {
      console.error(err);
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Something went wrong. Please try again.'
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5 bg-[#0A0E1A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-16 h-1 mx-auto bg-primary mt-3 rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
            Interested in collaboration? Drop a line and let's work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between glass p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl"></div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                <p className="text-sm text-gray-400">Feel free to reach out via email, phone, or LinkedIn.</p>
              </div>

              <div className="space-y-6">
                <a href="mailto:ashraf.khaled.w@gmail.com" className="flex items-center text-gray-300 hover:text-primary-light transition group">
                  <div className="p-3 mr-4 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary/10 group-hover:text-primary-light transition-all">
                    <i className="fa-solid fa-envelope text-lg text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Address</p>
                    <p className="font-semibold">ashraf.khaled.w@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+201093856925" className="flex items-center text-gray-300 hover:text-primary-light transition group">
                  <div className="p-3 mr-4 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-primary/10 group-hover:text-primary-light transition-all">
                    <i className="fa-solid fa-phone text-lg text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Cellphone Number</p>
                    <p className="font-semibold">+201093856925</p>
                  </div>
                </a>

                <div className="flex items-center text-gray-300 group">
                  <div className="p-3 mr-4 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5">
                    <i className="fa-solid fa-location-dot text-lg text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Work Location</p>
                    <p className="font-semibold">Cairo, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Cards */}
            <div className="pt-8 border-t border-white/5 mt-8">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">Connect on Socials</p>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/Ashraf-khaled-w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <i className="fa-brands fa-github text-lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ashraf-khaled-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <i className="fa-brands fa-linkedin-in text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 glass p-8 rounded-2xl border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-6">Send A Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={status.submitting}
                    className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={status.submitting}
                    className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about project..."
                  disabled={status.submitting}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hey Ashraf, I would love to talk about..."
                  disabled={status.submitting}
                  className="w-full px-4 py-3 rounded-xl glass-input text-white text-sm resize-none"
                ></textarea>
              </div>

              {/* Alert Status messages */}
              {status.error && (
                <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3.5 rounded-xl text-sm">
                  <i className="fa-solid fa-triangle-exclamation text-lg flex-shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              {status.success && (
                <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3.5 rounded-xl text-sm">
                  <i className="fa-solid fa-circle-check text-lg flex-shrink-0" />
                  <span>Message sent successfully! Thank you.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary text-white font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 cursor-pointer"
              >
                {status.submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane mr-2 text-xs" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
