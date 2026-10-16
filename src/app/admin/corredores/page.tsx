'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import TicketModal from '@/components/admin/TicketModal';
import { createClient } from '@/lib/supabase/client';
import {
  ArrowLeft,
  Mail,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Ticket,
  ChevronRight,
} from 'lucide-react';

export default function CorredoresPage() {
  const supabase = createClient();
  const [selectedRunner, setSelectedRunner] = useState<any>(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroModalidad, setFiltroModalidad] = useState('TODAS');
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [filtroEstatus, setFiltroEstatus] = useState('TODOS');

  // Datos representativos conectados con la estructura de Supabase
  const [corredores, setCorredores] = useState([
    {
      id: '1',
      bib: 1,
      name: 'Valdemarys B. Marcano B.',
      nationalId: 'V-14365076',
      modality: 'CAMINATA',
      shirtSize: 'L',
      shirtCut: 'DAMAS',
      category: '—',
      team: '—',
      status: 'CONFIRMADA',
      type: 'comercial',
      qrToken: 'moofin-token-bib-001',
    },
    {
      id: '2',
      bib: 2,
      name: 'Miriam Gamboa',
      nationalId: 'V-18651200',
      modality: 'CAMINATA',
      shirtSize: 'XL',
      shirtCut: 'DAMAS',
      category: '—',
      team: '—',
      status: 'CONFIRMADA',
      type: 'comercial',
      qrToken: 'moofin-token-bib-002',
    },
    {
      id: '3',
      bib: 5,
      name: 'Dinora Chipia',
      nationalId: 'V-10632395',
      modality: 'CARRERA',
      shirtSize: 'M',
      shirtCut: 'DAMAS',
      category: 'Máster A',
      team: '—',
      status: 'CONFIRMADA',
      type: 'comercial',
      qrToken: 'moofin-token-bib-005',
    },
    {
      id: '4',
      bib: 9,
      name: 'Daneska',
      nationalId: 'V-31303531',
      modality: 'CARRERA',
      shirtSize: 'L',
      shirtCut: 'DAMAS',
      category: 'Libre',
      team: 'YM SPORT TEAM',
      status: 'CONFIRMADA',
      type: 'comercial',
      qrToken: 'moofin-token-bib-009',
    },
  ]);

  useEffect(() => {
    const cargarCorredores = async () => {
      try {
        const { data, error } = await supabase
          .from('runners')
          .select('*, modalities(name), teams(name)')
          .order('bib_number', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapeados = data.map((r: any) => ({
            id: r.id,
            bib: r.bib_number,
            name: `${r.first_name || ''} ${r.last_name || ''}`.trim(),
            nationalId: r.national_id,
            modality: r.modalities?.name || 'CARRERA',
            shirtSize: r.shirt_size,
            shirtCut: r.shirt_cut || 'DAMAS',
            category: r.category_name || '—',
            team: r.teams?.name || '—',
            status: r.status === 'CONFIRMED' ? 'CONFIRMADA' : r.status,
            type: (r.registration_type || 'comercial').toLowerCase(),
            qrToken: r.qr_token || `moofin-token-bib-${r.bib_number || r.id}`,
          }));
          setCorredores(mapeados);
        }
      } catch (err) {
        console.error('Error cargando corredores desde Supabase:', err);
      }
    };

    cargarCorredores();
  }, []);

  const corredoresFiltrados = corredores.filter((c) => {
    const coincideTexto =
      c.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.nationalId.toLowerCase().includes(busqueda.toLowerCase()) ||
      (c.bib && c.bib.toString().includes(busqueda));
    const coincideMod = filtroModalidad === 'TODAS' || c.modality === filtroModalidad;
    const coincideTipo = filtroTipo === 'TODOS' || c.type.toUpperCase() === filtroTipo;
    const coincideStatus = filtroEstatus === 'TODOS' || c.status === filtroEstatus;

    return coincideTexto && coincideMod && coincideTipo && coincideStatus;
  });

  const enviarRecordatorio = () => {
    alert('Recordatorio pre-carrera enviado por correo a los corredores pendientes por retiro de kit.');
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

        {/* Resumen Superior */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Corredores</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Total: <span className="font-bold text-gray-800 dark:text-gray-200">991</span> · Carrera:{' '}
              <span className="font-bold text-moofin-darkTeal">471</span> · Caminata:{' '}
              <span className="font-bold text-rose-600">520</span> · Cortesías:{' '}
              <span className="font-bold text-gray-800 dark:text-gray-200">8</span>
            </p>
          </div>
        </div>

        {/* Banner de Recordatorio Pre-Carrera */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gray-900 dark:text-white block">
              Recordatorio pre-carrera
            </span>
            <p className="text-xs text-gray-500 mt-0.5">
              Envía a los inscritos la fecha, el retiro de kit y qué llevar. Solo a quienes aún no lo recibieron: puedes reejecutarlo (no reenvía a los que ya tienen su kit).
            </p>
          </div>
          <button
            onClick={enviarRecordatorio}
            className="flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm shrink-0"
          >
            <Mail size={14} />
            <span>Enviar recordatorio a los inscritos</span>
          </button>
        </div>

        {/* Filtros de Tabla */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div className="relative lg:col-span-2">
            <Search size={14} className="absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar nombre, cédula o dorsal..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
            />
          </div>

          <select
            value={filtroModalidad}
            onChange={(e) => setFiltroModalidad(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODAS">Toda modalidad</option>
            <option value="CARRERA">Carrera</option>
            <option value="CAMINATA">Caminata</option>
          </select>

          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal shadow-sm"
          >
            <option value="TODOS">Todo tipo</option>
            <option value="COMERCIAL">Comercial</option>
            <option value="CORTESIA">Cortesía</option>
          </select>

          <button className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-100 transition shadow-sm">
            <Download size={14} />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Tabla de Corredores */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
              <tr>
                <th className="py-3 px-4">Dorsal</th>
                <th className="py-3 px-4">Nombre</th>
                <th className="py-3 px-4">Cédula</th>
                <th className="py-3 px-4">Modalidad</th>
                <th className="py-3 px-4">Talla</th>
                <th className="py-3 px-4">Equipo</th>
                <th className="py-3 px-4">Estatus</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {corredoresFiltrados.map((corredor) => (
                <tr key={corredor.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                  <td className="py-3.5 px-4 font-mono font-black text-sm text-gray-900 dark:text-white">
                    #{corredor.bib}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">
                    {corredor.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-600 dark:text-gray-400">
                    {corredor.nationalId}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        corredor.modality === 'CARRERA'
                          ? 'bg-moofin-lightTeal text-moofin-darkTeal dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                      }`}
                    >
                      {corredor.modality}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-gray-800 dark:text-gray-200">
                    {corredor.shirtSize}
                  </td>
                  <td className="py-3.5 px-4 text-gray-500 font-medium">
                    {corredor.team}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase">
                      {corredor.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2 font-semibold text-[11px]">
                    <button
                      onClick={() => setSelectedRunner(corredor)}
                      className="text-moofin-darkTeal hover:underline inline-flex items-center space-x-0.5"
                    >
                      <Ticket size={12} />
                      <span>Ticket</span>
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Ticket y QR */}
        {selectedRunner && (
          <TicketModal runner={selectedRunner} onClose={() => setSelectedRunner(null)} />
        )}
      </div>
    </div>
  );
}
