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
    invitadoDe: (data.invitadoDe || "").toString(),
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

  // Timeout para que la request nunca quede colgada si Google tarda.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    // Apps Script espera un cuerpo simple; text/plain evita el preflight CORS
    // y sigue llegando como e.postData.contents (JSON string) al script.
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(row),
      redirect: "follow",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Sheet respondió ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    const motivo = err?.name === "AbortError" ? "timeout" : String(err);
    console.error("[RSVP] error al guardar en Sheet:", motivo);
    return Response.json({ ok: false, error: "No se pudo guardar" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
