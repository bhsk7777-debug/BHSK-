
import React, { useState, useEffect, useCallback } from 'react';
import { Shield } from 'lucide-react';

const coreValues = [
  { 
    title: "BRAND FOCUSED", 
    desc: "브랜드 구축 및 강화", 
    detail: "단순 노출을 넘어 병의원의 가치를 발견하고 지역 내 압도적인 브랜드 이미지를 구축합니다." 
  },
  { 
    title: "HUMAN CENTRIC", 
    desc: "고객 청중 요구 공감", 
    detail: "환자가 진정으로 원하는 정보와 공감을 바탕으로 진정성 있는 콘텐츠를 기획합니다." 
  },
  { 
    title: "SUSTAINABLE", 
    desc: "장기적인 긍정적 영향", 
    detail: "단기적인 성과에 매몰되지 않고 지속 가능한 성장을 위한 마케팅 생태계를 조성합니다." 
  },
  { 
    title: "KNOWLEDGE DRIVEN", 
    desc: "데이터와 통찰력 의존", 
    detail: "감에 의존하지 않고 철저한 데이터 분석과 시장 통찰력을 바탕으로 전략을 실행합니다." 
  },
];

const Vision: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 인덱스 변경 로직
  const nextValue = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % coreValues.length);
  }, []);

  // 자동 회전 타이머 설정
  useEffect(() => {
    // Fix: Using ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments.
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isAutoPlaying) {
      interval = setInterval(nextValue, 5000); // 5초마다 회전
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, nextValue]);

  // 클릭 시 해당 인덱스로 변경 및 자동 재생 일시 정지 후 재개
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    // 10초 후 다시 자동 재생 시작
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // 인덱스에 따른 회전 각도 계산 (상단 0도 기준)
  const rotation = activeIndex * -90;

  return (
    <section id="vision" className="relative bg-black py-24 md:py-40 overflow-hidden border-b border-white/5">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/[0.03] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold-400/[0.05] pointer-events-none shadow-[inset_0_0_100px_rgba(212,175,55,0.02)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1 border border-gold-400/20 rounded-full mb-6">
            <span className="text-gold-500 font-black tracking-[0.5em] text-[10px] md:text-[11px] uppercase block">02. CORE VALUE</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-4 leading-tight">
            우리가 지키는 <span className="gold-text">4대 핵심가치</span>
          </h2>
        </div>

        {/* Interaction Wheel */}
        <div className="relative w-[340px] h-[340px] md:w-[680px] md:h-[680px] flex items-center justify-center">
          
          {/* Main Rotating Ring */}
          <div 
            className="absolute inset-0 border border-white/10 rounded-full transition-transform duration-[1500ms] cubic-bezier(0.23, 1, 0.32, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {coreValues.map((val, i) => {
              const itemAngle = i * 90;
              const isActive = i === activeIndex;
              
              return (
                <div 
                  key={i}
                  className="absolute top-1/2 left-1/2 w-full h-full cursor-pointer"
                  style={{ transform: `translate(-50%, -50%) rotate(${itemAngle}deg)` }}
                  onClick={() => handleItemClick(i)}
                >
                  {/* Floating Orb on Ring */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                    style={{ transform: `rotate(${-rotation - itemAngle}deg)`, transition: 'transform 1500ms cubic-bezier(0.23, 1, 0.32, 1)' }}
                  >
                    <div 
                      className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 transition-all duration-700 ${isActive ? 'bg-gold-400 border-gold-400 scale-150 shadow-[0_0_40px_#D4AF37]' : 'bg-black border-white/20 scale-100 group-hover:border-gold-400/50 group-hover:scale-110'}`}
                    ></div>
                    
                    <div 
                      className={`mt-6 transition-all duration-700 whitespace-nowrap text-center ${isActive ? 'opacity-100 scale-110 gold-text' : 'opacity-20 scale-90 text-white group-hover:opacity-50'}`}
                    >
                      <span className="text-[10px] md:text-sm font-black tracking-[0.4em] uppercase">{val.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Detail Panel */}
          <div className="absolute z-40 w-full max-w-[300px] md:max-w-[500px] text-center pointer-events-none">
            <div className="flex flex-col items-center">
              {/* Pulsing Center Icon */}
              <div className="relative mb-8 md:mb-12">
                <div className="absolute inset-0 bg-gold-400/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full bg-black/80 border border-gold-400/30 flex items-center justify-center shadow-[inset_0_0_30px_rgba(212,175,55,0.1)]">
                  <Shield className="w-12 h-12 md:w-20 md:h-20 text-gold-400 opacity-90" />
                </div>
              </div>
              
              {/* Dynamic Text Content */}
              <div className="min-h-[220px] md:min-h-[260px] flex flex-col items-center justify-start">
                <div key={activeIndex} className="animate-reveal flex flex-col items-center">
                  <h3 className="text-4xl md:text-7xl font-serif font-black gold-text tracking-tighter mb-6 uppercase">
                    {coreValues[activeIndex].title}
                  </h3>
                  <p className="text-white text-2xl md:text-4xl font-bold tracking-tight mb-6">
                    {coreValues[activeIndex].desc}
                  </p>
                  <p className="text-gray-400 text-sm md:text-xl leading-relaxed break-keep font-medium max-w-[90%] md:max-w-none opacity-80">
                    {coreValues[activeIndex].detail}
                  </p>
                </div>
              </div>

              {/* Navigation Hint */}
              <div className="mt-8 flex items-center gap-6 opacity-30">
                 <div className="w-12 h-px bg-gradient-to-r from-transparent to-white"></div>
                 <span className="text-[10px] font-black tracking-[1em] text-white uppercase">Core Value Cycle</span>
                 <div className="w-12 h-px bg-gradient-to-l from-transparent to-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Index Indicators */}
        <div className="mt-20 flex gap-4">
          {coreValues.map((_, i) => (
            <button
              key={i}
              onClick={() => handleItemClick(i)}
              className={`h-1.5 transition-all duration-1000 rounded-full ${i === activeIndex ? 'w-16 bg-gold-400' : 'w-4 bg-white/10 hover:bg-white/30'}`}
              aria-label={`Go to value ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .gold-text { color: #D4AF37; }
        @keyframes reveal {
          0% { opacity: 0; transform: scale(0.95) translateY(30px); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-reveal {
          animation: reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default Vision;
