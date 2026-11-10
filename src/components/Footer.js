import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaArrowUp, FaTerminal } from 'react-icons/fa';

const Footer = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#05080e] border-t border-slate-900 py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-sm">
            <span>Mriganka Das</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-normal">Platform Engineering</span>
          </div>
          <p className="text-slate-500">
            Engineered with React & Tailwind CSS • Architected for High Reliability.
          </p>
        </div>

        {/* Center Live Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Fleet Mesh: Sub-100ms Ingestion Operational</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
            title="Launch Terminal"
          >
            <FaTerminal size={14} />
          </button>
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="GitHub"
          >
            <FaGithub size={14} />
          </a>
          <a
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
            title="LinkedIn"
          >
            <FaLinkedin size={14} />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors ml-2"
            title="Scroll to Top"
          >
            <FaArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
