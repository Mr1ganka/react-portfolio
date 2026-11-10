import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  FaBars,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaTerminal,
  FaFilePdf,
} from 'react-icons/fa';

function Navbar({ onOpenTerminal }) {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setNav(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'System Lab', highlight: true },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black font-mono text-base shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            MD
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              Mriganka Das
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Senior Backend Engineer
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                item.highlight
                  ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-300 text-xs font-mono transition-all"
            title="Open Interactive CLI Terminal"
          >
            <FaTerminal size={12} />
            <span>CLI [~]</span>
          </button>

          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-sm"
          >
            <FaFilePdf size={12} />
            <span>Resume</span>
          </a>

          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="GitHub"
          >
            <FaGithub size={16} />
          </a>

          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={16} />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400"
            title="Terminal"
          >
            <FaTerminal size={14} />
          </button>
          <button
            onClick={() => setNav(!nav)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          >
            {nav ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {nav && (
        <div className="sm:hidden bg-[#090d16] border-b border-slate-800 px-6 py-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left py-2 text-sm font-mono text-slate-200 hover:text-cyan-400"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
            >
              Resume PDF
            </a>
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400"
            >
              <FaLinkedin size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
