import React, { useState, useEffect } from 'react';

const expertises = [
  {
    title: "바이럴 마케팅",
    desc: "Making a comment about hooking,",
    desc2: "Formation of public opinion"
  },
  {
    title: "퍼포먼스 마케팅",
    desc: "Meta(Facebook), Instagram, Google, Naver,",
    desc2: "Kakao, GFA"
  },
  {
    title: "데이터 관리",
    desc: "Beusable, GA, Facebook,",
    desc2: "Morpheme of naver"
  },
  {
    title: "영상 마케팅",
    desc: "Youtube, Video producer,",
    desc2: "PD"
  },
  {
    title: "컨텐츠 제작",
    desc: "Homepage, Landing page, AD image,",
    desc2: "Copywrite"
  }
];

const ExpertiseSection: React.FC = () => {
  const [expertiseImage, setExpertiseImage] = useState("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80");

  useEffect(() => {
    const loadImage = () => {
      const saved = localStorage.getItem('bhsk_global_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.expertise_image) setExpertiseImage(parsed.expertise_image);
      }
    };
    loadImage();
    window.addEventListener('storage', loadImage);
    return () => window.removeEventListener('storage', loadImage);
  }, []);

  return (
    <section id="expertise" className="relative bg-black overflow-hidden pt-20">
      {/* Upper Visual Area (Fills the empty space) */}
      <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={expertiseImage} 
            alt="Expertise Background" 
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent"></div>
        </div>

        {/* Content in the empty space */}
        <div className="relative z-10 text-center px-6">
          <span className="text-gold-400 font-black tracking-[0.8em] text-[10px] md:text-xs uppercase block mb-6 animate-fade-in-up">Professionalism</span>
          <h2 className="text-5xl md:text-8xl font-serif font-black text-white mb-6 leading-tight tracking-tighter">
            THE CORE <span className="gold-text">PILLARS</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed break-keep">
            BHSK의 각 부서는 분야별 최고의 전문가들로 구성되어 있습니다.<br/>
            최신 트렌드와 데이터를 기반으로 압도적인 퍼포먼스를 약속합니다.
          </p>
        </div>
      </div>

      {/* Expertise Grid Area */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-5 border-t border-white/10">
          {expertises.map((item, idx) => (
            <div key={idx} className="group relative pt-12 pb-24 px-8 border-r last:border-r-0 border-white/10 hover:bg-white/[0.02] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gold-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
              
              <div className="relative z-10 space-y-12 h-full flex flex-col justify-between">
                <h3 className="text-xl font-bold text-white tracking-tighter group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                
                <div className="space-y-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <p className="text-[13px] text-gray-300 font-light leading-relaxed">{item.desc}</p>
                  <p className="text-[13px] text-gray-300 font-light leading-relaxed">{item.desc2}</p>
                </div>

                <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gold-400 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center gap-6 opacity-30">
          <div className="text-[10px] tracking-[1em] text-white uppercase font-black">Scroll Down</div>
          <div className="w-px h-24 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;