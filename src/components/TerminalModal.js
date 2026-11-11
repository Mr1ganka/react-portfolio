import React, { useState, useEffect, useRef } from 'react';
import { FaTerminal, FaTimes, FaPlay } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

const TerminalModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Mriganka Platform OS v4.2 [Shell Session Ready]\nType "help" to view available commands or click the shortcut buttons below.',
    },
  ]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'user', text: cleanCmd }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `AVAILABLE COMMANDS:
  about       - Brief background & engineering profile
  skills      - Categorized technical stack breakdown
  projects    - Architectural summaries of featured projects
  experience  - Professional engineering roles & tech stacks
  stats       - Real-world production metrics & GitHub stats
  contact     - Reach out via Email, LinkedIn, Phone, or WhatsApp
  whatsapp    - Launch direct WhatsApp chat
  resume      - Open / download Mriganka's latest PDF resume
  clear       - Clear terminal window
  sudo hire   - Unlock candidate evaluation protocols`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `MRIGANKA DAS: ${portfolioData.personal.title}\nLocation: ${portfolioData.personal.location}\n\n${portfolioData.personal.bio}`,
        });
        break;

      case 'skills':
        const skillsFormatted = portfolioData.skillCategories
          .map((cat) => `[${cat.name.toUpperCase()}]\n` + cat.skills.map((s) => `  • ${s.name.padEnd(22)} (${s.context})`).join('\n'))
          .join('\n\n');
        newHistory.push({
          type: 'output',
          text: skillsFormatted,
        });
        break;

      case 'projects':
        const projectsFormatted = portfolioData.projects
          .map(
            (p, idx) =>
              `${idx + 1}. ${p.title} (${p.badge})\n   Tech: ${p.tech.join(', ')}\n   Summary: ${p.description}\n   Arch: ${p.architectureNotes}`
          )
          .join('\n\n');
        newHistory.push({
          type: 'output',
          text: projectsFormatted,
        });
        break;

      case 'experience':
        const expFormatted = portfolioData.experiences
          .map(
            (e) =>
              `• ${e.role} @ ${e.company} (${e.period})\n  Stack: ${e.techStack.join(', ')}\n  Focus: ${e.summary}`
          )
          .join('\n\n');
        newHistory.push({
          type: 'output',
          text: expFormatted,
        });
        break;

      case 'stats':
        const statsFormatted = portfolioData.stats
          .map((s) => `  [+] ${s.value.padEnd(8)} : ${s.label} (${s.change})`)
          .join('\n');
        newHistory.push({
          type: 'output',
          text: `PRODUCTION & CONTRIBUTION TELEMETRY:\n${statsFormatted}`,
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `CONTACT CHANNELS:\n  WhatsApp: ${portfolioData.personal.phone} (${portfolioData.personal.whatsappUrl})\n  Email   : ${portfolioData.personal.email}\n  Phone   : ${portfolioData.personal.phone}\n  LinkedIn: ${portfolioData.personal.linkedin}\n  GitHub  : ${portfolioData.personal.github}`,
        });
        break;

      case 'whatsapp':
        window.open(portfolioData.personal.whatsappUrl, '_blank');
        newHistory.push({
          type: 'output',
          text: 'Opening WhatsApp chat in a new tab...',
        });
        break;

      case 'resume':
        window.open(portfolioData.personal.resumeUrl, '_blank');
        newHistory.push({
          type: 'output',
          text: 'Opening resume in a new tab...',
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo hire':
        newHistory.push({
          type: 'output',
          text: `[ACCESS GRANTED]
Initializing interview protocol...
Candidate Status: Available for Senior Backend & Distributed Systems roles.
Direct Dispatch: ${portfolioData.personal.email} / ${portfolioData.personal.phone}
WhatsApp DM: ${portfolioData.personal.whatsappUrl}
Action: Check your inbox or reach out right away!`,
        });
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cleanCmd}". Type "help" to see available options.`,
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input);
  };

  const quickPills = ['help', 'whatsapp', 'skills', 'projects', 'stats', 'experience', 'sudo hire'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2.5 sm:p-4">
      <div className="w-full max-w-3xl bg-[#090d16] border border-cyan-500/30 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[88vh] sm:h-[560px]">
        {/* Terminal Header */}
        <div className="bg-[#0f172a] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1">
              <FaTerminal className="text-cyan-400" /> mriganka@distributed-node:~
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            title="Close Terminal"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-sm space-y-3 bg-[#080c14]/90 text-slate-200 selection:bg-cyan-500 selection:text-black">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'system' && (
                <pre className="text-cyan-400 whitespace-pre-wrap">{item.text}</pre>
              )}
              {item.type === 'user' && (
                <div className="flex items-center text-slate-100 font-semibold">
                  <span className="text-emerald-400 mr-2">guest@platform:~$</span>
                  <span>{item.text}</span>
                </div>
              )}
              {item.type === 'output' && (
                <pre className="text-slate-300 whitespace-pre-wrap pl-4 border-l-2 border-slate-800">{item.text}</pre>
              )}
              {item.type === 'error' && (
                <pre className="text-rose-400 whitespace-pre-wrap pl-4 border-l-2 border-rose-800">{item.text}</pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-[#0d1424] border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 shrink-0">Quick run:</span>
          {quickPills.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-400 border border-slate-700/60 transition-colors shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="px-4 py-3 bg-[#0f172a] border-t border-slate-800 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs sm:text-sm font-semibold shrink-0">guest@platform:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. skills, projects, stats)..."
            className="flex-1 min-w-0 bg-transparent text-slate-100 font-mono text-base sm:text-sm outline-none placeholder-slate-600"
          />
          <button
            type="submit"
            className="text-cyan-400 hover:text-cyan-300 p-1.5 rounded transition-colors shrink-0"
            title="Execute"
          >
            <FaPlay size={12} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TerminalModal;
