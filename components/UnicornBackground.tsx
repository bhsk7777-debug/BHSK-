import React, { useState, useEffect } from 'react';

const PremiumBackground: React.FC = () => {
  const [assets, setAssets] = useState({
    video: "https://player.vimeo.com/external/459389137.sd.mp4?s=9108343725514f7b2c011e0e13718915e7a9b09a&profile_id=164&oauth2_token_id=57447761",
    poster: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80"
  });

  useEffect(() => {
    const loadAssets = () => {
      const saved = localStorage.getItem('bhsk_global_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        setAssets({
          video: parsed.hero_video || assets.video,
          poster: parsed.hero_poster || assets.poster
        });
      }
    };
    loadAssets();
    window.addEventListener('storage', loadAssets);
    return () => window.removeEventListener('storage', loadAssets);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black">
      {/* 고화질 다이나믹 골드 모션 백그라운드 */}
      <video
        key={assets.video} // Key change forces re-render when video source changes
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3] brightness-[0.7]"
        poster={assets.poster}
      >
        <source 
          src={assets.video} 
          type="video/mp4" 
        />
      </video>

      {/* 그라데이션 오버레이 (텍스트 가독성 확보) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)] opacity-60"></div>

      {/* 필름 그레인/노이즈 질감 오버레이 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 부드러운 골드 빛 오라 (움직이는 광원 효과) */}
      <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-gold-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-gold-400/5 rounded-full blur-[150px] animate-pulse-slow-reverse"></div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(5%, 5%) scale(1.1); opacity: 0.6; }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { transform: translate(0, 0) scale(1.1); opacity: 0.5; }
          50% { transform: translate(-5%, -5%) scale(1); opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumBackground;