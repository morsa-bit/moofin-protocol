'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Check, Save } from 'lucide-react';

export default function PreciosPage() {
  const bcvRate = 877.9023; // Tasa referencial sincronizada

  const [modalidades, setModalidades] = useState([
    { id: '1', nombre: 'CAMINATA', precioUsd: 15, cupo: 520, activa: true },
    { id: '2', nombre: 'CARRERA', precioUsd: 20, cupo: 480, activa: true },
  ]);

  const handleChange = (id: string, field: 'precioUsd' | 'cupo' | 'activa', value: any) => {
    setModalidades(
      modalidades.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleGuardar = (nombre: string) => {
    alert(`Configuración guardada para modalidad: ${nombre}`);
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

        {/* Cabecera */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Modalidades y precios
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Precios en USD. El cupo es el tope de cada modalidad: cuando se llena, esa deja de aceptar inscripciones aunque el evento tenga lugar. Tasa BCV: {bcvRate.toFixed(4)} Bs/USD.
          </p>
        </div>

        {/* Tarjetas de cada Modalidad */}
        <div className="space-y-4">
          {modalidades.map((mod) => {
            const precioBs = (mod.precioUsd * bcvRate).toLocaleString('es-VE', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="w-40">
                  <span className="text-sm font-black tracking-wide text-gray-900 dark:text-white">
                    {mod.nombre}
                  </span>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Precio USD + Equivalente en Bs */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Precio (USD)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        value={mod.precioUsd}
                        onChange={(e) => handleChange(mod.id, 'precioUsd', Number(e.target.value))}
                        className="w-24 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-black text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                      />
                      <span className="text-xs text-gray-500 font-mono font-medium">
                        ≈ {precioBs} Bs
                      </span>
                    </div>
                  </div>

                  {/* Cupo Tope */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Cupo
                    </label>
                    <input
                      type="number"
                      value={mod.cupo}
                      onChange={(e) => handleChange(mod.id, 'cupo', Number(e.target.value))}
                      className="w-28 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    />
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mod.activa}
                      onChange={(e) => handleChange(mod.id, 'activa', e.target.checked)}
                      className="w-4 h-4 rounded text-moofin-darkTeal focus:ring-moofin-teal"
                    />
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Activa</span>
                  </label>

                  <button
                    onClick={() => handleGuardar(mod.nombre)}
                    className="bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-5 py-2.5 rounded-xl transition shadow-sm"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
