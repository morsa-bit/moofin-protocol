'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Upload, Mail, Download, Trophy, Search } from 'lucide-react';

export default function ResultadosAdminPage() {
  const [enviando, setEnviando] = useState(false);

  const enviarResultadosFinishers = () => {
    setEnviando(true);
    setTimeout(() => {
      alert('Certificados y tiempos oficiales enviados por correo a todos los finishers.');
      setEnviando(false);
    }, 1200);
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

        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Resultados · 5K Por Ellas Corremos
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Captura en vivo desde Cronometraje (staff), o importa un CSV de una empresa de timing. Los tiempos se publican en la página pública de resultados.
          </p>
        </div>

        {/* Tarjeta 1: Importar CSV */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200 mb-1">
            Importar resultados (CSV)
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Acepta un export de la empresa de timing (usa Bib + Chip/Clock Time) o un archivo mínimo dorsal, tiempo. Las columnas extra se ignoran.
          </p>
          <div className="flex items-center space-x-3">
            <label className="cursor-pointer bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3.5 py-2 rounded-xl font-semibold hover:bg-slate-200 transition">
              <span>Elegir archivo</span>
              <input type="file" accept=".csv" className="hidden" />
            </label>
            <button className="bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-4 py-2 rounded-xl transition shadow-sm">
              Importar
            </button>
          </div>
        </div>

        {/* Tarjeta 2: Enviar por correo */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
          <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200 mb-1">
            Enviar resultados por correo
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Le manda a cada finisher su tiempo oficial y su posición, con enlace a la clasificación. Solo a quienes aún no lo recibieron: puedes reejecutarlo tras capturar más cruces.
          </p>
          <button
            onClick={enviarResultadosFinishers}
            disabled={enviando}
            className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            <Mail size={14} />
            <span>{enviando ? 'Enviando...' : 'Enviar resultados a los finishers'}</span>
          </button>
        </div>

        {/* Sección de Clasificación */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200">
              Clasificación Oficial
            </h3>
            <div className="flex gap-2">
              <button className="flex items-center space-x-1.5 bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-1.5 rounded-lg hover:bg-slate-200 transition">
                <Download size={13} />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            Aún no hay tiempos capturados ni resultados importados para esta edición.
          </div>
        </div>
      </div>
    </div>
  );
}
