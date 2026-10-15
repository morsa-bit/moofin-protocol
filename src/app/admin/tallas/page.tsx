'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

export default function TallasPage() {
  const [activeTab, setActiveTab] = useState<'DAMAS' | 'HOMBRES'>('DAMAS');

  // Datos de demostración basados en tu captura
  const tallasDamas = [
    { size: 'XS', remaining: 50, used: 50, total: 100 },
    { size: 'S', remaining: 72, used: 214, total: 286 },
    { size: 'M', remaining: 137, used: 343, total: 480 },
    { size: 'L', remaining: 84, used: 208, total: 292 },
    { size: 'XL', remaining: 43, used: 57, total: 100 },
  ];

  const tallasHombres = [
    { size: 'XS', remaining: 99, used: 1, total: 100 },
    { size: 'S', remaining: 81, used: 19, total: 100 },
    { size: 'M', remaining: 110, used: 40, total: 150 },
    { size: 'L', remaining: 92, used: 38, total: 130 },
    { size: 'XL', remaining: 79, used: 21, total: 100 },
  ];

  const currentList = activeTab === 'DAMAS' ? tallasDamas : tallasHombres;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      <AdminNavbar />

      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-semibold text-moofin-darkTeal hover:underline mb-6 space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Volver al panel</span>
        </Link>

        {/* Cabecera */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Tallas e inventario
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              5K Por Ellas Corremos — 7ma Edición
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm">
            <Plus size={16} />
            <span>Agregar talla</span>
          </button>
        </div>

        {/* Selector Damas / Hombres */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('DAMAS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'DAMAS'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Damas
          </button>
          <button
            onClick={() => setActiveTab('HOMBRES')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'HOMBRES'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800'
            }`}
          >
            Hombres
          </button>
        </div>

        {/* Tabla de Stock */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm mb-8">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-6">Talla</th>
                <th className="py-3 px-6">Disponibilidad & Progreso</th>
                <th className="py-3 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {currentList.map((item) => {
                const percent = (item.used / item.total) * 100;
                return (
                  <tr key={item.size} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="py-4 px-6 font-black text-sm text-gray-900 dark:text-white">
                      {item.size}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-gray-800 dark:text-gray-200">
                          {item.remaining} quedan
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {item.used} de {item.total} usadas
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-moofin-teal h-full rounded-full"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition font-semibold">
                        Editar
                      </button>
                      <button className="text-rose-500 hover:text-rose-600 transition font-semibold">
                        Borrar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Guía de Tallas e Infografía */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">
            Tabla de medidas
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Infografía que visualiza el corredor al pulsar «Ver tabla de tallas» durante su inscripción.
          </p>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <ImageIcon size={36} className="text-gray-400 mb-2" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Subir imagen de la tabla de medidas
            </p>
            <button className="bg-black dark:bg-white text-white dark:text-black font-bold text-xs px-4 py-2 rounded-lg hover:opacity-90 transition">
              Cambiar imagen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
