'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import { ArrowLeft, Plus, X, Trash2, Edit2, Trophy } from 'lucide-react';

interface Categoria {
  id: string;
  nombre: string;
  sexo: 'F' | 'M' | 'MIXTO';
  modalidad: 'CARRERA' | 'CAMINATA';
  edadMin: number;
  edadMax: number;
  premia: boolean;
}

export default function CategoriasPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([
    { id: '1', nombre: 'Juvenil Femenino', sexo: 'F', modalidad: 'CARRERA', edadMin: 16, edadMax: 19, premia: true },
    { id: '2', nombre: 'Libre Femenino', sexo: 'F', modalidad: 'CARRERA', edadMin: 20, edadMax: 29, premia: true },
    { id: '3', nombre: 'Sub Máster Femenino', sexo: 'F', modalidad: 'CARRERA', edadMin: 30, edadMax: 39, premia: true },
    { id: '4', nombre: 'Máster A Femenino', sexo: 'F', modalidad: 'CARRERA', edadMin: 40, edadMax: 49, premia: true },
    { id: '5', nombre: 'General Caminata', sexo: 'MIXTO', modalidad: 'CAMINATA', edadMin: 0, edadMax: 99, premia: false },
  ]);

  const [form, setForm] = useState({
    nombre: '',
    sexo: 'F' as 'F' | 'M' | 'MIXTO',
    modalidad: 'CARRERA' as 'CARRERA' | 'CAMINATA',
    edadMin: 18,
    edadMax: 99,
    premia: true,
  });

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    setCategorias([
      ...categorias,
      {
        id: Date.now().toString(),
        nombre: form.nombre,
        sexo: form.sexo,
        modalidad: form.modalidad,
        edadMin: Number(form.edadMin),
        edadMax: Number(form.edadMax),
        premia: form.premia,
      },
    ]);

    setForm({ nombre: '', sexo: 'F', modalidad: 'CARRERA', edadMin: 18, edadMax: 99, premia: true });
    setModalAbierto(false);
  };

  const eliminarCategoria = (id: string) => {
    setCategorias(categorias.filter((c) => c.id !== id));
  };

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
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Categorías</h1>
            <p className="text-xs text-gray-500 mt-0.5">5K Por Ellas Corremos — 7ma Edición</p>
          </div>
          <button
            onClick={() => setModalAbierto(true)}
            className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Plus size={16} />
            <span>Agregar categoría</span>
          </button>
        </div>

        {/* Listado de Categorías */}
        {categorias.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-12 text-center text-xs text-gray-500">
            Sin categorías. Agrega la primera con el botón de arriba.
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-bold">
                <tr>
                  <th className="py-3 px-6">Nombre</th>
                  <th className="py-3 px-6">Modalidad</th>
                  <th className="py-3 px-6">Sexo</th>
                  <th className="py-3 px-6">Rango de Edad</th>
                  <th className="py-3 px-6 text-center">Premiación</th>
                  <th className="py-3 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {categorias.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/30 transition">
                    <td className="py-4 px-6 font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>{cat.nombre}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          cat.modalidad === 'CARRERA'
                            ? 'bg-moofin-lightTeal text-moofin-darkTeal dark:bg-emerald-950 dark:text-emerald-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                        }`}
                      >
                        {cat.modalidad}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-600 dark:text-gray-300">
                      {cat.sexo === 'F' ? 'Femenino' : cat.sexo === 'M' ? 'Masculino' : 'Mixto'}
                    </td>
                    <td className="py-4 px-6 text-gray-600 dark:text-gray-300">
                      {cat.edadMin} a {cat.edadMax} años
                    </td>
                    <td className="py-4 px-6 text-center">
                      {cat.premia ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-600 font-bold text-[11px]">
                          <Trophy size={13} />
                          <span>Sí</span>
                        </span>
                      ) : (
                        <span className="text-gray-400 font-medium">No</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button
                        onClick={() => eliminarCategoria(cat.id)}
                        className="text-rose-500 hover:text-rose-600 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal Nueva Categoría */}
        {modalAbierto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
              <button
                onClick={() => setModalAbierto(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={18} />
              </button>

              <h2 className="text-base font-black text-gray-900 dark:text-white mb-4">
                Nueva categoría
              </h2>

              <form onSubmit={handleCrear} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Damas 30-39"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Sexo
                    </label>
                    <select
                      value={form.sexo}
                      onChange={(e) => setForm({ ...form, sexo: e.target.value as any })}
                      className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    >
                      <option value="F">Femenino</option>
                      <option value="M">Masculino</option>
                      <option value="MIXTO">Mixto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Modalidad
                    </label>
                    <select
                      value={form.modalidad}
                      onChange={(e) => setForm({ ...form, modalidad: e.target.value as any })}
                      className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    >
                      <option value="CARRERA">CARRERA</option>
                      <option value="CAMINATA">CAMINATA</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Edad Mínima
                    </label>
                    <input
                      type="number"
                      value={form.edadMin}
                      onChange={(e) => setForm({ ...form, edadMin: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase mb-1">
                      Edad Máxima
                    </label>
                    <input
                      type="number"
                      value={form.edadMax}
                      onChange={(e) => setForm({ ...form, edadMax: Number(e.target.value) })}
                      className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="premia"
                    checked={form.premia}
                    onChange={(e) => setForm({ ...form, premia: e.target.checked })}
                    className="w-4 h-4 rounded text-moofin-darkTeal focus:ring-moofin-teal"
                  />
                  <label htmlFor="premia" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Premia (entra en la premiación por categoría)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs py-3 rounded-xl transition shadow-md mt-2"
                >
                  Agregar categoría
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
