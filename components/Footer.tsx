import React from 'react';

const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-sm">
                <div 
                  onClick={scrollToTop}
                  className="flex flex-col mb-8 cursor-pointer group"
                >
                    <span className="text-3xl font-serif font-black tracking-[0.2em] text-white uppercase group-hover:text-gold-400 transition-colors">BHSK</span>
                    <span className="text-[10px] text-gray-600 uppercase tracking-[0.5em] font-black mt-1">Online Marketing Agency</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-light break-keep">
                    주식회사 BHSK는 일상 속에 자연스럽게 스며드는<br/> 
                    마케팅 가치를 제안하는 종합 광고 대행사입니다.<br/>
                    병의원 및 고관여 업종의 브랜딩 성공 파트너가 되어 드립니다.
                </p>
            </div>
            
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div>
                  <h4 className="font-serif font-black text-gold-400 text-sm uppercase tracking-widest mb-8">Solution</h4>
                  <ul className="space-y-4 text-xs text-gray-500 font-bold">
                      <li><button onClick={(e) => handleLinkClick(e, 'solutions')} className="hover:text-white transition-colors outline-none uppercase tracking-widest text-left">Naver View & Blog</button></li>
                      <li><button onClick={(e) => handleLinkClick(e, 'solutions')} className="hover:text-white transition-colors outline-none uppercase tracking-widest text-left">Place SEO</button></li>
                      <li><button onClick={(e) => handleLinkClick(e, 'solutions')} className="hover:text-white transition-colors outline-none uppercase tracking-widest text-left">Viral & SNS</button></li>
                      <li><button onClick={(e) => handleLinkClick(e, 'solutions')} className="hover:text-white transition-colors outline-none uppercase tracking-widest text-left">CPA & Press</button></li>
                  </ul>
              </div>

               <div>
                  <h4 className="font-serif font-black text-gold-400 text-sm uppercase tracking-widest mb-8">Info</h4>
                  <ul className="space-y-4 text-xs text-gray-500 font-bold">
                      <li>대표 : 김계영</li>
                      <li>사업자등록번호 : 775-81-02227</li>
                      <li>TEL : 010-8764-5830</li>
                      <li>EMAIL : bhsk7777@naver.com</li>
                  </ul>
              </div>
            </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-[10px] font-black tracking-widest uppercase">
            © {new Date().getFullYear()} BHSK PROFILE 2023. All rights reserved.
            </p>
            <div className="flex gap-8 text-[10px] text-gray-600 font-black uppercase tracking-widest">
                <button onClick={(e) => e.preventDefault()} className="hover:text-gold-400 transition-colors">Privacy Policy</button>
                <button onClick={(e) => e.preventDefault()} className="hover:text-gold-400 transition-colors">Terms of Service</button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;