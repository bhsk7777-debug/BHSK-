import React, { useState, useEffect, useRef } from 'react';
import { Settings, Image as ImageIcon, Plus, Trash2, Save, X, ArrowLeft, Lock, LogIn, Video, Layout, Upload, FileImage, CheckCircle } from 'lucide-react';
import { PortfolioItem } from './References';

interface AdminDashboardProps {
  onClose: () => void;
}

interface Partner {
  name: string;
  logo: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ id: '', pw: '' });
  const [activeTab, setActiveTab] = useState<'portfolio' | 'general' | 'services'>('general');
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);
  
  // Portfolio State
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [newItem, setNewItem] = useState({ title: '', category: '', image: 'https://picsum.photos/800/600', result: '', desc: '' });

  // General Settings State
  const [partners, setPartners] = useState<Partner[]>([]);
  const [newPartner, setNewPartner] = useState({ name: '', logo: '' });
  
  const [globalImages, setGlobalImages] = useState({
    hero_video: 'https://player.vimeo.com/external/459389137.sd.mp4?s=9108343725514f7b2c011e0e13718915e7a9b09a&profile_id=164&oauth2_token_id=57447761',
    hero_poster: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    team_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    expertise_image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80',
    service_bg_1: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    service_bg_2: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80",
    service_bg_3: "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80",
    service_bg_4: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    service_bg_5: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80",
  });

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('bhsk_portfolio');
    if (savedPortfolio) setItems(JSON.parse(savedPortfolio));

    const savedPartners = localStorage.getItem('bhsk_partners');
    if (savedPartners) setPartners(JSON.parse(savedPartners));

    const savedImages = localStorage.getItem('bhsk_global_images');
    if (savedImages) setGlobalImages(prev => ({ ...prev, ...JSON.parse(savedImages) }));

    const session = sessionStorage.getItem('bhsk_admin_session');
    if (session === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.id === 'bhsk7777' && loginData.pw === 'wntlrghltk12!') {
      setIsLoggedIn(true);
      sessionStorage.setItem('bhsk_admin_session', 'true');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('bhsk_admin_session');
  };

  const saveToStorage = () => {
    localStorage.setItem('bhsk_portfolio', JSON.stringify(items));
    localStorage.setItem('bhsk_partners', JSON.stringify(partners));
    localStorage.setItem('bhsk_global_images', JSON.stringify(globalImages));
    window.dispatchEvent(new Event('storage'));
    
    setShowSaveFeedback(true);
    setTimeout(() => setShowSaveFeedback(false), 2000);
  };

  const updateGlobalImage = (key: keyof typeof globalImages, value: string) => {
    setGlobalImages(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolio = () => {
    if (!newItem.title || !newItem.category) return;
    const item: PortfolioItem = {
      ...newItem,
      id: Date.now().toString(),
      result: newItem.result || '성과 수치 입력 필요',
      desc: newItem.desc || '설명을 입력하세요'
    };
    setItems([...items, item]);
    setNewItem({ title: '', category: '', image: 'https://picsum.photos/800/600', result: '', desc: '' });
  };

  const handleAddPartner = () => {
    if (!newPartner.name || !newPartner.logo) return;
    setPartners([...partners, newPartner]);
    setNewPartner({ name: '', logo: '' });
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-reveal">
        <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl relative text-center">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
          <div className="w-20 h-20 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
            <Lock className="text-black w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-black text-white uppercase tracking-tighter">BHSK Admin</h1>
          <form className="space-y-6 mt-10 text-left" onSubmit={handleLogin}>
            <input 
              type="text" 
              value={loginData.id}
              onChange={e => setLoginData({...loginData, id: e.target.value})}
              placeholder="ID"
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-gold-400 text-white" 
            />
            <input 
              type="password" 
              value={loginData.pw}
              onChange={e => setLoginData({...loginData, pw: e.target.value})}
              placeholder="Password"
              className="w-full bg-black border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-gold-400 text-white" 
            />
            <button type="submit" className="w-full py-5 bg-gold-400 hover:bg-gold-500 text-black font-black rounded-2xl transition-all uppercase tracking-widest">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black overflow-y-auto animate-reveal font-sans selection:bg-gold-400 selection:text-black">
      <div className="min-h-screen p-6 md:p-16">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div>
              <h1 className="text-5xl font-black mb-2 flex items-center gap-6 text-white">
                BHSK <span className="text-gold-400">Dashboard</span>
              </h1>
              <p className="uppercase tracking-[0.4em] text-[10px] font-black text-gray-500">Authorized Administrative Access</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={handleLogout} className="px-6 py-3 text-xs font-black text-gray-500 hover:text-white uppercase tracking-widest border border-white/10 rounded-xl transition-all">Logout</button>
              <button onClick={onClose} className="p-4 bg-white/5 hover:bg-gold-400 hover:text-black rounded-full transition-all border border-white/10 text-white">
                <X size={24} />
              </button>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="w-full lg:w-72 shrink-0 space-y-4">
              <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-2xl transition-all font-black uppercase tracking-widest text-xs ${activeTab === 'general' ? 'bg-gold-400 text-black shadow-lg shadow-gold-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
              >
                <Video size={18} />
                Global Assets
              </button>
              <button 
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-2xl transition-all font-black uppercase tracking-widest text-xs ${activeTab === 'services' ? 'bg-gold-400 text-black shadow-lg shadow-gold-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
              >
                <Layout size={18} />
                Services Images
              </button>
              <button 
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center gap-4 px-8 py-5 rounded-2xl transition-all font-black uppercase tracking-widest text-xs ${activeTab === 'portfolio' ? 'bg-gold-400 text-black shadow-lg shadow-gold-400/20' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'}`}
              >
                <ImageIcon size={18} />
                Portfolio
              </button>
            </aside>

            <main className="flex-grow pb-32 relative">
              {activeTab === 'general' && (
                <div className="space-y-8 animate-reveal">
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
                    <h2 className="text-3xl font-serif font-black mb-12 text-white">Main Background Assets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <AssetInput 
                        label="Hero Video Background (MP4)" 
                        value={globalImages.hero_video} 
                        onChange={(v) => updateGlobalImage('hero_video', v)} 
                        onFileChange={(v) => updateGlobalImage('hero_video', v)}
                        accept="video/*"
                      />
                      <AssetInput 
                        label="Hero Video Poster (Still Image)" 
                        value={globalImages.hero_poster} 
                        onChange={(v) => updateGlobalImage('hero_poster', v)} 
                        onFileChange={(v) => updateGlobalImage('hero_poster', v)}
                      />
                      <AssetInput 
                        label="Team Section Backdrop" 
                        value={globalImages.team_image} 
                        onChange={(v) => updateGlobalImage('team_image', v)} 
                        onFileChange={(v) => updateGlobalImage('team_image', v)}
                      />
                      <AssetInput 
                        label="Expertise Header Visual" 
                        value={globalImages.expertise_image} 
                        onChange={(v) => updateGlobalImage('expertise_image', v)} 
                        onFileChange={(v) => updateGlobalImage('expertise_image', v)}
                      />
                    </div>
                  </div>

                  <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl">
                    <h2 className="text-3xl font-serif font-black mb-12 text-white">Strategic Partners</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <input value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} className="bg-black border border-white/10 px-6 py-4 rounded-xl text-white" placeholder="Partner Name" />
                      <div className="relative">
                        <input value={newPartner.logo} onChange={e => setNewPartner({...newPartner, logo: e.target.value})} className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl text-white pr-16" placeholder="Logo URL or Upload" />
                        <label className="absolute right-2 top-2 p-2 bg-gold-400 text-black rounded-lg cursor-pointer hover:bg-gold-500 transition-colors">
                          <Upload size={18} />
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b) => setNewPartner({...newPartner, logo: b}))} />
                        </label>
                      </div>
                      <button onClick={handleAddPartner} className="md:col-span-2 py-4 bg-gold-400 text-black font-black rounded-xl uppercase tracking-widest text-xs">Add Partner</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {partners.map((p, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-black border border-white/5 rounded-xl group">
                           <div className="flex items-center gap-4">
                             <img src={p.logo} className="h-8 w-12 object-contain bg-white rounded p-1" />
                             <span className="text-white font-bold">{p.name}</span>
                           </div>
                           <button onClick={() => setPartners(partners.filter((_, idx) => idx !== i))} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl animate-reveal">
                  <h2 className="text-3xl font-serif font-black mb-12 text-white">Service Card Backgrounds</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AssetInput label="1. Naver View Background" value={globalImages.service_bg_1} onChange={(v) => updateGlobalImage('service_bg_1', v)} onFileChange={(v) => updateGlobalImage('service_bg_1', v)} />
                    <AssetInput label="2. Place SEO Background" value={globalImages.service_bg_2} onChange={(v) => updateGlobalImage('service_bg_2', v)} onFileChange={(v) => updateGlobalImage('service_bg_2', v)} />
                    <AssetInput label="3. Performance CPA Background" value={globalImages.service_bg_3} onChange={(v) => updateGlobalImage('service_bg_3', v)} onFileChange={(v) => updateGlobalImage('service_bg_3', v)} />
                    <AssetInput label="4. Viral Marketing Background" value={globalImages.service_bg_4} onChange={(v) => updateGlobalImage('service_bg_4', v)} onFileChange={(v) => updateGlobalImage('service_bg_4', v)} />
                    <AssetInput label="5. Press & SNS Background" value={globalImages.service_bg_5} onChange={(v) => updateGlobalImage('service_bg_5', v)} onFileChange={(v) => updateGlobalImage('service_bg_5', v)} />
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && (
                <div className="bg-[#0f0f0f] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl animate-reveal">
                   <h2 className="text-3xl font-serif font-black mb-12 text-white">Portfolio Management</h2>
                   <div className="space-y-8">
                     <div className="bg-white/[0.03] p-8 rounded-3xl border border-white/5 space-y-4">
                        <input value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})} className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl text-white" placeholder="Client Name" />
                        <input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl text-white" placeholder="Category" />
                        <input value={newItem.result} onChange={e => setNewItem({...newItem, result: e.target.value})} className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl text-white" placeholder="Result (e.g. 250% Growth)" />
                        <div className="relative">
                          <input value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} className="w-full bg-black border border-white/10 px-6 py-4 rounded-xl text-white pr-16" placeholder="Thumbnail URL or Upload" />
                          <label className="absolute right-2 top-2 p-2 bg-gold-400 text-black rounded-lg cursor-pointer hover:bg-gold-500 transition-colors">
                            <Upload size={18} />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (b) => setNewItem({...newItem, image: b}))} />
                          </label>
                        </div>
                        <button onClick={handleAddPortfolio} className="w-full py-4 bg-gold-400 text-black font-black rounded-xl uppercase tracking-widest">Publish Item</button>
                     </div>
                     <div className="grid grid-cols-1 gap-4">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center justify-between p-6 bg-black border border-white/5 rounded-2xl group">
                            <div className="flex items-center gap-6">
                              <img src={item.image} className="w-20 h-14 object-cover rounded-lg border border-white/10" />
                              <div>
                                <h4 className="text-white font-bold">{item.title}</h4>
                                <p className="text-gold-400 text-xs font-black uppercase tracking-widest">{item.category} • {item.result}</p>
                              </div>
                            </div>
                            <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                          </div>
                        ))}
                     </div>
                   </div>
                </div>
              )}

              {/* 최종 저장 버튼: 페이지 하단 고정 느낌의 섹션 */}
              <div className="mt-16 flex flex-col items-center">
                <button 
                  onClick={saveToStorage}
                  className={`group relative flex items-center justify-center gap-4 px-12 py-6 rounded-3xl font-black uppercase tracking-[0.3em] transition-all duration-500 ${showSaveFeedback ? 'bg-green-500 text-white scale-95' : 'bg-gold-400 text-black hover:bg-gold-500 hover:shadow-[0_0_50px_#D4AF37] active:scale-95'}`}
                >
                  {showSaveFeedback ? (
                    <>
                      <CheckCircle className="animate-bounce" size={24} />
                      All Changes Saved!
                    </>
                  ) : (
                    <>
                      <Save size={24} />
                      Save All Changes
                    </>
                  )}
                </button>
                <p className="mt-4 text-[10px] text-gray-600 font-black uppercase tracking-widest">Your updates will be reflected across the entire site immediately after saving.</p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AssetInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onFileChange: (v: string) => void;
  accept?: string;
}

const AssetInput: React.FC<AssetInputProps> = ({ label, value, onChange, onFileChange, accept = "image/*" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 space-y-4">
      <label className="text-[10px] font-black text-gold-400 uppercase tracking-[0.4em] block">{label}</label>
      <div 
        className="group relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 mb-4 bg-black flex items-center justify-center text-gray-800 cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {value.startsWith('data:video') || value.includes('.mp4') ? (
          <Video size={48} className="group-hover:text-gold-400 transition-colors" />
        ) : (
          <img src={value} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Invalid+Asset')} />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
           <Upload className="text-gold-400" size={32} />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">Click to Upload</span>
        </div>
      </div>
      <div className="space-y-2">
        <input 
          type="text" 
          value={value} 
          onChange={e => onChange(e.target.value)} 
          className="w-full bg-black border border-white/10 px-4 py-3 rounded-xl text-[10px] font-mono text-gray-400 focus:border-gold-400 transition-colors overflow-hidden text-ellipsis" 
          placeholder="Or paste direct URL"
        />
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default AdminDashboard;