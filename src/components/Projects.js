import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import TechIcon from './TechIcon';
import {
  FaGithub,
  FaCogs,
  FaTimes,
  FaCheckCircle,
  FaLayerGroup,
  FaPlay,
} from 'react-icons/fa';

const Projects = ({ selectedSkillFilter, onClearFilter }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProjectForModal, setSelectedProjectForModal] = useState(null);

  const filteredProjects = portfolioData.projects.filter((p) => {
    const matchesCategory =
      activeCategory === 'all' ||
      p.category.toLowerCase().includes(activeCategory.toLowerCase());

    const matchesSkill =
      !selectedSkillFilter ||
      p.tech.some((t) => t.toLowerCase().includes(selectedSkillFilter.toLowerCase())) ||
      p.description.toLowerCase().includes(selectedSkillFilter.toLowerCase());

    return matchesCategory && matchesSkill;
  });

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" name="projects" className="w-full max-w-full overflow-hidden py-16 sm:py-20 bg-[#080c14] text-slate-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <FaLayerGroup /> Featured Engineering
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Systems & Production Work
            </h2>
            <p className="text-slate-400 mt-2 text-xs sm:text-base max-w-xl">
              Architectural deep dives into financial ledgers, distributed telemetry streaming, and high-concurrency Go rate limiters.
            </p>
          </div>

          {/* Category Filter Buttons (Mobile friendly) */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: 'All' },
              { id: 'backend', label: 'Backend / DDD' },
              { id: 'distributed', label: 'Streaming & IoT' },
              { id: 'mobile', label: 'Mobile App' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Skill Filter Indicator */}
        {selectedSkillFilter && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span>Filtering projects matching: <strong>{selectedSkillFilter}</strong></span>
            <button
              onClick={onClearFilter}
              className="p-1 hover:text-white transition-colors"
              title="Clear Filter"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-xl sm:rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Content */}
              <div className="p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3 mb-2.5 sm:mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] sm:text-[11px] font-mono font-medium">
                    {project.badge}
                  </span>
                  <span className="text-[10px] sm:text-xs font-mono text-slate-500">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-cyan-400/90 mt-1 mb-3">
                  {project.tagline}
                </p>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                  {project.description}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                  {project.highlights.slice(0, 3).map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-400 leading-normal">
                      <FaCheckCircle className="text-emerald-400 mt-0.5 shrink-0" size={12} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/60">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-300"
                    >
                      <TechIcon name={t} className="w-3 h-3 text-cyan-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions Footer (Responsive layout on phone) */}
              <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-950/60 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                <button
                  onClick={() => setSelectedProjectForModal(project)}
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <FaCogs size={12} /> Inspect Architecture
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                  {project.simulatorType && (
                    <button
                      onClick={scrollToPlayground}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-colors"
                    >
                      <FaPlay size={10} /> Simulator
                    </button>
                  )}

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg sm:rounded-none bg-slate-900 sm:bg-transparent border border-slate-800 sm:border-none text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <FaGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architectural Inspection Modal (Phone responsive scroll) */}
        {selectedProjectForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0b101c] border border-cyan-500/40 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-2xl space-y-5 sm:space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] sm:text-xs font-mono text-cyan-400 mb-1">
                    SYSTEM ARCHITECTURE BLUEPRINT
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProjectForModal.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 font-mono mt-0.5">
                    {selectedProjectForModal.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProjectForModal(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Architecture Notes */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="text-[11px] sm:text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                  Engineering Rationale & Architecture:
                </div>
                <p className="leading-relaxed">
                  {selectedProjectForModal.architectureNotes}
                </p>
              </div>

              {/* Detailed Highlights */}
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  System Capabilities & Invariants:
                </div>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300 pl-4 list-disc marker:text-cyan-400">
                  {selectedProjectForModal.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack */}
              <div>
                <div className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Stack & Dependencies:
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedProjectForModal.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] sm:text-xs font-mono text-cyan-300"
                    >
                      <TechIcon name={t} className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setSelectedProjectForModal(null);
                    scrollToPlayground();
                  }}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm font-mono transition-colors"
                >
                  Open Simulator &rarr;
                </button>
                <button
                  onClick={() => setSelectedProjectForModal(null)}
                  className="px-3.5 sm:px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
