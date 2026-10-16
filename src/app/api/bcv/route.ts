import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // 1. Consultar la tasa oficial del BCV
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      next: { revalidate: 3600 }, // Caché por 1 hora
    });

    if (!res.ok) {
      throw new Error('No se pudo obtener la tasa desde la API del BCV');
    }

    const data = await res.json();
    const tasaOficial = Number(data.promedio);

    // 2. Si existe un evento activo, actualizar el campo bcv_rate en la base de datos
    const { data: eventoActualizado, error } = await supabaseAdmin
      .from('events')
      .update({
        bcv_rate: tasaOficial,
        updated_at: new Date().toISOString(),
      })
      .eq('status', 'ACTIVE')
      .select('id, name, bcv_rate')
      .maybeSingle();

    if (error) {
      console.warn('Aviso al guardar tasa en DB:', error.message);
    }

    return NextResponse.json({
      success: true,
      tasa: tasaOficial,
      fechaActualizacion: data.fechaActualizacion || new Date().toISOString(),
      evento: eventoActualizado?.name || 'Actualizado en sistema',
    });
  } catch (error: any) {
    console.error('Error obteniendo tasa BCV:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error al consultar la tasa' },
      { status: 500 }
    );
  }
}
