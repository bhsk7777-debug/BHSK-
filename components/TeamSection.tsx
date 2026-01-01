import React, { useState, useEffect } from 'react';

const TeamSection: React.FC = () => {
  const [teamImage, setTeamImage] = useState("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80");

  useEffect(() => {
    const loadImage = () => {
      const saved = localStorage.getItem('bhsk_global_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.team_image) setTeamImage(parsed.team_image);
      }
    };
    loadImage();
    window.addEventListener('storage', loadImage);
    return () => window.removeEventListener('storage', loadImage);
  }, []);

  return (
    <section id="team" className="relative py-40 bg-black overflow-hidden">
      {/* Background Philosophy Text */}
      <div className="absolute top-20 left-20 text-[12vw] font-black text-white/[0.03] select-none pointer-events-none uppercase leading-none">
        Team<br/>Philosophy
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              BHSK<br/><span className="text-gold-400">Corporation</span>
            </h2>
            <div className="h-px w-20 bg-gold-400"></div>
          </div>

          <div className="space-y-8 text-gray-400 leading-relaxed font-medium">
            <p className="text-lg text-white">
              BHSK는 종합광고대행사로서 다양한 부서들의 강력한 협업을 통한 <span className="text-gold-400">시너지마케팅 퍼포먼스</span>를 제공합니다.
            </p>
            <p>
              광고주와 유기적인 관계를 맺으며 다 함께 성장하는 것을 슬로건으로 정합니다. 우리는 <span className="text-white font-bold">Paradigm shift, Karma's Law</span>를 믿습니다. 
            </p>
            <p>
              관례를 넘어서서 새로운 해결책과 솔루션을 제안합니다. 우리가 선한 영향력을 끼친 만큼 세상은 우리에게 보답할 것을 믿습니다.
            </p>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 border border-gold-400/20 group-hover:border-gold-400/40 transition-all duration-700 rounded-[60px]"></div>
          <div className="relative h-[600px] w-full rounded-[40px] overflow-hidden">
            <img 
              src={teamImage} 
              alt="Our Team" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
            
            <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-2 italic">Our Team</h3>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                단순한 노출 마케팅이 아닌, 철저한 분석 및 기획하에 타겟팅과 퍼포먼스를 동시에 만들어내는 마케팅 전문가 그룹입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;