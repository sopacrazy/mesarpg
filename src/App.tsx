import React, { useState, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill-new/dist/quill.snow.css';

// Register Image Resize
Quill.register('modules/imageResize', ImageResize);
import { 
  Globe, Bell, Compass, Grid, List, Users, Crown, ArrowRight, 
  Sparkles, ChevronDown, Star, Menu, Image as ImageIcon, Send,
  Home, Search, PlusCircle, User, Hash, Book, Scroll, Dices, MoreVertical,
  Mic, Square, Play, Pause, Trash2, Clock, FileText,
  Volume2, MicOff, PhoneCall, PhoneOff, Signal
} from 'lucide-react';

const initialChannels = [
  { id: 1, name: 'historia', category: 'NARRATIVA', type: 'narrative', visibility: 'public', anyoneCanTalk: true, description: 'Crônicas principais da aventura e desenvolvimento da trama.', image: 'https://images.unsplash.com/photo-1519074063912-ad2fe3f51964?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'combate', category: 'NARRATIVA', type: 'narrative', visibility: 'public', anyoneCanTalk: true, description: 'Arena de batalha, iniciativa e rolagem de dados críticos.', image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Taverna do RPG (Voz)', category: 'VOZ', type: 'voice', visibility: 'public', anyoneCanTalk: true, description: 'Canal de áudio para conversa entre mestre e jogadores.', members: [] },
  { id: 4, name: 'regras', category: 'INFORMAÇÃO', type: 'info', visibility: 'public', anyoneCanTalk: false, description: 'Manual de bolso, sistemas de jogo e guias rápidos.', image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'fichas', category: 'INFORMAÇÃO', type: 'info', visibility: 'public', anyoneCanTalk: true, description: 'Repositório de heróis, NPCs e equipamentos lendários.', image: 'https://images.unsplash.com/photo-1514483127413-f72f273478c3?q=80&w=800&auto=format&fit=crop' },
];

const initialMembers = [
  { id: 'dm', name: "Dungeon Master", avatar: "https://picsum.photos/seed/dm/100/100", role: "Mestre", status: 'online' },
  { id: 'elara', name: "Elara", avatar: "https://picsum.photos/seed/elara/100/100", role: "Jogador", status: 'online' },
  { id: 'kaelen', name: "Kaelen", avatar: "https://picsum.photos/seed/kaelen/100/100", role: "Jogador", status: 'online' },
];

const adventures = [
  { 
    id: 1, 
    title: 'O Despertar do Dragão', 
    master: 'Dungeon Master',
    masterAvatar: 'https://picsum.photos/seed/dm/100/100',
    players: '4/5', 
    genre: 'Fantasia Épica', 
    image: 'https://images.unsplash.com/photo-1599153066743-ed29d66099bd?q=80&w=800&auto=format&fit=crop',
    tags: ['D&D 5e', 'Campanha', 'Nível 5', 'Pública'],
    status: 'Confirmada',
    date: 'Hoje às 20h'
  },
  { 
    id: 2, 
    title: 'Sombras sobre Ravenloft', 
    master: 'Kaelen',
    masterAvatar: 'https://picsum.photos/seed/kaelen/100/100',
    players: '4/5', 
    genre: 'Terror Gótico', 
    image: 'https://images.unsplash.com/photo-1519074063912-ad2fe3f51964?q=80&w=800&auto=format&fit=crop',
    tags: ['Curse of Strahd', 'One-shot', 'Iniciantes', 'Privada'],
    status: 'Falta 1 Jogador',
    date: 'Amanhã'
  },
  { 
    id: 3, 
    title: 'Infiltração em Coruscant', 
    master: 'Elara',
    masterAvatar: 'https://picsum.photos/seed/elara/100/100',
    players: '3/4', 
    genre: 'Sci-Fi / Cyberpunk', 
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop',
    tags: ['Star Wars', 'Campanha', 'Sandbox', 'Pública'],
    status: 'Mesa Iniciada',
    date: 'Segunda'
  },
  { 
    id: 4, 
    title: 'Tesouros da Areia', 
    master: 'Rei_Arthur',
    masterAvatar: 'https://picsum.photos/seed/arthur/100/100',
    players: '2/6', 
    genre: 'Aventura Exótica', 
    image: 'https://images.unsplash.com/photo-1514483127413-f72f273478c3?q=80&w=800&auto=format&fit=crop',
    tags: ['Pathfinder', 'One-shot', 'High Magic', 'Pública'],
    status: 'Aguardando',
    date: '15/04'
  },
];

const initialRoomMessages = [
  {
    id: 1,
    type: 'narrative',
    user: "Dungeon Master",
    role: "Mestre",
    content: "A névoa espessa rasteja por entre os troncos retorcidos da Floresta Sussurrante. O som de galhos quebrando ecoa à distância, seguido por um silêncio antinatural. Vocês sentem o frio penetrar em suas armaduras.",
  },
  {
    id: 2,
    type: 'speech',
    user: "Kaelen",
    role: "Jogador",
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
    user: "Dungeon Master",
    role: "Mestre",
    content: "Com sua visão aguçada, Elara percebe o brilho de olhos amarelos na escuridão, a cerca de dez metros à frente. Uma criatura lupina de proporções monstruosas rosna baixinho.",
  },
  {
    id: 5,
    type: 'speech',
    user: "Elara",
    role: "Jogador",
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
  const [messages, setMessages] = useState(initialRoomMessages);
  const [inputText, setInputText] = useState('');
  const [channels, setChannels] = useState(initialChannels);
  const [activeChannelId, setActiveChannelId] = useState<number | 'home'>('home');
  const [members, setMembers] = useState(initialMembers);
  const [isGMModalOpen, setIsGMModalOpen] = useState(false);
  const [isNarrativeModalOpen, setIsNarrativeModalOpen] = useState(false);
  const [narrativeContent, setNarrativeContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [playingMessageId, setPlayingMessageId] = useState<number | null>(null);
  const [isGifPickerOpen, setIsGifPickerOpen] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState('');
  const [gifs, setGifs] = useState<any[]>([]);
  const [notes, setNotes] = useState([
    { id: 1, title: 'Ideias de Encontro', content: '<h1>Encontro na Floresta</h1><p>Os jogadores encontram um orc ferido...</p>' },
    { id: 2, title: 'NPCs Importantes', content: '<h2>Elara, a Sábia</h2><p>Localização: Taverna do Corvo.</p>' }
  ]);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);
  const [isNotepadViewOpen, setIsNotepadViewOpen] = useState(false);

  // Voice State
  const [activeVoiceChannelId, setActiveVoiceChannelId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<any>(null);

  const [newChannelData, setNewChannelData] = useState({
    name: '', category: 'NARRATIVA', type: 'narrative', visibility: 'public', anyoneCanTalk: true
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (currentView === 'room') {
      scrollToBottom();
    }
  }, [messages, currentView, activeChannelId]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'speech' as any,
      content: inputText,
      user: "Dungeon Master",
      role: "Mestre",
      avatar: "https://picsum.photos/seed/dm/100/100",
      channelId: activeChannelId
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        sendAudioMessage(audioUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
      alert("Por favor, permita o acesso ao microfone para gravar áudio.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const sendAudioMessage = (url: string) => {
    const newMessage = {
      id: Date.now(),
      type: 'audio' as any,
      audioUrl: url,
      duration: formatTime(recordingTime),
      user: "Dungeon Master",
      role: "Mestre",
      avatar: "https://picsum.photos/seed/dm/100/100",
      channelId: activeChannelId
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchGifs = async (query: string = '') => {
    try {
      // Mudando para Tenor V1 (muito mais permissivo para testes locais)
      const apiKey = 'LIVD6OHS9SU3L'; 
      const endpoint = query 
        ? `https://api.tenor.com/v1/search?q=${query}&key=${apiKey}&limit=20`
        : `https://api.tenor.com/v1/trending?key=${apiKey}&limit=20`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Falha na API Tenor');
      const data = await response.json();
      
      const formattedGifs = (data.results || []).map((res: any) => ({
        id: res.id,
        images: {
          fixed_height: {
            url: res.media[0].tinygif.url
          }
        }
      }));
      setGifs(formattedGifs);
    } catch (err) {
      console.error("Erro ao buscar GIFs:", err);
      // Fallback: GIFs fixos de RPG garantidos
      setGifs([
        { id: 'f1', images: { fixed_height: { url: 'https://media.giphy.com/media/3o7TKMGpxx6fS93eZW/giphy.gif' } } },
        { id: 'f2', images: { fixed_height: { url: 'https://media.giphy.com/media/l41lUjJ6W0L8lW2S4/giphy.gif' } } },
        { id: 'f3', images: { fixed_height: { url: 'https://media.giphy.com/media/d2Z4iH7T4xO2A/giphy.gif' } } }
      ]);
    }
  };

  useEffect(() => {
    if (isGifPickerOpen) {
      const delaySearch = setTimeout(() => {
        fetchGifs(gifSearchQuery);
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [isGifPickerOpen, gifSearchQuery]);

  const sendGif = (url: string) => {
    const newMessage = {
      id: Date.now(),
      type: 'gif' as any,
      gifUrl: url,
      user: "Dungeon Master", // Default for now
      role: "Mestre",
      avatar: "https://picsum.photos/seed/dm/100/100",
      channelId: activeChannelId
    };
    setMessages(prev => [...prev, newMessage]);
    setIsGifPickerOpen(false);
  };

  const handleSendNarrative = () => {
    if (!narrativeContent.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'narrative' as any, // Post narrativo formatado
      content: narrativeContent,
      user: "Dungeon Master",
      role: "Mestre",
      channelId: activeChannelId
    };

    setMessages([...messages, newMessage]);
    setNarrativeContent('');
    setIsNarrativeModalOpen(false);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleCreateChannel = (e: React.FormEvent) => {
    e.preventDefault();
    const newChannel = {
      ...newChannelData,
      id: Date.now(),
    };
    setChannels([...channels, newChannel]);
    setIsGMModalOpen(false);
    setNewChannelData({ name: '', category: 'NARRATIVA', type: 'narrative', visibility: 'public', anyoneCanTalk: true });
  };

  const banUser = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const toggleVoiceConnection = (channelId: number) => {
    if (activeVoiceChannelId === channelId) {
      setActiveVoiceChannelId(null);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setActiveVoiceChannelId(channelId);
        setIsConnecting(false);
      }, 1000); // Simulate network connection
    }
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Nova Nota',
      content: ''
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    setIsNotepadViewOpen(true);
    setActiveChannelId('home');
  };

  const updateNoteContent = (content: string) => {
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, content } : n));
  };

  const updateNoteTitle = (id: number, title: string) => {
    setNotes(notes.map(n => n.id === id ? { ...n, title } : n));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(null);
      setIsNotepadViewOpen(false);
    }
  };

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
            <div 
              onClick={() => setActiveChannelId('home')}
              className={`flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer transition-all mb-4 ${activeChannelId === 'home' ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
            >
              <Grid size={18} />
              <span className="font-bold tracking-wider text-xs uppercase">Início</span>
            </div>
            {['NARRATIVA', 'INFORMAÇÃO', 'VOZ'].map(cat => (
              <div key={cat}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1"><ChevronDown size={14}/> {cat}</h3>
                  <button 
                    onClick={() => {
                      setNewChannelData({...newChannelData, category: cat});
                      setIsGMModalOpen(true);
                    }}
                    className="p-1 hover:text-[#d4af37] text-gray-600 transition-colors"
                  >
                    <PlusCircle size={14}/>
                  </button>
                </div>
                <div className="space-y-1">
                  {channels.filter(c => c.category === cat).map(channel => (
                    <div key={channel.id}>
                      <div 
                        onClick={() => channel.type === 'voice' ? toggleVoiceConnection(channel.id) : setActiveChannelId(channel.id)}
                        className={`flex items-center justify-between group px-2 py-1.5 rounded-md cursor-pointer transition-all ${activeChannelId === channel.id || activeVoiceChannelId === channel.id ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                      >
                        <div className="flex items-center gap-2">
                          {channel.type === 'narrative' ? <Hash size={16}/> : channel.type === 'voice' ? <Volume2 size={16}/> : <Book size={16}/>}
                          <span className="font-medium text-sm">{channel.name}</span>
                        </div>
                        {channel.type === 'voice' && isConnecting && activeVoiceChannelId !== channel.id && (
                          <div className="w-3 h-3 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <MoreVertical size={14} className="opacity-0 group-hover:opacity-100 text-gray-600" />
                      </div>
                      
                      {/* Voice Members List */}
                      {channel.type === 'voice' && (
                        <div className="ml-6 mt-1 space-y-1 mb-2">
                          {(channel.members || []).map((mId: string) => {
                            const m = members.find(u => u.id === mId) || members[0];
                            const isUserActive = mId === 'dm';
                            return (
                              <div key={mId} className="flex items-center gap-2 py-0.5 group">
                                <div className="relative">
                                  <img src={m.avatar} className="w-4 h-4 rounded-full border border-[#d4af37]" />
                                  <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-[#12141a]"></div>
                                </div>
                                <span className="text-[11px] text-gray-400 font-medium group-hover:text-white transition-colors">{m.name}</span>
                                {isUserActive && !isMuted && <Mic size={10} className="text-emerald-500 animate-pulse" />}
                                {isUserActive && isMuted && <MicOff size={10} className="text-red-500" />}
                              </div>
                            );
                          })}
                          {activeVoiceChannelId === channel.id && !channel.members?.includes('dm') && (
                             <div className="flex items-center gap-2 py-0.5 group">
                                <div className="relative">
                                  <img src="https://picsum.photos/seed/dm/100/100" className="w-4 h-4 rounded-full border border-[#d4af37]" />
                                  <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-[#12141a]"></div>
                                </div>
                                <span className="text-[11px] text-white font-bold">Dungeon Master</span>
                                {!isMuted && <Mic size={10} className="text-emerald-500 animate-pulse" />}
                                {isMuted && <MicOff size={10} className="text-red-500" />}
                             </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* MASTER NOTES SECTION */}
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Scroll size={14} className="text-[#d4af37]"/> NOTAS (MESTRE)
                </h3>
                <button 
                  onClick={handleAddNote}
                  className="p-1 hover:text-[#d4af37] text-gray-600 transition-colors"
                >
                  <PlusCircle size={14}/>
                </button>
              </div>
              <div className="space-y-1">
                {notes.map(note => (
                  <div 
                    key={note.id}
                    onClick={() => {
                      setActiveNoteId(note.id);
                      setIsNotepadViewOpen(true);
                      setActiveChannelId('home');
                    }}
                    className={`flex items-center justify-between group px-3 py-2 rounded-xl cursor-pointer transition-all ${activeNoteId === note.id && isNotepadViewOpen ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText size={16}/>
                      <span className="font-medium truncate text-sm">{note.title}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-500/50 hover:text-red-500"
                    >
                      <Trash2 size={12}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* VOICE CONNECTION BAR (Discord Like) */}
            {activeVoiceChannelId && (
              <div className="mt-auto pt-4 animate-in slide-in-from-bottom-4 duration-300 px-2 pb-2">
                <div className="bg-[#1a1d24]/90 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Signal className="text-emerald-500 animate-pulse" size={14} />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest leading-none">Voz Conectada</span>
                        <span className="text-white text-[11px] font-bold truncate max-w-[100px]">
                          {channels.find(c => c.id === activeVoiceChannelId)?.name}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => setActiveVoiceChannelId(null)} className="p-1.5 hover:bg-red-500/20 text-gray-500 hover:text-red-500 rounded-xl transition-all">
                      <PhoneOff size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-around gap-2">
                    <button 
                      onClick={() => setIsMuted(!isMuted)}
                      className={`flex-1 flex justify-center p-2 rounded-xl transition-all ${isMuted ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                    >
                      {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                    <button 
                      onClick={() => setIsDeafened(!isDeafened)}
                      className={`flex-1 flex justify-center p-2 rounded-xl transition-all ${isDeafened ? 'bg-red-500/20 text-red-500' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                    >
                      {isDeafened ? <Volume2 size={18} className="rotate-45" /> : <Volume2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            )}
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
              <h2 className="font-serif font-bold text-lg text-white truncate">
                {isNotepadViewOpen 
                  ? `Grimório — ${notes.find(n => n.id === activeNoteId)?.title || 'Nota'}` 
                  : (activeChannelId === 'home' ? 'Visão Geral' : activeChannel.name) + ' — A Taverna do Dragão Quebrado'}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400 hover:text-white transition-colors"><Search size={20} /></button>
              <button className="text-gray-400 hover:text-white transition-colors lg:hidden"><Users size={20} /></button>
            </div>
          </header>

          {/* Chat Stream or Home View */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar flex flex-col relative">
            {isNotepadViewOpen ? (
              <div className="max-w-5xl mx-auto w-full h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-6 flex flex-col gap-2">
                  <input 
                    className="bg-transparent border-none text-4xl font-serif font-black text-white focus:outline-none placeholder-white/20"
                    value={notes.find(n => n.id === activeNoteId)?.title || ''}
                    onChange={(e) => updateNoteTitle(activeNoteId!, e.target.value)}
                    placeholder="Título da Nota..."
                  />
                  <div className="h-1 w-24 bg-[#d4af37] rounded-full"></div>
                </div>
                
                <div className="flex-1 bg-[#12141a]/40 border border-white/5 rounded-[2.5rem] overflow-hidden p-6">
                  <ReactQuill 
                    theme="snow"
                    value={notes.find(n => n.id === activeNoteId)?.content || ''}
                    onChange={updateNoteContent}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link', 'image'],
                        ['clean']
                      ],
                      imageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize', 'Toolbar']
                      }
                    }}
                    className="h-full"
                    placeholder="Escreva seus segredos aqui..."
                  />
                </div>
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500 italic">
                  <span>Nota salva automaticamente enquanto o app estiver ativo.</span>
                  <button onClick={() => setIsNotepadViewOpen(false)} className="text-[#d4af37] font-bold hover:underline">Voltar para o Chat</button>
                </div>
              </div>
            ) : activeChannelId === 'home' ? (
              <div className="max-w-4xl mx-auto w-full py-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="relative h-64 rounded-3xl overflow-hidden mb-12 group">
                  <img src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl md:text-5xl font-serif font-black text-white mb-2 drop-shadow-2xl">A Taverna do Dragão Quebrado</h1>
                    <p className="text-gray-400 max-w-xl text-lg italic">"Onde as lendas começam e as canecas nunca secam. Prepare seu dado e sua coragem."</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {channels.map(channel => (
                    <div 
                      key={channel.id}
                      onClick={() => setActiveChannelId(channel.id)}
                      className="group relative h-48 rounded-2xl overflow-hidden bg-[#12141a] border border-white/5 hover:border-[#d4af37]/50 transition-all duration-500 cursor-pointer shadow-xl"
                    >
                      <img src={channel.image} alt={channel.name} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-transparent"></div>
                      
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        {channel.category}
                      </div>

                      <div className="absolute bottom-0 left-0 p-6">
                        <div className="flex items-center gap-2 mb-1">
                          {channel.type === 'narrative' ? <Hash size={18} className="text-[#d4af37]"/> : <Book size={18} className="text-[#d4af37]"/>}
                          <h3 className="text-xl font-bold text-white font-serif">{channel.name}</h3>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 max-w-[250px]">{channel.description}</p>
                      </div>

                      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <div className="p-2 bg-[#d4af37] text-[#0b0c10] rounded-lg shadow-lg">
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-auto"></div> {/* Push content to bottom */}
                {messages.filter(m => !m.channelId || m.channelId === activeChannelId).map(msg => (
                  <React.Fragment key={msg.id}>
                    {msg.type === 'narrative' && (
                      <div className="my-6 group animate-in fade-in slide-in-from-left-4 duration-1000 relative">
                        <div className="flex items-center gap-3 mb-3 opacity-40 group-hover:opacity-100 transition-opacity">
                          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/30"></div>
                          <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.3em] font-serif flex items-center gap-2"><Scroll size={12}/> Cena de Campanha</span>
                          <span className="text-xs font-bold text-white/30 uppercase tracking-widest">{msg.user}</span>
                          <button onClick={() => deleteMessage(msg.id)} className="p-1 text-red-500/50 hover:text-red-500 transition-all"><PlusCircle size={14} className="rotate-45"/></button>
                          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/30"></div>
                        </div>

                        <div className="p-8 md:p-12 bg-[#12141a]/60 backdrop-blur-md rounded-[2.5rem] border border-[#d4af37]/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden narrative-post group-hover:border-[#d4af37]/20 transition-all w-full">
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-[60px] pointer-events-none"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#d4af37]/5 rounded-full blur-[50px] pointer-events-none"></div>
                          
                          <div className="relative z-10 prose prose-invert prose-p:text-gray-100 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-serif prose-strong:text-[#d4af37] prose-img:rounded-2xl prose-blockquote:border-[#d4af37] prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-a:text-[#d4af37] prose-container font-serif text-[1.1rem] text-gray-200 w-full">
                             <div 
                              dangerouslySetInnerHTML={{ __html: msg.content }} 
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.type === 'speech' && (
                      <div className="flex gap-3 my-2 group animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
                        <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full border border-white/10 shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-white">{msg.user}</span>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded-sm">{msg.role}</span>
                            <span className="text-xs text-gray-500">Hoje às 20:45</span>
                            <button onClick={() => deleteMessage(msg.id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500/50 hover:text-red-500 transition-all"><PlusCircle size={12} className="rotate-45"/></button>
                          </div>
                          <div className="bg-[#1e212b]/80 backdrop-blur-sm border border-white/5 rounded-2xl rounded-tl-none px-4 py-2.5 text-gray-300 inline-block shadow-sm max-w-[85%] md:max-w-[70%] break-words">
                            {msg.content}
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.type === 'audio' && (
                      <div className="flex gap-3 my-2 group animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
                        <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full border border-white/10 shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-white">{msg.user}</span>
                            <span className="text-[9px] font-bold text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/10 px-1.5 py-0.5 rounded-sm">{msg.role}</span>
                            <span className="text-xs text-gray-500">Hoje às 21:00</span>
                            <button onClick={() => deleteMessage(msg.id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500/50 hover:text-red-500 transition-all"><PlusCircle size={12} className="rotate-45"/></button>
                          </div>
                          
                          <div className="bg-[#1e212b] border border-[#d4af37]/20 rounded-2xl rounded-tl-none px-4 py-3 text-gray-300 inline-flex items-center gap-4 shadow-xl min-w-[240px]">
                            <button 
                              onClick={(e) => {
                                const audio = e.currentTarget.parentElement?.querySelector('audio');
                                if (audio) {
                                  if (playingMessageId === msg.id) {
                                    audio.pause();
                                    setPlayingMessageId(null);
                                  } else {
                                    // Parar outros áudios se necessário (opcional, aqui paramos o atual)
                                    document.querySelectorAll('audio').forEach(a => a.pause());
                                    audio.play();
                                    setPlayingMessageId(msg.id);
                                  }
                                }
                              }}
                              className="w-10 h-10 rounded-full bg-[#d4af37] text-[#0b0c10] flex items-center justify-center hover:bg-[#e5c158] transition-all shadow-lg active:scale-95"
                            >
                              {playingMessageId === msg.id ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                            </button>
                            <div className="flex-1 flex flex-col gap-1.5">
                              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
                                <div className={`absolute inset-0 bg-[#d4af37]/30 ${playingMessageId === msg.id ? 'animate-pulse' : 'w-1/3'}`}></div>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                                <span>{playingMessageId === msg.id ? 'Tocando...' : `Áudio — ${msg.duration}`}</span>
                                <div className="flex gap-0.5">
                                  {[...Array(12)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className={`w-0.5 rounded-full transition-all duration-300 ${playingMessageId === msg.id ? 'bg-[#d4af37] h-3 animate-bounce' : 'bg-[#d4af37]/40 h-2'}`}
                                      style={{ transitionDelay: `${i * 50}ms` }}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <audio 
                              src={msg.audioUrl} 
                              className="hidden" 
                              onEnded={() => setPlayingMessageId(null)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.type === 'gif' && (
                      <div className="flex gap-3 my-2 group animate-in fade-in slide-in-from-bottom-2 duration-500 relative">
                        <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-full border border-white/10 shrink-0 mt-1" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-sm font-bold text-white">{msg.user}</span>
                            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider bg-white/5 px-1.5 py-0.5 rounded-sm">{msg.role}</span>
                            <span className="text-xs text-gray-500">Hoje às 21:15</span>
                            <button onClick={() => deleteMessage(msg.id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500/50 hover:text-red-500 transition-all"><PlusCircle size={12} className="rotate-45"/></button>
                          </div>
                          <div className="mt-1 rounded-2xl overflow-hidden border border-white/10 shadow-lg max-w-[300px]">
                            <img src={msg.gifUrl} alt="GIF" className="w-full h-auto" />
                          </div>
                        </div>
                      </div>
                    )}
                    {msg.type === 'system' && (
                      <div className="flex justify-center my-4 animate-in fade-in zoom-in-95 duration-500">
                        <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-[#d4af37] font-mono shadow-[0_0_10px_rgba(212,175,55,0.1)]">
                          <Dices size={16} />
                          {msg.content}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Floating Input - Only if not on home or notepad */}
          {!isNotepadViewOpen && activeChannelId !== 'home' && (
            <div className="p-4 md:p-6 pt-0 shrink-0 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsNarrativeModalOpen(true)}
                  className="px-4 py-1.5 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4af37] hover:text-[#0b0c10] transition-all shadow-lg"
                >
                  <Scroll size={14} /> Modo Narração
                </button>
              </div>

              <form className="flex items-center gap-2 w-full" onSubmit={handleSendMessage}>
                <div className="flex-1 bg-[#1a1d24]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl relative">
                  {/* GIF PICKER POPOVER */}
                  {isGifPickerOpen && (
                    <div className="absolute bottom-full left-0 right-0 mb-4 bg-[#12141a] border border-[#d4af37]/30 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-[50] flex flex-col h-80 animate-in slide-in-from-bottom-4 duration-300">
                      <div className="p-4 border-b border-white/5 flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          <input 
                            autoFocus
                            type="text" 
                            value={gifSearchQuery}
                            onChange={(e) => setGifSearchQuery(e.target.value)}
                            placeholder="Buscar no Giphy..." 
                            className="w-full bg-[#0b0c10] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#d4af37] transition-all"
                          />
                        </div>
                        <button onClick={() => setIsGifPickerOpen(false)} className="p-2 text-gray-500 hover:text-white"><PlusCircle size={20} className="rotate-45"/></button>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 custom-scrollbar">
                        {gifs.map(gif => (
                          <div 
                            key={gif.id}
                            onClick={() => sendGif(gif.images.fixed_height.url)}
                            className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 border border-white/5 hover:border-[#d4af37]/50"
                          >
                            <img src={gif.images.fixed_height.url} className="w-full h-full object-cover" alt="GIF Result" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isRecording ? (
                    <div className="absolute inset-0 bg-[#12141a] rounded-2xl flex items-center px-4 gap-4 animate-in fade-in duration-300">
                      <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                        Gravando...
                      </div>
                      <div className="flex-1 text-[#d4af37] font-mono text-center font-bold">
                        {formatTime(recordingTime)}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setIsRecording(false); clearInterval(timerRef.current); }}
                        className="p-2 text-gray-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button 
                        type="button" 
                        onClick={stopRecording}
                        className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-lg active:scale-95"
                      >
                        <Square size={20} fill="currentColor" />
                      </button>
                    </div>
                  ) : null}

                  <button type="button" onClick={() => setIsGifPickerOpen(!isGifPickerOpen)} className={`p-2 rounded-xl transition-all font-black text-xs ${isGifPickerOpen ? 'bg-[#d4af37] text-[#0b0c10]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                    GIF
                  </button>
                  <button type="button" className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/10 rounded-xl transition-all">
                    <Dices size={22} />
                  </button>
                  <button type="button" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all hidden sm:block">
                    <ImageIcon size={22} />
                  </button>
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Fale com os outros..." 
                    className="flex-1 bg-transparent border-none text-white placeholder-gray-600 focus:outline-none px-2 text-[15px]"
                  />
                  {!inputText.trim() ? (
                    <button 
                      type="button" 
                      onClick={startRecording}
                      className="p-2.5 text-[#d4af37] hover:bg-[#d4af37]/10 rounded-xl transition-all active:scale-95"
                    >
                      <Mic size={22} />
                    </button>
                  ) : (
                    <button type="submit" className="p-2.5 bg-[#d4af37] text-[#0b0c10] rounded-xl hover:bg-[#e5c158] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                      <Send size={18} className="ml-0.5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Sidebar (NPCs/Members) - Hidden on mobile */}
        <div className="hidden lg:flex w-72 flex-col bg-[#12141a]/80 backdrop-blur-xl border-l border-white/5 z-10">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Membros — {members.length}</h3>
            <div className="space-y-4">
              {members.map(member => (
                <div key={member.id} className="group flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={member.avatar} className={`w-8 h-8 rounded-full border ${member.role === 'Mestre' ? 'border-[#d4af37]' : 'border-white/10'}`} />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#12141a]"></div>
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${member.role === 'Mestre' ? 'text-[#d4af37]' : 'text-white'}`}>{member.name}</div>
                      <div className="text-xs text-gray-500">{member.role}</div>
                    </div>
                  </div>
                  {member.role !== 'Mestre' && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => banUser(member.id)} className="p-1 text-red-500 hover:bg-red-500/10 rounded-md" title="Banir"><PlusCircle size={14} className="rotate-45"/></button>
                      <button className="p-1 text-[#d4af37] hover:bg-[#d4af37]/10 rounded-md" title="Mudar Cargo"><Crown size={14}/></button>
                    </div>
                  )}
                </div>
              ))}
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

        {/* GM CREATE CHANNEL MODAL */}
        {isGMModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsGMModalOpen(false)}></div>
            <form onSubmit={handleCreateChannel} className="relative w-full max-w-md bg-[#12141a] border border-[#d4af37]/30 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <h2 className="text-2xl font-serif font-bold text-[#d4af37] mb-6 flex items-center gap-3"><PlusCircle /> Novo Canal</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Nome do Canal</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    value={newChannelData.name}
                    onChange={e => setNewChannelData({...newChannelData, name: e.target.value})}
                    placeholder="Ex: masmorra-sombria" 
                    className="bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-700 focus:outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tipo</label>
                    <select 
                      value={newChannelData.type}
                      onChange={e => setNewChannelData({...newChannelData, type: e.target.value as any})}
                      className="bg-[#0b0c10] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="narrative">Narrativa</option>
                      <option value="info">Informação</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Categoria</label>
                    <select 
                      value={newChannelData.category}
                      onChange={e => setNewChannelData({...newChannelData, category: e.target.value as any})}
                      className="bg-[#0b0c10] border border-white/10 rounded-lg p-2 text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="NARRATIVA">Narrativa</option>
                      <option value="INFORMAÇÃO">Informação</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Permissões de Chat</label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <input 
                      type="checkbox" 
                      checked={newChannelData.anyoneCanTalk} 
                      onChange={e => setNewChannelData({...newChannelData, anyoneCanTalk: e.target.checked})}
                      id="perm-talk"
                      className="w-4 h-4 accent-[#d4af37]"
                    />
                    <label htmlFor="perm-talk" className="text-sm text-gray-300 cursor-pointer">Todos podem falar (senão, apenas Admins)</label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setIsGMModalOpen(false)} className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-gray-400 font-bold hover:bg-white/5 transition-all uppercase tracking-widest text-xs">Cancelar</button>
                <button type="submit" className="flex-1 py-3 px-4 rounded-xl bg-[#d4af37] text-[#0b0c10] font-bold hover:bg-[#e5c158] transition-all uppercase tracking-widest text-xs shadow-lg shadow-[#d4af37]/20">Criar Canal</button>
              </div>
            </form>
          </div>
        )}

        {/* GM ADVANCED NARRATIVE MODAL */}
        {isNarrativeModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsNarrativeModalOpen(false)}></div>
            <div className="relative w-full max-w-5xl bg-[#12141a] border border-[#d4af37]/50 rounded-[40px] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-500">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-bl-[200px] blur-[80px] pointer-events-none"></div>

              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#1a1d24]/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#d4af37]/10 text-[#d4af37] rounded-2xl">
                    <Scroll size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-black text-white tracking-wide uppercase">Editor de Cena</h2>
                    <p className="text-xs text-[#d4af37]/70 font-bold tracking-widest uppercase">Modo Narração Avançado</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsNarrativeModalOpen(false)}
                  className="p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all"
                >
                  <Menu className="rotate-45" size={32} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-[#0b0c10]/40">
                <style>{`
                  .ql-toolbar.ql-snow {
                    border: 1px solid rgba(255,255,255,0.05) !important;
                    background: rgba(26,29,36,0.8) !important;
                    border-radius: 16px 16px 0 0 !important;
                    padding: 12px !important;
                  }
                  .ql-container.ql-snow {
                    border: 1px solid rgba(255,255,255,0.05) !important;
                    background: rgba(18,20,26,0.5) !important;
                    border-radius: 0 0 16px 16px !important;
                    min-height: 400px !important;
                    font-family: 'Georgia', serif !important;
                    font-size: 1.1rem !important;
                  }
                  .ql-editor {
                    padding: 20px 30px !important;
                  }
                  .ql-snow .ql-stroke { stroke: #a0aec0 !important; }
                  .ql-snow .ql-fill { fill: #a0aec0 !important; }
                  .ql-snow .ql-picker { color: #a0aec0 !important; }
                  .ql-snow .ql-picker-options { background-color: #1a1d24 !important; border: 1px solid #d4af3733 !important; }
                  .ql-editor.ql-blank::before { color: rgba(255,255,255,0.2) !important; font-style: italic !important; }
                `}</style>
                <ReactQuill 
                  theme="snow"
                  value={narrativeContent}
                  onChange={setNarrativeContent}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                      [{ 'align': [] }],
                      [{ 'color': [] }, { 'background': [] }],
                      ['link', 'image'],
                      ['clean']
                    ],
                    imageResize: {
                      parchment: Quill.import('parchment'),
                      modules: ['Resize', 'DisplaySize', 'Toolbar']
                    }
                  }}
                  placeholder="Havia uma vez, num reino distante..."
                />
              </div>

              <div className="p-8 bg-[#1a1d24]/80 flex items-center justify-between">
                <div className="text-xs text-gray-500 italic max-w-sm">
                  Dica: Use títulos e imagens para tornar a cena mais imersiva para seus jogadores.
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsNarrativeModalOpen(false)}
                    className="px-6 py-3 rounded-2xl border border-white/5 text-gray-400 font-bold hover:bg-white/5 transition-all"
                  >
                    Descartar
                  </button>
                  <button 
                    onClick={handleSendNarrative}
                    className="px-10 py-4 bg-[#d4af37] text-[#0b0c10] rounded-2xl font-black tracking-[0.2em] uppercase hover:bg-[#e5c158] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all flex items-center gap-3 drop-shadow-xl"
                  >
                    Lançar Narração <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
        <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-8 lg:p-10 animate-in fade-in duration-1000">
          
          {/* HERO SECTION */}
          <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
            <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[3s]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] to-transparent"></div>
            
            <div className="relative h-full flex flex-col justify-center px-10 md:px-16 max-w-3xl gap-4">
              <div className="flex items-center gap-2 text-[#d4af37] font-black tracking-[0.3em] uppercase text-[9px]">
                <Sparkles size={14}/> Sua lenda começa aqui
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-white leading-tight">
                A SUA <span className="text-[#d4af37]">BUSCA</span> TERMINOU
              </h1>
              <p className="text-base text-gray-400 leading-relaxed max-w-xl">
                Encontre o grupo perfeito e viva histórias lendárias. A plataforma definitiva para mestres e jogadores.
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <button className="px-6 py-3 bg-[#d4af37] text-[#0b0c10] rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all flex items-center gap-2">
                  Explorar Mesas <ArrowRight size={16}/>
                </button>
                <button className="px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-2">
                  Criar Mundo <PlusCircle size={16}/>
                </button>
              </div>
            </div>
          </div>

          {/* SEARCH BAR (SLIM VERSION) */}
          <div className="relative -mt-16 mb-16 px-4 md:px-16 z-20">
            <div className="bg-[#12141a]/95 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#d4af37]" size={20} />
                <input 
                  type="text" 
                  placeholder="Mestre, sistema ou aventura..." 
                  className="w-full bg-transparent pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none text-sm"
                />
              </div>
              <button className="w-full md:w-auto px-10 py-3 bg-[#d4af37] text-[#0b0c10] rounded-xl font-black uppercase tracking-[0.1em] text-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
                BUSCAR
              </button>
            </div>
          </div>

          {/* ADVENTURES SECTION */}
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="text-2xl font-serif font-black text-white flex items-center gap-3">
              <div className="w-1.5 h-8 bg-[#d4af37] rounded-full"></div>
              Aventuras Sugeridas
            </h2>
            <button className="text-[#d4af37] font-bold text-[10px] uppercase tracking-widest hover:underline">
              Ver Todas
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {adventures.map(adv => (
              <div 
                key={adv.id} 
                onClick={() => setCurrentView('room')}
                className="group bg-[#12141a] border border-white/5 rounded-[2rem] overflow-hidden flex flex-col hover:border-[#d4af37]/40 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={adv.image} alt={adv.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 bg-[#d4af37] text-[#0b0c10] text-[8px] font-black uppercase tracking-widest rounded-md">
                      {adv.tags[1]}
                    </span>
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-md border border-white/10">
                      {adv.tags[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3">
                    <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/5 ${adv.status.includes('Falta') ? 'text-orange-400' : 'text-emerald-400'}`}>
                      <div className="w-1 h-1 rounded-full bg-current animate-pulse"></div>
                      {adv.status}
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.2em] mb-1">
                    {adv.genre}
                  </div>
                  <h3 className="text-lg font-serif font-black text-white mb-4 line-clamp-1 group-hover:text-[#d4af37] transition-colors">{adv.title}</h3>
                  
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {adv.tags.slice(2).map((tag, idx) => (
                      <span key={idx} className="bg-white/5 px-2 py-1 rounded-md text-[8px] font-bold text-gray-500 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Vagas</span>
                      <span className="text-xs text-white font-bold">{adv.players}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Início</span>
                      <span className="text-xs text-[#d4af37] font-bold">{adv.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                       <img src={adv.masterAvatar} className="w-6 h-6 rounded-full border border-white/10" />
                       <span className="text-[10px] text-white font-bold truncate max-w-[60px]">{adv.master}</span>
                    </div>
                    <button className="flex-1 py-2 bg-white/5 group-hover:bg-[#d4af37] text-white group-hover:text-[#0b0c10] rounded-lg font-black uppercase tracking-widest text-[9px] transition-all">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
