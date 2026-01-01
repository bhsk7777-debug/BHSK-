import React, { useEffect, useState } from 'react';
import './types';
import PremiumBackground from './components/UnicornBackground';
import Hero from './components/Hero';
import GrowthSection from './components/GrowthSection';
import ExpertiseSection from './components/ExpertiseSection';
import Vision from './components/Vision';
import TeamSection from './components/TeamSection';
import Services from './components/Features';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { Menu, X, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Vision', target: 'vision' },
    { name: 'Expertise', target: 'expertise' },
    { name: 'Solutions', target: 'solutions' },
    { name: 'Portfolio', target: 'references' },
    { name: 'Contact', target: 'contact' },
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = id === 'top' ? document.body : document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'top' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  if (!isMounted) return null;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-gold-400 selection:text-black font-sans">
      <PremiumBackground />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-black/95 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={(e) => scrollToSection(e, 'top')} 
            className="flex flex-col cursor-pointer group"
          >
            <span className="text-2xl md:text-3xl font-serif font-black tracking-[0.2em] leading-none text-white group-hover:text-gold-400 transition-colors uppercase">BHSK</span>
            <span className="text-[8px] uppercase tracking-[0.5em] text-gray-500 font-bold mt-1 group-hover:text-gray-300 transition-colors">Medical Branding</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={(e) => scrollToSection(e, item.target)}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-gold-400 transition-all cursor-pointer outline-none relative group/item"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all group-hover/item:w-full"></span>
              </button>
            ))}
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="p-2 text-gray-600 hover:text-gold-400 transition-colors outline-none ml-4"
              title="Admin Settings"
            >
              <Settings size={18} />
            </button>
          </div>

          <button className="lg:hidden text-white outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[150] bg-black transition-all duration-700 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={(e) => scrollToSection(e, item.target)}
              className="text-4xl font-serif font-black text-white hover:text-gold-400 transition-colors uppercase tracking-widest"
            >
              {item.name}
            </button>
          ))}
          <button onClick={() => { setIsMenuOpen(false); setIsAdminOpen(true); }} className="text-gold-400 text-xs font-black uppercase tracking-widest mt-8 flex items-center gap-2">
            <Settings size={14} /> Admin Dashboard
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="mt-12 p-4 border border-white/10 rounded-full text-white">
            <X size={32} />
          </button>
        </div>
      </div>

      <main id="top" className="relative z-10">
        <Hero />
        <GrowthSection />
        <Vision />
        <ExpertiseSection />
        <TeamSection />
        <Services />
        <References />
        <Contact />
      </main>

      <Footer />
      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
    </div>
  );
};

export default App;