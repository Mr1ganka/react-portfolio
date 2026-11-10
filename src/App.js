import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import SystemPlayground from './components/SystemPlayground';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalModal from './components/TerminalModal';
import { FaTerminal } from 'react-icons/fa';

function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState(null);

  // Global shortcut: press ` or ~ to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        // Only trigger if user is not currently in an input or textarea
        if (
          document.activeElement.tagName !== 'INPUT' &&
          document.activeElement.tagName !== 'TEXTAREA'
        ) {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      }
      if (e.key === 'Escape' && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  const handleSelectSkill = (skillName) => {
    setSelectedSkillFilter(skillName);
    const projEl = document.getElementById('projects');
    if (projEl) {
      projEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#080c14] text-slate-200 min-h-screen selection:bg-cyan-500 selection:text-slate-950 font-sans">
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      <main>
        <Home onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <Skills onSelectSkillForProjects={handleSelectSkill} />
        <Experience />
        <Projects
          selectedSkillFilter={selectedSkillFilter}
          onClearFilter={() => setSelectedSkillFilter(null)}
        />
        <SystemPlayground />
        <Contact />
      </main>

      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating Action Button for Terminal CLI */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 border border-cyan-500/40 shadow-xl shadow-cyan-500/10 backdrop-blur-md transition-all font-mono text-xs group"
        title="Open Terminal (Press ~)"
      >
        <FaTerminal size={13} />
        <span className="hidden sm:inline">CLI [~]</span>
      </button>

      {/* Interactive CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
