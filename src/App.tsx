/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Database, 
  Globe, 
  Smartphone, 
  LineChart, 
  Cloud, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X,
  Layers,
  Zap,
  CheckCircle2,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
  {
    id: 'crm',
    title: 'CRM Solutions',
    description: 'Custom Customer Relationship Management systems tailored to your business workflow.',
    icon: <Database className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'erp',
    title: 'ERP Systems',
    description: 'Enterprise Resource Planning to unify your complex business processes and data.',
    icon: <Layers className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'High-performance, responsive websites and web applications using modern stacks.',
    icon: <Globe className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions for iOS and Android devices.',
    icon: <Smartphone className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    description: 'Strategic growth through SEO, SEM, and data-driven marketing campaigns.',
    icon: <LineChart className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'saas',
    title: 'SaaS Development',
    description: 'Scaling your software-as-a-service ideas into robust, multi-tenant cloud platforms.',
    icon: <Cloud className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'security',
    title: 'Cyber Security',
    description: 'Protecting your digital assets with advanced threat detection and prevention systems.',
    icon: <ShieldCheck className="w-8 h-8 text-brand-red" />,
  },
  {
    id: 'ai',
    title: 'AI & ML',
    description: 'Integrating machine learning and artificial intelligence to automate and optimize.',
    icon: <Cpu className="w-8 h-8 text-brand-red" />,
  },
];

