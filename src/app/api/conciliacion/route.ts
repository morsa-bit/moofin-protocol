import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { runner_id, payment_method, reference_number, bank_code, amount_bs } = body;

    if (!runner_id || !reference_number) {
      return NextResponse.json(
        { error: 'Parámetros insuficientes: runner_id y reference_number son requeridos' },
        { status: 400 }
      );
    }

    // 1. Validar que la referencia no haya sido usada previamente
    const { data: referenciaExistente } = await supabaseAdmin
      .from('payments')
      .select('id, status')
      .eq('reference_number', reference_number)
      .eq('status', 'CONFIRMED')
      .maybeSingle();

    if (referenciaExistente) {
      return NextResponse.json(
        { error: 'Esta referencia de pago ya fue utilizada y aprobada anteriormente.' },
        { status: 409 }
      );
    }

    // =========================================================================
    // 2. CONEXIÓN CON API BANCARIA
    // En este bloque se realiza la consulta al webhook / API REST del banco
    // Ejemplo de payload bancario:
    // const bankResponse = await fetch('https://api.tudominiobancario.com/v1/conciliacion', {
    //   headers: { Authorization: `Bearer ${process.env.BANK_API_KEY}` },
    //   body: JSON.stringify({ reference: reference_number, bank: bank_code, amount: amount_bs })
    // });
    // =========================================================================
    
    // Simulación de aprobación bancaria positiva
    const pagoAprobadoPorBanco = true;

    if (!pagoAprobadoPorBanco) {
      return NextResponse.json(
        { error: 'El banco no encontró una transferencia coincidente con los datos suministrados.' },
        { status: 422 }
      );
    }

    // 3. Registrar el pago como confirmado
    const { error: pagoError } = await supabaseAdmin.from('payments').insert({
      runner_id,
      payment_method,
      reference_number,
      bank_code,
      amount_bs,
      status: 'CONFIRMED',
      verified_at: new Date().toISOString(),
    });

    if (pagoError) throw pagoError;

    // 4. LLAMADA ATÓMICA: Asignación de Dorsal y QR
    const { data: bibData, error: bibError } = await supabaseAdmin.rpc(
      'confirm_runner_and_assign_bib',
      { p_runner_id: runner_id }
    );

    if (bibError) throw bibError;

    return NextResponse.json({
      success: true,
      message: 'Pago conciliado con éxito y dorsal emitido automáticamente.',
      dorsal: bibData ? (bibData as any).bib_number : null,
      qr_token: bibData ? (bibData as any).qr_token : null,
    });
  } catch (error: any) {
    console.error('Error procesando pago bancario:', error);
    return NextResponse.json({ error: error.message || 'Error interno del servidor' }, { status: 500 });
  }
}
