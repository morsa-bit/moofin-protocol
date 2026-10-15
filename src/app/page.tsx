'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, Download, Shirt, ShieldCheck, Heart } from 'lucide-react';

export default function LandingPage() {
  const [faqAbierto, setFaqAbierto] = useState<number | null>(null);

  const faqs = [
    {
      q: '¿Cuándo y dónde es la carrera?',
      a: 'Sábado 17 de octubre de 2026. La salida y meta oficial será en las instalaciones del Centro Comercial Servimás en Maturín.',
    },
    {
      q: '¿Cuándo abren las inscripciones?',
      a: 'Las inscripciones abren el 17 de septiembre a las 12:00 a.m. y cierran al agotar los 1.000 cupos disponibles o el 9 de septiembre.',
    },
    {
      q: '¿Cómo me inscribo y cómo pago?',
      a: 'Completando el formulario en línea con tus datos y seleccionando tu método de pago preferido (Pago Móvil en Bs a tasa oficial BCV o divisas).',
    },
    {
      q: '¿Puedo inscribir a mi equipo completo?',
      a: 'Sí, el capitán puede crear el equipo y reservar un bloque de dorsales con un tiempo de gracia de 48 horas para confirmar a los corredores.',
    },
    {
      q: '¿Cuándo retiro mi kit?',
      a: 'Viernes 16 de octubre en el centro de entrega presentando tu ticket digital con código QR o tu cédula laminada.',
    },
    {
      q: '¿Qué incluye tu kit?',
      a: 'Franela técnica oficial conmemorativa, número de dorsal con chip de cronometraje, regalos de las marcas patrocinadoras e hidratación.',
    },
    {
      q: '¿Puedo caminar?',
      a: '¡Por supuesto! El evento cuenta con modalidad Caminata 5K participativa para toda la familia.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Barra de Navegación Pública */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-moofin-teal flex items-center justify-center font-black text-black">
              ∞
            </div>
            <span className="font-black text-lg tracking-tight">MOOFIN</span>
          </div>

          <nav className="flex items-center space-x-6 text-xs font-bold">
            <Link href="/patrocinadores" className="text-slate-600 hover:text-black transition">
              Patrocinadores
            </Link>
            <Link href="/admin" className="text-slate-600 hover:text-black transition">
              Mi Perfil
            </Link>
            <button className="bg-moofin-teal hover:bg-moofin-darkTeal text-black px-4 py-2 rounded-xl transition shadow-sm font-extrabold">
              Inscribirme
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Principal */}
      <section className="pt-16 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center space-x-1.5 bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full mb-6">
            <Heart size={13} className="fill-rose-600" />
            <span>17 de Octubre de 2026 · Mes Rosa</span>
          </span>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            POR ELLAS <span className="text-rose-500">CORREMOS</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8 font-medium">
            7.ª Edición · Carrera-caminata nocturna de 5K por la prevención del cáncer de mama en Maturín.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#ruta"
              className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition shadow-md"
            >
              Ver Ruta Oficial
            </a>
            <a
              href="#kit"
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-3.5 rounded-xl transition"
            >
              Conocer la Franela
            </a>
          </div>
        </div>
      </section>

      {/* Sección La Ruta */}
      <section id="ruta" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">La Ruta</h2>
            <p className="text-xs text-slate-500">Recorrido oficial 5K homologado por las principales avenidas</p>
          </div>
          <button className="inline-flex items-center space-x-2 text-xs font-bold text-moofin-darkTeal hover:underline mt-2 sm:mt-0">
            <Download size={14} />
            <span>Descargar Ruta GPX (Garmin/Strava)</span>
          </button>
        </div>

        {/* Contenedor del Mapa */}
        <div className="w-full h-80 sm:h-96 bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-sm flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin size={32} className="text-rose-500 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-slate-700">Trazado interactivo OpenStreetMap / Leaflet</p>
            <p className="text-[11px] text-slate-400 mt-1">Salida: CC Servimás — Llegada: CC Servimás</p>
          </div>
        </div>
      </section>

      {/* Sección La Franela Oficial */}
      <section id="kit" className="py-16 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
            La Franela Oficial
          </h2>
          <p className="text-xs text-slate-500 mb-8">
            Diseñada en tela microperforada de alta transpirabilidad y secado rápido.
          </p>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm inline-block">
            <div className="w-64 h-64 mx-auto flex items-center justify-center text-slate-400">
              <Shirt size={96} className="text-rose-400 stroke-[1.2]" />
            </div>
            <p className="text-xs font-bold text-slate-800 mt-4">Edición Conmemorativa 2026</p>
            <span className="text-[11px] text-slate-400">Corte Damas y Caballeros disponible</span>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-8">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setFaqAbierto(faqAbierto === index ? null : index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between text-xs font-bold text-slate-800"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform ${
                    faqAbierto === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {faqAbierto === index && (
                <div className="px-5 pb-4 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
