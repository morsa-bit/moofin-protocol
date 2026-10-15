'use client';

import { useEffect, useState } from 'react';
import { X, Printer, Download } from 'lucide-react';
import { generateQrDataUrl } from '@/lib/qr';

interface TicketModalProps {
  runner: {
    bib: number | null;
    name: string;
    nationalId: string;
    modality: string;
    shirtSize: string;
    shirtCut: string;
    category?: string;
    qrToken: string;
  };
  onClose: () => void;
}

export default function TicketModal({ runner, onClose }: TicketModalProps) {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (runner.qrToken) {
      generateQrDataUrl(runner.qrToken).then(setQrUrl);
    }
  }, [runner.qrToken]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
        >
          <X size={18} />
        </button>

        <div className="bg-moofin-teal p-6 text-center text-black">
          <span className="text-[10px] font-black uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full inline-block mb-2">
            Ticket Oficial de Retiro
          </span>
          <h3 className="text-xl font-black">5K Por Ellas Corremos</h3>
          <p className="text-xs font-semibold opacity-80">7ma Edición · Maturín</p>
        </div>

        <div className="p-6 text-center">
          <div className="mb-4">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
              Dorsal Oficial
            </span>
            <span className="text-5xl font-black text-gray-900 dark:text-white font-mono">
              {runner.bib ? `#${runner.bib}` : 'PENDIENTE'}
            </span>
          </div>

          {qrUrl ? (
            <div className="flex justify-center mb-4">
              <img
                src={qrUrl}
                alt={`QR Dorsal ${runner.bib}`}
                className="w-44 h-44 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-2"
              />
            </div>
          ) : (
            <div className="w-44 h-44 bg-gray-100 dark:bg-gray-800 rounded-2xl mx-auto flex items-center justify-center text-xs text-gray-400">
              Cargando código QR...
            </div>
          )}

          <div className="text-left bg-slate-50 dark:bg-gray-800/60 p-4 rounded-2xl space-y-2 text-xs mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Corredor:</span>
              <span className="font-bold text-gray-900 dark:text-white">{runner.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Cédula:</span>
              <span className="font-bold text-gray-900 dark:text-white">{runner.nationalId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Modalidad:</span>
              <span className="font-bold text-moofin-darkTeal dark:text-moofin-teal">{runner.modality}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Talla Franela:</span>
              <span className="font-bold text-gray-900 dark:text-white">{runner.shirtSize} ({runner.shirtCut})</span>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full flex items-center justify-center space-x-2 bg-moofin-teal hover:bg-moofin-darkTeal text-black font-extrabold text-xs py-3 rounded-xl transition shadow-md"
          >
            <Printer size={15} />
            <span>Imprimir Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
}
