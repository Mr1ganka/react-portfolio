import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  FaBars,
  FaTimes,
  FaLinkedin,
  FaGithub,
  FaTerminal,
  FaFilePdf,
  FaWhatsapp,
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
          ? 'bg-[#080c14]/95 backdrop-blur-md border-b border-slate-800/80 py-2.5 sm:py-3 shadow-lg'
          : 'bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2.5 sm:gap-3 group text-left"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black font-mono text-sm sm:text-base shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            MD
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              Mriganka Das
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">
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

        {/* Header Action Buttons (Desktop & Tablet) */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={portfolioData.personal.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium transition-all"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>

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

        {/* Mobile Action Controls (Phones) */}
        <div className="flex sm:hidden items-center gap-1.5">
          <a
            href={portfolioData.personal.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={16} />
          </a>
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400"
            title="Terminal"
          >
            <FaTerminal size={13} />
          </button>
          <button
            onClick={() => setNav(!nav)}
            className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {nav ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Full responsiveness for phones) */}
      {nav && (
        <div className="sm:hidden bg-[#090d16]/98 backdrop-blur-xl border-b border-slate-800 px-5 py-5 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center justify-between w-full text-left py-2.5 px-3 rounded-lg text-xs font-mono text-slate-200 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors"
            >
              <span>{item.label}</span>
              {item.highlight && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                  Interactive Lab
                </span>
              )}
            </button>
          ))}

          {/* Direct WhatsApp Callout in Mobile Menu */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <a
              href={portfolioData.personal.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-500 active:bg-emerald-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-emerald-500/20 transition-all"
            >
              <FaWhatsapp size={16} /> Chat on WhatsApp
            </a>

            <div className="flex items-center gap-2">
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
                title="GitHub"
              >
                <FaGithub size={16} />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-cyan-400"
                title="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
