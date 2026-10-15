'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Plus, LayoutGrid, CheckCircle2, UserCheck } from 'lucide-react';

export default function MesasPage() {
  const [mesas, setMesas] = useState([
    { id: '1', nombre: 'Mesa 1 - Entrega Damas', responsable: 'Staff Maturín 01', activa: true },
    { id: '2', nombre: 'Mesa 2 - Entrega General', responsable: 'Staff Maturín 02', activa: true },
    { id: '3', nombre: 'Mesa 3 - Inscripciones en Sitio', responsable: 'Staff Entrada', activa: true },
  ]);

  const agregarMesa = () => {
    const nombre = prompt('Nombre o número de la nueva mesa de registro:');
    if (!nombre) return;
    setMesas([
      ...mesas,
      { id: Date.now().toString(), nombre, responsable: 'Sin asignar', activa: true },
    ]);
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
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Mesas de registro</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              5K Por Ellas Corremos — Define las mesas de entrega/registro y asigna sus responsables (staff). El escáner usa la mesa del staff logueado.
            </p>
          </div>
          <button
            onClick={agregarMesa}
            className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Plus size={16} />
            <span>Agregar mesa</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mesas.map((mesa) => (
            <div
              key={mesa.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-moofin-lightTeal text-moofin-darkTeal flex items-center justify-center font-bold">
                  <LayoutGrid size={16} />
                </span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Operativa
                </span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{mesa.nombre}</h3>
              <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
                <UserCheck size={13} />
                <span>{mesa.responsable}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
