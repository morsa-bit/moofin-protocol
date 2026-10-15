'use client';

import Link from 'next/link';
import AdminNavbar from '@/components/admin/AdminNavbar';
import {
  Users,
  QrCode,
  Timer,
  Settings,
  Layers,
  Shirt,
  DollarSign,
  Users2,
  Gift,
  LayoutGrid,
  CreditCard,
  Trophy,
  Award,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 transition-colors">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Título de Cabecera */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              Panel de administración
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Control general de inscripciones, logística y métricas
            </p>
          </div>
          <Link
            href="/admin/eventos"
            className="text-xs font-semibold text-moofin-darkTeal hover:underline flex items-center space-x-1"
          >
            <span>Ver todos los eventos</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Tarjeta de Evento Activo */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  5K Por Ellas Corremos — 7ma Edición
                </h2>
                <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Activo
                </span>
              </div>
              <p className="text-xs text-gray-500 font-mono">
                17/10/2026 · Cupo 1.000 · Cierra 09/09/2026, 16:07
              </p>
            </div>
          </div>

          {/* Bloque: En Sitio · Día del Evento */}
          <div className="mb-6">
            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              En Sitio · Día del evento
            </span>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm">
                <Users size={16} />
                <span>Inscribir en sitio</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm">
                <Timer size={16} />
                <span>Cronometraje</span>
              </button>
              <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm">
                <QrCode size={16} />
                <span>Entregar kits (escanear)</span>
              </button>
            </div>
          </div>

          {/* Bloque: Gestión del Evento (Grid) */}
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-3">
              Gestión del evento
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <MenuCard href="/admin/evento" icon={Settings} label="Editar evento" />
              <MenuCard href="/admin/categorias" icon={Layers} label="Categorías" />
              <MenuCard href="/admin/tallas" icon={Shirt} label="Tallas" />
              <MenuCard href="/admin/precios" icon={DollarSign} label="Modalidades y precios" />
              <MenuCard href="/admin/equipos" icon={Users2} label="Equipos" />
              <MenuCard href="/admin/cortesias" icon={Gift} label="Cortesías" />
              <MenuCard href="/admin/mesas" icon={LayoutGrid} label="Mesas de registro" />
              <MenuCard href="/admin/corredores" icon={Users} label="Corredores" />
              <MenuCard href="/admin/cobranza" icon={CreditCard} label="Cobranza" />
              <MenuCard href="/admin/resultados" icon={Trophy} label="Resultados" />
              <MenuCard href="/admin/patrocinadores" icon={Award} label="Patrocinadores" />
            </div>
          </div>
        </div>

        {/* Sección de Métricas en Tiempo Real */}
        <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white mb-4">
          Métricas del evento
        </h3>

        {/* Fila 1 de Métricas Principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="INSCRITOS"
            mainValue="991"
            subText="de 1.000 · 9 cupos libres"
            badge="99% ocupado"
            badgeColor="bg-emerald-100 text-emerald-700"
          />
          <MetricCard
            title="RECAUDACIÓN"
            mainValue="$13.845"
            subText="Bs 11.946.119 · ticket $14"
            badge="Cobrado"
            badgeColor="bg-moofin-lightTeal text-moofin-darkTeal"
          />
          <MetricCard
            title="PATROCINIO PROYECTADO"
            mainValue="$27.300"
            subText="34 aceptados"
            badge="34 marcas"
            badgeColor="bg-blue-100 text-blue-700"
          />
          <MetricCard
            title="CIERRE DE INSCRIPCIÓN"
            mainValue="Cerrado"
            subText="inscripciones cerradas"
            mainColor="text-rose-600"
          />
        </div>

        {/* Fila 2: Modalidad e Inventario de Tallas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Inscritos por Modalidad */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Inscritos por modalidad
            </h4>
            <div className="space-y-4">
              <ProgressBar label="CAMINATA" count="520" total={991} color="bg-rose-500" />
              <ProgressBar label="CARRERA" count="471" total={991} color="bg-moofin-teal" />
            </div>
          </div>

          {/* Tallas e Inventario */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Tallas
              </h4>
              <span className="text-[10px] text-gray-400 font-medium">inscritos / stock</span>
            </div>
            <div className="space-y-3">
              <ProgressBar label="XS" count="51" stock="200" color="bg-moofin-teal" />
              <ProgressBar label="S" count="233" stock="386" color="bg-moofin-teal" />
              <ProgressBar label="M" count="383" stock="630" color="bg-moofin-teal" />
              <ProgressBar label="L" count="246" stock="422" color="bg-moofin-teal" />
              <ProgressBar label="XL" count="78" stock="200" color="bg-moofin-teal" />
            </div>
          </div>
        </div>

        {/* Fila 3: Género, Cortesías y Equipos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mujeres / Hombres */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Mujeres / Hombres
            </h4>
            <div className="w-full bg-blue-500 h-2 rounded-full overflow-hidden mb-3">
              <div className="bg-rose-500 h-full" style={{ width: '88%' }}></div>
            </div>
            <div className="flex justify-between text-xs font-bold">
              <span className="text-rose-600">872 mujeres (88%)</span>
              <span className="text-blue-600">119 hombres</span>
            </div>
          </div>

          {/* Cortesías */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Cortesías
            </h4>
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-xl font-black text-gray-900 dark:text-white">28</p>
                <p className="text-[10px] text-gray-400 uppercase">Emitidas</p>
              </div>
              <div>
                <p className="text-xl font-black text-gray-900 dark:text-white">8</p>
                <p className="text-[10px] text-gray-400 uppercase">Usadas</p>
              </div>
              <div>
                <p className="text-xl font-black text-moofin-darkTeal dark:text-moofin-teal">20</p>
                <p className="text-[10px] text-gray-400 uppercase">Disponibles</p>
              </div>
            </div>
          </div>

          {/* Equipos */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Equipos
            </h4>
            <div className="grid grid-cols-2 text-center">
              <div>
                <p className="text-xl font-black text-gray-900 dark:text-white">10</p>
                <p className="text-[10px] text-gray-400 uppercase">Equipos</p>
              </div>
              <div>
                <p className="text-xl font-black text-rose-600">182</p>
                <p className="text-[10px] text-gray-400 uppercase">En equipo</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponente de accesos
function MenuCard({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-2.5 p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-800/40 hover:border-moofin-teal hover:bg-white dark:hover:bg-gray-800 transition group"
    >
      <Icon size={16} className="text-gray-500 group-hover:text-moofin-darkTeal transition" />
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
        {label}
      </span>
    </Link>
  );
}

// Subcomponente de Tarjeta de Métricas
function MetricCard({
  title,
  mainValue,
  subText,
  badge,
  badgeColor,
  mainColor = 'text-gray-900 dark:text-white',
}: any) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase">
          {title}
        </span>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <p className={`text-2xl font-black tracking-tight ${mainColor}`}>{mainValue}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{subText}</p>
    </div>
  );
}

// Barra de progreso reutilizable
function ProgressBar({ label, count, total, stock, color }: any) {
  const percent = stock
    ? (Number(count) / Number(stock)) * 100
    : (Number(count) / Number(total)) * 100;

  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-200 mb-1.5">
        <span>{label}</span>
        <span>{stock ? `${count} / ${stock}` : count}</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
        <div className={`${color} h-full rounded-full transition-all`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
