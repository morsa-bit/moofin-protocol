'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Plus, Download, Mail, Check, Trash2 } from 'lucide-react';

export default function CortesiasPage() {
  const [cortesias, setCortesias] = useState([
    { codigo: '2C8E27E6', emisor: 'Maxiimágenes, C.A.', estado: 'USADO', correo: '' },
    { codigo: '5E3FE4DB', emisor: 'MG Motor Maturín', estado: 'DISPONIBLE', correo: 'mercadeo@grupokvzla.com' },
    { codigo: '38FC1687', emisor: 'Maxus Motor Maturín', estado: 'DISPONIBLE', correo: 'mercadeo@grupokvzla.com' },
    { codigo: '055F2FA8', emisor: 'Medipatch', estado: 'DISPONIBLE', correo: 'mercadeo@grupokvzla.com' },
    { codigo: '224E7194', emisor: 'Gardi', estado: 'USADO', correo: '' },
    { codigo: '233C3569', emisor: 'INTYLACT', estado: 'USADO', correo: '' },
    { codigo: '3558C75F', emisor: 'DROCOSCA CA', estado: 'DISPONIBLE', correo: 'mvargas@valmy.com' },
    { codigo: '4478C452', emisor: 'Granja Avícola Chichi', estado: 'DISPONIBLE', correo: 'ferrerkarin@gmail.com' },
  ]);

  const [filtro, setFiltro] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('TODOS');

  const cortesiasFiltradas = cortesias.filter((item) => {
    const coincideTexto =
      item.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
      item.emisor.toLowerCase().includes(filtro.toLowerCase());
    const coincideEstado = estadoFiltro === 'TODOS' || item.estado === estadoFiltro;
    return coincideTexto && coincideEstado;
  });

  const generarCodigoNuevo = () => {
    const emisor = prompt('Nombre del emisor / empresa patrocinadora:');
    if (!emisor) return;

    const nuevoCodigo = Math.random().toString(36).substring(2, 10).toUpperCase();
    setCortesias([
      { codigo: nuevoCodigo, emisor, estado: 'DISPONIBLE', correo: '' },
      ...cortesias,
    ]);
  };

  const reenviarCorreo = (codigo: string, correo: string) => {
    alert(`Código ${codigo} reenviado a ${correo}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-xs font-semibold text-moofin-darkTeal hover:underline mb-6 space-x-1"
        >
          <ArrowLeft size={14} />
          <span>Volver al panel</span>
        </Link>

        {/* Cabecera y Resumen */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Cupos de cortesía</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              5K Por Ellas Corremos — Cada código otorga una inscripción sin pago. Total: 28 · Usados: 8 · Disponibles: 20
            </p>
          </div>
          <button
            onClick={generarCodigoNuevo}
            className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Plus size={16} />
            <span>Generar códigos</span>
          </button>
        </div>

        {/* Barra de Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar por código o emisor..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          />
          <select
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODOS">Todo estado</option>
            <option value="DISPONIBLE">Disponible</option>
            <option value="USADO">Usado</option>
          </select>
          <button className="flex items-center space-x-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition shadow-sm">
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Tabla de Cortesías */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-6">Código</th>
                <th className="py-3 px-6">Emisor</th>
                <th className="py-3 px-6">Estado</th>
                <th className="py-3 px-6">Enviar al correo</th>
                <th className="py-3 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {cortesiasFiltradas.map((item) => (
                <tr key={item.codigo} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                  <td className="py-4 px-6 font-mono font-black text-gray-900 dark:text-white">
                    {item.codigo}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">
                    {item.emisor}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.estado === 'DISPONIBLE'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      }`}
                    >
                      {item.estado === 'DISPONIBLE' ? 'Disponible' : 'Usado'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {item.correo ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 font-mono text-[11px]">{item.correo}</span>
                        <button
                          onClick={() => reenviarCorreo(item.codigo, item.correo)}
                          className="text-moofin-darkTeal hover:underline text-[11px] font-bold flex items-center space-x-1"
                        >
                          <Check size={12} />
                          <span>Reenviar</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-rose-500 hover:text-rose-600 font-semibold text-[11px] transition">
                      Borrar
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
