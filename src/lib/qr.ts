import QRCode from 'qrcode';

/**
 * Genera una imagen DataURL (PNG base64) del código QR
 * @param token Token seguro del corredor almacenado en Supabase
 */
export async function generateQrDataUrl(token: string): Promise<string> {
  try {
    return await QRCode.toDataURL(token, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 320,
      color: {
        dark: '#0B0F19', // Moofin Black
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Error generando QR DataURL:', err);
    throw err;
  }
}

/**
 * Genera el string SVG nativo para incrustar en PDF o interfaces web ligeras
 */
export async function generateQrSvg(token: string): Promise<string> {
  try {
    return await QRCode.toString(token, {
      type: 'svg',
      errorCorrectionLevel: 'H',
      margin: 2,
      color: {
        dark: '#0B0F19',
        light: '#FFFFFF',
      },
    });
  } catch (err) {
    console.error('Error generando QR SVG:', err);
    throw err;
  }
}
