import {
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
  Menu,
  X,
  Layers,
  Zap,
  CheckCircle2,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

const services = [
  { id: 'crm', title: 'CRM Solutions', description: 'Custom Customer Relationship Management systems tailored to your business workflow.', icon: <Database className="w-7 h-7 text-brand-red" /> },
  { id: 'erp', title: 'ERP Systems', description: 'Enterprise Resource Planning to unify your complex business processes and data.', icon: <Layers className="w-7 h-7 text-brand-red" /> },
  { id: 'web', title: 'Web Development', description: 'High-performance, responsive websites and web applications using modern stacks.', icon: <Globe className="w-7 h-7 text-brand-red" /> },
  { id: 'mobile', title: 'Mobile Apps', description: 'Native and cross-platform mobile solutions for iOS and Android devices.', icon: <Smartphone className="w-7 h-7 text-brand-red" /> },
  { id: 'marketing', title: 'Digital Marketing', description: 'Strategic growth through SEO, SEM, and data-driven marketing campaigns.', icon: <LineChart className="w-7 h-7 text-brand-red" /> },
  { id: 'saas', title: 'SaaS Development', description: 'Scaling your software-as-a-service ideas into robust, multi-tenant cloud platforms.', icon: <Cloud className="w-7 h-7 text-brand-red" /> },
  { id: 'security', title: 'Cyber Security', description: 'Protecting your digital assets with advanced threat detection and prevention systems.', icon: <ShieldCheck className="w-7 h-7 text-brand-red" /> },
  { id: 'ai', title: 'AI & ML', description: 'Integrating machine learning and artificial intelligence to automate and optimize.', icon: <Cpu className="w-7 h-7 text-brand-red" /> },
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-brand-red selection:text-white">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black/90 py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="StackNova Labs" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
              <span className="font-bold text-xl tracking-tight text-white">
                STACKNOVA <span className="text-brand-red">LABS</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {['Services', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold text-zinc-400 hover:text-brand-red transition-colors uppercase tracking-[0.2em]">
                  {item}
                </a>
              ))}
              <button onClick={() => setShowMissionModal(true)} className="px-6 py-2.5 bg-brand-red text-white text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-brand-red-dark transition-colors">
                Launch Project
              </button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black pt-24 px-6">
          <div className="flex flex-col gap-6">
            {['Services', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-red transition-colors">
                {item}
              </a>
            ))}
            <button onClick={() => { setShowMissionModal(true); setIsMenuOpen(false); }} className="w-full py-4 bg-brand-red text-white font-bold rounded-xl text-lg mt-4">
              LAUNCH PROJECT
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10">
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-brand-red/5 rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-white/5 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">Labs Status: Operational</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-6 uppercase leading-[0.9] tracking-tighter">
              BUILD.<br />
              <span className="text-brand-red italic">INSPIRE.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              We architect future-ready digital frameworks for the global elite.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setShowMissionModal(true)} className="group w-full sm:w-auto px-8 py-4 bg-brand-red text-white text-sm font-bold rounded-full flex items-center justify-center gap-2 hover:bg-brand-red-dark transition-colors uppercase tracking-widest">
                INITIATE MISSION <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#services" className="w-full sm:w-auto px-8 py-4 border border-white/10 text-white text-sm font-bold rounded-full hover:bg-white/5 transition-colors uppercase tracking-widest text-center">
                EXPLORE SERVICES
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl py-10 md:py-14 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1 tracking-tighter">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 font-semibold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-20">
              <span className="text-brand-red text-xs font-bold uppercase tracking-[0.3em]">Capabilities</span>
              <h2 className="text-3xl md:text-5xl font-black text-white mt-3 uppercase tracking-tighter italic">Precision Services</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {services.map((service) => (
                <div key={service.id} className="group bg-zinc-900/40 border border-white/5 rounded-2xl p-6 md:p-8 hover:border-brand-red/30 transition-colors">
                  <div className="mb-5 p-3 bg-white/5 inline-flex rounded-xl border border-white/5 group-hover:bg-brand-red/10 group-hover:border-brand-red/20 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-red transition-colors uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
              <div className="flex-1 text-center lg:text-left">
                <span className="text-brand-red text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Architecture</span>
                <h2 className="text-3xl md:text-5xl font-black text-white mt-3 mb-8 uppercase tracking-tighter leading-tight italic">
                  Engineering<br />Superiority.
                </h2>
                <div className="space-y-5 text-left">
                  {['Hyper-Scalable Frameworks', 'Zero-Trust Security Protocols', 'Real-time Data Intelligence', 'Quantum-Ready Infrastructure'].map((text) => (
                    <div key={text} className="flex gap-3 items-start group">
                      <div className="mt-0.5 p-1.5 bg-brand-red/10 rounded-lg border border-brand-red/20 group-hover:bg-brand-red group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-white font-bold uppercase tracking-widest text-[10px] md:text-xs group-hover:text-brand-red transition-colors">{text}</p>
                        <p className="text-zinc-600 text-[10px] mt-0.5 leading-relaxed">System-optimized deployment patterns via automated CI/CD pipelines.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-sm md:max-w-md mx-auto">
                <div className="relative w-full aspect-square">
                  <div className="absolute inset-0 border border-dashed border-brand-red/10 rounded-full" />
                  <div className="absolute inset-12 bg-brand-red/5 rounded-full" />
                  <div className="relative h-full bg-zinc-900/40 border border-white/5 rounded-full flex flex-col items-center justify-center p-10 md:p-16">
                    <Zap className="w-14 h-14 md:w-20 md:h-20 text-brand-red" />
                    <div className="absolute bottom-8 md:bottom-14 left-8 right-8">
                      <div className="font-mono text-[8px] text-zinc-500 mb-2 text-center tracking-[0.3em] uppercase">Status: Core Stable</div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-brand-red w-1/2 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 sm:p-12 md:p-20">
              <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-8 uppercase tracking-tighter italic">
                    Let's Build<br />The Future.
                  </h2>
                  <p className="text-zinc-500 mb-8 md:mb-10 text-sm md:text-base leading-relaxed">
                    Ready to deploy? Our technical architects are on standby for your next major release.
                  </p>
                  <div className="flex flex-col gap-5 text-left">
                    {[
                      { icon: <Mail size={16} />, label: 'Email', val: 'CONTACT@SN.LABS' },
                      { icon: <Phone size={16} />, label: 'WhatsApp', val: '+92 335 4583955' },
                      { icon: <Phone size={16} />, label: 'Call Us', val: '+92 322 5511684' }
                    ].map((item) => (
                      <div key={item.label} className="group cursor-pointer flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-brand-red transition-colors shrink-0">
                          <div className="text-zinc-400 group-hover:text-brand-red transition-colors">{item.icon}</div>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</p>
                          <p className="text-white font-bold text-[11px] md:text-xs">{item.val}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                    <input type="text" placeholder="YOUR NAME" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-5 py-3.5 bg-black/50 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
                    <input type="email" placeholder="YOUR EMAIL" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-5 py-3.5 bg-black/50 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
                  </div>
                  <input type="tel" placeholder="YOUR PHONE" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required className="w-full px-5 py-3.5 bg-black/50 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
                  <textarea rows={4} placeholder="YOUR MESSAGE" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required className="w-full px-5 py-3.5 bg-black/50 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors resize-none" />
                  <button type="submit" disabled={formStatus === 'sending'} className="w-full py-4 bg-brand-red text-white text-xs font-bold rounded-full hover:bg-brand-red-dark transition-colors uppercase tracking-[0.15em] disabled:opacity-50">
                    {formStatus === 'sending' ? 'SENDING...' : formStatus === 'success' ? 'SENT SUCCESSFULLY!' : formStatus === 'error' ? 'FAILED - RETRY' : 'SEND MESSAGE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showMissionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowMissionModal(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl p-6 md:p-10">
            <button onClick={() => setShowMissionModal(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-red/10 border border-brand-red/20 rounded-xl mb-3">
                <Zap className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic">Initiate Mission</h3>
              <p className="text-zinc-500 text-[10px] font-mono mt-1 uppercase tracking-widest">Deploy your objectives</p>
            </div>
            <form onSubmit={handleMissionSubmit} className="space-y-3">
              <input type="text" placeholder="YOUR NAME" value={missionData.name} onChange={(e) => setMissionData({ ...missionData, name: e.target.value })} required className="w-full px-5 py-3.5 bg-black/60 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
              <input type="email" placeholder="YOUR EMAIL" value={missionData.email} onChange={(e) => setMissionData({ ...missionData, email: e.target.value })} required className="w-full px-5 py-3.5 bg-black/60 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
              <input type="tel" placeholder="YOUR PHONE" value={missionData.phone} onChange={(e) => setMissionData({ ...missionData, phone: e.target.value })} required className="w-full px-5 py-3.5 bg-black/60 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors" />
              <textarea rows={3} placeholder="YOUR MESSAGE" value={missionData.message} onChange={(e) => setMissionData({ ...missionData, message: e.target.value })} required className="w-full px-5 py-3.5 bg-black/60 border border-white/5 rounded-xl focus:border-brand-red outline-none text-white text-[11px] font-mono uppercase tracking-widest transition-colors resize-none" />
              <button type="submit" disabled={missionStatus === 'sending'} className="w-full py-4 bg-brand-red text-white text-xs font-bold rounded-full hover:bg-brand-red-dark transition-colors uppercase tracking-[0.15em] disabled:opacity-50">
                {missionStatus === 'sending' ? 'DEPLOYING...' : missionStatus === 'error' ? 'FAILED - RETRY' : 'DEPLOY MISSION'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showThankYou && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowThankYou(false)} />
          <div className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-red/10 border-2 border-brand-red/30 rounded-full mb-5">
              <CheckCircle className="w-8 h-8 text-brand-red" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter italic mb-3">Thank You!</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-1">Your mission has been deployed successfully.</p>
            <p className="text-brand-red font-bold text-xs uppercase tracking-widest">Our team will contact you within 4 hours.</p>
          </div>
        </div>
      )}

      <footer className="pt-16 md:pt-24 pb-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-12 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-14">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-5">
                  <img src="/logo.webp" alt="StackNova Labs" className="w-9 h-9 rounded-lg object-cover border border-white/10" />
                  <span className="font-bold text-lg tracking-tight text-white uppercase">
                    STACKNOVA <span className="text-brand-red">LABS</span>
                  </span>
                </div>
                <p className="text-zinc-500 text-xs md:text-sm max-w-sm mb-6 leading-relaxed mx-auto md:mx-0">
                  Defining the future of digital architecture. We build high-performance systems for the next era of innovation.
                </p>
                <div className="flex justify-center md:justify-start gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors cursor-pointer text-zinc-500">
                      <Zap size={13} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:col-span-2 gap-6">
                <div>
                  <h4 className="text-white font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] mb-4">Core Units</h4>
                  <ul className="space-y-2">
                    {['Web Dev', 'Mobile', 'Cyber Ops', 'AI Arch'].map((item) => (
                      <li key={item}><a href="#" className="text-zinc-500 hover:text-brand-red text-[10px] md:text-xs font-semibold transition-colors uppercase tracking-widest">{item}</a></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold text-[9px] md:text-[10px] uppercase tracking-[0.15em] mb-4">Intelligence</h4>
                  <ul className="space-y-2">
                    {['Process', 'Blog', 'Source', 'Privacy'].map((item) => (
                      <li key={item}><a href="#" className="text-zinc-500 hover:text-brand-red text-[10px] md:text-xs font-semibold transition-colors uppercase tracking-widest">{item}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-zinc-700 text-[8px] md:text-[9px] font-mono tracking-[0.2em] uppercase">
              © 2026 STACKNOVA LABS. ALL RIGHTS RESERVED.
            </p>
            <div className="text-[8px] md:text-[9px] font-mono text-zinc-700 tracking-[0.2em] uppercase">
              STATUS: <span className="text-brand-red">OPTIMIZED</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
