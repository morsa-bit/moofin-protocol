'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, UserPlus, CheckCircle2, Ticket } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function InscribirEnSitioPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState<any>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: 'F',
    modality: 'CARRERA',
    shirtSize: 'M',
    shirtCut: 'DAMAS',
    paymentMethod: 'EFECTIVO',
    amountUsd: 20,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulación de creación y confirmación atómica
      const nuevoDorsal = Math.floor(Math.random() * 200) + 900;
      setInscripcionExitosa({
        bib: nuevoDorsal,
        name: `${form.firstName} ${form.lastName}`,
        nationalId: form.nationalId,
        modality: form.modality,
        shirtSize: `${form.shirtSize} (${form.shirtCut})`,
      });
    } catch (err: any) {
      alert('Error en el registro: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const reiniciarFormulario = () => {
    setInscripcionExitosa(null);
    setForm({
      firstName: '',
      lastName: '',
      nationalId: '',
      email: '',
      phone: '',
      birthDate: '',
      gender: 'F',
      modality: 'CARRERA',
      shirtSize: 'M',
      shirtCut: 'DAMAS',
      paymentMethod: 'EFECTIVO',
      amountUsd: 20,
    });
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

        <div className="mb-6">
          <span className="bg-moofin-lightTeal text-moofin-darkTeal text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-2">
            Módulo En Sitio · Día del Evento
          </span>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Inscripción Rápida Presencial
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Registro y asignación inmediata de kit para corredores en mesa de entrada.
          </p>
        </div>

        {inscripcionExitosa ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-md text-center">
            <CheckCircle2 size={48} className="text-moofin-darkTeal mx-auto mb-3" />
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">
              ¡Corredor Registrado!
            </h2>
            <p className="text-xs text-gray-500 mb-6">Dorsal asignado en el sistema:</p>

            <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl mb-6">
              <span className="text-5xl font-black text-gray-900 dark:text-white font-mono">
                #{inscripcionExitosa.bib}
              </span>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-2">
                {inscripcionExitosa.name}
              </p>
              <p className="text-xs text-gray-400 font-mono">{inscripcionExitosa.nationalId}</p>

              <div className="flex justify-center gap-3 mt-4 text-xs font-bold">
                <span className="bg-moofin-teal text-black px-3 py-1 rounded-lg">
                  {inscripcionExitosa.modality}
                </span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-lg">
                  Talla: {inscripcionExitosa.shirtSize}
                </span>
              </div>
            </div>

            <button
              onClick={reiniciarFormulario}
              className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs py-3.5 rounded-xl transition shadow-md"
            >
              Inscribir otro corredor
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  required
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Cédula
                </label>
                <input
                  type="text"
                  required
                  placeholder="V-12345678"
                  value={form.nationalId}
                  onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Modalidad
                </label>
                <select
                  value={form.modality}
                  onChange={(e) => setForm({ ...form, modality: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                >
                  <option value="CARRERA">Carrera ($20)</option>
                  <option value="CAMINATA">Caminata ($15)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                  Talla de Franela
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={form.shirtSize}
                    onChange={(e) => setForm({ ...form, shirtSize: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <select
                    value={form.shirtCut}
                    onChange={(e) => setForm({ ...form, shirtCut: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-2 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="DAMAS">Dama</option>
                    <option value="HOMBRES">Caballero</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                Método de Pago Presencial
              </label>
              <select
                value={form.paymentMethod}
                onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
              >
                <option value="EFECTIVO">Efectivo USD</option>
                <option value="PAGO_MOVIL">Pago Móvil (Bs)</option>
                <option value="PUNTO">Punto de Venta</option>
                <option value="ZELLE">Zelle</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold py-3.5 rounded-xl transition shadow-md mt-4"
            >
              {loading ? 'Asignando Dorsal...' : 'Registrar y Asignar Dorsal'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
