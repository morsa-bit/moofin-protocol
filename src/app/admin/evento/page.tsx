'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, RefreshCw, Upload, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function EditarEventoPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [bcvRate, setBcvRate] = useState<number>(877.9023);
  const [fetchingBcv, setFetchingBcv] = useState(false);

  const [formData, setFormData] = useState({
    name: '5K Por Ellas Corremos — 7ma Edición',
    event_date: '2026-10-17',
    registration_opens_at: '2026-09-17T00:00',
    kit_delivery_date: '2026-10-16',
    registration_closes_at: '2026-09-09T16:07',
    global_quota: 1000,
    team_reservation_hours: 48,
    allowed_gender: 'ALL',
    min_age: 0,
    age_reference: 'EVENT_DAY',
    child_min_age: '',
    child_max_age: '',
    show_bs_equivalent: true,
    status: 'ACTIVE',
  });

  const fetchBcvRate = async () => {
    setFetchingBcv(true);
    try {
      const res = await fetch('/api/bcv');
      const data = await res.json();
      if (data.success && data.tasa) {
        setBcvRate(data.tasa);
        alert(`Tasa BCV actualizada a ${data.tasa.toFixed(4)} Bs/USD`);
      } else {
        alert('No se pudo actualizar automáticamente. Puedes ingresarla manualmente.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al consultar el BCV.');
    } finally {
      setFetchingBcv(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('events').upsert(
        {
          name: formData.name,
          slug: '5k-por-ellas-corremos-7ma',
          event_date: new Date(formData.event_date).toISOString(),
          registration_opens_at: new Date(formData.registration_opens_at).toISOString(),
          registration_closes_at: new Date(formData.registration_closes_at).toISOString(),
          kit_delivery_date: formData.kit_delivery_date,
          global_quota: Number(formData.global_quota),
          team_reservation_hours: Number(formData.team_reservation_hours),
          bcv_rate: bcvRate,
          show_bs_equivalent: formData.show_bs_equivalent,
          status: formData.status,
        },
        { onConflict: 'slug' }
      );

      if (error) throw error;
      alert('Configuración guardada exitosamente en Supabase.');
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
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

        {/* Tarjeta Tasa BCV */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Tasa BCV:</span>
              <span className="text-moofin-darkTeal dark:text-moofin-teal font-mono font-black text-base">
                {bcvRate.toFixed(4)} Bs/USD
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Se actualiza a diario automáticamente. Puedes actualizarla ahora o sobreescribirla manualmente.
            </p>
          </div>
          <button
            type="button"
            onClick={fetchBcvRate}
            disabled={fetchingBcv}
            className="flex items-center justify-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm shrink-0"
          >
            <RefreshCw size={14} className={fetchingBcv ? 'animate-spin' : ''} />
            <span>Actualizar desde BCV</span>
          </button>
        </div>

        {/* Carga de Archivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200 mb-1">
              Logo del Evento
            </h3>
            <p className="text-[11px] text-gray-500 mb-4">
              PNG/SVG horizontal con fondo transparente para la cabecera web.
            </p>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-gray-700 transition">
                <span>Elegir archivo</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
              <button className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 transition">
                Subir logo
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-black uppercase text-gray-800 dark:text-gray-200 mb-1">
              Ruta (Archivo GPX)
            </h3>
            <p className="text-[11px] text-gray-500 mb-4">
              Coordenadas de la carrera para el mapa interactivo y Strava/Garmin.
            </p>
            <div className="flex items-center space-x-2">
              <label className="cursor-pointer bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-3 py-2 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-gray-700 transition">
                <span>Elegir GPX</span>
                <input type="file" accept=".gpx" className="hidden" />
              </label>
              <button className="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-3 py-2 rounded-lg hover:opacity-90 transition">
                Subir GPX
              </button>
            </div>
          </div>
        </div>

        {/* Formulario Principal */}
        <form onSubmit={handleSave} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">
            Parámetros del evento
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
              Nombre de la carrera / edición
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Fecha del evento
              </label>
              <input
                type="date"
                value={formData.event_date}
                onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Fecha retiro de kits
              </label>
              <input
                type="date"
                value={formData.kit_delivery_date}
                onChange={(e) => setFormData({ ...formData, kit_delivery_date: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Apertura de inscripciones
              </label>
              <input
                type="datetime-local"
                value={formData.registration_opens_at}
                onChange={(e) => setFormData({ ...formData, registration_opens_at: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Cierre de inscripciones
              </label>
              <input
                type="datetime-local"
                value={formData.registration_closes_at}
                onChange={(e) => setFormData({ ...formData, registration_closes_at: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Cupo Global
              </label>
              <input
                type="number"
                value={formData.global_quota}
                onChange={(e) => setFormData({ ...formData, global_quota: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase">
                Reserva de equipos (Horas)
              </label>
              <input
                type="number"
                value={formData.team_reservation_hours}
                onChange={(e) => setFormData({ ...formData, team_reservation_hours: Number(e.target.value) })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="show_bs"
              checked={formData.show_bs_equivalent}
              onChange={(e) => setFormData({ ...formData, show_bs_equivalent: e.target.checked })}
              className="w-4 h-4 rounded text-moofin-darkTeal focus:ring-moofin-teal"
            />
            <label htmlFor="show_bs" className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              Mostrar la tasa y el equivalente en Bs al corredor en la web pública
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-sm px-8 py-3 rounded-xl transition shadow-md"
          >
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
