import React from 'react';
import { portfolioData } from '../data/portfolioData';
import TechIcon from './TechIcon';
import {
  FaTerminal,
  FaArrowRight,
  FaFilePdf,
  FaMicrochip,
  FaWhatsapp,
} from 'react-icons/fa';

const Home = ({ onOpenTerminal }) => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingBadges = [
    { name: 'Java 21', icon: 'java' },
    { name: 'Spring Boot 3', icon: 'springboot' },
    { name: 'Apache Kafka', icon: 'kafka' },
    { name: 'Go (Golang)', icon: 'go' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Docker', icon: 'docker' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Datadog', icon: 'datadog' },
  ];

  return (
    <section
      id="home"
      name="home"
      className="relative w-full max-w-full min-h-screen pt-24 sm:pt-28 pb-14 sm:pb-16 flex flex-col justify-center bg-[#080c14] text-slate-200 overflow-hidden"
    >
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[600px] h-[200px] sm:h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[160px] sm:w-[300px] h-[160px] sm:h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Terminal Header Prompt */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] sm:text-xs font-mono text-cyan-400 mb-5 sm:mb-6 shadow-sm max-w-full overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate">mriganka@distributed-platform:~</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">IoT Fleet & Distributed Systems</span>
        </div>

        {/* Hero Title & Subheading */}
        <div className="space-y-3 sm:space-y-4 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Hi, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              Mriganka Das
            </span>
          </h1>

          <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold text-slate-300 tracking-tight">
            Senior Backend & Distributed Systems Engineer
          </h2>

          <p className="text-sm sm:text-lg text-slate-400 leading-relaxed max-w-3xl pt-1 sm:pt-2">
            Architecting high-scale Java/Spring Boot microservices, resilient event-driven platforms for{' '}
            <span className="text-cyan-300 font-semibold">10,000+ connected IoT devices</span>, and sub-100ms real-time streaming pipelines with Apache Kafka and Go.
          </p>
        </div>

        {/* Action Buttons (Optimized for Mobile Phone Stacking & Desktop Row) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5">
          <button
            onClick={() => scrollTo('playground')}
            className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-98 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 group"
          >
            <FaMicrochip /> Interactive Architecture Lab
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
          </button>

          <a
            href={portfolioData.personal.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold text-xs sm:text-sm font-mono transition-all shadow-md shadow-emerald-500/20"
          >
            <FaWhatsapp size={16} /> WhatsApp DM
          </a>

          <button
            onClick={() => scrollTo('projects')}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold text-xs sm:text-sm transition-all"
          >
            View Projects
          </button>

          <button
            onClick={onOpenTerminal}
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-mono text-xs sm:text-sm transition-all"
            title="Launch Interactive Terminal"
          >
            <FaTerminal className="text-cyan-400" /> CLI [~]
          </button>

          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 font-mono text-xs sm:text-sm transition-all"
          >
            <FaFilePdf className="text-rose-400" /> Resume PDF
          </a>
        </div>

        {/* Quick Tech Badges Ribbon */}
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] sm:text-xs font-mono text-slate-500 mr-1 sm:mr-2 uppercase tracking-wider">
            Core Stack:
          </span>
          {floatingBadges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800 text-[11px] sm:text-xs font-mono text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
            >
              <TechIcon name={badge.icon} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400" />
              {badge.name}
            </span>
          ))}
        </div>

        {/* Telemetry & Impact Metrics Grid (Mobile optimized) */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          {portfolioData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/70 hover:border-cyan-500/30 transition-all text-center group"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono group-hover:text-cyan-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-slate-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400/80 mt-0.5">
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
