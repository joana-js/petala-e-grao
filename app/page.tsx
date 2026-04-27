"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Stars, 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  ChevronRight, 
  Menu as MenuIcon, 
  X 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const MENU_ITEMS = [
  {
    category: "Cafés Encantados",
    items: [
      { name: "Capuccino de Teia de Aranha", description: "Um café cremoso onde o desenho na espuma é feito com um xarope prateado que nunca se desfaz, não importa o quanto você mexa.", price: "$6.50" },
      { name: "Mocha da Gruta Sombria", description: "Chocolate amargo colhido no Subterrâneo misturado com café torrado em brasas de dragão.", price: "$7.00" },
      { name: "Espresso do Pulo do Grilo", description: "Um café curto, ultraforte e levemente efervescente. Dizem que quem bebe sente as pernas prontas para saltar.", price: "$6.25" },
    ]
  },
  {
    category: "Chás Místicos",  
    items: [
      { name: "Chá de Pétala de Sonho", description: "Uma infusão azul-bebê que fará você flutuar alguns centímetros do chão enquanto relaxa.", price: "$5.50" },
      { name: "Orvalho de Folha-Prata", description: "Coletado apenas sob a luz da lua cheia; é servido frio e brilha como mercúrio. Ótimo para curar ressacas de poções.", price: "$5.25" },
      { name: "Infusão de Raiz de Mandrágora", description: "Um chá terroso e revigorante que, segundo a lenda, pode aumentar sua conexão com a natureza por um dia inteiro.", price: "$6.00" },
    ]
  },
  {
    category: "Fairy Bites",
    items: [
      { name: "Bolo de Esponja de Musgo", description: "Um bolo verde vibrante (feito com matchá) decorado com gotas de orvalho de açúcar que brilham no escuro.", price: "$4.50" },
      { name: "Cheesecake de Nuvem de Algodão", description: "Tão leve que o pedaço precisa ser segurado por um pequeno peso de prata no prato, senão ele flutua para longe.", price: "$5.75" },
      { name: "Torta de Frutas do Bosque Encantado", description: "Uma torta repleta de frutas silvestres colhidas à mão, cada mordida é como um passeio por um bosque mágico.", price: "$5.00" },
      { name: "Macaron de Pó de Fada", description: "Delicados macarons que, ao serem comidos, deixam um leve rastro de brilho no ar por alguns segundos.", price: "$3.50" },
    ]
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? heroRef : undefined, 
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  if (!mounted) return <div className="min-h-screen bg-[#0f0a1a]" />;

  return (
    <div className="relative min-h-screen selection:bg-purple-500 selection:text-white bg-[#0f0a1a] text-white overflow-x-hidden">
      
      {/* Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full p-10 rounded-[2.5rem] relative bg-white/5 border border-white/10 backdrop-blur-2xl"
            >
              <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 text-white/40 hover:text-white"><X /></button>
              <div className="text-center mb-8">
                <Stars className="text-purple-400 w-10 h-10 mx-auto mb-4" />
                <h2 className="text-3xl font-serif mb-2">Explore nosso site</h2>
                <p className="text-white/50 text-sm">Preencha seus dados para continuar.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-purple-400 mb-2 ml-1">Insira sua alma (Email)</label>
                  <input 
                    type="email" required placeholder="name@whisper.magic"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-400/50 transition-all"
                    value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-purple-400 mb-2 ml-1">Recite os ritos antigos (Senha)</label>
                  <input 
                    type="password" required placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-400/50 transition-all"
                    value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  />
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                  className="w-full bg-purple-500 text-black py-4 rounded-2xl font-bold uppercase tracking-widest mt-4">
                  Atravesse o Véu
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/20 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <Stars className="text-purple-400 w-6 h-6" />
            <span className="text-xl font-serif font-bold tracking-tight text-white uppercase">Pétala & Grão</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/70">
            <a href="#sobre-nos" className="hover:text-purple-400 transition-colors">Sobre nós</a>
            <a href="#menu" className="hover:text-purple-400 transition-colors">Menu</a>
            <a href="#visite-nos" className="hover:text-purple-400 transition-colors">Nos Visite</a>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => isLoggedIn ? setIsLoggedIn(false) : setIsLoginModalOpen(true)}
            className="hidden md:flex items-center gap-2 bg-purple-500 text-black px-6 py-2 rounded-full font-bold text-xs uppercase tracking-tighter"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </motion.button>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, opacity, y: yHero }} className="absolute inset-0">
          <img src="/cafe.jpg" alt="Café" className="w-full h-full object-cover opacity-50 grayscale-[0.2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0f0a1a]" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <span className="inline-block bg-white/10 border border-white/20 px-4 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-purple-300 mb-6 backdrop-blur-xl">
              Onde mundos se encontram e magia é servida em cada xícara
            </span>
            <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter mb-8">
              Beba a<br /> <span className="italic text-purple-400">Feitiçaria.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Atravesse o véu do comum e descubra um refúgio onde cada gole é uma aventura.
            </p>
            <motion.a href="#menu" whileHover={{ scale: 1.05 }} className="bg-purple-500 text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest shadow-2xl shadow-purple-500/20 inline-block">
              Explore nosso menu
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Sobre Nós Section - Design Original */}
      <section id="sobre-nos" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10">
              <img src="/iguarias.jpg" alt="Delícias" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-xs hidden md:block">
              <Sparkles className="text-purple-400 mb-4 w-8 h-8" />
              <p className="text-sm font-medium leading-relaxed italic text-white/90">
                &quot;Nunca experimentei um café tão mágico! Parecia um sonho virando realidade.&quot;
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-purple-400 font-serif italic text-2xl mb-4 block">Grãos selecionados</span>
            <h2 className="text-5xl md:text-6xl font-serif tracking-tight mb-8 leading-tight">Um achado em meio <br/> a Luz Estelar.</h2>
            <div className="space-y-6 text-white/70 leading-relaxed font-light">
              <p>A ideia da Pétala & Grão nasceu de uma paixão por cafés raros e exóticos, onde a magia permeia o solo e o ar.</p>
              <p>Aperfeiçoamos o processo de "Tostamento-Fervilhante" preservando a essência de cada grão.</p>
            </div>
            <a href="#menu" className="inline-flex items-center gap-2 mt-10 text-purple-400 font-bold uppercase tracking-widest hover:gap-4 transition-all">
              Descubra nossos resultados <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-serif mb-6">O Grimório</h2>
            <p className="text-white/50">Nossa seleção semanal de sabores deliciosos para você experimentar.</p>
          </div>

          <div className="grid gap-16">
            {MENU_ITEMS.map((section, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-serif italic text-purple-400 whitespace-nowrap">{section.category}</h3>
                  <div className="h-[1px] w-full bg-white/10" />
                </div>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xl font-medium text-white group-hover:text-purple-400 transition-colors">{item.name}</span>
                        <span className="text-purple-400 font-mono text-sm">{item.price}</span>
                      </div>
                      <p className="text-sm text-white/50 font-light leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section id="visite-nos" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto bg-white/5 border border-white/10 p-12 md:p-24 rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden opacity-20 hidden lg:block">
            <img src="/gatinhocafe.jpg" alt="Atmosfera" className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-serif mb-12">Atravesse o <span className="italic text-purple-400">Grande Carvalho.</span></h2>
            
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-purple-400 w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Endereço</h4>
                    <p className="text-white/70 font-light">123 Willow-Mist Lane<br />Deep Forest, OA 90210</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-purple-400 w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Horários</h4>
                    <p className="text-white/70 font-light">Aurora — Crepúsculo (Diariamente)</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="text-purple-400 w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">Contato</h4>
                    <p className="text-white/70 font-light">+1 (555) MAGIA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-purple-400 w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-xs mb-2">E-mail</h4>
                    <p className="text-white/70 font-light">fadinhas@petalaegrao.com</p>
                  </div>
                </div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} className="mt-16 bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest">
              Nos visite
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Stars className="text-purple-400 w-5 h-5" />
            <span className="font-serif font-bold tracking-widest uppercase text-sm">Pétala & Grão</span>
          </div>
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium text-center">
            &copy; © 2026 Joana Jensen Schifter | Ferramentas Web e UX | Primeiro Semestre
          </div>
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
      </footer>
    </div>
  );
}