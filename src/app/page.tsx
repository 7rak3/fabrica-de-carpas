'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WhatsappLogo, ArrowsOut, Tent, CheckCircle, ArrowUpRight, InstagramLogo, FacebookLogo, LinkedinLogo, YoutubeLogo, CaretLeft, CaretRight, ChatTeardropText, Factory, Truck } from '@phosphor-icons/react';
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
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (carouselRef.current) {
      const cardWidth = (carouselRef.current.firstElementChild as HTMLElement)?.offsetWidth || 400;
      carouselRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = (carouselRef.current.firstElementChild as HTMLElement)?.offsetWidth || 400;
      carouselRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
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
    const sections = ['inicio', 'proceso', 'modelos', 'catalogo', 'ingenieria', 'contacto'];
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
    { name: 'Catálogo', id: 'catalogo' },
    { name: 'Ingeniería', id: 'ingenieria' },
    { name: 'Contacto', id: 'contacto' }
  ];

  return (
    <main className="bg-brand-dark min-h-screen text-white overflow-x-hidden">
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
        <WhatsappLogo weight="duotone" size={32} className="text-white" />
      </motion.a>

      {/* Header */}
      <nav className="fixed top-0 w-full z-[100] bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange rounded flex items-center justify-center">
              <Tent weight="duotone" className="text-white" size={20} />
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
              <WhatsappLogo weight="duotone" size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="inicio" className="px-6 pt-24 pb-12 md:pt-32 md:pb-16 max-w-7xl mx-auto relative min-h-screen lg:min-h-[90vh] flex items-center">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 w-full mt-12 lg:mt-0">
          <motion.div {...fadeIn} className="flex-1 z-10 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <div className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                PREMIUM EVENT STRUCTURES
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="h-px w-8 bg-brand-gold/50"></div>
                <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.3em]">25 Años de Excelencia</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-[6.5rem] font-black mb-6 leading-[0.85] tracking-tighter uppercase">
              FÁBRICA DE <br />
              <span className="text-brand-orange text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-gold">CARPAS CORPORATIVAS.</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              Expertos en fabricación de carpas industriales y estructuras tipo domo iglú de alta resistencia para marketing corporativo y eventos masivos en todo Chile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_URL} className="bg-brand-orange hover:bg-brand-orange/90 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-brand-orange/20 uppercase tracking-widest text-sm text-white">
                <WhatsappLogo weight="fill" size={24} />
                Cotizar Proyecto
              </a>
              <a href={`tel:${PHONE_NUMBER}`} className="bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all border border-white/10 uppercase tracking-widest text-sm text-brand-silver">
                Llamar a un experto
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full relative flex items-center justify-center mt-10 lg:mt-0"
          >
            {/* Glowing backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-brand-orange/20 blur-[100px] rounded-full z-0"></div>
            
            {/* Floating Tent Image */}
            <motion.img 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              src="/Fotos productos/Carpas PAN/Carpas PAN Naranjo_nobg.png" 
              alt="Carpa Domo Iglú Naranja" 
              className="w-full h-auto max-w-2xl object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.9)] relative z-10 scale-110"
            />

            {/* Floating Feature Badges */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-0 right-0 lg:-right-8 bg-black/80 backdrop-blur-md border border-brand-gold/30 p-4 rounded-2xl flex items-center gap-3 z-20 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                <CheckCircle weight="fill" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xs uppercase tracking-widest">Aluminio</span>
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Alta Densidad</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 left-0 lg:-left-8 bg-black/80 backdrop-blur-md border border-brand-orange/30 p-4 rounded-2xl flex items-center gap-3 z-20 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center text-brand-orange">
                <Tent weight="fill" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-xs uppercase tracking-widest">Lona PVC</span>
                <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Blackout UV</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cobertura Nacional Banner */}
      <section className="bg-brand-orange py-4 overflow-hidden border-y border-black relative z-10 flex">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* We create an array of repeated items to ensure the marquee fills the screen and loops */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="text-white font-black text-xl lg:text-2xl mx-8 tracking-widest flex items-center">
                DESPACHO A TODO CHILE
              </span>
              <Tent weight="duotone" size={24} className="text-black/50" />
              <span className="text-white font-black text-xl lg:text-2xl mx-8 tracking-widest flex items-center">
                FABRICACIÓN PROPIA
              </span>
              <Tent weight="duotone" size={24} className="text-black/50" />
              <span className="text-white font-black text-xl lg:text-2xl mx-8 tracking-widest flex items-center">
                25 AÑOS DE EXPERIENCIA
              </span>
              <Tent weight="duotone" size={24} className="text-black/50" />
            </div>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="px-6 py-32 border-t border-white/5 bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-black mb-20 text-center uppercase tracking-tighter">
            Nuestro <span className="text-brand-orange">Proceso</span> de Fabricación
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { id: '01', title: 'Asesoría Técnica', color: 'brand-orange', text: 'Analizamos los requerimientos de tu evento o activación para recomendar la estructura y medidas óptimas.', icon: <ChatTeardropText weight="duotone" size={40} /> },
              { id: '02', title: 'Fabricación', color: 'brand-gold', text: 'Producción industrial bajo estrictos estándares de seguridad, utilizando materiales certificados.', icon: <Factory weight="duotone" size={40} /> },
              { id: '03', title: 'Despacho', color: 'white', text: 'Logística eficiente a todo Chile. Estructuras diseñadas para un ensamblaje rápido.', icon: <Truck weight="duotone" size={40} /> }
            ].map((step) => (
              <motion.div key={step.id} {...fadeIn} className="relative group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all overflow-hidden">
                <div className="text-9xl font-black text-white/5 absolute -top-4 -right-4 group-hover:text-white/10 transition-colors z-0">{step.id}</div>
                <div className={`relative z-10 text-${step.color} mb-6`}>
                  {step.icon}
                </div>
                <h4 className={`relative z-10 text-xl font-black mb-4 text-${step.color} uppercase tracking-widest`}>
                  {step.title}
                </h4>
                <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
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
                <ArrowsOut weight="duotone" size={120} />
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
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-orange" /> Lona PVC Blackout Premium</li>
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-orange" /> Estructura Aluminio 6061-T6</li>
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-orange" /> Montaje Express (20 min)</li>
                </ul>
                <a href={`${WHATSAPP_URL}?text=Hola, me interesa cotizar el modelo de Carpa Domo Cuadrada.`} className="w-full py-5 bg-brand-orange/10 border border-brand-orange/30 rounded-xl flex items-center justify-center gap-3 font-black text-brand-orange hover:bg-brand-orange hover:text-white transition-all uppercase tracking-widest text-xs">
                  Cotizar por WhatsApp <WhatsappLogo weight="duotone" size={20} />
                </a>
              </div>
            </motion.div>

            {/* Rectangular */}
            <motion.div {...fadeIn} className="bg-black border border-white/10 p-10 rounded-3xl hover:border-brand-gold/50 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ArrowsOut weight="duotone" size={120} />
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
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-gold" /> Gran Formato Corporativo</li>
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-gold" /> Sistema Modular Acoplable</li>
                  <li className="flex items-center gap-3"><CheckCircle weight="fill" size={18} className="text-brand-gold" /> Resistencia Viento Superior</li>
                </ul>
                <a href={`${WHATSAPP_URL}?text=Hola, me interesa cotizar el modelo de Carpa Domo Rectangular.`} className="w-full py-5 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-center justify-center gap-3 font-black text-brand-gold hover:bg-brand-gold hover:text-black transition-all uppercase tracking-widest text-xs">
                  Cotizar por WhatsApp <WhatsappLogo weight="duotone" size={20} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catálogo de Productos */}
      <section id="catalogo" className="px-6 py-32 bg-black border-t border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
              Catálogo de <span className="text-brand-orange">Modelos</span>
            </h2>
            <p className="text-gray-500 uppercase text-xs font-bold tracking-[0.2em] max-w-2xl mx-auto">
              Descubre nuestra línea completa de estructuras. Disponibles en una amplia variedad de colores para adaptarse a la identidad de tu marca.
            </p>
          </motion.div>

          <div className="relative">
            {/* Controles de Navegación */}
            <div className="flex justify-end gap-4 mb-6">
              <button 
                onClick={scrollPrev} 
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-orange transition-all"
                aria-label="Anterior"
              >
                <CaretLeft weight="bold" size={24} />
              </button>
              <button 
                onClick={scrollNext} 
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-brand-orange transition-all"
                aria-label="Siguiente"
              >
                <CaretRight weight="bold" size={24} />
              </button>
            </div>

            {/* Contenedor del Carrusel */}
            <div 
              ref={carouselRef} 
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
              {[
                { id: 'PAN', name: 'Modelo PAN', img: '/Fotos productos/Carpas PAN/Carpas PAN Azul_nobg.png' },
                { id: 'EXTENDIDA', name: 'Modelo Extendida', img: '/Fotos productos/Carpas Extendidas/Carpa Extendida Azul_nobg.png' },
                { id: 'C', name: 'Modelo C', img: '/Fotos productos/Carpas C/Carpa C Azul_nobg.png' },
                { id: 'P', name: 'Modelo P', img: '/Fotos productos/Carpas P/Carpa P Azul_nobg.png' },
                { id: 'PS', name: 'Modelo PS', img: '/Fotos productos/Carpas PS/Carpa PS Azul_nobg.png' },
                { id: 'L', name: 'Modelo L', img: '/Fotos productos/Carpas L/Carpa L Azul_nobg.png' },
                { id: 'R', name: 'Modelo R', img: '/Fotos productos/Carpas R/Carpa R Celeste_nobg.png' },
              ].map((product, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeIn} 
                  className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex-none snap-start bg-brand-dark border border-white/10 rounded-3xl overflow-hidden group hover:border-brand-orange/50 transition-all flex flex-col shadow-lg"
                >
                  {/* Contenedor de imagen con fondo gris */}
                  <div className="bg-neutral-900 p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 opacity-80"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                    <img 
                      src={product.img} 
                      alt={`Fábrica de Carpas - ${product.name} Corporativa`} 
                      className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)] relative z-10 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out"
                    />
                  </div>
                  {/* Contenido */}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{product.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-[9px] font-black bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-widest text-gray-400">Variedad de Colores</span>
                        <span className="text-[9px] font-black bg-brand-orange/10 border border-brand-orange/20 px-2 py-1 rounded uppercase tracking-widest text-brand-orange">Alta Resistencia</span>
                      </div>
                    </div>
                    
                    <a href={`${WHATSAPP_URL}?text=Hola, me interesa cotizar la ${product.name}.`} className="w-full py-4 bg-white/5 hover:bg-brand-orange border border-white/10 hover:border-brand-orange rounded-xl flex items-center justify-center gap-2 font-black text-white transition-all uppercase tracking-widest text-[10px]">
                      Cotizar Modelo <ArrowUpRight weight="bold" size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
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
              { t: "Evento Corporativo Santiago", s: "Carpa Extendida", img: "/Fotos productos/Carpas Extendidas/Carpa Extendida Azul_nobg.png", span: "md:col-span-2" },
              { t: "Activación Verano Viña", s: "Domo R", img: "/Fotos productos/Carpas R/Carpa R Celeste_nobg.png", span: "" },
              { t: "Lanzamiento Automotriz", s: "Modelo L", img: "/Fotos productos/Carpas L/Carpa L Azul_nobg.png", span: "" },
              { t: "Stands de Marketing", s: "Domo PAN", img: "/Fotos productos/Carpas PAN/Carpas PAN Naranjo_nobg.png", span: "md:col-span-2" }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                {...fadeIn} 
                className={`${p.span} group relative aspect-video md:aspect-auto md:h-[400px] overflow-hidden rounded-3xl bg-neutral-900 border border-white/10`}
              >
                {/* Fondo sutil */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent z-0"></div>
                
                {/* Imagen del producto como proyecto */}
                <div className="absolute inset-0 flex items-center justify-center p-12 z-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
                  <img src={p.img} alt={p.t} className="w-full h-full object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
                </div>

                {/* Gradiente oscuro inferior para legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em] bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">{p.s}</span>
                  <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mt-4 drop-shadow-md">{p.t}</h4>
                </div>
                <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/30">
                    <ArrowUpRight weight="bold" className="text-white" />
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
                    <Tent weight="duotone" size={140} className="text-brand-orange/80" />
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
              Enviar a WhatsApp <WhatsappLogo weight="duotone" size={28} />
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
                  <Tent weight="duotone" className="text-white" size={22} />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase">FABRICA<span className="text-brand-orange">DE</span>CARPAS</span>
              </div>
              <p className="text-gray-600 text-sm max-w-sm mx-auto md:mx-0 leading-relaxed font-medium">
                Líderes en la fabricación de estructuras premium para eventos en Chile. Más de 25 años entregando soluciones industriales de alta resistencia para las mejores agencias del país.
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
                <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><InstagramLogo weight="duotone" size={18} /></a>
                <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><FacebookLogo weight="duotone" size={18} /></a>
                <a href={SOCIAL_LINKS.linkedin} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><LinkedinLogo weight="duotone" size={18} /></a>
                <a href={SOCIAL_LINKS.youtube} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400 hover:bg-brand-orange hover:text-white transition-all"><YoutubeLogo weight="duotone" size={18} /></a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="font-bold tracking-[0.3em] text-[9px] text-gray-700 uppercase">
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> FABRICA DE CARPAS CHILE | PREMIUM SOLUTIONS
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