const stats = [
  { label: 'Completed Projects', value: '250+' },
  { label: 'Happy Clients', value: '180+' },
  { label: 'Lines of Code', value: '5M+' },
  { label: 'Security Audits', value: '100%' },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showMissionModal, setShowMissionModal] = useState(false);
  const [missionData, setMissionData] = useState({ name: '', email: '', phone: '', message: '' });
  const [missionStatus, setMissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [showThankYou, setShowThankYou] = useState(false);

  const submitForm = async (data: { name: string; email: string; phone: string; message: string }) => {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await submitForm(formData);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormStatus('success');
      setShowThankYou(true);
      setTimeout(() => { setFormStatus('idle'); setShowThankYou(false); }, 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  const handleMissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMissionStatus('sending');
    try {
      await submitForm(missionData);
      setMissionData({ name: '', email: '', phone: '', message: '' });
      setMissionStatus('success');
      setShowMissionModal(false);
      setShowThankYou(true);
      setTimeout(() => { setMissionStatus('idle'); setShowThankYou(false); }, 5000);
    } catch {
      setMissionStatus('error');
      setTimeout(() => setMissionStatus('idle'), 4000);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="app-container" className="min-h-screen bg-black font-sans selection:bg-brand-red selection:text-white">
      {/* Background visual elements */}
      <div className="fixed inset-0 matrix-bg opacity-40 pointer-events-none z-0" />
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-red/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-red/5 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* Navigation */}
      <nav 
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/60 backdrop-blur-xl py-4' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="StackNova Labs" className="w-12 h-12 rounded-2xl object-cover border border-white/10 shadow-[0_0_20px_rgba(230,0,0,0.2)]" />
              <span className="font-mono font-bold text-2xl tracking-tighter text-white">
                STACKNOVA <span className="text-brand-red text-glow">LABS</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {['Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-xs font-bold text-zinc-400 hover:text-brand-red transition-all duration-300 uppercase tracking-[0.3em] relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button onClick={() => setShowMissionModal(true)} className="px-8 py-3 glass-button text-white text-xs font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                Launch Project
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-20 px-6"
          >
            <div className="flex flex-col gap-8 mt-10">
              {['Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-brand-red transition-colors"
                >
                  {item}
                </a>
              ))}
              <button className="w-full py-4 bg-brand-red text-white font-bold rounded-sm text-lg">
                GET A QUOTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-card !rounded-full mb-8 border-white/10 group hover:border-brand-red/30 transition-all duration-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 group-hover:text-zinc-200 transition-colors">Labs Status: Operational</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-[9rem] font-black text-white mb-8 uppercase leading-[0.85] md:leading-[0.8] tracking-tighter">
                BUILD.<br />
                <span className="text-brand-red text-glow italic">INSPIRE.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-xl max-w-2xl mx-auto mb-12 font-mono leading-relaxed px-4">
                &lt;WE ARCHITECT FUTURE-READY DIGITAL FRAMEWORKS FOR THE GLOBAL ELITE /&gt;
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button onClick={() => setShowMissionModal(true)} className="group w-full sm:w-auto px-10 py-5 bg-brand-red text-white text-sm font-black rounded-full flex items-center justify-center gap-3 hover:bg-brand-red-dark transition-all duration-500 shadow-[0_15px_30px_rgba(230,0,0,0.3)] uppercase tracking-widest">
                  INITIATE MISSION <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 glass-button text-white text-sm font-black rounded-full hover:bg-white/10 transition-all duration-500 uppercase tracking-widest">
                  EXPLORE ARCHIVES
                </button>
              </div>
            </motion.div>
          </div>

          {/* Floating background shape for extra 'peeyari' */}
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-red/5 rounded-full pointer-events-none z-0 opacity-30"
          />
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card !bg-black/40 !border-white/5 py-12 md:py-16 px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-2 group-hover:text-brand-red transition-colors duration-500 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.4em] text-zinc-500 font-bold group-hover:text-zinc-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <span className="text-brand-red font-mono text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em] font-black">Capabilities</span>
              <h2 className="text-4xl md:text-7xl font-black text-white mt-4 md:mt-6 uppercase tracking-tighter italic">Precision Services</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
                  className="glass-card p-10 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 blur-3xl rounded-full group-hover:bg-brand-red/10 transition-colors"></div>
                  <div className="mb-8 p-4 bg-white/5 inline-flex rounded-2xl group-hover:bg-brand-red/10 transition-all duration-500 border border-white/5 group-hover:border-brand-red/20">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-brand-red transition-colors uppercase tracking-tight italic">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors font-medium">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section id="about" className="py-20 md:py-32 bg-zinc-950/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
              <div className="flex-1 text-center lg:text-left">
                <span className="text-brand-red font-mono text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.5em] font-black">Architecture</span>
                <h2 className="text-4xl md:text-6xl font-black text-white mt-4 md:mt-6 mb-8 md:mb-12 uppercase tracking-tighter leading-tight italic">Engineering<br />Superiority.</h2>
                <div className="space-y-8 md:space-y-10 text-left">
                  {[
                    'Hyper-Scalable Frameworks',
                    'Zero-Trust Security Protocols',
                    'Real-time Data Intelligence',
                    'Quantum-Ready Infrastructure'
                  ].map((text, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 md:gap-6 items-start group"
                    >
                      <div className="mt-1 p-2 bg-brand-red/5 rounded-xl border border-brand-red/10 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                      <div>
                        <p className="text-white font-black uppercase tracking-widest text-[10px] md:text-sm group-hover:text-brand-red transition-colors">{text}</p>
                        <p className="text-zinc-500 text-[10px] md:text-xs mt-1 md:mt-2 leading-relaxed">System-optimized deployment patterns ensured via automated CI/CD pipelines.</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative w-full">
                <div className="relative w-full aspect-square max-w-sm md:max-w-lg mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-brand-red/10 rounded-full"
                  />
                  <div className="absolute inset-10 bg-brand-red/5 blur-[40px] md:blur-[80px] rounded-full animate-pulse"></div>
                  <div className="relative h-full glass-card !rounded-full overflow-hidden flex items-center justify-center p-12 md:p-20 border-white/5 shadow-2xl">
                     <Zap className="w-16 h-16 md:w-32 md:h-32 text-brand-red animate-bounce text-glow shadow-[0_0_50px_rgba(230,0,0,0.4)]" />
                     <div className="absolute bottom-10 md:bottom-20 left-10 md:left-12 right-10 md:right-12">
                        <div className="font-mono text-[7px] md:text-[9px] text-zinc-500 mb-2 md:mb-3 text-center tracking-[0.3em] md:tracking-[0.5em] uppercase">Status: Core Stable</div>
                        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            animate={{ width: ['20%', '80%', '20%'] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="h-full bg-brand-red"
                          />
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card p-8 sm:p-16 md:p-24 !rounded-[2rem] sm:!rounded-[4rem] relative z-10 border-white/5">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-6 md:mb-10 uppercase tracking-tighter italic">Let's Build<br />The Future.</h2>
                  <p className="text-zinc-500 mb-10 md:mb-12 text-sm md:text-lg leading-relaxed font-medium">Ready to deploy? Our technical architects are on standby for your next major release.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-left">
                    {[
                      { icon: <Mail size={18} />, label: 'Email', val: 'CONTACT@SN.LABS' },
                      { icon: <Phone size={18} />, label: 'WhatsApp', val: '+92 335 4583955' },
                      { icon: <Phone size={18} />, label: 'Call Us', val: '+92 322 5511684' }
                    ].map((item, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-red transition-all duration-500 mb-4 mx-auto lg:mx-0">
                          <div className="text-zinc-400 group-hover:text-brand-red transition-colors">
                            {item.icon}
                          </div>
                        </div>
                        <p className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1 text-center lg:text-left">{item.label}</p>
                        <p className="text-white font-black text-[10px] md:text-sm text-center lg:text-left">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <input 
                      type="text" 
                      placeholder="CALLSIGN / NAME" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-black/40 border-2 border-white/5 rounded-2xl md:rounded-3xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                    />
                    <input 
                      type="email" 
                      placeholder="COMM EMAIL" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-black/40 border-2 border-white/5 rounded-2xl md:rounded-3xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                    />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="MOBILE / COMM LINK" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-6 md:px-8 py-4 md:py-5 bg-black/40 border-2 border-white/5 rounded-2xl md:rounded-3xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                  />
                  <textarea 
                    rows={4} 
                    placeholder="OBJECTIVE / VISION" 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-6 md:px-8 py-4 md:py-5 bg-black/40 border-2 border-white/5 rounded-2xl md:rounded-[2.5rem] focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                  ></textarea>
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full py-5 md:py-6 bg-brand-red text-white text-xs md:text-sm font-black rounded-full hover:bg-brand-red-dark transition-all duration-500 shadow-[0_20px_40px_rgba(230,0,0,0.3)] uppercase tracking-[0.2em] disabled:opacity-50">
                    {formStatus === 'sending' ? 'TRANSMITTING...' : formStatus === 'success' ? 'TRANSMITTED SUCCESSFULLY!' : formStatus === 'error' ? 'TRANSMISSION FAILED - RETRY' : 'TRANSMIT OBJECTIVE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mission Modal Popup */}
      <AnimatePresence>
        {showMissionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowMissionModal(false)} />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-lg glass-card p-8 md:p-12 !rounded-[2rem] border-brand-red/20"
            >
              <button onClick={() => setShowMissionModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 border border-brand-red/20 rounded-2xl mb-4">
                  <Zap className="w-8 h-8 text-brand-red" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic">Initiate Mission</h3>
                <p className="text-zinc-500 text-xs font-mono mt-2 uppercase tracking-widest">Deploy your objectives</p>
              </div>
              <form onSubmit={handleMissionSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="CALLSIGN / NAME"
                  value={missionData.name}
                  onChange={(e) => setMissionData({ ...missionData, name: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/5 rounded-2xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                />
                <input
                  type="email"
                  placeholder="COMM EMAIL"
                  value={missionData.email}
                  onChange={(e) => setMissionData({ ...missionData, email: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/5 rounded-2xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                />
                <input
                  type="tel"
                  placeholder="MOBILE / COMM LINK"
                  value={missionData.phone}
                  onChange={(e) => setMissionData({ ...missionData, phone: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/5 rounded-2xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all"
                />
                <textarea
                  rows={3}
                  placeholder="MISSION BRIEFING / VISION"
                  value={missionData.message}
                  onChange={(e) => setMissionData({ ...missionData, message: e.target.value })}
                  required
                  className="w-full px-6 py-4 bg-black/60 border-2 border-white/5 rounded-2xl focus:border-brand-red outline-none text-white text-[10px] font-mono uppercase tracking-widest transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={missionStatus === 'sending'}
                  className="w-full py-5 bg-brand-red text-white text-xs font-black rounded-full hover:bg-brand-red-dark transition-all duration-500 shadow-[0_15px_30px_rgba(230,0,0,0.3)] uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  {missionStatus === 'sending' ? 'DEPLOYING...' : missionStatus === 'error' ? 'DEPLOYMENT FAILED - RETRY' : 'DEPLOY MISSION'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowThankYou(false)} />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-full max-w-md glass-card p-10 md:p-14 !rounded-[2.5rem] text-center border-brand-red/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-brand-red/10 border-2 border-brand-red/30 rounded-full mb-6"
              >
                <CheckCircle className="w-10 h-10 text-brand-red" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Thank You!</h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-2">Your mission has been deployed successfully.</p>
              <p className="text-brand-red font-bold text-sm md:text-base uppercase tracking-widest">Our team will contact you within 4 hours.</p>
              <div className="mt-8 w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-brand-red"
                  onAnimationComplete={() => setShowThankYou(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="pt-20 md:pt-32 pb-12 relative z-10 bg-black text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card !rounded-[2rem] md:!rounded-[3rem] p-8 md:p-16 mb-16 md:mb-20 !bg-white/5 border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-6 md:mb-8">
                  <img src="/logo.jpeg" alt="StackNova Labs" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                  <span className="font-mono font-bold text-xl md:text-2xl tracking-tighter text-white uppercase italic">
                    STACKNOVA <span className="text-brand-red">LABS</span>
                  </span>
                </div>
                <p className="text-zinc-500 text-[10px] md:text-sm max-w-sm mb-8 md:mb-10 leading-relaxed font-medium mx-auto md:mx-0">
                  Defining the future of digital architecture. We build high-performance systems for the next era of industrial innovation.
                </p>
                <div className="flex justify-center md:justify-start gap-3 md:gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-all duration-500 cursor-pointer text-zinc-500">
                      <Zap size={14} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:col-span-2">
                <div>
                  <h4 className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 md:mb-10 italic">Core Units</h4>
                  <ul className="space-y-3 md:space-y-4">
                    {['Web Dev', 'Mobile', 'Cyber Ops', 'IA Arch'].map((item) => (
                      <li key={item}><a href="#" className="text-zinc-500 hover:text-brand-red text-[9px] md:text-xs font-bold transition-all duration-300 uppercase tracking-widest">{item}</a></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.4em] mb-6 md:mb-10 italic">Intelligence</h4>
                  <ul className="space-y-3 md:space-y-4">
                    {['Process', 'Blog', 'Source', 'Privacy'].map((item) => (
                      <li key={item}><a href="#" className="text-zinc-500 hover:text-brand-red text-[9px] md:text-xs font-bold transition-all duration-300 uppercase tracking-widest">{item}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between px-4 gap-4">
            <p className="text-zinc-700 text-[8px] md:text-[9px] font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase">
              © 2026 STACKNOVA LABS. ENCRYPTED & PROTECTED.
            </p>
            <div className="text-[8px] md:text-[9px] font-mono text-zinc-700 tracking-[0.2em] md:tracking-[0.3em] uppercase">
              STATUS: <span className="text-brand-red text-glow animate-pulse">OPTIMIZED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
