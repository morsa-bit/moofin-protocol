'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import {
  ArrowLeft,
  DollarSign,
  Download,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function CobranzaPage() {
  const [tabActiva, setTabActiva] = useState<'cobros' | 'conciliacion' | 'movimientos'>('cobros');
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstatus, setFiltroEstatus] = useState('TODOS');
  const [filtroMedio, setFiltroMedio] = useState('TODOS');

  // Datos financieros basados en la plataforma operativa
  const [pagos, setPagos] = useState([
    {
      id: '1',
      fecha: '14/10/26, 14:54',
      dorsal: 984,
      corredor: 'Mabel Rojas',
      cedula: 'V-34621346',
      referencia: '10928374',
      medio: 'PAGO_MOVIL',
      banco: '0102 - BDV',
      montoUsd: 15.0,
      montoBs: 13168.53,
      estatus: 'CONFIRMADO',
      esRepetida: false,
    },
    {
      id: '2',
      fecha: '14/10/26, 12:33',
      dorsal: 983,
      corredor: 'Kalis Alvarez',
      cedula: 'V-21339380',
      referencia: 'CORTESÍA',
      medio: 'PREPAGO_EQUIPO',
      banco: '—',
      montoUsd: 0.0,
      montoBs: 0.0,
      estatus: 'CONFIRMADO',
      esRepetida: true,
    },
    {
      id: '3',
      fecha: '14/10/26, 11:25',
      dorsal: 982,
      corredor: 'Rosa M. Gil',
      cedula: 'V-5563153',
      referencia: '99283120',
      medio: 'PAGO_MOVIL',
      banco: '0134 - Banesco',
      montoUsd: 20.0,
      montoBs: 17558.05,
      estatus: 'PENDIENTE',
      esRepetida: false,
    },
    {
      id: '4',
      fecha: '14/10/26, 10:41',
      dorsal: 981,
      corredor: 'Betsabé García',
      cedula: 'V-22974336',
      referencia: '48291039',
      medio: 'TRANSFERENCIA',
      banco: '0105 - Mercantil',
      montoUsd: 15.0,
      montoBs: 13168.53,
      estatus: 'CONFIRMADO',
      esRepetida: false,
    },
  ]);

  const pagosFiltrados = pagos.filter((p) => {
    const coincideTexto =
      p.corredor.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.cedula.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.referencia.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.dorsal && p.dorsal.toString().includes(busqueda));
    const coincideStatus = filtroEstatus === 'TODOS' || p.estatus === filtroEstatus;
    const coincideMedio = filtroMedio === 'TODOS' || p.medio === filtroMedio;
    return coincideTexto && coincideStatus && coincideMedio;
  });

  const conciliarManual = (id: string) => {
    setPagos(
      pagos.map((p) => (p.id === id ? { ...p, estatus: 'CONFIRMADO' } : p))
    );
    alert('Pago conciliado manualmente. Se ha notificado al corredor.');
  };

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

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Cobranza</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            5K Por Ellas Corremos — Control de pagos, validación bancaria y conciliación por inscripción.
          </p>
        </div>

        {/* Pestañas de Navegación Operativa */}
        <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-800 pb-3 mb-6">
          <button
            onClick={() => setTabActiva('cobros')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
              tabActiva === 'cobros'
                ? 'bg-moofin-teal text-black shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Cobros
          </button>
          <button
            onClick={() => setTabActiva('conciliacion')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
              tabActiva === 'conciliacion'
                ? 'bg-moofin-teal text-black shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Conciliación manual
          </button>
          <button
            onClick={() => setTabActiva('movimientos')}
            className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
              tabActiva === 'movimientos'
                ? 'bg-moofin-teal text-black shadow-sm'
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Movimientos
          </button>
        </div>

        {/* Indicadores Financieros */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Cobrado (BS)
            </span>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-mono mt-1">
              12.683.009,82
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Cobrado (USD)
            </span>
            <p className="text-2xl font-black text-moofin-darkTeal dark:text-moofin-teal font-mono mt-1">
              $14.695,00
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Operaciones
            </span>
            <p className="text-2xl font-black text-gray-900 dark:text-white font-mono mt-1">
              996
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              Sin Cobrar
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-rose-600 font-mono">7</span>
              <span className="text-[10px] text-gray-400">pendientes o rechazados</span>
            </div>
          </div>
        </div>

        {/* Filtros de Cobranza */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div className="relative lg:col-span-2">
            <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar corredor, cédula, referencia o dorsal..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
            />
          </div>

          <select
            value={filtroEstatus}
            onChange={(e) => setFiltroEstatus(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODOS">Todo estatus</option>
            <option value="CONFIRMADO">Confirmados</option>
            <option value="PENDIENTE">Pendientes</option>
          </select>

          <select
            value={filtroMedio}
            onChange={(e) => setFiltroMedio(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODOS">Todo medio</option>
            <option value="PAGO_MOVIL">Pago Móvil</option>
            <option value="TRANSFERENCIA">Transferencia</option>
            <option value="PREPAGO_EQUIPO">Prepago de equipo</option>
          </select>

          <button className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition shadow-sm">
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Tabla de Movimientos y Pagos */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Dorsal</th>
                <th className="py-3 px-4">Corredor</th>
                <th className="py-3 px-4">Referencia</th>
                <th className="py-3 px-4">Medio</th>
                <th className="py-3 px-4">USD</th>
                <th className="py-3 px-4">BS</th>
                <th className="py-3 px-4">Estatus</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {pagosFiltrados.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                  <td className="py-3.5 px-4 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                    {item.fecha}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-black text-gray-900 dark:text-white">
                    #{item.dorsal}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900 dark:text-white">{item.corredor}</p>
                    <p className="font-mono text-[10px] text-gray-400">{item.cedula}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-mono font-bold text-gray-800 dark:text-gray-200">
                        {item.referencia}
                      </span>
                      {item.esRepetida && (
                        <span className="bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 text-[9px] font-bold px-1.5 py-0.2 rounded font-mono">
                          REPETIDA
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-600 dark:text-gray-300 font-medium">
                    {item.medio}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-gray-900 dark:text-white">
                    {item.montoUsd > 0 ? `$${item.montoUsd.toFixed(2)}` : '—'}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600 dark:text-gray-400 text-[11px]">
                    {item.montoBs > 0 ? `${item.montoBs.toLocaleString('es-VE')} Bs` : '—'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.estatus === 'CONFIRMADO'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                      }`}
                    >
                      {item.estatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {item.estatus === 'PENDIENTE' ? (
                      <button
                        onClick={() => conciliarManual(item.id)}
                        className="bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-[10px] px-2.5 py-1.5 rounded-lg transition"
                      >
                        Aprobar
                      </button>
                    ) : (
                      <span className="text-gray-400 text-[11px] font-medium">—</span>
                    )}
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
