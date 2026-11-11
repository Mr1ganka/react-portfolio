import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import TechIcon from './TechIcon';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const Skills = ({ onSelectSkillForProjects }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allSkills = portfolioData.skillCategories.flatMap((cat) =>
    cat.skills.map((s) => ({ ...s, categoryId: cat.id, categoryName: cat.name }))
  );

  const filteredSkills = allSkills.filter((s) => {
    const matchesCategory = activeCategory === 'all' || s.categoryId === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.context.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" name="skills" className="w-full py-16 sm:py-20 bg-[#080c14] text-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <FaSlidersH /> Tech Stack & Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Technical Competencies
            </h2>
            <p className="text-slate-400 mt-2 text-xs sm:text-base max-w-xl">
              Specialized across high-scale distributed backend systems, streaming pipelines, database engineering, and modern DevOps tooling.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs sm:text-sm" />
            <input
              type="text"
              placeholder="Search stack (e.g. Kafka, Java)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500/50 outline-none transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Pills (Mobile friendly wrapping) */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            All ({allSkills.length})
          </button>
          {portfolioData.skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat.name} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-card p-4 sm:p-5 rounded-xl border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-all shrink-0">
                      <TechIcon name={skill.icon || skill.name} className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-mono text-slate-500">
                        {skill.categoryName}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono font-semibold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2.5 sm:mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Context Description */}
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {skill.context}
                </p>
              </div>

              {onSelectSkillForProjects && (
                <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800/60 flex justify-end">
                  <button
                    onClick={() => onSelectSkillForProjects(skill.name)}
                    className="text-[10px] sm:text-[11px] font-mono text-slate-500 hover:text-cyan-400 transition-colors"
                  >
                    View related work &rarr;
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-10 sm:py-12 text-slate-500 font-mono text-xs sm:text-sm">
            No technical skills found matching "{searchTerm}".
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
