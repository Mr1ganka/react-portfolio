import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import TechIcon from './TechIcon';
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Experience = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (index) => {
    setExpandedId(expandedId === index ? null : index);
  };

  return (
    <section id="experience" name="experience" className="w-full py-20 bg-[#090d16] text-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FaBriefcase /> Career Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Professional Experience & Stacks
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Engineering distributed platforms, high-throughput microservices, and reliable cloud software.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-10">
          {portfolioData.experiences.map((exp, index) => {
            const isEducation = exp.type === 'Education';
            const isExpanded = expandedId === index;

            return (
              <div key={index} className="relative pl-6 sm:pl-10 group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    isEducation
                      ? 'bg-purple-950 border-purple-500 text-purple-400'
                      : index === 0
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  {isEducation ? <FaGraduationCap size={14} /> : <FaBriefcase size={13} />}
                </div>

                {/* Experience Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-medium text-cyan-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/60 text-xs font-mono text-slate-300">
                        {exp.period}
                      </span>
                      <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                        • {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* High-level concise focus summary (No heavy details, as requested) */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {exp.summary}
                  </p>

                  {/* Prominent Tech Stack Pills */}
                  <div className="pt-2 border-t border-slate-800/60">
                    <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider">
                      Technologies & Tools:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300/90 hover:border-cyan-500/40 hover:text-cyan-200 transition-colors"
                        >
                          <TechIcon name={tech} className="w-3.5 h-3.5 text-cyan-400" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Optional Expandable Key Highlights Toggle */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-800/40">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp size={10} /> Hide key highlights
                          </>
                        ) : (
                          <>
                            <FaChevronDown size={10} /> View key engineering highlights
                          </>
                        )}
                      </button>

                      {isExpanded && (
                        <ul className="mt-3 space-y-2 text-xs text-slate-400 pl-4 list-disc marker:text-cyan-400">
                          {exp.highlights.map((point, hIdx) => (
                            <li key={hIdx} className="leading-relaxed">
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
