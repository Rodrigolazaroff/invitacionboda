// Recibe la confirmación de asistencia y la reenvía a Google Sheets
// (a través de un Web App de Google Apps Script — ver README).

export const runtime = "nodejs";

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const nombre = (data?.nombre || "").toString().trim();
  if (!nombre) {
    return Response.json({ ok: false, error: "Falta el nombre" }, { status: 400 });
  }

  // Payload limpio hacia la planilla
  const row = {
    nombre,
    asiste: (data.asiste || "").toString(),
    acompanantes: (data.acompanantes || "").toString(),
    restricciones: (data.restricciones || "").toString(),
    mensaje: (data.mensaje || "").toString(),
    fecha: (data.fecha || new Date().toLocaleString("es-AR")).toString(),
  };

  const webhook = process.env.RSVP_SHEET_WEBHOOK;

  // Modo desarrollo: sin webhook configurado, aceptamos y logueamos.
  if (!webhook) {
    console.log("[RSVP] (sin RSVP_SHEET_WEBHOOK — modo dev) →", row);
    return Response.json({ ok: true, dev: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
    });
    if (!res.ok) throw new Error(`Sheet respondió ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[RSVP] error al guardar en Sheet:", err);
    return Response.json({ ok: false, error: "No se pudo guardar" }, { status: 502 });
  }
}
