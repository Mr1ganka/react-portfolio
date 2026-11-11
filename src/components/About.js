import React from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  FaServer,
  FaShieldAlt,
  FaChartLine,
  FaCodeBranch,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaWhatsapp,
} from 'react-icons/fa';
import { SiApachekafka } from 'react-icons/si';

const About = () => {
  const pillars = [
    {
      icon: <FaServer className="text-cyan-400" />,
      title: 'Domain-Driven Design',
      desc: 'Architecting modular bounded contexts, rich aggregate roots, and append-only ledger transaction models.',
    },
    {
      icon: <SiApachekafka className="text-cyan-400" />,
      title: 'Event-Driven Systems',
      desc: 'Decoupled asynchronous streaming via Kafka, resilient consumer groups, and DLQ fault isolation.',
    },
    {
      icon: <FaShieldAlt className="text-emerald-400" />,
      title: 'Identity & Access (RBAC)',
      desc: 'Migrating legacy users to modern identity systems, granular permissions, and zero-trust auth models.',
    },
    {
      icon: <FaChartLine className="text-purple-400" />,
      title: 'Full-Stack Observability',
      desc: 'Per-node Datadog metrics, distributed trace context, and Kibana telemetry for rapid incident MTTR.',
    },
  ];

  return (
    <section id="about" name="about" className="w-full py-16 sm:py-20 bg-[#090d16] text-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FaCodeBranch /> Engineering Profile
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Behind the Architecture
          </h2>
          <p className="text-slate-400 mt-2 text-xs sm:text-base">
            Focused on reliability, scale, and clean domain design for mission-critical platforms.
          </p>
        </div>

        {/* Bio & Pillars Grid */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-start">
          {/* Left Bio Column */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="glass-card p-5 sm:p-8 rounded-2xl border border-slate-800/80 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Engineering at the Intersection of Scale & Reliability
              </h3>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                I am a Senior Backend Engineer based in Bengaluru with 4+ years of hands-on experience designing and operating distributed systems. My primary focus is building fault-tolerant microservices, connected IoT fleet backbones, and event-driven telemetry streaming pipelines.
              </p>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Whether migrating monoliths to microservices, engineering resilient retry pipelines, or architecting double-entry financial ledgers, I prioritize mathematical correctness, clean domain separation, and deep observability.
              </p>

              {/* Quick Links */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-wrap gap-2 sm:gap-2.5">
                <a
                  href={portfolioData.personal.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                >
                  <FaWhatsapp size={14} /> WhatsApp
                </a>
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs font-mono transition-colors shadow-sm"
                >
                  <FaFilePdf size={13} /> Resume PDF
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
                >
                  <FaGithub size={14} /> GitHub
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors"
                >
                  <FaLinkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Architectural Pillars 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {pillars.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all space-y-1 sm:space-y-1.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm mb-2">
                    {p.icon}
                  </div>
                  <h4 className="font-semibold text-white text-xs sm:text-sm">{p.title}</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contributions & Architectural Distribution */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="glass-card p-5 sm:p-8 rounded-2xl border border-slate-800/80 space-y-5 sm:space-y-6">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  Verified Engineering Footprint
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  Architectural Contributions Distribution
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Based on 170+ pull requests and cross-service deliveries across 15+ production repositories.
                </p>
              </div>

              {/* Progress Distribution */}
              <div className="space-y-3.5 sm:space-y-4">
                {portfolioData.contributionsBreakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-200 font-medium text-[11px] sm:text-xs">{item.domain}</span>
                      <span className="text-cyan-400 text-[11px] sm:text-xs">{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Quantitative Proof Points */}
              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-cyan-400 font-bold text-base sm:text-lg font-mono">3,100+ LOC</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">Automated Controller Unit Tests</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <div className="text-emerald-400 font-bold text-base sm:text-lg font-mono">42+ PR Reviews</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400">Cross-Team Code Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
