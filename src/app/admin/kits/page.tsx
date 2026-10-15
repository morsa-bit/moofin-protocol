'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, QrCode, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EscanearKitsPage() {
  const [dorsalOIdentificacion, setDorsalOIdentificacion] = useState('');
  const [corredorEncontrado, setCorredorEncontrado] = useState<any>(null);
  const [kitEntregado, setKitEntregado] = useState(false);

  const buscarCorredor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dorsalOIdentificacion.trim()) return;

    // Simulación de búsqueda atómica en Supabase
    setCorredorEncontrado({
      dorsal: 5,
      nombre: 'Dinora Chipia',
      cedula: 'V-10632395',
      modalidad: 'CARRERA',
      talla: 'M (DAMAS)',
      estatus: 'CONFIRMADA',
      yaRetirado: false,
    });
    setKitEntregado(false);
  };

  const confirmarEntregaKit = () => {
    setKitEntregado(true);
    alert(`Kit y dorsal #${corredorEncontrado.dorsal} entregados con éxito.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      <AdminNavbar />

      <div className="max-w-2xl mx-auto px-6 pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-semibold text-moofin-darkTeal hover:underline mb-6 space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Volver al panel</span>
        </Link>

        <div className="text-center mb-8">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-2">
            Mesa de Entrega Activa: Mesa 1
          </span>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Entrega de Kits (Escáner)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Escanea el código QR del ticket digital o busca por dorsal / cédula de identidad
          </p>
        </div>

        {/* Buscador / Entrada de Código */}
        <form onSubmit={buscarCorredor} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-6">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-2">
            Número de dorsal o Cédula
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ej. 5 o V-10632395"
              value={dorsalOIdentificacion}
              onChange={(e) => setDorsalOIdentificacion(e.target.value)}
              className="flex-1 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              required
            />
            <button
              type="submit"
              className="bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-6 py-3 rounded-xl transition shadow-sm"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Ficha de Confirmación de Entrega */}
        {corredorEncontrado && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-md">
            <div className="text-center pb-6 border-b border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-400 uppercase">Dorsal Confirmado</span>
              <p className="text-6xl font-black text-gray-900 dark:text-white font-mono mt-1">
                #{corredorEncontrado.dorsal}
              </p>
            </div>

            <div className="py-6 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Nombre:</span>
                <span className="font-bold text-gray-900 dark:text-white text-sm">
                  {corredorEncontrado.nombre}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Cédula:</span>
                <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                  {corredorEncontrado.cedula}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Modalidad:</span>
                <span className="font-bold text-moofin-darkTeal">
                  {corredorEncontrado.modalidad}
                </span>
              </div>
              <div className="flex justify-between bg-moofin-lightTeal p-3 rounded-xl border border-moofin-teal/30">
                <span className="text-moofin-darkTeal font-bold">Entregar Talla Franela:</span>
                <span className="font-black text-slate-900 text-sm">
                  {corredorEncontrado.talla}
                </span>
              </div>
            </div>

            {kitEntregado ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center text-xs font-bold flex items-center justify-center space-x-2">
                <CheckCircle2 size={16} />
                <span>Kit entregado correctamente a este corredor</span>
              </div>
            ) : (
              <button
                onClick={confirmarEntregaKit}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-4 rounded-xl transition shadow-md"
              >
                Confirmar Entrega de Franela y Dorsal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
