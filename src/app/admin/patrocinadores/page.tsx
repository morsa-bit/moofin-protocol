'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Plus, Download, Search, Check, Upload, Trash2 } from 'lucide-react';

export default function PatrocinadoresAdminPage() {
  const [patrocinadores, setPatrocinadores] = useState([
    {
      id: '1',
      empresa: 'ALIMENTOS SERIMA C.A.',
      contacto: 'MARIA MARCANO',
      email: 'mercadeo@grupokvzla.com',
      telefono: '+58 414 2813524',
      rif: 'J-12345678-0',
      plan: 'BRONCE',
      estado: 'ACEPTADO',
    },
    {
      id: '2',
      empresa: 'DROCOSCA CA (VALMY)',
      contacto: 'MADELEI VARGAS',
      email: 'mvargas@valmy.com',
      telefono: '+58 414 0000000',
      rif: 'J-00045612-3',
      plan: 'ORO',
      estado: 'ACEPTADO',
    },
    {
      id: '3',
      empresa: 'EVERYNIGHT',
      contacto: 'MERCADEO',
      email: 'mercadeo@grupokvzla.com',
      telefono: '+58 414 1111111',
      rif: 'J-99887766-1',
      plan: 'PLATA',
      estado: 'ACEPTADO',
    },
    {
      id: '4',
      empresa: 'GRANJA AVÍCOLA CHICHI',
      contacto: 'KARIN FERRER',
      email: 'ferrerkarin@gmail.com',
      telefono: '+58 414 2223333',
      rif: 'J-44556677-8',
      plan: 'ORO',
      estado: 'ACEPTADO',
    },
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroPlan, setFiltroPlan] = useState('TODOS');

  const filtrados = patrocinadores.filter((p) => {
    const coincideTexto =
      p.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.contacto.toLowerCase().includes(busqueda.toLowerCase());
    const coincidePlan = filtroPlan === 'TODOS' || p.plan === filtroPlan;
    return coincideTexto && coincidePlan;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      <AdminNavbar />

      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-semibold text-moofin-darkTeal hover:underline mb-6 space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Volver al panel</span>
        </Link>

        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Patrocinadores</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              5K Por Ellas Corremos — Gestión comercial y marcas aliadas
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-sm">
            <Plus size={16} />
            <span>Agregar patrocinador</span>
          </button>
        </div>

        {/* Resumen Comercial */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Prospectos</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">34</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Aceptados</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">34</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Proyectado</p>
            <p className="text-2xl font-black text-moofin-darkTeal dark:text-moofin-teal mt-1">$27.300</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase">Con RIF Cargado</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">33</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar empresa, contacto o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
            />
          </div>
          <select
            value={filtroPlan}
            onChange={(e) => setFiltroPlan(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODOS">Todos los planes</option>
            <option value="ORO">Plan Oro</option>
            <option value="PLATA">Plan Plata</option>
            <option value="BRONCE">Plan Bronce</option>
          </select>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition shadow-sm">
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Tabla de Marcas */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-4">Empresa</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4">RIF</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtrados.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">
                    {item.empresa}
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{item.contacto}</p>
                    <p className="text-[11px] text-gray-400 font-mono">{item.email}</p>
                  </td>
                  <td className="py-4 px-4 font-mono text-gray-600 dark:text-gray-300">
                    {item.rif}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                        item.plan === 'ORO'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                          : item.plan === 'PLATA'
                          ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400'
                      }`}
                    >
                      {item.plan}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      {item.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2 font-semibold text-[11px]">
                    <button className="text-moofin-darkTeal hover:underline">
                      Subir Logo
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
