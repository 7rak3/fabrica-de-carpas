'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Key, ArrowRight, ShieldCheck, MessageCircle, AlertCircle } from 'lucide-react';
import { PROPOSALS } from '@/data/proposals';

export default function ProposalsPortalPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const clean = code.trim().toLowerCase();

    // Check if code matches any proposal slug, projectCode, accessPin, or alternativePins
    let foundSlug: string | null = null;
    let matchingPin: string | null = null;

    for (const [slug, prop] of Object.entries(PROPOSALS)) {
      const validCodes = [
        slug.toLowerCase(),
        prop.projectCode.toLowerCase(),
        prop.accessPin.toLowerCase(),
        ...(prop.alternativePins?.map((p) => p.toLowerCase()) || []),
      ];

      if (validCodes.includes(clean)) {
        foundSlug = slug;
        matchingPin = prop.accessPin;
        break;
      }
    }

    if (foundSlug && matchingPin) {
      router.push(`/propuestas/${foundSlug}?pin=${encodeURIComponent(matchingPin)}`);
    } else {
      setLoading(false);
      setError('Código o clave no reconocida. Por favor solicítala a tu ejecutivo comercial.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden selection:bg-brand-orange selection:text-white">
      {/* Glows ambientales */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-brand-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:border-brand-orange/30 transition-all"
          >
            <ShieldCheck size={14} className="text-brand-orange" />
            Portal Corporativo • Volver al Inicio
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0b0b0b] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-gold to-brand-orange" />

          {/* Logo Fábrica de Carpas */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/20">
              <Layers className="text-white" size={22} />
            </div>
            <div>
              <div className="text-base font-black tracking-tight leading-tight uppercase">
                FÁBRICA<span className="text-brand-orange">DE</span>CARPAS
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Chile • 25 Años</div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Portal de Clientes</h1>
            <p className="text-gray-400 text-xs leading-relaxed">
              Ingresa el código o clave de tu proyecto para acceder a tu propuesta técnica y comercial interactiva.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Clave o Código de Proyecto
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Key size={18} />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Ej: ciaahn2026..."
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-black/60 border border-white/15 focus:border-brand-orange rounded-xl text-sm font-semibold tracking-wider placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 transition-all text-white"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full py-4 bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-black text-xs uppercase tracking-widest text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-orange/20 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Consultar Propuesta</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <a
              href="https://wa.me/56959192685?text=Hola,%20me%20gustar%C3%ADa%20consultar%20por%20mi%20c%C3%B3digo%20de%20propuesta%20t%C3%A9cnica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-brand-orange transition-colors"
            >
              <MessageCircle size={14} />
              <span>Contactar a un ejecutivo por WhatsApp</span>
            </a>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-[11px] text-gray-600">
          Fábrica de Carpas Chile • Marca del Grupo Agencia Cohete .CL
        </div>
      </div>
    </div>
  );
}
