import React, { useState } from 'react';
import { 
  Globe, Bell, Compass, Grid, List, Users, Crown, ArrowRight, 
  Sparkles, ChevronDown, Star, Menu, Image as ImageIcon, Send,
  Home, Search, PlusCircle, User, Hash, Book, Scroll, Dices, MoreVertical
} from 'lucide-react';

const adventures = [
  {
    id: 1,
    title: "A Taverna do Dragão Quebrado",
    master: "Dungeon Master",
    masterAvatar: "https://picsum.photos/seed/dm/100/100",
    players: "4/6",
    genre: "Fantasia Medieval",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Ecos de Neo-Tóquio",
    master: "CyberNinja99",
    masterAvatar: "https://picsum.photos/seed/cyber/100/100",
    players: "6/6",
    genre: "Sci-fi / Cyberpunk",
    image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "O Chamado do Abismo",
    master: "Cultista_Anônimo",
    masterAvatar: "https://picsum.photos/seed/cult/100/100",
    players: "3/5",
    genre: "Horror Cósmico",
    image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Lendas de Valíria",
    master: "Rei_Arthur",
    masterAvatar: "https://picsum.photos/seed/arthur/100/100",
    players: "5/8",
    genre: "Alta Fantasia",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
  }
];

const roomMessages = [
  {
    id: 1,
    type: 'narrative',
    content: "A névoa espessa rasteja por entre os troncos retorcidos da Floresta Sussurrante. O som de galhos quebrando ecoa à distância, seguido por um silêncio antinatural. Vocês sentem o frio penetrar em suas armaduras.",
  },
  {
    id: 2,
    type: 'speech',
    user: "Kaelen",
    avatar: "https://picsum.photos/seed/kaelen/100/100",
    content: "Fiquem atentos. Não estamos sozinhos aqui. Alguém prepare uma tocha.",
  },
  {
    id: 3,
    type: 'system',
    content: "D20 (Percepção): 18 + 2 = 20 - Sucesso!",
    user: "Elara",
  },
  {
    id: 4,
    type: 'narrative',
    content: "Com sua visão aguçada, Elara percebe o brilho de olhos amarelos na escuridão, a cerca de dez metros à frente. Uma criatura lupina de proporções monstruosas rosna baixinho.",
  },
  {
    id: 5,
    type: 'speech',
    user: "Elara",
    avatar: "https://picsum.photos/seed/elara/100/100",
    content: "Ali! Cuidado, é um Lobo Atroz!",
  }
];

