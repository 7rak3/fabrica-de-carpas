'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  FileText,
  Download,
  MessageCircle,
  CheckCircle2,
  Phone,
  ArrowRight,
  Share2,
  Eye,
  EyeOff,
  Layers,
  Maximize2,
  Sparkles,
  Clock,
  CreditCard,
  AlertCircle,
  Calendar,
  Building2,
  ZoomIn,
  X,
  Check
} from 'lucide-react';
import { Proposal } from '@/data/proposals';

interface ProposalViewerProps {
  proposal: Proposal;
}

function ProposalViewerInner({ proposal }: ProposalViewerProps) {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>(proposal.elevationViews[0]?.id || 'frontal');
  const [activeTerrain, setActiveTerrain] = useState<string>(proposal.terrainViews[0]?.id || 'panorama');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle?: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const storageKey = `fdc_proposal_auth_${proposal.slug}`;

  // Check URL pin param or sessionStorage
  useEffect(() => {
    const urlPin = searchParams?.get('pin');
    const storedAuth = typeof window !== 'undefined' ? sessionStorage.getItem(storageKey) : null;

    if (storedAuth === 'granted') {
      setIsAuthenticated(true);
      return;
    }

    if (urlPin) {
      const cleanUrlPin = urlPin.trim().toLowerCase();
      const validPins = [
        proposal.accessPin.toLowerCase(),
        ...(proposal.alternativePins?.map((p) => p.toLowerCase()) || [])
      ];

      if (validPins.includes(cleanUrlPin)) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(storageKey, 'granted');
        }
      }
    }
  }, [searchParams, proposal, storageKey]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    const cleanInput = pinInput.trim().toLowerCase();
    const validPins = [
      proposal.accessPin.toLowerCase(),
      ...(proposal.alternativePins?.map((p) => p.toLowerCase()) || [])
    ];

    setTimeout(() => {
      if (validPins.includes(cleanInput)) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(storageKey, 'granted');
        }
      } else {
        setAuthError('Clave de acceso incorrecta. Verifica con tu ejecutivo comercial.');
      }
      setIsVerifying(false);
    }, 400);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(storageKey);
    }
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/propuestas/${proposal.slug}?pin=${encodeURIComponent(proposal.accessPin)}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const whatsappApprovalMsg = encodeURIComponent(
    `Hola Fábrica de Carpas Chile! Revisamos en detalle la propuesta técnica interactiva ${proposal.projectCode} para ${proposal.clientName} (${proposal.product.name}). Nos gustaría aprobar la orden de trabajo y coordinar la fabricación. Quedamos atentos!`
  );

  const whatsappHelpMsg = encodeURIComponent(
    `Hola! Estoy intentando acceder a la propuesta técnica para ${proposal.clientName} en fabricadecarpas.cl y necesito la clave de acceso. ¿Me podrían asistir?`
  );

  // Pantalla de Bloqueo / Autenticación
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden selection:bg-brand-orange selection:text-white">
        {/* Glow de fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Badge superior */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
              <ShieldCheck size={14} className="text-brand-orange" />
              Portal Técnico Exclusivo
            </div>
          </div>

          {/* Tarjeta de Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

            {/* Logos de Cabecera */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div className="flex items-center">
                <Image
                  src="/images/logo-fabrica-de-carpas-blanco.webp"
                  alt="Fábrica de Carpas"
                  width={150}
                  height={26}
                  className="h-6 sm:h-7 w-auto object-contain"
                  priority
                />
              </div>

              <div className="h-6 w-px bg-white/10" />

              {/* Logo Cliente */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl">
                <Image
                  src={proposal.clientLogo}
                  alt={proposal.clientName}
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <span className="text-black font-black text-xs tracking-tight">{proposal.clientName}</span>
              </div>
            </div>

            {/* Título de la propuesta */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-3">
                <Lock size={22} />
              </div>
              <h1 className="text-xl font-black uppercase tracking-tight mb-2">Propuesta Técnica Privada</h1>
              <p className="text-gray-400 text-xs leading-relaxed">
                Documento confidencial de ingeniería preparado exclusivamente para{' '}
                <strong className="text-white">{proposal.clientName}</strong>.
              </p>
            </div>

            {/* Formulario de PIN */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Clave de Acceso del Proyecto
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <Key size={18} />
                  </div>
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Ingresa tu clave..."
                    autoFocus
                    required
                    className="w-full pl-10 pr-12 py-3.5 bg-black/60 border border-white/15 focus:border-brand-orange rounded-xl text-sm font-semibold tracking-wider placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{authError}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !pinInput.trim()}
                className="w-full py-4 bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-black text-xs uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/20 cursor-pointer"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Acceder a la Propuesta</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Ayuda / Contacto */}
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <a
                href={`https://wa.me/${proposal.executive.whatsapp}?text=${whatsappHelpMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-orange transition-colors"
              >
                <MessageCircle size={14} />
                <span>¿No tienes la clave? Solicítala a tu ejecutivo</span>
              </a>
            </div>
          </motion.div>

          {/* Footer sutil */}
          <div className="mt-8 text-center text-[11px] text-gray-600">
            Fábrica de Carpas Chile • Marca del Grupo Agencia Cohete
          </div>
        </div>
      </div>
    );
  }

  // Vista de la Propuesta Completa Autenticada
  const currentView = proposal.elevationViews.find((v) => v.id === activeTab) || proposal.elevationViews[0];
  const currentTerrainView = proposal.terrainViews.find((t) => t.id === activeTerrain) || proposal.terrainViews[0];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-brand-orange selection:text-white pb-24">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <div className="absolute top-6 right-6 z-10">
              <button
                onClick={() => setLightboxImage(null)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center">
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="text-lg font-black text-white uppercase tracking-wider">{lightboxImage.title}</h4>
                {lightboxImage.subtitle && (
                  <p className="text-sm text-gray-400 mt-1">{lightboxImage.subtitle}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action */}
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        href={`https://wa.me/${proposal.executive.whatsapp}?text=${whatsappApprovalMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all flex items-center gap-3 group"
      >
        <MessageCircle size={28} />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-black text-xs uppercase tracking-wider pr-1">
          Aprobar Propuesta
        </span>
      </motion.a>

      {/* Barra de Control y Estado Superior */}
      <nav className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Image
                src="/images/logo-fabrica-de-carpas-blanco.webp"
                alt="Fábrica de Carpas Chile"
                width={190}
                height={32}
                className="h-7 sm:h-8 w-auto object-contain"
                priority
              />
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            {/* Código y Estado */}
            <div className="hidden md:flex items-center gap-2.5">
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                {proposal.projectCode}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Propuesta Activa
              </span>
            </div>
          </div>

          {/* Acciones Rápidas Superior */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleCopyShareLink}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all"
              title="Copiar enlace directo con clave"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
              <span className="hidden sm:inline">{copiedLink ? 'Copiado' : 'Compartir'}</span>
            </button>

            <a
              href={proposal.pdfUrl}
              download="PROPUESTA-CIAHN-CARPA-7X5-H4.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all"
            >
              <Download size={14} className="text-brand-gold" />
              <span className="hidden sm:inline">Descargar PDF</span>
            </a>

            <a
              href={`https://wa.me/${proposal.executive.whatsapp}?text=${whatsappApprovalMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-brand-orange/20"
            >
              <MessageCircle size={14} />
              <span>Aprobar</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-xl transition-colors"
              title="Bloquear sesión"
            >
              <Lock size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header de la Propuesta */}
      <header className="relative pt-12 pb-16 px-4 sm:px-8 border-b border-white/5 overflow-hidden">
        {/* Glows ambientales */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-brand-orange/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[250px] bg-brand-gold/5 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          {/* Fila Cliente & Co-Branding */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Preparado para:</span>
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg">
                <Image
                  src={proposal.clientLogo}
                  alt={proposal.clientName}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-black font-black text-xs tracking-tight">{proposal.clientName}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-orange" />
                <span>Emitida: {proposal.date}</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock size={14} className="text-brand-gold" />
                <span>Válida hasta: {proposal.validUntil}</span>
              </div>
            </div>
          </div>

          {/* Título Principal */}
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <div className="inline-block px-3.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-black uppercase tracking-[0.2em] mb-4">
                {proposal.product.badge}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-4">
                {proposal.product.name.split(' ')[0]}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-brand-gold to-white">
                  {proposal.product.name.split(' ').slice(1, 4).join(' ')}
                </span>
                <br />
                <span className="text-white text-3xl sm:text-5xl font-light">
                  {proposal.product.name.split(' ').slice(4).join(' ')}
                </span>
              </h1>
              <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
                {proposal.clientSub}. Solución modular de alta ingeniería diseñada y calculada para soportar las
                condiciones climáticas del Desierto de Atacama con máxima protección solar y resistencia eólica.
              </p>
            </div>

            {/* Quick Stats Box */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <div className="text-[11px] font-black uppercase tracking-widest text-brand-orange mb-4 flex items-center justify-between">
                <span>Resumen de Ingeniería</span>
                <Building2 size={16} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-black text-white">{proposal.product.area.split(' ')[0]}</div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Superficie Total</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-brand-gold">{proposal.product.height.split(' ')[0]}</div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Altura Cumbrera</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">7.00 × 5.00 m</div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Dimensiones</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">UPF 50+</div>
                  <div className="text-[11px] text-gray-400 uppercase font-semibold">Protección Solar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Grid de 4 Pilares / Highlights */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proposal.product.highlights.map((h, i) => {
            const iconsMap: Record<string, React.ReactNode> = {
              Maximize2: <Maximize2 size={22} className="text-brand-orange" />,
              ShieldCheck: <ShieldCheck size={22} className="text-brand-gold" />,
              Layers: <Layers size={22} className="text-white" />,
              Sparkles: <Sparkles size={22} className="text-brand-orange" />
            };

            return (
              <div
                key={i}
                className="bg-[#0b0b0b] border border-white/10 hover:border-brand-orange/40 rounded-2xl p-6 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {iconsMap[h.icon] || <Sparkles size={22} className="text-brand-orange" />}
                </div>
                <h3 className="text-base font-black uppercase tracking-tight text-white mb-2">{h.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{h.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* VISOR INTERACTIVO DE PLANOS DE ELEVACIÓN */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange mb-2">
              <Layers size={14} />
              Planos & Vistas Técnicas 3D
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Elevaciones y Diagrama Mecánico
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-md">
            Visualiza cada ángulo de la estructura diseñada a medida para CIAHN Atacama. Haz clic en la imagen para
            ampliar en alta resolución.
          </p>
        </div>

        {/* Tabs de Selección de Vistas */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {proposal.elevationViews.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveTab(view.id)}
              className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === view.id
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 border border-brand-orange'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{view.title.split('(')[0]}</span>
              <span className="text-[10px] opacity-75 font-mono">({view.dimensions.split('×')[0].trim()})</span>
            </button>
          ))}
        </div>

        {/* Card Principal del Visor */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative aspect-[16/9] md:aspect-[21/10] bg-black/60 group cursor-zoom-in overflow-hidden">
            <Image
              src={currentView.image}
              alt={currentView.title}
              fill
              className="object-contain p-4 md:p-8 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              onClick={() =>
                setLightboxImage({
                  src: currentView.image,
                  title: currentView.title,
                  subtitle: currentView.description
                })
              }
            />

            {/* Overlay hint de zoom */}
            <div
              onClick={() =>
                setLightboxImage({
                  src: currentView.image,
                  title: currentView.title,
                  subtitle: currentView.description
                })
              }
              className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <ZoomIn size={14} className="text-brand-orange" />
              <span>Pantalla Completa</span>
            </div>
          </div>

          {/* Pie del visor con descripción técnica */}
          <div className="p-6 md:p-8 bg-[#0e0e0e] border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">
                {currentView.dimensions}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">{currentView.title}</h3>
              <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">{currentView.description}</p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <a
                href={proposal.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white transition-all flex items-center gap-2"
              >
                <FileText size={14} />
                <span>Ver en PDF</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VISTAS EN TERRENO: SIMULACIÓN DESIERTO DE ATACAMA */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-gold mb-2">
                <Sparkles size={14} />
                Renderizado Fotográfico en Terreno
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
                Simulación en Desierto de Atacama
              </h2>
            </div>
            <p className="text-xs text-gray-400 max-w-md">
              Montaje hiperrealista de la carpa negra 7x5m H4 en el relieve y luz solar de la Región de Atacama.
            </p>
          </div>

          {/* Selector de Vistas de Terreno */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {proposal.terrainViews.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTerrain(item.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeTerrain === item.id
                    ? 'bg-white/10 border-brand-gold/60 shadow-lg shadow-brand-gold/10'
                    : 'bg-black/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-2.5 bg-black">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="300px" />
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-white line-clamp-1">{item.title}</div>
                <div className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{item.caption}</div>
              </button>
            ))}
          </div>

          {/* Gran Display del Terreno Seleccionado */}
          <div
            onClick={() =>
              setLightboxImage({
                src: currentTerrainView.image,
                title: currentTerrainView.title,
                subtitle: currentTerrainView.caption
              })
            }
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-black cursor-zoom-in group border border-white/15 shadow-2xl"
          >
            <Image
              src={currentTerrainView.image}
              alt={currentTerrainView.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-1">
                  Integración Geográfica
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">{currentTerrainView.title}</h3>
                <p className="text-sm text-gray-300 max-w-2xl mt-1">{currentTerrainView.caption}</p>
              </div>
              <div className="shrink-0 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 border border-white/20">
                <ZoomIn size={14} className="text-brand-gold" />
                <span>Ver Pantalla Completa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FICHA TÉCNICA DE INGENIERÍA & ESPECIFICACIONES */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-orange mb-2">
              <ShieldCheck size={14} />
              Especificaciones de Ingeniería
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Ficha Técnica Oficial del Proyecto
            </h2>
          </div>
          <p className="text-xs text-gray-400 max-w-md">
            Componentes industriales bajo normativa chilena e internacional para faena de terreno de alta durabilidad.
          </p>
        </div>

        {/* Grid de Especificaciones */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {proposal.techSpecs.map((group, idx) => (
            <div key={idx} className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-orange mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span>{group.category}</span>
                <span className="text-[10px] font-mono text-gray-500">0{idx + 1}</span>
              </h3>
              <div className="space-y-3">
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 text-xs">
                    <span className="text-gray-400 font-medium shrink-0 sm:w-2/5">{item.label}</span>
                    <span className="text-white font-semibold sm:w-3/5 sm:text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sellos de Calidad y Normativas */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-2xl p-6">
          <div className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 text-center">
            Certificaciones y Normativas de Fabricación
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {proposal.certifications.map((cert, cIdx) => (
              <div key={cIdx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="inline-block px-3 py-1 rounded-md bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-black text-xs uppercase mb-2">
                  {cert.badge}
                </div>
                <div className="text-sm font-black uppercase text-white mb-1">{cert.name}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPUESTA COMERCIAL & DESGLOSE DE VALORES */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-gold mb-2">
              <CreditCard size={14} />
              Presupuesto & Términos Comerciales
            </div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              Desglose de Valores y Cotización
            </h2>
          </div>
          <div className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Moneda: {proposal.pricing.currency} (Pesos Chilenos)
          </div>
        </div>

        {/* Tabla de Ítems */}
        <div className="bg-[#0b0b0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="py-4 px-6">Ítem / Componente</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Detalle de Fabricación</th>
                  <th className="py-4 px-4 text-center">Cant.</th>
                  <th className="py-4 px-6 text-right">Valor Unitario</th>
                  <th className="py-4 px-6 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {proposal.pricing.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-5 px-6">
                      <div className="font-black text-white uppercase text-sm mb-1">{item.name}</div>
                      <div className="text-gray-400 text-xs sm:hidden">{item.description}</div>
                    </td>
                    <td className="py-5 px-6 hidden sm:table-cell text-gray-400 max-w-md leading-relaxed">
                      {item.description}
                    </td>
                    <td className="py-5 px-4 text-center font-bold text-white">{item.qty}</td>
                    <td className="py-5 px-6 text-right font-mono text-gray-300">
                      {item.unitPrice === 0 ? 'Incluido' : formatCLP(item.unitPrice)}
                    </td>
                    <td className="py-5 px-6 text-right font-mono font-bold text-white">
                      {item.totalPrice === 0 ? 'Incluido' : formatCLP(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cuadro Resumen Financiero */}
          <div className="p-6 md:p-8 bg-[#0e0e0e] border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
            {/* Condiciones Comerciales */}
            <div className="space-y-2 text-xs text-gray-400 max-w-xl">
              <div className="flex items-start gap-2">
                <Clock size={15} className="text-brand-orange shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-semibold">Plazo de entrega:</strong> {proposal.pricing.deliveryText}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard size={15} className="text-brand-gold shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-semibold">Forma de pago:</strong> {proposal.pricing.paymentTerms}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white font-semibold">Garantía:</strong> 12 meses sobre estructura metálica y
                  sellado textil contra defectos de fabricación.
                </span>
              </div>
            </div>

            {/* Totales */}
            <div className="w-full md:w-80 bg-black/60 border border-white/10 rounded-2xl p-5 space-y-3 shrink-0">
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Subtotal Neto:</span>
                <span className="font-mono font-bold text-white">{formatCLP(proposal.pricing.subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>IVA (19%):</span>
                <span className="font-mono font-bold text-white">{formatCLP(proposal.pricing.ivaAmount)}</span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex justify-between items-center text-base font-black">
                <span className="text-brand-orange uppercase">Total Bruto:</span>
                <span className="font-mono text-xl text-white">{formatCLP(proposal.pricing.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA DE CIERRE Y APROBACIÓN */}
      <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-black border border-brand-orange/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-[10px] font-black uppercase tracking-widest mb-4">
              <CheckCircle2 size={14} />
              Lista para Aprobación Inmediata
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4 text-white">
              ¿Listos para Iniciar la Fabricación de su Estructura?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              Al confirmar esta propuesta, nuestro equipo de taller iniciará el corte de perfiles 1045, el maquinado de
              conectores y el estampado UV con los logos de CIAHN Atacama para cumplir con los plazos comprometidos.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/${proposal.executive.whatsapp}?text=${whatsappApprovalMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-gradient-to-r from-brand-orange to-[#ff6b2b] hover:from-brand-orange/90 hover:to-[#ff6b2b]/90 text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-brand-orange/25 transition-all"
              >
                <MessageCircle size={20} />
                <span>Aprobar Propuesta vía WhatsApp</span>
              </a>

              <a
                href={proposal.pdfUrl}
                download="PROPUESTA-CIAHN-CARPA-7X5-H4.pdf"
                className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
              >
                <Download size={20} className="text-brand-gold" />
                <span>Descargar Documento PDF</span>
              </a>

              <a
                href={`tel:${proposal.executive.phone}`}
                className="px-6 py-5 bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <Phone size={18} />
                <span>Llamar</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Técnico */}
      <footer className="mt-16 pt-12 border-t border-white/10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-fabrica-de-carpas-blanco.webp"
              alt="Fábrica de Carpas Chile"
              width={160}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </div>

          <div className="text-center sm:text-right">
            <div>Propuesta confidencial Nº {proposal.projectCode}</div>
            <div className="text-[10px] text-gray-600">25 Años de Excelencia Industrial en Chile</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ProposalViewer({ proposal }: ProposalViewerProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProposalViewerInner proposal={proposal} />
    </Suspense>
  );
}
