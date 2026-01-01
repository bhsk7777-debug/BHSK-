import React, { useState, useEffect } from 'react';
import { Search, Globe, MessageSquare, BarChart, FileText, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

const initialSolutions = [
  {
    id: 'service_bg_1',
    icon: <Search className="w-6 h-6" />,
    title: "Naver View 상위노출",
    desc: "전문 작가진의 정교한 로직 분석을 통해 검색 결과 최상단을 점유합니다. 브랜드 가치를 높이는 고퀄리티 원고로 잠재 고객의 신뢰를 확보합니다.",
    points: ["의료법/공정위 문구 준수", "매일 순위 트래킹 보고", "고퀄리티 이미지 제작"],
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    id: 'service_bg_2',
    icon: <Globe className="w-6 h-6" />,
    title: "Place SEO 최적화",
    desc: "로컬 키워드 최적화와 방문자 데이터 관리를 통해 우리 병원을 지역 랜드마크로 만듭니다. 지도의 순위가 곧 신규 환자의 수치입니다.",
    points: ["지도 상위 노출", "영수증/방문자리뷰 관리", "로컬 키워드 선별"],
    bgImage: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80"
  },
  {
    id: 'service_bg_3',
    icon: <BarChart className="w-6 h-6" />,
    title: "Performance CPA",
    desc: "단순 클릭이 아닌 '실질적인 액션' 발생 시에만 비용을 지불하는 가장 합리적인 마케팅입니다. 고효율 플랫폼 선정으로 DB 품질을 극대화합니다.",
    points: ["고효율 플랫폼 선정", "진성 가망 고객 타겟팅", "구매전환율 극대화"],
    bgImage: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80"
  },
  {
    id: 'service_bg_4',
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Viral Marketing",
    desc: "맘카페, 지식인 등 대형 커뮤니티에 자연스럽게 스며드는 정보를 배포합니다. 획일화된 원고가 아닌 전략적인 배포로 자연스러운 입소문을 유도합니다.",
    tags: ["맘카페 입소문", "지식인 Q&A", "여론 형성"],
    bgImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
  },
  {
    id: 'service_bg_5',
    icon: <FileText className="w-6 h-6" />,
    title: "Press Reports & SNS",
    desc: "공신력 있는 언론보도와 감각적인 SNS 피드 운영을 통해 브랜드의 신뢰도와 인지도를 동시에 구축하는 토탈 브랜딩 솔루션입니다.",
    tags: ["뉴스 송출", "카드뉴스 제작", "브랜딩 피드"],
    bgImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80"
  }
];

const Services: React.FC = () => {
  const [solutions, setSolutions] = useState(initialSolutions);

  useEffect(() => {
    const loadCustomBgs = () => {
      const saved = localStorage.getItem('bhsk_global_images');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSolutions(prev => prev.map(item => ({
          ...item,
          bgImage: parsed[item.id] || item.bgImage
        })));
      }
    };
    loadCustomBgs();
    window.addEventListener('storage', loadCustomBgs);
    return () => window.removeEventListener('storage', loadCustomBgs);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="solutions" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-gold-500 font-black tracking-[0.3em] text-xs uppercase block mb-4">03. Marketing Solution</span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
            <span className="gold-text">BHSK</span>의 압도적 솔루션
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            광고주와 대행사가 직접 소통하는 <span className="text-white font-bold">다이렉트 시스템</span>으로 불필요한 수수료를 줄이고 오직 성과에만 집중합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-[#0a0a0a] min-h-[480px] p-10 rounded-xl border border-white/5 hover:border-gold-400/50 transition-all duration-700 flex flex-col justify-between overflow-hidden"
            >
              <div 
                className="absolute inset-0 z-0 opacity-[0.05] grayscale group-hover:grayscale-0 group-hover:opacity-[0.15] transition-all duration-1000 group-hover:scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-lg bg-gold-400/10 text-gold-400 flex items-center justify-center mb-10 group-hover:bg-gold-400 group-hover:text-black transition-all duration-500 transform group-hover:rotate-[360deg]">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-6 group-hover:text-gold-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 break-keep opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </div>
              <div className="relative z-10 space-y-3">
                {item.points ? item.points.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span className="font-medium">{p}</span>
                  </div>
                )) : (
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((t, i) => (
                      <span key={i} className="inline-block px-3 py-1 bg-white/5 text-gold-400 text-[11px] font-bold rounded border border-gold-400/20">#{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}

          <div 
            onClick={scrollToContact}
            className="group relative bg-gradient-to-br from-gold-400/10 to-gold-600/20 min-h-[480px] p-10 rounded-xl border border-gold-400/30 hover:border-gold-400 transition-all duration-700 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.05)]"
          >
            <div className="relative z-10 space-y-8">
              <div className="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform">
                <MessageCircle className="w-10 h-10 text-black fill-current" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-black text-white leading-tight">
                  귀사의 성장을 위한<br/>
                  <span className="gold-text">맞춤 솔루션</span> 제안
                </h3>
                <p className="text-gray-400 text-sm font-medium">
                  분야별 최고 전문가가 직접 진단해 드립니다.<br/>
                  지금 무료 마케팅 진단을 신청해보세요.
                </p>
              </div>
              <button className="flex items-center gap-3 px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:bg-gold-400 transition-colors mx-auto">
                Free Diagnosis <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;