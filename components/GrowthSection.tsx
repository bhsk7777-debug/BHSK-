import React, { useMemo, useEffect, useState } from 'react';

const GrowthSection: React.FC = () => {
  // 2021년부터 2025년까지의 데이터 (사용자 요청에 따라 수치 상향 및 최종 328 설정)
  const data = useMemo(() => {
    return [
      { year: 2021, value: 142 },
      { year: 2022, value: 186 },
      { year: 2023, value: 235 },
      { year: 2024, value: 284 },
      { year: 2025, value: 328 }
    ];
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById('growth');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const chartWidth = 1000;
  const chartHeight = 350;
  // 최대값에 맞춰 차트 스케일링
  const maxValue = Math.max(...data.map(d => d.value)) * 1.2;

  const points = data.map((d, i) => {
    const x = 100 + (i * (chartWidth - 200) / (data.length - 1));
    const y = chartHeight - (d.value / maxValue * chartHeight);
    return { x, y, ...d };
  });

  const pathD = useMemo(() => {
    return points.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (p.x - prev.x) / 2;
      return `${acc} C ${cp1x} ${prev.y}, ${cp1x} ${p.y}, ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  return (
    <section id="growth" className="relative py-48 px-6 bg-black overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] select-none pointer-events-none uppercase leading-none">
        Evolution
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="space-y-4">
            <span className="text-gold-500 font-black tracking-[0.4em] text-xs uppercase block">Market Performance</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
              Client <span className="text-gold-400 italic">Sales Revenue</span><br/>
              Trend 2021-2025
            </h2>
          </div>
          <div className="text-right">
             <p className="text-gray-500 text-lg font-medium max-w-md">
               BHSK는 매년 압도적인 성장을 지속하며 광고주의 매출 극대화를 숫자로 증명하고 있습니다.
             </p>
          </div>
        </div>

        <div className="relative h-[500px] w-full mt-10">
          <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-[10px] text-gray-700 font-black uppercase tracking-tighter py-8">
            <span className="vertical-text">Revenue Volume</span>
          </div>

          <svg viewBox={`0 0 ${chartWidth} 450`} className="w-full h-full overflow-visible">
            {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
              <line key={i} x1="50" y1={chartHeight * p} x2={chartWidth - 50} y2={chartHeight * p} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            {points.map((p, i) => (
              <rect
                key={`bar-${i}`}
                x={p.x - 30}
                y={chartHeight}
                width="60"
                height="0"
                fill="rgba(212, 175, 55, 0.05)"
                className={isVisible ? "animate-grow-bar" : ""}
                style={{ 
                  animationDelay: `${i * 200}ms`,
                  '--target-height': `${chartHeight - p.y}px`,
                  '--target-y': `${p.y}px`
                } as any}
              />
            ))}

            <path 
              d={pathD} 
              fill="none" 
              stroke="url(#soaringGradient)" 
              strokeWidth="6"
              strokeLinecap="round"
              className={`arrow-line ${isVisible ? 'active' : ''}`}
            />
            
            <defs>
              <linearGradient id="soaringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>

            {points.map((p, i) => (
              <g key={p.year} className={`opacity-0 ${isVisible ? 'animate-fade-in' : ''}`} style={{ animationDelay: `${1500 + i * 200}ms` }}>
                <circle cx={p.x} cy={p.y} r={i === points.length - 1 ? 45 : 24} fill={i === points.length - 1 ? "#D4AF37" : "white"} className={i === points.length - 1 ? "animate-pulse" : ""} />
                <text x={p.x} y={p.y} dy=".35em" textAnchor="middle" fill="black" className={`${i === points.length - 1 ? "text-[24px]" : "text-[14px]"} font-black`}>
                  {p.value}
                </text>
                <text x={p.x} y={420} textAnchor="middle" fill={i === points.length - 1 ? "white" : "rgba(255,255,255,0.4)"} className={`text-[16px] font-black tracking-widest ${i === points.length - 1 ? "text-gold-400" : ""}`}>
                  {p.year}
                </text>

                {i === points.length - 1 && (
                  <text x={p.x} y={p.y - 70} textAnchor="middle" fill="#D4AF37" className="text-[12px] font-black uppercase tracking-[0.2em]">
                    UNIT : 100M KRW
                  </text>
                )}
              </g>
            ))}

            {isVisible && (
              <path 
                d="M -15,-10 L 15,0 L -15,10 L -8,0 Z" 
                fill="#FFF"
                className="arrow-head"
                style={{ 
                  offsetPath: `path("${pathD}")`,
                  animation: `followPath 2.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: '500ms'
                }}
              />
            )}
          </svg>
        </div>
      </div>

      <style>{`
        .arrow-line {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          transition: stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .arrow-line.active {
          stroke-dashoffset: 0;
          transition-delay: 500ms;
        }
        .arrow-head { opacity: 0; offset-rotate: auto; }
        @keyframes followPath {
          0% { offset-distance: 0%; opacity: 0; }
          10% { opacity: 1; }
          95% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes grow-bar {
          from { height: 0; y: ${chartHeight}px; }
          to { height: var(--target-height); y: var(--target-y); }
        }
        .animate-grow-bar { animation: grow-bar 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
      `}</style>
    </section>
  );
};

export default GrowthSection;