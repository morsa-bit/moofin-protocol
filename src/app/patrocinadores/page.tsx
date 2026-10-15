'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Users,
  Eye,
  Megaphone,
  Radio,
  CheckCircle2,
  X,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function PatrocinadoresLandingPage() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState<string>('ORO');

  const [form, setForm] = useState({
    empresa: '',
    rif: '',
    contacto: '',
    email: '',
    telefono: '',
    plan: 'ORO',
  });

  const abrirRegistro = (plan: string) => {
    setPlanSeleccionado(plan);
    setForm({ ...form, plan });
    setModalAbierto(true);
  };

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Postulación enviada para el plan ${form.plan}. El comité organizador revisará tu propuesta.`);
    setModalAbierto(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Barra de Navegación */}
      <header className="border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-moofin-teal flex items-center justify-center font-black text-black">
              ∞
            </div>
            <span className="font-black text-lg tracking-tight">MOOFIN</span>
          </Link>

          <nav className="flex items-center space-x-6 text-xs font-bold">
            <Link href="/" className="text-slate-600 hover:text-black transition">
              Volver al Evento
            </Link>
            <button
              onClick={() => abrirRegistro('ORO')}
              className="bg-moofin-teal hover:bg-moofin-darkTeal text-black px-4 py-2 rounded-xl transition shadow-sm font-extrabold"
            >
              Quiero Sumar Mi Marca
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Comercial */}
      <section className="pt-16 pb-20 px-6 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-moofin-darkTeal bg-moofin-lightTeal px-3 py-1 rounded-full mb-4 inline-block">
            Patrocinadores Oficiales
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            TÚ TAMBIÉN PUEDES SER <br />
            <span className="text-moofin-darkTeal">PATROCINADOR OFICIAL</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 font-medium">
            Suma tu marca a una causa que moviliza a toda la ciudad. Únete a la 7.ª Edición de «Por Ellas Corremos» con un alcance proyectado de más de 1.000 corredores y 3.000 asistentes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => abrirRegistro('ORO')}
              className="bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs px-8 py-4 rounded-xl transition shadow-md"
            >
              Quiero sumar mi marca (Plazas limitadas)
            </button>
            <a
              href="#planes"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-6 py-4 rounded-xl transition"
            >
              Ver planes de patrocinio
            </a>
          </div>
        </div>
      </section>

      {/* Tarjeta de Propósito / Causa */}
      <section className="py-8 px-6 max-w-5xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-rose-400 mb-4">
              <Heart size={14} className="fill-rose-400" />
              <span>Patrocinas una causa, no solo un evento</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Responsabilidad social con visibilidad masiva
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Al sumarte, tu empresa respalda activamente la campaña anual de prevención del cáncer de mama durante el mes rosa de octubre, asociando tu marca con salud, comunidad, deporte y bienestar colectivo.
            </p>
          </div>
        </div>
      </section>

      {/* Métricas de Audiencia */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
          Tu alcance garantizado
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">
          Métricas e impacto directo del evento
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <p className="text-3xl font-black text-slate-900">1.000</p>
            <p className="text-xs font-bold text-slate-600 mt-1">Corredores inscritos</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <p className="text-3xl font-black text-slate-900">3.000+</p>
            <p className="text-xs font-bold text-slate-600 mt-1">Visitantes en el recinto</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <p className="text-3xl font-black text-moofin-darkTeal">5K</p>
            <p className="text-xs font-bold text-slate-600 mt-1">Recorrido nocturno</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <p className="text-3xl font-black text-rose-600">100%</p>
            <p className="text-xs font-bold text-slate-600 mt-1">Cobertura en medios y RRSS</p>
          </div>
        </div>
      </section>

      {/* Tabla Comparativa de Planes */}
      <section id="planes" className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
            Planes de Patrocinio
          </h2>
          <p className="text-xs text-slate-500">
            Elige el nivel de exposición que mejor se adapte a los objetivos de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan ORO (Destacado) */}
          <div className="bg-white border-2 border-moofin-teal rounded-3xl p-8 shadow-xl relative flex flex-col justify-between">
            <div>
              <span className="bg-moofin-teal text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
                Principal · Máxima Exposición
              </span>
              <h3 className="text-2xl font-black text-slate-900">ORO</h3>
              <p className="text-3xl font-black text-slate-900 mt-2 mb-6">
                $1.200 <span className="text-xs text-slate-400 font-normal">USD</span>
              </p>

              <div className="space-y-3 text-xs text-slate-600 mb-8">
                <p className="font-bold text-slate-900">Kit y Material Impreso:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-moofin-darkTeal shrink-0 mt-0.5" />
                  <span>Logo superior en backing oficial (prensa, salida y llegada)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-moofin-darkTeal shrink-0 mt-0.5" />
                  <span>Muestra de producto o volante dentro de los 1.000 kits</span>
                </div>

                <p className="font-bold text-slate-900 pt-2">Área Comercial y Stands:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-moofin-darkTeal shrink-0 mt-0.5" />
                  <span>Stand preferencial grande (hasta 4×4 m) de alto tráfico</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-moofin-darkTeal shrink-0 mt-0.5" />
                  <span>Hasta 4 banners en la zona de llegada y trayecto</span>
                </div>

                <p className="font-bold text-slate-900 pt-2">Beneficios Extra:</p>
                <div className="flex items-start space-x-2 font-bold text-moofin-darkTeal">
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" />
                  <span>2 cortesías para corredores de tu equipo corporativo</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => abrirRegistro('ORO')}
              className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs py-3.5 rounded-xl transition shadow-md"
            >
              Elegir Oro
            </button>
          </div>

          {/* Plan PLATA */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
                Presencia Destacada
              </span>
              <h3 className="text-2xl font-black text-slate-900">PLATA</h3>
              <p className="text-3xl font-black text-slate-900 mt-2 mb-6">
                $800 <span className="text-xs text-slate-400 font-normal">USD</span>
              </p>

              <div className="space-y-3 text-xs text-slate-600 mb-8">
                <p className="font-bold text-slate-900">Kit y Material Impreso:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Logo en posición mediana en backing oficial</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Muestra de producto en kits de corredores</span>
                </div>

                <p className="font-bold text-slate-900 pt-2">Activación en Sitio:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Stand estándar (3×3 m) en área comercial</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>2 banners en el recinto del evento</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => abrirRegistro('PLATA')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 rounded-xl transition shadow-sm"
            >
              Elegir Plata
            </button>
          </div>

          {/* Plan BRONCE */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3">
                Entrada Accesible
              </span>
              <h3 className="text-2xl font-black text-slate-900">BRONCE</h3>
              <p className="text-3xl font-black text-slate-900 mt-2 mb-6">
                $500 <span className="text-xs text-slate-400 font-normal">USD</span>
              </p>

              <div className="space-y-3 text-xs text-slate-600 mb-8">
                <p className="font-bold text-slate-900">Kit y Difusión Digital:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Logo en pieza gráfica digital de patrocinadores</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Muestra o catálogo dentro del kit</span>
                </div>

                <p className="font-bold text-slate-900 pt-2">Presencia en Sitio:</p>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Espacio tipo mesa/caballete para degustación</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>1 banner en zona permitida</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => abrirRegistro('BRONCE')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-3.5 rounded-xl transition"
            >
              Elegir Bronce
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Registro de Marca */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-3xl shadow-2xl p-6 relative">
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition"
            >
              <X size={18} />
            </button>

            <span className="text-[10px] font-black uppercase text-moofin-darkTeal bg-moofin-lightTeal px-2.5 py-0.5 rounded-full inline-block mb-1">
              Plan {planSeleccionado}
            </span>
            <h3 className="text-lg font-black text-slate-900 mb-4">
              Sumar empresa como patrocinador
            </h3>

            <form onSubmit={handleEnviar} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Empresa / Razón Social</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Droguería Monagas C.A."
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">RIF Fiscal</label>
                  <input
                    type="text"
                    required
                    placeholder="J-12345678-9"
                    value={form.rif}
                    onChange={(e) => setForm({ ...form, rif: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Nombre Contacto</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={form.contacto}
                    onChange={(e) => setForm({ ...form, contacto: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="mercadeo@empresa.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Teléfono Móvil / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+58 414 1234567"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold py-3.5 rounded-xl transition shadow-md mt-4"
              >
                Enviar Postulación Comercial
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
