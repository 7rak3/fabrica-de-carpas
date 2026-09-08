'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Maximize2, Layers, CheckCircle2, ArrowUpRight, Instagram, Facebook, Linkedin, Youtube, Users, Sliders, ShieldCheck, Sparkles, Check, Flag, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const WHATSAPP_URL = "https://wa.me/56959192685";
  const PHONE_NUMBER = "+56959192685";
  const SOCIAL_LINKS = {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
    youtube: "#"
  };
  const [activeSection, setActiveSection] = useState('inicio');

  // Estado del Configurador Interactivo
  const [shape, setShape] = useState<'cuadrada' | 'rectangular'>('cuadrada');
  const [size, setSize] = useState<string>('4x4');
  const [eventType, setEventType] = useState<string>('corporativo');
  const [walls, setWalls] = useState<string>('blackout');
  const [branding, setBranding] = useState<boolean>(true);
  const [ground, setGround] = useState<string>('mixto');
  const [banderasVela, setBanderasVela] = useState<boolean>(false);
  const [rollers, setRollers] = useState<boolean>(false);

  const squareSizes = [
    { id: '3x3', label: '3x3 Metros', area: '9 m²', capacity: '10-15 personas', desc: 'Stands promocionales' },
    { id: '4x4', label: '4x4 Metros', area: '16 m²', capacity: '20-30 personas', desc: 'Activaciones de marca' },
    { id: '5x5', label: '5x5 Metros', area: '25 m²', capacity: '35-50 personas', desc: 'Gran formato cuadrado' },
  ];

  const rectSizes = [
    { id: '3x6', label: '3x6 Metros', area: '18 m²', capacity: '25-40 personas', desc: 'Pasarelas y ferias' },
    { id: '4x8', label: '4x8 Metros', area: '32 m²', capacity: '45-65 personas', desc: 'Recepciones y cócteles' },
    { id: '5x10', label: '5x10 Metros', area: '50 m²', capacity: '70-110 personas', desc: 'Eventos corporativos masivos' },
    { id: 'custom', label: 'Modular (+10m)', area: 'A medida', capacity: '100+ personas', desc: 'Estructuras continuas acoplables' },
  ];

  const eventTypes = [
    { id: 'corporativo', label: 'Evento Corporativo', desc: 'Lanzamientos o ferias' },
    { id: 'marketing', label: 'Activación BTL', desc: 'Puntos de venta en terreno' },
    { id: 'deportivo', label: 'Deportivo / Outdoor', desc: 'Meta, hidratación y carpas' },
    { id: 'vip', label: 'Espacio VIP / Lounge', desc: 'Zonas exclusivas' },
  ];

  const wallOptions = [
    { id: 'blackout', label: 'Lona Blackout Térmica', desc: 'Aislamiento de luz y clima' },
    { id: 'panoramica', label: 'Panorámica Transparente', desc: 'Luz natural y visibilidad' },
    { id: 'mixta', label: 'Pared Mixta (Ventanas + PVC)', desc: 'Combinación versátil' },
    { id: 'abierta', label: 'Abierta (Solo Techo)', desc: 'Flujo perimetral libre' },
  ];

  const groundOptions = [
    { id: 'duro', label: 'Hormigón / Pavimento', desc: 'Fijación con contrapesos' },
    { id: 'blando', label: 'Césped / Tierra', desc: 'Anclaje con estacas' },
    { id: 'mixto', label: 'Terreno Mixto', desc: 'Evaluación técnica' },
  ];

  const currentSizes = shape === 'cuadrada' ? squareSizes : rectSizes;
  const currentSizeObj = currentSizes.find(s => s.id === size) || currentSizes[0];
  const currentEventObj = eventTypes.find(e => e.id === eventType) || eventTypes[0];
  const currentWallObj = wallOptions.find(w => w.id === walls) || wallOptions[0];
  const currentGroundObj = groundOptions.find(g => g.id === ground) || groundOptions[0];

  const getCustomWhatsAppLink = () => {
    let msg = `Hola Fábrica de Carpas Chile! Diseñé un proyecto en el configurador web y me gustaría recibir su propuesta técnica:\n\n` +
      `• Modelo: Domo Iglú ${shape === 'cuadrada' ? 'Cuadrado' : 'Rectangular'}\n` +
      `• Dimensiones: ${currentSizeObj.label} (${currentSizeObj.area} - Aforo sugerido: ${currentSizeObj.capacity})\n` +
      `• Tipo de Evento: ${currentEventObj.label}\n` +
      `• Tipo de Paredes: ${currentWallObj.label}\n` +
      `• Branding / Impresión: ${branding ? 'Sí, requiero personalización gráfica' : 'Lona estándar sin impresión'}\n` +
      `• Terreno de Montaje: ${currentGroundObj.label}\n`;
    if (banderasVela) {
      msg += `• Complemento: Banderas Vela publicitarias (tipo pluma/gota)\n`;
    }
    if (rollers) {
      msg += `• Complemento: Rollers publicitarios (Roll-Up retráctil)\n`;
    }
    msg += `\nQuedo atento a su propuesta y disponibilidad de despacho. ¡Muchas gracias!`;
    return `${WHATSAPP_URL}?text=${encodeURIComponent(msg)}`;
  };

  // Lógica para detectar la sección activa en el scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['inicio', 'proceso', 'modelos', 'publicidad', 'configurador', 'ingenieria', 'contacto'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Proceso', id: 'proceso' },
    { name: 'Modelos', id: 'modelos' },
    { name: 'Publicidad & Banderas', id: 'publicidad' },
    { name: 'Configurador', id: 'configurador' },
    { name: 'Ingeniería', id: 'ingenieria' },
    { name: 'Contacto', id: 'contacto' }
  ];

  return (
    <main className="bg-brand-dark min-h-screen text-white">
      {/* WhatsApp Floating Button */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-2xl transition-transform"
      >
        <MessageCircle size={32} className="text-white" />
      </motion.a>

      {/* Header */}
      <nav className="fixed top-0 w-full z-[100] bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center">
              <Layers className="text-white" size={20} />
            </div>
            <span className="font-black text-lg tracking-tighter uppercase">FABRICA<span className="text-brand-orange">DE</span>CARPAS</span>
          </div>
          
          <div className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={`#${link.id}`}
                className={`text-xs font-black uppercase tracking-widest transition-colors ${activeSection === link.id ? 'text-brand-orange' : 'text-gray-500 hover:text-white'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <a href={`tel:${PHONE_NUMBER}`} className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/10">
              Llamar
            </a>
            <a href={WHATSAPP_URL} className="flex items-center gap-2 bg-brand-orange/10 hover:bg-brand-orange/20 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-brand-orange/30 text-brand-orange">
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="px-6 pt-40 pb-32 max-w-7xl mx-auto relative overflow-hidden">
        <motion.div {...fadeIn}>
          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="inline-block px-4 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em]">
              PREMIUM EVENT STRUCTURES
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-brand-gold/50"></div>
              <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.3em]">25 Años de Excelencia Industrial</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.8] tracking-tighter uppercase">
            CARPAS TIPO <br />
            <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">DOMO IGLÚ.</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mb-12">
            Fabricación industrial de estructuras de alta resistencia para marketing corporativo y eventos masivos en todo Chile. Calidad garantizada por más de dos décadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_URL} className="bg-brand-orange hover:bg-brand-orange/90 px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand-orange/20 uppercase tracking-widest text-sm text-white">
              <MessageCircle size={24} />
              Cotizar Proyecto
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="bg-white/5 hover:bg-white/10 px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border border-white/10 uppercase tracking-widest text-sm text-brand-silver">
              Llamar a un experto
            </a>
          </div>
        </motion.div>
      </section>

      {/* Cobertura Nacional Banner */}
      <section className="bg-brand-orange py-6 overflow-hidden border-y border-black relative z-10">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1,2,3,4,5].map(i => (
            <span key={i} className="text-white font-black text-2xl mx-12 flex items-center gap-4">
              DESPACHO A TODO CHILE <Layers size={24} /> FABRICACIÓN PROPIA <Layers size={24} /> 25 AÑOS DE EXPERIENCIA <Layers size={24} />
            </span>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="px-6 py-32 border-t border-white/5 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { id: '01', title: 'Asesoría Técnica', color: 'brand-orange', text: 'Analizamos los requerimientos de tu evento o activación para recomendar la estructura y medidas óptimas.' },
              { id: '02', title: 'Fabricación', color: 'brand-gold', text: 'Producción industrial bajo estrictos estándares de seguridad, utilizando materiales certificados.' },
              { id: '03', title: 'Despacho', color: 'white', text: 'Logística eficiente a todo Chile. Estructuras diseñadas para un ensamblaje rápido.' }
            ].map((step) => (
              <motion.div key={step.id} {...fadeIn} className="relative group">
                <div className="text-7xl font-black text-white/5 absolute -top-10 -left-4 group-hover:text-white/10 transition-colors">{step.id}</div>
                <h4 className={`text-xl font-black mb-4 text-${step.color} uppercase tracking-widest`}>
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Modelos */}
      <section id="modelos" className="px-6 py-32 bg-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-black mb-20 flex items-center gap-4 text-center justify-center uppercase tracking-tighter">
            <div className="w-12 h-1 bg-brand-orange hidden sm:block"></div>
            Modelos Disponibles
            <div className="w-12 h-1 bg-brand-orange hidden sm:block"></div>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cuadrada */}
            <motion.div {...fadeIn} className="bg-black border border-white/10 p-10 rounded-3xl hover:border-brand-orange/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Maximize2 size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-black tracking-tighter uppercase mb-2">CUADRADA</h3>
                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-8 italic">Domo Iglú Stand</p>
                <div className="flex gap-4 mb-8">
                  {['3x3', '4x4', '5x5'].map(m => (
                    <div key={m} className="bg-white/5 px-4 py-2 rounded-lg font-bold text-brand-orange border border-brand-orange/20 text-sm">{m}m</div>
                  ))}
                </div>
                <ul className="space-y-4 mb-10 text-gray-400">
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-orange" /> Lona PVC Blackout Premium</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-orange" /> Estructura Aluminio 6061-T6</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-orange" /> Montaje Express (20 min)</li>
                </ul>
                <a href={`${WHATSAPP_URL}?text=Hola, me interesa cotizar el modelo de Carpa Domo Cuadrada.`} className="w-full py-5 bg-brand-orange/10 border border-brand-orange/30 rounded-xl flex items-center justify-center gap-3 font-black text-brand-orange hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest text-xs">
                  Cotizar por WhatsApp <MessageCircle size={20} />
                </a>
              </div>
            </motion.div>

            {/* Rectangular */}
            <motion.div {...fadeIn} className="bg-black border border-white/10 p-10 rounded-3xl hover:border-brand-gold/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Maximize2 size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-black tracking-tighter uppercase mb-2">RECTANGULAR</h3>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-8 italic">Domo Iglú Event</p>
                <div className="flex gap-4 mb-8">
                  {['3x6', '4x8', '5x10'].map(m => (
                    <div key={m} className="bg-white/5 px-4 py-2 rounded-lg font-bold text-brand-gold border border-brand-gold/20 text-sm">{m}m</div>
                  ))}
                </div>
                <ul className="space-y-4 mb-10 text-gray-400">
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Gran Formato Corporativo</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Sistema Modular Acoplable</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-gold" /> Resistencia Viento Superior</li>
                </ul>
                <a href={`${WHATSAPP_URL}?text=Hola, me interesa cotizar el modelo de Carpa Domo Rectangular.`} className="w-full py-5 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-center justify-center gap-3 font-black text-brand-gold hover:bg-brand-gold hover:text-black transition-all uppercase tracking-widest text-xs">
                  Cotizar por WhatsApp <MessageCircle size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soportes Publicitarios: Banderas Vela y Rollers */}
      <section id="publicidad" className="px-6 py-32 bg-white/5 border-t border-white/5 scroll-mt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <Flag size={14} />
                Soportes de Branding & Activación
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                Banderas Vela <br />
                <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">& Rollers Publicitarios.</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-xs font-bold uppercase leading-relaxed tracking-widest">
              Soportes visuales de alto impacto con impresión fotográfica HD para ferias, activaciones BTL y congresos corporativos en todo Chile.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Banderas Vela */}
            <motion.div {...fadeIn} className="bg-black border border-white/10 p-10 rounded-3xl hover:border-brand-orange/50 transition-all group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Flag size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-widest border border-brand-orange/30">
                    Exterior & Viento
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Armado en 60s</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">BANDERAS VELA</h3>
                <p className="text-brand-orange text-xs font-bold uppercase tracking-widest mb-6 italic">Modelos Pluma, Gota y Rectangulares</p>
                
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Estructura flexible en fibra de vidrio de alta resistencia con tela poliéster sublimada por ambas caras. Máxima visibilidad y movimiento con el viento sin volcarse.
                </p>

                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">Alturas Disponibles:</span>
                  <div className="flex flex-wrap gap-3">
                    {['2.8 Metros (S)', '3.4 Metros (M)', '4.5 Metros (L)'].map((alt) => (
                      <div key={alt} className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-brand-orange border border-brand-orange/20">
                        {alt}
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="space-y-3 mb-10 text-gray-400 text-xs">
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-orange" /> Sublimación textil lavable con protección UV</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-orange" /> Base cruz con flotador de agua o estaca para tierra</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-orange" /> Bolso de transporte reforzado incluido</li>
                </ul>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10">
                <a
                  href={`${WHATSAPP_URL}?text=Hola! Me gustaría cotizar Banderas Vela publicitarias para un evento.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-brand-orange/15 border border-brand-orange/40 hover:bg-brand-orange hover:text-white rounded-2xl flex items-center justify-center gap-3 font-black text-brand-orange transition-all uppercase tracking-widest text-xs shadow-lg shadow-brand-orange/10"
                >
                  Cotizar Banderas Vela <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>

            {/* Card Rollers Publicitarios */}
            <motion.div {...fadeIn} className="bg-black border border-white/10 p-10 rounded-3xl hover:border-brand-gold/50 transition-all group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Printer size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-black uppercase tracking-widest border border-brand-gold/30">
                    Ultra Portátil & Pro
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Auto-enrollable</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-2">ROLLERS PUBLICITARIOS</h3>
                <p className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-6 italic">Roll-Up Retráctil de Alta Durabilidad</p>
                
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Base de aluminio reforzado con mecanismo retráctil de tensión constante. Gráfica en tela o película poliéster anti-curvatura para un acabado liso y sin reflejos molestos.
                </p>

                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-3">Formatos Disponibles:</span>
                  <div className="flex flex-wrap gap-3">
                    {['80 x 200 cm', '85 x 200 cm', '100 x 200 cm', '120 x 200 cm'].map((fmt) => (
                      <div key={fmt} className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-brand-gold border border-brand-gold/20">
                        {fmt}
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="space-y-3 mb-10 text-gray-400 text-xs">
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-gold" /> Impresión fotográfica HD 1440 DPI</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-gold" /> Estructura de aluminio anodizado mate indeformable</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-brand-gold" /> Bolso acolchado con cierre doble para transporte</li>
                </ul>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10">
                <a
                  href={`${WHATSAPP_URL}?text=Hola! Me gustaría cotizar Rollers Publicitarios Roll-Up para mi empresa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-brand-gold/15 border border-brand-gold/40 hover:bg-brand-gold hover:text-black rounded-2xl flex items-center justify-center gap-3 font-black text-brand-gold transition-all uppercase tracking-widest text-xs shadow-lg shadow-brand-gold/10"
                >
                  Cotizar Rollers Publicitarios <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Configurador Interactivo de Proyectos (Sin Precios) */}
      <section id="configurador" className="px-6 py-32 bg-black border-t border-white/5 scroll-mt-20 relative">
        {/* Glow ambient background aislado para no romper sticky */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-orange/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Sliders size={14} />
              Configurador Industrial a Medida
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              Diseña tu Estructura <br />
              <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">A Medida.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Selecciona dimensiones, aforo y características técnicas para tu evento o activación. Genera tu especificación técnica y cotízala directamente con nuestro equipo de ingenieros vía WhatsApp.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Controles de Configuración */}
            <div className="lg:col-span-7 space-y-10">
              {/* Paso 1: Geometría */}
              <motion.div {...fadeIn} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[11px] text-brand-orange">1</span>
                    Geometría del Domo
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShape('cuadrada');
                      setSize('4x4');
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      shape === 'cuadrada'
                        ? 'border-brand-orange bg-brand-orange/10 text-white shadow-lg shadow-brand-orange/10'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black uppercase tracking-wider">Domo Cuadrado</span>
                      {shape === 'cuadrada' && <Check size={16} className="text-brand-orange" />}
                    </div>
                    <p className="text-[11px] text-gray-400">Formato compacto ideal para stands corporativos y ferias.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShape('rectangular');
                      setSize('4x8');
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      shape === 'rectangular'
                        ? 'border-brand-gold bg-brand-gold/10 text-white shadow-lg shadow-brand-gold/10'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-black uppercase tracking-wider">Domo Rectangular</span>
                      {shape === 'rectangular' && <Check size={16} className="text-brand-gold" />}
                    </div>
                    <p className="text-[11px] text-gray-400">Gran formato modular para eventos masivos y lanzamientos.</p>
                  </button>
                </div>
              </motion.div>

              {/* Paso 2: Medidas y Aforo */}
              <motion.div {...fadeIn} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[11px] text-brand-orange">2</span>
                    Dimensiones y Aforo Estimado
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Capacidad calculada</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentSizes.map((item) => {
                    const isSelected = size === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSize(item.id)}
                        className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? 'border-brand-orange bg-brand-orange/15 text-white shadow-md'
                            : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-base font-black uppercase tracking-tight text-white">{item.label}</span>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/10 text-brand-orange">{item.area}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-300 font-bold mb-1">
                          <Users size={13} className="text-brand-orange" />
                          <span>{item.capacity}</span>
                        </div>
                        <p className="text-[10px] text-gray-500">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Paso 3: Tipo de Evento */}
              <motion.div {...fadeIn} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[11px] text-brand-orange">3</span>
                    Tipo de Evento o Uso
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {eventTypes.map((ev) => {
                    const isSelected = eventType === ev.id;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        onClick={() => setEventType(ev.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-brand-orange bg-brand-orange/15 text-white'
                            : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black uppercase tracking-wide text-white">{ev.label}</span>
                          {isSelected && <Check size={14} className="text-brand-orange" />}
                        </div>
                        <p className="text-[10px] text-gray-500">{ev.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Paso 4: Cerramientos y Terreno */}
              <motion.div {...fadeIn} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[11px] text-brand-orange">4</span>
                    Configuración de Paredes / Lona
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {wallOptions.map((w) => {
                      const isSelected = walls === w.id;
                      return (
                        <button
                          key={w.id}
                          type="button"
                          onClick={() => setWalls(w.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all text-xs ${
                            isSelected
                              ? 'border-brand-orange bg-brand-orange/15 text-white'
                              : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-bold text-white mb-0.5">{w.label}</div>
                          <div className="text-[10px] text-gray-500">{w.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        <Sparkles size={14} className="text-brand-gold" />
                        Personalización Gráfica (Branding)
                      </div>
                      <p className="text-[11px] text-gray-500">Impresión digital full color de logotipos corporativos en lona.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBranding(!branding)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                        branding
                          ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20'
                          : 'bg-black/50 text-gray-400 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {branding ? '✓ Impresión Incluida' : '+ Sin Branding'}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 block mb-2">Terreno de Instalación</label>
                  <div className="grid grid-cols-3 gap-2">
                    {groundOptions.map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGround(g.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all text-[11px] font-bold ${
                          ground === g.id
                            ? 'border-brand-orange bg-brand-orange/20 text-white'
                            : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Paso 5: Complementos Publicitarios */}
              <motion.div {...fadeIn} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.25em] text-brand-orange flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[11px] text-brand-orange">5</span>
                    Soportes Publicitarios Adicionales (Opcional)
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold">Pack Integral</span>
                </div>
                <p className="text-gray-400 text-xs mb-4">
                  Suma banderas vela o rollers retráctiles para equipar por completo tu stand corporativo o punto de activación.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setBanderasVela(!banderasVela)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      banderasVela
                        ? 'border-brand-orange bg-brand-orange/15 text-white shadow-md'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        <Flag size={14} className="text-brand-orange" />
                        Banderas Vela
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${banderasVela ? 'bg-brand-orange text-white' : 'bg-white/10 text-gray-400'}`}>
                        {banderasVela ? '✓ Agregado' : '+ Agregar'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500">Mástil flexible de fibra con tela sublimada y base para exterior/interior.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRollers(!rollers)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      rollers
                        ? 'border-brand-gold bg-brand-gold/15 text-white shadow-md'
                        : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                        <Printer size={14} className="text-brand-gold" />
                        Rollers Publicitarios
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${rollers ? 'bg-brand-gold text-black' : 'bg-white/10 text-gray-400'}`}>
                        {rollers ? '✓ Agregado' : '+ Agregar'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500">Roll-Up retráctil de aluminio con bolso de transporte doble costura.</p>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Ficha Resumen Flotante (Sin Precios - Foco en Conversión Directa) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 self-start z-30">
              <motion.div {...fadeIn} className="bg-black border-2 border-brand-orange/40 p-6 md:p-8 rounded-3xl shadow-2xl relative overflow-hidden max-h-[calc(100vh-7.5rem)] overflow-y-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-bl-full pointer-events-none"></div>

                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-orange block">Ficha de Requerimiento</span>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">Resumen del Proyecto</h4>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-brand-orange" />
                  </div>
                </div>

                <div className="space-y-4 mb-8 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Estructura:</span>
                    <span className="font-black text-white uppercase">Domo {shape === 'cuadrada' ? 'Cuadrado' : 'Rectangular'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Medidas:</span>
                    <span className="font-black text-brand-orange">{currentSizeObj.label} ({currentSizeObj.area})</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Aforo Estimado:</span>
                    <span className="font-black text-brand-gold">{currentSizeObj.capacity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Destino / Uso:</span>
                    <span className="font-bold text-white">{currentEventObj.label}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Cerramiento:</span>
                    <span className="font-bold text-gray-300">{currentWallObj.label}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Branding:</span>
                    <span className={`font-black uppercase ${branding ? 'text-brand-orange' : 'text-gray-500'}`}>
                      {branding ? 'Logotipo Full Color' : 'Lona Estándar'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-gray-500 uppercase tracking-wider font-bold">Montaje:</span>
                    <span className="font-bold text-gray-300">{currentGroundObj.label}</span>
                  </div>
                  {banderasVela && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5 bg-brand-orange/10 px-2 rounded-lg">
                      <span className="text-brand-orange uppercase tracking-wider font-bold flex items-center gap-1.5">
                        <Flag size={12} /> Banderas Vela:
                      </span>
                      <span className="font-black text-white uppercase">Incluidas en Solicitud</span>
                    </div>
                  )}
                  {rollers && (
                    <div className="flex justify-between items-center py-2 border-b border-white/5 bg-brand-gold/10 px-2 rounded-lg">
                      <span className="text-brand-gold uppercase tracking-wider font-bold flex items-center gap-1.5">
                        <Printer size={12} /> Rollers Roll-Up:
                      </span>
                      <span className="font-black text-white uppercase">Incluidos en Solicitud</span>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 mb-8">
                  <div className="flex items-center gap-2 text-brand-gold text-[10px] font-black uppercase tracking-wider mb-1">
                    <CheckCircle2 size={14} /> Estándar Industrial Garantizado
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Aluminio anodizado 6061-T6, lonas certificadas resistentes al viento de hasta 100 km/h y despacho a todo el país.
                  </p>
                </div>

                <div className="space-y-3">
                  <a
                    href={getCustomWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-[#25D366] hover:bg-[#20bd5a] rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-xl shadow-[#25D366]/20 uppercase tracking-widest text-xs text-white"
                  >
                    <MessageCircle size={22} />
                    Cotizar Proyecto por WhatsApp
                  </a>

                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="w-full py-3.5 bg-white/5 hover:bg-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10 uppercase tracking-widest text-[11px] text-gray-400 hover:text-white"
                  >
                    Llamar a un Especialista
                  </a>
                </div>

                <p className="text-[9px] text-gray-600 text-center uppercase tracking-widest mt-4">
                  Cotización consultiva sin precios fijos según volumen y requerimiento técnico.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Galeria */}
      <section className="px-6 py-32 bg-brand-dark">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Proyectos <br /> <span className="text-brand-orange">Ejecutados.</span></h2>
            <p className="text-gray-500 max-w-xs text-xs font-bold uppercase leading-relaxed tracking-widest">Más de 500 montajes realizados para las agencias más importantes de la región.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { t: "Evento Corporativo Santiago", s: "Domo 5x10", span: "md:col-span-2" },
              { t: "Activación Verano Viña", s: "Domo 4x4", span: "" },
              { t: "Lanzamiento Automotriz", s: "Modular 5x20", span: "" },
              { t: "Stands de Marketing", s: "Domo 3x3", span: "md:col-span-2" }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                className={`${p.span} group relative aspect-video md:aspect-auto md:h-[400px] overflow-hidden rounded-3xl bg-white/5 border border-white/10`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                  <Layers size={100} className="text-brand-orange" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em]">{p.s}</span>
                  <h4 className="text-xl font-black text-white uppercase tracking-tighter mt-2">{p.t}</h4>
                </div>
                <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                    <ArrowUpRight className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Atributos Técnicos */}
      <section id="ingenieria" className="px-6 py-32 bg-brand-dark overflow-hidden border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div {...fadeIn} className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter leading-none uppercase">
                INGENIERÍA <br /> 
                <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">DE ALTA RESISTENCIA.</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="border-l-4 border-brand-orange/30 pl-6 py-2">
                  <h5 className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">Tejidos Tech</h5>
                  <p className="text-gray-500 text-sm">Lona PVC con tratamiento anti-hongos y filtro UV grado industrial.</p>
                </div>
                <div className="border-l-4 border-brand-gold/30 pl-6 py-2">
                  <h5 className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">Estructura</h5>
                  <p className="text-gray-500 text-sm">Aluminio anodizado de alta densidad, liviano pero indeformable.</p>
                </div>
                <div className="border-l-4 border-white/20 pl-6 py-2">
                  <h5 className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">Seguridad</h5>
                  <p className="text-gray-500 text-sm">Certificación de resistencia al viento y material retardante de fuego.</p>
                </div>
                <div className="border-l-4 border-brand-orange/30 pl-6 py-2">
                  <h5 className="font-black text-white mb-2 uppercase tracking-widest text-[10px]">Branding</h5>
                  <p className="text-gray-500 text-sm">Superficies 100% aptas para impresión digital de alta resolución.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div {...fadeIn} className="flex-1 relative flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-square">
                <div className="absolute inset-0 border-2 border-brand-orange/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-brand-gold/20 rounded-full animate-[spin_15s_linear_infinite]"></div>
                <div className="absolute inset-10 border border-white/5 rounded-full"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Layers size={140} className="text-brand-orange/80" />
                    <motion.div 
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-4 -left-4 w-10 h-10 border-t-2 border-l-2 border-brand-gold"
                    ></motion.div>
                    <motion.div 
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-4 -right-4 w-10 h-10 border-b-2 border-r-2 border-brand-gold"
                    ></motion.div>
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black border border-brand-orange px-4 py-1.5 rounded text-[10px] font-black text-brand-orange uppercase tracking-widest shadow-[0_0_20px_rgba(252,76,2,0.3)]">
                  Stress Test: OK
                </div>
                <div className="absolute bottom-10 right-0 bg-black border border-brand-gold px-4 py-1.5 rounded text-[10px] font-black text-brand-gold uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                  Viento: 100km/h
                </div>
                <div className="absolute bottom-20 left-0 bg-black border border-white/20 px-4 py-1.5 rounded text-[10px] font-black text-white uppercase tracking-widest">
                  Aluminio: 6061-T6
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="px-6 py-32 bg-white/5 relative overflow-hidden scroll-mt-20">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Cotización Rápida</h2>
            <p className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em]">Hablemos de tu próximo proyecto</p>
          </motion.div>
          
          <motion.form 
            {...fadeIn}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const company = formData.get('company');
              const message = formData.get('message');
              const whatsappMsg = `Hola, mi nombre es ${name} de la empresa ${company}. Me interesa cotizar: ${message}`;
              window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
            }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] ml-1">Tu Nombre</label>
                <input 
                  required name="name" type="text" placeholder="EJ. JUAN PÉREZ"
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-orange outline-none transition-all text-white font-bold placeholder:text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] ml-1">Empresa / Agencia</label>
                <input 
                  required name="company" type="text" placeholder="NOMBRE DE TU EMPRESA"
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-orange outline-none transition-all text-white font-bold placeholder:text-gray-800"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-brand-orange uppercase tracking-[0.2em] ml-1">Requerimiento</label>
              <textarea 
                required name="message" placeholder="CUÉNTANOS QUÉ NECESITAS (MEDIDAS, CANTIDAD, FECHAS...)" rows={5}
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 focus:border-brand-orange outline-none transition-all text-white font-bold placeholder:text-gray-800 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-xl shadow-brand-orange/20 uppercase tracking-widest"
            >
              Enviar a WhatsApp <MessageCircle size={28} />
            </button>
          </motion.form>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-32 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.h2 {...fadeIn} className="text-3xl font-black mb-16 text-center tracking-tighter uppercase">Preguntas Frecuentes</motion.h2>
          <div className="grid gap-6">
            {[
              { q: "¿Cuánto tiempo demora la fabricación?", a: "Dependiendo del volumen, el tiempo estándar es de 7 a 15 días hábiles." },
              { q: "¿Tienen garantía?", a: "Sí, todas nuestras estructuras cuentan con garantía de fábrica por defectos de material y confección." },
              { q: "¿Realizan impresiones de marca?", a: "Absolutamente. Podemos imprimir logotipos o diseños full color en techos y paredes." }
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeIn} className="bg-white/5 border border-white/5 p-8 rounded-3xl hover:bg-white/[0.08] transition-colors group">
                <h4 className="font-black text-brand-orange mb-4 uppercase text-sm tracking-widest group-hover:text-white transition-colors">{item.q}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
            <div className="md:col-span-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                <div className="w-10 h-10 bg-brand-orange rounded flex items-center justify-center">
                  <Layers className="text-white" size={22} />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase">FABRICA<span className="text-brand-orange">DE</span>CARPAS</span>
              </div>
              <p className="text-gray-600 text-sm max-w-sm mx-auto md:mx-0 leading-relaxed font-medium mb-3">
                Líderes en la fabricación de estructuras premium para eventos en Chile. Más de 25 años entregando soluciones industriales de alta resistencia para las mejores agencias del país.
              </p>
              <p className="text-xs text-gray-500 font-bold">
                Fábrica de Carpas es una marca oficial de{' '}
                <a 
                  href="https://agenciacohete.cl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-orange hover:text-brand-gold transition-colors font-black"
                >
                  Agencia Cohete
                </a>.
              </p>
            </div>

            <div>
              <h5 className="font-black text-brand-orange text-[10px] uppercase tracking-[0.3em] mb-8">Contacto</h5>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest">
                <li><a href={`tel:${PHONE_NUMBER}`} className="text-gray-500 hover:text-white transition-colors">{PHONE_NUMBER}</a></li>
                <li><a href={WHATSAPP_URL} className="text-gray-500 hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-brand-gold text-[10px] uppercase tracking-[0.3em] mb-8">Logística</h5>
              <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-gray-500">
                <li>Despacho Nacional</li>
                <li>Montaje Rápido</li>
                <li>Soporte Técnico</li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-white text-[10px] uppercase tracking-[0.3em] mb-8">Redes Sociales</h5>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><Instagram size={18} /></a>
                <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><Facebook size={18} /></a>
                <a href={SOCIAL_LINKS.linkedin} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><Linkedin size={18} /></a>
                <a href={SOCIAL_LINKS.youtube} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><Youtube size={18} /></a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="font-bold tracking-[0.3em] text-[9px] text-gray-600 uppercase">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> FABRICA DE CARPAS CHILE | UNA MARCA DE AGENCIA COHETE
            </p>
            <p className="text-[10px] text-gray-500 font-bold tracking-wider uppercase">
              Desarrollado por{' '}
              <a
                href="https://agenciacohete.cl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-colors underline underline-offset-4"
              >
                Agencia Cohete
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
