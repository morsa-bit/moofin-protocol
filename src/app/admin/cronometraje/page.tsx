'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';

export default function CronometrajePage() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [dorsalMeta, setDorsalMeta] = useState('');
  const [llegadas, setLlegadas] = useState<any[]>([]);

  useEffect(() => {
    let intervalo: any = null;
    if (activo) {
      intervalo = setInterval(() => {
        setSegundos((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const formatearTiempo = (totalSegundos: number) => {
    const hrs = Math.floor(totalSegundos / 3600);
    const mins = Math.floor((totalSegundos % 3600) / 60);
    const secs = totalSegundos % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const registrarLlegada = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dorsalMeta.trim()) return;

    const tiempoCapturado = formatearTiempo(segundos);
    setLlegadas([
      {
        posicion: llegadas.length + 1,
        dorsal: dorsalMeta,
        tiempo: tiempoCapturado,
        hora: new Date().toLocaleTimeString(),
      },
      ...llegadas,
    ]);

    setDorsalMeta('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      <AdminNavbar />

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-semibold text-moofin-darkTeal hover:underline mb-6 space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Volver al panel</span>
        </Link>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Cronometraje Oficial en Vivo
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Control de tiempos y meta en tiempo real</p>
          </div>
        </div>

        {/* Reloj Principal */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 text-center shadow-sm mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
            Tiempo de Carrera (Gun Time)
          </span>
          <div className="text-6xl sm:text-7xl font-mono font-black text-gray-900 dark:text-white my-4">
            {formatearTiempo(segundos)}
          </div>

          <div className="flex justify-center gap-3">
            {!activo ? (
              <button
                onClick={() => setActivo(true)}
                className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md"
              >
                <Play size={16} />
                <span>Dar Salida Oficial</span>
              </button>
            ) : (
              <button
                onClick={() => setActivo(false)}
                className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-md"
              >
                <Pause size={16} />
                <span>Pausar</span>
              </button>
            )}

            <button
              onClick={() => {
                setActivo(false);
                setSegundos(0);
              }}
              className="p-3 bg-slate-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-slate-200 transition"
              title="Reiniciar"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Captura de Cruce de Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200 mb-3 flex items-center space-x-1.5">
              <Flag size={14} className="text-moofin-darkTeal" />
              <span>Registrar Meta</span>
            </h3>

            <form onSubmit={registrarLlegada} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Número de Dorsal
                </label>
                <input
                  type="number"
                  placeholder="Ej. 104"
                  value={dorsalMeta}
                  onChange={(e) => setDorsalMeta(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-lg font-mono font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl transition shadow-sm"
              >
                Capturar Tiempo
              </button>
            </form>
          </div>

          {/* Registro de Cruces */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <span className="text-xs font-black uppercase text-gray-400">Últimas Llegadas</span>
              <span className="text-xs font-bold text-moofin-darkTeal">
                {llegadas.length} finalistas
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              {llegadas.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  Esperando el cruce de los primeros corredores...
                </div>
              ) : (
                llegadas.map((item) => (
                  <div key={item.posicion} className="p-3.5 px-5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-6 text-center font-bold text-gray-400">
                        #{item.posicion}
                      </span>
                      <span className="font-mono font-black text-gray-900 dark:text-white text-sm">
                        Dorsal {item.dorsal}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-moofin-darkTeal text-sm block">
                        {item.tiempo}
                      </span>
                      <span className="text-[10px] text-gray-400">{item.hora}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
