import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaWhatsapp,
} from 'react-icons/fa';

const Contact = () => {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField(null);
    }, 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" name="contact" className="w-full py-16 sm:py-20 bg-[#080c14] text-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <FaEnvelope /> Get In Touch
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate Direct Contact
          </h2>
          <p className="text-slate-400 mt-2 text-xs sm:text-base">
            Open for Senior Backend & Distributed Systems roles, high-throughput microservices, and streaming platforms.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <div className="glass-card p-5 sm:p-8 rounded-2xl border border-slate-800/80 space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Contact Information
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mt-1">
                  Send a direct WhatsApp message, drop an email, or connect via LinkedIn.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-mono">
                {/* Phone / WhatsApp Item with Direct DM Action */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-500/50 transition-all space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <FaWhatsapp size={18} />
                      </div>
                      <div>
                        <div className="text-[10px] sm:text-[11px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <span>WhatsApp & Phone</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        </div>
                        <div className="text-white font-semibold text-xs sm:text-sm">
                          {portfolioData.personal.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions for WhatsApp */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-slate-800/80">
                    <a
                      href={portfolioData.personal.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20"
                      title="Send WhatsApp Direct Message"
                    >
                      <FaWhatsapp size={15} />
                      <span>Send WhatsApp DM</span>
                    </a>

                    <button
                      onClick={() => copyToClipboard(portfolioData.personal.phone, 'phone')}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedField === 'phone' ? (
                        <>
                          <FaCheck size={11} className="text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <FaCopy size={11} />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Email Item */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <FaEnvelope size={15} />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] sm:text-[11px] text-slate-500">EMAIL</div>
                      <div className="text-slate-200 text-xs sm:text-sm truncate">{portfolioData.personal.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(portfolioData.personal.email, 'email')}
                    className="self-end sm:self-auto px-3 py-1.5 rounded-md bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs transition-colors shrink-0 flex items-center gap-1.5"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? (
                      <>
                        <FaCheck size={11} className="text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <FaCopy size={11} /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500">LOCATION</div>
                    <div className="text-slate-200 text-xs sm:text-sm">{portfolioData.personal.location} (IST / UTC+5:30)</div>
                  </div>
                </div>
              </div>

              {/* Quick Action Badges (Grid on Mobile, Flex on Desktop) */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <a
                  href={portfolioData.personal.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                >
                  <FaWhatsapp size={14} /> WhatsApp
                </a>
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-sm"
                >
                  <FaFilePdf size={13} /> Resume PDF
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
                >
                  <FaLinkedin size={14} /> LinkedIn
                </a>
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 transition-colors"
                >
                  <FaGithub size={14} /> GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-card p-5 sm:p-8 rounded-2xl border border-slate-800/80">
              {submitted ? (
                <div className="py-10 sm:py-12 text-center space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <FaCheck size={26} />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">Message Transmitted</h4>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Your transmission has been queued. You can also reach me directly on{' '}
                    <a
                      href={portfolioData.personal.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 underline font-semibold hover:text-emerald-300"
                    >
                      WhatsApp
                    </a>{' '}
                    or at <span className="text-cyan-400">{portfolioData.personal.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  action="https://getform.io/f/dac9c238-a7f7-4036-a86f-a29b6b5698db"
                  method="POST"
                  className="space-y-4 sm:space-y-5"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                      Send a Transmission
                    </h3>
                    <p className="text-xs text-slate-400">
                      Discuss engineering roles, platform architectures, or open-source collaboration.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        YOUR NAME:
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Taylor"
                        className="w-full px-3.5 py-2.5 sm:py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-base sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1.5">
                        YOUR EMAIL:
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@enterprise.io"
                        className="w-full px-3.5 py-2.5 sm:py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-base sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      MESSAGE / TECHNICAL SCOPE:
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details about the role, project, or technical challenges..."
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-base sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 active:scale-99"
                  >
                    <FaPaperPlane size={14} /> Transmit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
