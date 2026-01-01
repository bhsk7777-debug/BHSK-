import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Trophy } from 'lucide-react';

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  result: string;
  desc: string;
  image: string;
}

const defaultReferences: PortfolioItem[] = [
  {
    id: '1',
    category: "Plastic Surgery",
    title: "강남 A 성형외과",
    result: "신환 유입 250% 증가",
    desc: "프리미엄 리프팅 시술 타겟팅 및 블로그 브랜딩을 통해 개원 3개월 만에 지역 내 입지 구축 완료.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
  },
  {
    id: '2',
    category: "Dermatology",
    title: "청담 B 피부과",
    result: "VIP 멤버십 300명 달성",
    desc: "고가 시술 중심의 카드뉴스 제작 및 릴스 홍보로 진성 고객 DB 확보 및 월 매출 목표 조기 달성.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80"
  },
  {
    id: '3',
    category: "Dentistry",
    title: "신사 C 치과",
    result: "임플란트 문의 월 150건",
    desc: "지식인/맘카페 여론 관리와 플레이스 SEO를 연동하여 '안 아픈 치료' 브랜드 이미지를 성공적으로 안착.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80"
  }
];

const References: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('bhsk_portfolio');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(defaultReferences);
      localStorage.setItem('bhsk_portfolio', JSON.stringify(defaultReferences));
    }

    const handleStorage = () => {
      const updated = localStorage.getItem('bhsk_portfolio');
      if (updated) setItems(JSON.parse(updated));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section id="references" className="relative z-10 py-32 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-12">
          <div>
            <span className="text-gold-500 font-black tracking-[0.3em] text-xs uppercase block mb-4">04. Success Partnership</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              압도적 <span className="gold-text italic">성공 사례</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 px-6 py-3 bg-gold-400 text-black font-black text-sm uppercase rounded-sm">
            <Trophy className="w-5 h-5" />
            PARTNER CLINICS {items.length * 50}+
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((ref, index) => (
            <div 
              key={ref.id}
              className="group relative h-[550px] flex flex-col justify-end p-10 rounded-sm border border-white/10 bg-black transition-all duration-700 hover:border-gold-400/60 overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${ref.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
              
              <div className="relative z-10 space-y-4">
                <span className="text-gold-400 text-xs font-black uppercase tracking-widest border-l-2 border-gold-400 pl-3">
                  {ref.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">{ref.title}</h3>
                <div className="text-4xl font-serif font-black gold-gradient-text italic">
                  {ref.result}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed font-light transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   {ref.desc}
                </p>
                <div className="pt-6">
                  <button className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 group-hover:text-gold-400 transition-colors">
                    Case Study <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default References;