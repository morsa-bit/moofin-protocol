'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Moon, Sun, ArrowUpRight } from 'lucide-react';

export default function AdminNavbar() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-colors">
      <div className="flex items-center space-x-6">
        {/* Identidad Moofin */}
        <Link href="/admin" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-moofin-teal flex items-center justify-center font-black text-black text-lg">
            ∞
          </div>
          <span className="text-lg font-black tracking-wider text-gray-900 dark:text-white">
            MOOFIN
          </span>
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
            ADMIN
          </span>
        </Link>

        {/* Pestañas de Navegación */}
        <nav className="flex items-center space-x-2 text-sm font-semibold">
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-lg bg-moofin-lightTeal text-moofin-darkTeal dark:bg-gray-800 dark:text-moofin-teal transition"
          >
            Panel
          </Link>
          <Link
            href="/admin/evento"
            className="px-3 py-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            Configuración
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xs transition"
          >
            <span>Ver Web</span>
            <ArrowUpRight size={13} />
          </Link>
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {/* Toggle Light / Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Cambiar tema"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Ayuda / Guía */}
        <button className="hidden sm:flex items-center space-x-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
          <HelpCircle size={14} />
          <span>Guía</span>
          <span className="bg-moofin-teal/20 text-moofin-darkTeal dark:text-moofin-teal px-1.5 py-0.2 rounded font-mono text-[10px] font-bold">
            2/13
          </span>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-moofin-teal text-black font-extrabold text-xs flex items-center justify-center shadow-sm">
          M
        </div>
      </div>
    </header>
  );
}
