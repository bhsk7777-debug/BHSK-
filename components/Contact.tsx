import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Formspree API를 통한 데이터 수집
      const response = await fetch("https://formspree.io/f/xbdjelnb", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error("전송 실패");
      }
    } catch (error) {
      console.error("Formspree submission failed:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative z-10 py-32 px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
        
        {/* Contact Info Panel */}
        <div className="space-y-12">
          <div>
            <span className="text-gold-500 font-black tracking-[0.4em] text-[10px] md:text-xs uppercase block mb-6">05. Contact Us</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              성공을 향한<br/>
              <span className="gold-text">가장 확실한 선택</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed font-light max-w-lg">
              마케팅 성과는 곧 <span className="text-white font-bold italic">신뢰의 수치</span>입니다. BHSK와 함께 압도적인 성장을 경험해보세요.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Phone</h4>
                <p className="text-white text-lg font-bold">010-8764-5830</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Email</h4>
                <p className="text-white text-sm font-bold">bhsk7777@naver.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Location</h4>
                <p className="text-white text-sm font-medium leading-relaxed">대구광역시 달서구 조암로 29,<br/>122호 BHSK</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Service Hours</h4>
                <p className="text-white text-sm font-medium">평일 09:30 - 18:30</p>
                <p className="text-gray-600 text-[9px] uppercase font-black">Weekends / Holidays off</p>
              </div>
            </div>
          </div>

          <div className="pt-8">
             <a 
               href="http://pf.kakao.com/_GxiAuG" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-4 px-8 py-4 bg-[#FEE500] text-[#191919] font-black rounded-lg hover:brightness-95 transition-all shadow-xl shadow-yellow-500/10"
             >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="text-sm uppercase tracking-widest">카카오톡 실시간 상담</span>
             </a>
          </div>
        </div>

        {/* Premium Consultation Form */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold-400/20 to-gold-600/20 rounded-xl blur opacity-25"></div>
          <div className="relative bg-[#050505] border border-white/10 p-8 md:p-14 rounded-xl shadow-2xl">
            
            {status === 'success' ? (
              <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-8 animate-reveal">
                <div className="w-24 h-24 bg-gold-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                   <CheckCircle className="w-12 h-12 text-black" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-serif font-black text-white uppercase">진단 신청 완료</h3>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-left space-y-4 max-w-sm mx-auto">
                    <p className="text-xs text-gray-300 font-medium leading-relaxed">
                      귀하의 소중한 마케팅 진단 신청이 정상적으로 접수되었습니다. 담당 마케터가 영업일 기준 24시간 이내로 연락드리겠습니다.
                    </p>
                    <p className="text-[11px] text-gray-500 text-center">
                      * 빠른 상담을 원하시면 카카오톡 실시간 상담을 이용해주세요.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-gold-400 text-xs font-black uppercase tracking-widest hover:text-white transition-colors border-b border-gold-400/30 pb-1"
                >
                  새로 문의하기
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-8 animate-reveal">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                   <AlertCircle className="text-red-500 w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-black text-white mb-4 uppercase">전송 오류</h3>
                  <p className="text-gray-400 text-sm">네트워크 상태를 확인하거나 잠시 후 다시 시도해주세요.</p>
                </div>
                <button onClick={() => setStatus('idle')} className="text-white text-xs underline">다시 시도</button>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <h3 className="text-5xl font-serif font-black text-white mb-4 tracking-tighter">Consultation</h3>
                  <p className="text-gold-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Free Diagnosis Request</p>
                </div>
                
                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Clinic Name</label>
                      <input required name="clinic_name" type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-800 font-medium" placeholder="병의원 및 업체명" />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Manager Name</label>
                      <input required name="manager_name" type="text" className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-800 font-medium" placeholder="원장님 또는 성함" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Contact Info</label>
                    <input required name="contact_info" type="tel" className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-800 font-medium" placeholder="휴대폰 번호 ( - 제외 )" />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Solution Type</label>
                    <select required name="solution_type" className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors font-medium appearance-none">
                      <option value="" className="bg-black">관심 있는 솔루션 선택</option>
                      <option value="네이버 뷰 상위노출" className="bg-black">네이버 뷰 상위노출</option>
                      <option value="플레이스 SEO" className="bg-black">플레이스 SEO</option>
                      <option value="커뮤니티 바이럴" className="bg-black">커뮤니티 바이럴</option>
                      <option value="메디컬 CPA" className="bg-black">메디컬 CPA</option>
                      <option value="통합 브랜딩 솔루션" className="bg-black">통합 브랜딩 솔루션</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Message</label>
                    <textarea required name="message" rows={4} className="w-full bg-transparent border-b border-white/10 px-0 py-4 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none placeholder:text-gray-800 font-medium" placeholder="현재 고민 중인 마케팅 문제점 등을 기입해주세요."></textarea>
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-6 bg-gold-400 hover:bg-gold-500 text-white font-black text-lg md:text-xl tracking-[0.2em] rounded-sm transition-all shadow-2xl shadow-gold-400/20 disabled:opacity-50 flex items-center justify-center gap-3 uppercase"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>무료 마케팅 진단 신청 <Send className="w-5 h-5" /></>
                      )}
                    </button>
                    <p className="text-[9px] text-gray-600 text-center mt-8 uppercase tracking-[0.4em] font-black">신청 즉시 담당 마케터가 영업일 기준 24시간 이내 연락 드립니다.</p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;