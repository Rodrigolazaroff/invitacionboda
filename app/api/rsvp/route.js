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

  // Normaliza la lista de personas (una fila por cada una en la planilla)
  const personas = (Array.isArray(data?.personas) ? data.personas : [])
    .map((p) => ({
      nombre: (p?.nombre || "").toString().trim(),
      asiste: (p?.asiste || "").toString(),
      restriccion: (p?.restriccion || "").toString(),
    }))
    .filter((p) => p.nombre);

  if (personas.length === 0) {
    return Response.json({ ok: false, error: "Falta el nombre" }, { status: 400 });
  }

  // Código único por envío: agrupa en la planilla a quienes confirman juntos
  const grupo =
    "g-" +
    (globalThis.crypto?.randomUUID?.().slice(0, 4) ??
      Math.random().toString(16).slice(2, 6));

  // Payload limpio hacia la planilla
  const row = {
    fecha: (data.fecha || new Date().toLocaleString("es-AR")).toString(),
    grupo,
    invitadoDe: (data.invitadoDe || "").toString(),
    mensaje: (data.mensaje || "").toString(),
    personas,
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
