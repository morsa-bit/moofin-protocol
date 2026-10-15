'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Ticket,
  Copy,
  Info,
  Calendar,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import TicketModal from '@/components/admin/TicketModal';

export default function InscribirmePage() {
  const bcvRate = 877.9023; // Tasa referencial activa

  // Estado del flujo
  const [pasoExitoso, setPasoExitoso] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // 1. Datos del corredor
  const [prefijoCedula, setPrefijoCedula] = useState('V');
  const [numeroCedula, setNumeroCedula] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');
  const [diaNac, setDiaNac] = useState('');
  const [mesNac, setMesNac] = useState('');
  const [anoNac, setAnoNac] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  // 2. Modalidad y kit
  const [modalidad, setModalidad] = useState<'CARRERA' | 'CAMINATA' | ''>('');
  const [talla, setTalla] = useState('');
  const [codigoEquipo, setCodigoEquipo] = useState('');

  // 3. Forma de pago
  const [formaPago, setFormaPago] = useState<'PAGO_MOVIL' | 'C2P' | 'EFECTIVO' | 'CORTESIA'>('PAGO_MOVIL');
  const [referencia, setReferencia] = useState('');
  const [telefonoPagador, setTelefonoPagador] = useState('');
  const [bancoEmisor, setBancoEmisor] = useState('');
  const [montoPagadoBs, setMontoPagadoBs] = useState('');
  const [fechaPago, setFechaPago] = useState('');
  const [codigoCortesia, setCodigoCortesia] = useState('');

  // Precios y montos calculados
  const precioUsd = modalidad === 'CARRERA' ? 20 : modalidad === 'CAMINATA' ? 15 : 0;
  const montoExactoBs = precioUsd * bcvRate;

  const copiarDatosPago = () => {
    navigator.clipboard.writeText('0102 04143942804 J-411812870');
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalidad) {
      alert('Por favor selecciona una modalidad.');
      return;
    }
    if (!talla) {
      alert('Por favor selecciona tu talla de franela.');
      return;
    }

    setLoading(true);

    try {
      // Simulación de envío y respuesta del servidor
      setTimeout(() => {
        const nuevoDorsal = Math.floor(Math.random() * 200) + 800;
        setPasoExitoso({
          bib: nuevoDorsal,
          name: nombreApellido,
          nationalId: `${prefijoCedula}-${numeroCedula}`,
          modality: modalidad,
          shirtSize: talla,
          shirtCut: sexo === 'F' ? 'DAMAS' : 'CABALLEROS',
          qrToken: `moofin-token-${nuevoDorsal}-${Date.now()}`,
        });
        setLoading(false);
      }, 1500);
    } catch (err: any) {
      alert('Error en la inscripción: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 pb-20 transition-colors">
      {/* Barra Superior */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white space-x-1.5 transition">
            <ArrowLeft size={16} />
            <span>Volver al inicio</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-moofin-teal flex items-center justify-center font-black text-black text-sm">
              ∞
            </div>
            <span className="font-black text-sm text-gray-900 dark:text-white">MOOFIN</span>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8">
        {/* Cabecera del Formulario */}
        <div className="mb-8 text-center sm:text-left">
          <span className="bg-moofin-lightTeal text-moofin-darkTeal text-[10px] font-black uppercase px-3 py-1 rounded-full inline-block mb-2">
            Inscripción Oficial
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            5K Por Ellas Corremos — 7ma Edición
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Completa tus datos para emitir tu número de dorsal y reservar tu kit oficial.
          </p>
        </div>

        {pasoExitoso ? (
          /* Pantalla de Confirmación de Inscripción */
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-sm text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-moofin-lightTeal rounded-full flex items-center justify-center mx-auto mb-4 text-moofin-darkTeal">
              <CheckCircle2 size={36} />
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              ¡Inscripción Confirmada!
            </h2>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              Tu dorsal ha sido reservado y emitido con éxito en el sistema.
            </p>

            <div className="bg-slate-50 dark:bg-gray-800/60 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/60 mb-6 text-left space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-500 font-bold uppercase">Dorsal Asignado</span>
                <span className="text-2xl font-black text-moofin-darkTeal font-mono">
                  #{pasoExitoso.bib}
                </span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-gray-500">Corredor:</span>
                <span className="font-bold text-gray-900 dark:text-white">{pasoExitoso.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Cédula:</span>
                <span className="font-mono text-gray-800 dark:text-gray-200">{pasoExitoso.nationalId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Modalidad:</span>
                <span className="font-bold text-gray-900 dark:text-white">{pasoExitoso.modality}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Talla de Franela:</span>
                <span className="font-bold text-gray-900 dark:text-white">{pasoExitoso.shirtSize} ({pasoExitoso.shirtCut})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs py-3.5 rounded-xl transition shadow-sm flex items-center justify-center space-x-2"
              >
                <Ticket size={16} />
                <span>Ver y Descargar Ticket QR</span>
              </button>
              <Link
                href="/"
                className="bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs py-3.5 px-6 rounded-xl hover:bg-slate-200 transition text-center"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        ) : (
          /* Formulario Multipaso Reactivo */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* BLOQUE 1: DATOS DEL CORREDOR */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                Datos del corredor
              </h2>

              {/* Cédula o Pasaporte */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Cédula o Pasaporte
                </label>
                <div className="flex gap-2">
                  <select
                    value={prefijoCedula}
                    onChange={(e) => setPrefijoCedula(e.target.value)}
                    className="w-20 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                    <option value="P">P</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="12345678"
                    value={numeroCedula}
                    onChange={(e) => setNumeroCedula(e.target.value)}
                    className="flex-1 bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal font-mono"
                  />
                </div>
              </div>

              {/* Nombre y Apellido */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  required
                  placeholder="María Rodríguez"
                  value={nombreApellido}
                  onChange={(e) => setNombreApellido(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>

              {/* Fecha de Nacimiento */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Fecha de Nacimiento
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={diaNac}
                    onChange={(e) => setDiaNac(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="">Día</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    value={mesNac}
                    onChange={(e) => setMesNac(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="">Mes</option>
                    {[
                      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
                    ].map((m, idx) => (
                      <option key={m} value={idx + 1}>
                        {m}
                      </option>
                    ))}
                  </select>

                  <select
                    value={anoNac}
                    onChange={(e) => setAnoNac(e.target.value)}
                    required
                    className="bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 80 }, (_, i) => 2026 - 10 - i).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sexo y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Sexo
                  </label>
                  <select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  >
                    <option value="">Selecciona...</option>
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="04121234567"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal font-mono"
                  />
                </div>
              </div>

              {/* Correo */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Correo Electrónico (Opcional)
                </label>
                <input
                  type="email"
                  placeholder="maria@gmail.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
            </div>

            {/* BLOQUE 2: MODALIDAD Y KIT */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                Modalidad y kit
              </h2>

              {/* Modalidad */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Modalidad
                </label>
                <select
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value as any)}
                  required
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                >
                  <option value="">Selecciona...</option>
                  <option value="CARRERA">Carrera 5K ($20 USD)</option>
                  <option value="CAMINATA">Caminata 5K ($15 USD)</option>
                </select>
              </div>

              {/* Talla de Franela */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">
                    Talla
                  </label>
                  <span className="text-[11px] font-semibold text-moofin-darkTeal hover:underline cursor-pointer">
                    Ver tabla de medidas
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTalla(t)}
                      className={`py-3 rounded-xl text-xs font-black transition ${
                        talla === t
                          ? 'bg-moofin-teal text-black shadow-sm'
                          : 'bg-slate-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Código de Equipo */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                  Código de Equipo (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="TEAM2026"
                  value={codigoEquipo}
                  onChange={(e) => setCodigoEquipo(e.target.value.toUpperCase())}
                  className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                />
              </div>
            </div>

            {/* BLOQUE 3: FORMA DE PAGO */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                Forma de pago
              </h2>

              {/* Selector de Métodos de Pago */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'EFECTIVO', label: 'Efectivo / Directo' },
                  { id: 'C2P', label: 'C2P (BDV)' },
                  { id: 'PAGO_MOVIL', label: 'Pago Móvil' },
                  { id: 'CORTESIA', label: 'Cortesía' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFormaPago(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition text-center ${
                      formaPago === item.id
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-slate-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {formaPago === 'PAGO_MOVIL' && (
                <>
                  {/* Tarjeta de Destino de Pago Móvil */}
                  <div className="bg-slate-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-xs space-y-2 relative">
                    <button
                      type="button"
                      onClick={copiarDatosPago}
                      className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
                      title="Copiar datos"
                    >
                      <Copy size={16} />
                    </button>
                    <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">
                      QUE PAGUE A
                    </span>

                    <div className="flex justify-between">
                      <span className="text-gray-500">Banco:</span>
                      <span className="font-bold text-gray-900 dark:text-white">Banco de Venezuela (0102)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Teléfono:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">04143942804</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cédula / RIF:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">J-411812870</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-gray-500">Monto exacto:</span>
                      <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm">
                        {modalidad
                          ? `${montoExactoBs.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs`
                          : 'Elige la modalidad'}
                      </span>
                    </div>
                    {copiado && (
                      <span className="text-[10px] text-emerald-600 font-bold block text-right">
                        ¡Datos copiados al portapapeles!
                      </span>
                    )}
                  </div>

                  {/* Referencia del Pago */}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                      Referencia del Pago
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Últimos dígitos del comprobante"
                      value={referencia}
                      onChange={(e) => setReferencia(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal font-mono"
                    />
                  </div>

                  {/* Teléfono y Banco Emisor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                        Teléfono desde el que pagó
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="04121234567"
                        value={telefonoPagador}
                        onChange={(e) => setTelefonoPagador(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                        Banco desde el que pagó
                      </label>
                      <select
                        value={bancoEmisor}
                        onChange={(e) => setBancoEmisor(e.target.value)}
                        required
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                      >
                        <option value="">Selecciona...</option>
                        <option value="0102">0102 - Banco de Venezuela</option>
                        <option value="0134">0134 - Banesco</option>
                        <option value="0105">0105 - Mercantil</option>
                        <option value="0108">0108 - Provincial (BBVA)</option>
                        <option value="0172">0172 - Bancamiga</option>
                        <option value="0114">0114 - Bancaribe</option>
                        <option value="0115">0115 - Banco Exterior</option>
                        <option value="0163">0163 - Banco del Tesoro</option>
                        <option value="0128">0128 - Banco Caroní</option>
                      </select>
                    </div>
                  </div>

                  {/* Monto y Fecha Opcionales */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                        Monto Pagado (BS)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Monto según comprobante"
                        value={montoPagadoBs}
                        onChange={(e) => setMontoPagadoBs(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                        Fecha del Pago
                      </label>
                      <input
                        type="date"
                        value={fechaPago}
                        onChange={(e) => setFechaPago(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 leading-normal">
                    Monto y fecha solo si pagó otro día o con otra tasa: pon lo que dice su comprobante. Vacíos, se usan el monto y el día de hoy. Se verifica con el banco al guardar; si no aparece, espera unos segundos y vuelve a intentar.
                  </p>
                </>
              )}

              {formaPago === 'CORTESIA' && (
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1.5">
                    Código de Cortesía Oficial
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 2C8E27E6"
                    value={codigoCortesia}
                    onChange={(e) => setCodigoCortesia(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-moofin-teal"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Este código descuenta el 100% del costo y asigna tu dorsal de cortesía de inmediato.
                  </p>
                </div>
              )}
            </div>

            {/* BOTÓN DE ENVÍO */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-sm py-4 rounded-2xl transition shadow-lg shadow-moofin-teal/20"
            >
              {loading ? 'Validando y Asignando Dorsal...' : 'Completar Inscripción'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