const npcs = [
  { name: "Lobo Atroz", avatar: "https://picsum.photos/seed/wolf/100/100", role: "Inimigo" },
  { name: "Velho Ermitão", avatar: "https://picsum.photos/seed/hermit/100/100", role: "Neutro" },
];

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'room'>('dashboard');

  if (currentView === 'room') {
    return (
      <div className="h-screen w-screen flex overflow-hidden bg-[#0b0c10] text-gray-200 font-sans relative selection:bg-[#d4af37]/30">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop" 
            alt="Foggy Forest" 
            className="w-full h-full object-cover blur-sm opacity-30 mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/60 to-[#0b0c10]"></div>
        </div>

        {/* Left Sidebar (Channels) - Hidden on mobile */}
        <div className="hidden md:flex w-64 flex-col bg-[#12141a]/80 backdrop-blur-xl border-r border-white/5 z-10">
          <div className="h-16 flex items-center px-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setCurrentView('dashboard')}>
            <Globe className="text-[#d4af37] mr-3" size={24} />
            <h1 className="font-serif font-bold text-white truncate">Criador de Mundos</h1>
          </div>
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar space-y-6">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><ChevronDown size={14}/> NARRATIVA</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 bg-[#d4af37]/10 text-[#d4af37] rounded-md cursor-pointer"><Hash size={16}/> <span className="font-medium">historia</span></div>
                <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md cursor-pointer"><Hash size={16}/> <span className="font-medium">combate</span></div>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><ChevronDown size={14}/> INFORMAÇÃO</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md cursor-pointer"><Book size={16}/> <span className="font-medium">regras</span></div>
                <div className="flex items-center gap-2 px-2 py-1.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-md cursor-pointer"><Scroll size={16}/> <span className="font-medium">fichas</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col z-10 relative min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-white/5 bg-[#12141a]/60 backdrop-blur-lg flex items-center justify-between px-4 lg:px-6 shrink-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white" onClick={() => setCurrentView('dashboard')}>
                <Menu size={24} />
              </button>
              <Hash className="text-gray-500 hidden sm:block" size={20} />
              <h2 className="font-serif font-bold text-lg text-white truncate">A Taverna do Dragão Quebrado</h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors"><Search size={20} /></button>
              <button className="text-gray-400 hover:text-white transition-colors lg:hidden"><Users size={20} /></button>
            </div>
          </header>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar flex flex-col">
            <div className="mt-auto"></div> {/* Push content to bottom */}
            {roomMessages.map(msg => (
              <React.Fragment key={msg.id}>
                {msg.type === 'narrative' && (
                  <div className="border-l-2 border-[#d4af37] pl-4 py-1 my-2 bg-gradient-to-r from-[#d4af37]/5 to-transparent">
                    <p className="font-serif italic text-lg text-[#e0e0e0] leading-relaxed drop-shadow-sm">
                      {msg.content}
                    </p>
                  </div>
                )}
                {msg.type === 'speech' && (
                  <div className="flex gap-3 my-2 group">
                    <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full border border-white/10 shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm font-bold text-white">{msg.user}</span>
                        <span className="text-xs text-gray-500">Hoje às 20:45</span>
                      </div>
                      <div className="bg-[#1e212b]/80 backdrop-blur-sm border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 text-gray-300 inline-block shadow-sm">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                )}
                {msg.type === 'system' && (
                  <div className="flex justify-center my-4">
                    <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-[#d4af37] font-mono shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                      <Dices size={16} />
                      {msg.content}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Floating Input */}
          <div className="p-4 md:p-6 pt-0 shrink-0">
            <div className="bg-[#1a1d24]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              <button className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-xl transition-all">
                <Dices size={22} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden sm:block">
                <ImageIcon size={22} />
              </button>
              <input 
                type="text" 
                placeholder="Escreva sua ação..." 
                className="flex-1 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none px-2 text-[15px]"
              />
              <button className="p-2.5 bg-[#d4af37] text-[#0b0c10] rounded-xl hover:bg-[#e5c158] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                <Send size={18} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar (NPCs/Members) - Hidden on mobile */}
        <div className="hidden lg:flex w-72 flex-col bg-[#12141a]/80 backdrop-blur-xl border-l border-white/5 z-10">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Membros — 4</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://picsum.photos/seed/dm/100/100" className="w-8 h-8 rounded-full border border-[#d4af37]" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#12141a]"></div>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#d4af37]">Dungeon Master</div>
                  <div className="text-xs text-gray-500">Mestre</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="https://picsum.photos/seed/elara/100/100" className="w-8 h-8 rounded-full border border-white/10" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#12141a]"></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Elara</div>
                  <div className="text-xs text-gray-500">Jogadora</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">NPC Gallery</h3>
            <div className="grid grid-cols-2 gap-3">
              {npcs.map((npc, idx) => (
                <div key={idx} className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/10 aspect-square">
                  <img src={npc.avatar} alt={npc.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <span className="text-xs font-bold text-white block truncate">{npc.name}</span>
                    <span className="text-[10px] text-gray-400">{npc.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-200 font-sans relative overflow-x-hidden selection:bg-[#d4af37]/30 pb-20 md:pb-0">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#0b0c10]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#d4af37]/5 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-[#0b0c10]/80 backdrop-blur-xl flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50">
          <div className="flex items-center gap-4 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#aa8c2c] flex items-center justify-center text-[#0b0c10] shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Globe size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-bold tracking-widest text-white uppercase font-serif drop-shadow-md hidden sm:block">
              Criador de Mundos
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-400 hover:text-[#d4af37] transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0b0c10]"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-white/10 cursor-pointer group">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white group-hover:text-[#d4af37] transition-colors">Adriano Borges</div>
                <div className="text-xs text-[#d4af37]/70 font-medium">Mestre Ancião</div>
              </div>
              <div className="relative">
                <img src="https://picsum.photos/seed/adriano/100/100" alt="User Profile" className="w-10 h-10 rounded-full border border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.2)] object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0b0c10]"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column (Adventures) */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-3 font-serif">
                <Compass size={28} className="text-[#d4af37]" />
                MINHAS AVENTURAS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cards */}
              {adventures.map(adv => (
                <div 
                  key={adv.id} 
                  onClick={() => setCurrentView('room')}
                  className="group relative h-64 rounded-2xl overflow-hidden bg-[#12141a] border border-white/5 hover:border-[#d4af37]/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] cursor-pointer"
                >
                  <img src={adv.image} alt={adv.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-2 shadow-lg">
                    <Users size={14} className="text-[#d4af37]" /> {adv.players} Jogadores
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2 transition-transform duration-500 group-hover:-translate-y-14">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">{adv.genre}</span>
                    <h3 className="text-2xl font-bold text-white font-serif leading-tight drop-shadow-md">{adv.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={adv.masterAvatar} className="w-6 h-6 rounded-full border border-[#d4af37]" />
                      <span className="text-sm text-gray-300">Mestre: <span className="text-white font-medium">{adv.master}</span></span>
                    </div>
                  </div>

                  {/* Hover Button */}
                  <div className="absolute bottom-5 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <button className="w-full py-2.5 bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] rounded-xl font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(212,175,55,0.3)] backdrop-blur-sm hover:bg-[#d4af37] hover:text-[#0b0c10] transition-colors">
                      Entrar na Sala
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Create Room) */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            {/* Create Room Panel */}
            <div className="bg-[#12141a]/80 backdrop-blur-xl rounded-3xl border border-[#d4af37]/40 p-8 shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <h2 className="text-xl font-bold text-[#d4af37] tracking-wider mb-8 flex items-center gap-3 font-serif">
                <Sparkles size={24} />
                CRIAR NOVA SALA
              </h2>

              <form className="flex flex-col gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nome da Sala</label>
                  <input 
                    type="text" 
                    placeholder="Ex: O Abismo de Prata" 
                    className="bg-transparent border-b border-white/20 pb-2 pt-1 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors text-lg" 
                  />
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visibilidade</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-[#d4af37]/50 bg-[#d4af37]/10 cursor-pointer transition-all">
                      <div className="w-4 h-4 rounded-full border-2 border-[#d4af37] flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#d4af37]"></div>
                      </div>
                      <span className="text-sm font-bold text-white">Pública</span>
                    </label>
                    <label className="flex-1 flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5 cursor-pointer hover:border-white/30 transition-all">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                      </div>
                      <span className="text-sm font-bold text-gray-400">Privada</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Gênero</label>
                  <div className="relative">
                    <select className="w-full bg-transparent border-b border-white/20 pb-2 pt-1 text-white appearance-none focus:outline-none focus:border-[#d4af37] transition-colors text-lg cursor-pointer">
                      <option className="bg-[#12141a]">Fantasia Medieval</option>
                      <option className="bg-[#12141a]">Sci-fi / Cyberpunk</option>
                      <option className="bg-[#12141a]">Horror Cósmico</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-0 top-2 text-[#d4af37] pointer-events-none" />
                  </div>
                </div>

                <button type="button" className="mt-6 w-full py-4 rounded-xl bg-[#d4af37] text-[#0b0c10] font-black text-lg tracking-widest uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-[#e5c158] transition-all duration-300 font-serif">
                  Criar Mundo
                </button>
              </form>
            </div>
          </div>
          
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0b0c10]/95 backdrop-blur-lg border-t border-white/5 flex items-center justify-around z-50 px-2">
        <button className="flex flex-col items-center gap-1 p-2 text-[#d4af37]">
          <Home size={20} />
          <span className="text-[10px] font-bold">Início</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-gray-300 transition-colors">
          <Search size={20} />
          <span className="text-[10px] font-bold">Buscar</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-gray-300 transition-colors -mt-6">
          <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center text-[#0b0c10] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <PlusCircle size={24} />
          </div>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-gray-300 transition-colors">
          <Bell size={20} />
          <span className="text-[10px] font-bold">Avisos</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-gray-300 transition-colors">
          <User size={20} />
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </nav>
    </div>
  );
}
