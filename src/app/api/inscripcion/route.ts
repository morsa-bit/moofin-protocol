import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      national_id,
      full_name,
      birth_date,
      gender,
      phone,
      email,
      modality_name,
      shirt_size,
      team_code,
      payment_method,
      reference_number,
      bank_code,
      amount_bs,
      courtesy_code,
    } = body;

    // 1. Obtener evento activo
    const { data: event, error: eventErr } = await supabaseAdmin
      .from('events')
      .select('*')
      .eq('status', 'ACTIVE')
      .limit(1)
      .single();

    if (eventErr || !event) {
      return NextResponse.json({ error: 'No hay un evento activo actualmente.' }, { status: 400 });
    }

    // 2. Obtener modalidad
    const { data: modality, error: modErr } = await supabaseAdmin
      .from('modalities')
      .select('*')
      .eq('event_id', event.id)
      .eq('name', modality_name)
      .single();

    if (modErr || !modality) {
      return NextResponse.json({ error: 'Modalidad no válida.' }, { status: 400 });
    }

    // 3. Verificar si la cédula ya está inscrita en este evento
    const { data: existingRunner } = await supabaseAdmin
      .from('runners')
      .select('id, bib_number, status')
      .eq('event_id', event.id)
      .eq('national_id', national_id)
      .maybeSingle();

    if (existingRunner) {
      return NextResponse.json(
        { error: `La cédula ${national_id} ya se encuentra registrada en este evento.` },
        { status: 409 }
      );
    }

    // 4. Si es CORTESÍA, validar código antes de registrar
    let courtesyRecord = null;
    if (payment_method === 'CORTESIA') {
      if (!courtesy_code) {
        return NextResponse.json({ error: 'Debes ingresar un código de cortesía.' }, { status: 400 });
      }
      const { data: court, error: courtErr } = await supabaseAdmin
        .from('courtesies')
        .select('*')
        .eq('event_id', event.id)
        .eq('code', courtesy_code.trim().toUpperCase())
        .maybeSingle();

      if (courtErr || !court) {
        return NextResponse.json({ error: 'El código de cortesía ingresado no existe.' }, { status: 404 });
      }
      if (court.is_used) {
        return NextResponse.json({ error: 'Este código de cortesía ya fue utilizado.' }, { status: 409 });
      }
      courtesyRecord = court;
    }

    // Separar nombre y apellido
    const partesNombre = full_name.trim().split(' ');
    const first_name = partesNombre[0] || full_name;
    const last_name = partesNombre.slice(1).join(' ') || '-';
    const shirt_cut = gender === 'F' ? 'DAMAS' : 'HOMBRES';

    // 5. Insertar corredor en estado PENDING inicialmente
    const { data: newRunner, error: runnerErr } = await supabaseAdmin
      .from('runners')
      .insert({
        event_id: event.id,
        modality_id: modality.id,
        courtesy_id: courtesyRecord ? courtesyRecord.id : null,
        national_id,
        first_name,
        last_name,
        email: email || 'sin-correo@moofin.com',
        phone,
        birth_date,
        gender,
        shirt_size,
        shirt_cut,
        registration_type: payment_method === 'CORTESIA' ? 'CORTESIA' : 'COMERCIAL',
        status: 'PENDING',
      })
      .select('*')
      .single();

    if (runnerErr || !newRunner) {
      throw new Error(runnerErr?.message || 'Error al guardar el corredor.');
    }

    // 6. Registrar el pago o la cortesía y asignar dorsal atómicamente
    if (payment_method === 'CORTESIA' && courtesyRecord) {
      await supabaseAdmin
        .from('courtesies')
        .update({ is_used: true, used_at: new Date().toISOString() })
        .eq('id', courtesyRecord.id);
    }

    await supabaseAdmin.from('payments').insert({
      event_id: event.id,
      runner_id: newRunner.id,
      payment_method,
      bank_code: bank_code || null,
      reference_number: payment_method === 'CORTESIA' ? courtesyRecord.code : reference_number,
      amount_usd: payment_method === 'CORTESIA' ? 0 : modality.price_usd,
      amount_bs: payment_method === 'CORTESIA' ? 0 : (Number(amount_bs) || modality.price_usd * Number(event.bcv_rate)),
      bcv_rate_applied: event.bcv_rate,
      status: 'CONFIRMED',
      verified_at: new Date().toISOString(),
    });

    // 7. Llamar a la función RPC para asignar Dorsal y QR sin colisiones
    const { data: bibData, error: bibErr } = await supabaseAdmin.rpc(
      'confirm_runner_and_assign_bib',
      { p_runner_id: newRunner.id }
    );

    if (bibErr) {
      throw new Error(bibErr.message);
    }

    return NextResponse.json({
      success: true,
      bib: bibData.bib_number,
      qrToken: bibData.qr_token,
      name: `${first_name} ${last_name}`.trim(),
      nationalId: national_id,
      modality: modality_name,
      shirtSize: shirt_size,
      shirtCut: shirt_cut,
    });
  } catch (error: any) {
    console.error('Error en /api/inscripcion:', error);
    return NextResponse.json(
      { error: error.message || 'Ocurrió un error al procesar la inscripción.' },
      { status: 500 }
    );
  }
}
