import React, { useState, useEffect } from 'react';

const PremiumBackground: React.FC = () => {
  const [assets, setAssets] = useState({
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=9108343725514f7b2c011e0e13718915e7a9b09a&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80"
  });

  useEffect(() => {
    const loadAssets = () => {
      try {
        const saved = localStorage.getItem('bhsk_global_images');
        if (saved) {
          const parsed = JSON.parse(saved);
          setAssets(prev => ({
            video: parsed.hero_video || prev.video,
            poster: parsed.hero_poster || prev.poster
          }));
        }
      } catch (e) {
        console.error("Failed to load background assets", e);
      }
    };
    loadAssets();
    window.addEventListener('storage', loadAssets);
    return () => window.removeEventListener('storage', loadAssets);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* 정적 배경 (영상 로딩 전 레이어) */}
      <div className="absolute inset-0 bg-[#050505]"></div>

      {/* 비디오 레이어 */}
      <video
        key={assets.video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale-[0.2] brightness-[0.6]"
        poster={assets.poster}
      >
        <source src={assets.video} type="video/mp4" />
      </video>

      {/* 오버레이 필터들 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70"></div>

      {/* 노이즈 질감 */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 움직이는 골드 광원 */}
      <div className="absolute top-1/4 left-1/4 w-[70vw] h-[70vh] bg-gold-600/10 rounded-full blur-[140px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vh] bg-gold-400/5 rounded-full blur-[160px] animate-pulse-slow-reverse"></div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(3%, 3%) scale(1.05); opacity: 0.4; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1.05); opacity: 0.3; }
          50% { transform: translate(-3%, -3%) scale(1); opacity: 0.1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 15s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumBackground;