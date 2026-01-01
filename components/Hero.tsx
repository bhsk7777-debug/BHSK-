import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';

const defaultPartners = [
  { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'SK stoa', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/SK_Logo.svg' },
  { name: 'Samjin', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_xV9oHj4-e-W1p9mO2m5lR2p5X7zX9oHj4-e-W1p9mO2m5' },
  { name: 'Hoegaarden', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Hoegaarden_Logo.svg' },
  { name: 'Winix', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Winix_Logo.svg' },
  { name: 'Hyundai', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hyundai_Motor_Company_logo.svg' },
  { name: 'Ice Breakers', logo: 'https://upload.wikimedia.org/wikipedia/en/3/30/Ice_Breakers_logo.png' }
];

const Hero: React.FC = () => {
  const [partners, setPartners] = useState(defaultPartners);

  useEffect(() => {
    const loadPartners = () => {
      const saved = localStorage.getItem('bhsk_partners');
      if (saved) setPartners(JSON.parse(saved));
    };
    loadPartners();
    window.addEventListener('storage', loadPartners);
    return () => window.removeEventListener('storage', loadPartners);
  }, []);

  const scrollToContact = () => {
    const contact = document.getElementById('contact');
    if (contact) window.scrollTo({ top: contact.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center bg-transparent overflow-hidden pt-20 pb-12">
      {/* 배경 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gold-600/10 rounded-full filter blur-[180px] animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-white/5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10 flex flex-col items-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <span className="text-gold-400 text-sm md:text-lg font-black tracking-[0.5em] uppercase border-b border-gold-400/30 pb-2">
            General medical advertising agency
          </span>
        </div>
        
        {/* 타이포그래피 중심의 메인 섹션 */}
        <div className="animate-fade-in-up flex flex-col items-center space-y-8" style={{ animationDelay: '400ms' }}>
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-serif font-black tracking-tighter leading-none text-white uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            BHSK
          </h1>
          
          <div className="flex items-center gap-6 w-full max-w-xl">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gold-400/50"></div>
            <div className="w-3 h-3 rotate-45 border border-gold-400"></div>
            <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gold-400/50"></div>
          </div>
          
          <p className="text-gray-400 text-base md:text-2xl font-light tracking-[0.6em] uppercase max-w-3xl leading-relaxed">
            Do you want to <span className="text-white font-bold">grow up</span> with us?
          </p>
        </div>

        <div className="flex justify-center mt-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <Button 
            variant="secondary" 
            onClick={scrollToContact} 
            className="rounded-full border-gold-400/20 hover:border-gold-400 hover:bg-gold-400/10 px-16 py-5 text-sm font-black tracking-[0.3em] uppercase transition-all hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.1)]"
          >
            Start Project
          </Button>
        </div>
      </div>

      {/* 하단 파트너 마퀴 */}
      <div className="absolute bottom-0 left-0 w-full space-y-2 pb-8 z-10">
        <div className="flex flex-col items-center opacity-40 mb-6">
          <span className="text-[9px] tracking-[1em] text-white uppercase font-black">Success Partnership</span>
          <ChevronDown size={12} className="animate-bounce mt-2 text-gold-400" />
        </div>
        
        <div className="w-full overflow-hidden py-6 border-y border-white/5 bg-black/60 backdrop-blur-xl">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...partners, ...partners, ...partners].map((partner, i) => (
              <div key={i} className="flex flex-col items-center justify-center mx-12 md:mx-20 transition-all duration-500 group">
                <div className="h-6 md:h-8 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-full w-auto object-contain" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          display: flex;
          width: fit-content;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;