/**
 * RSVP → Google Sheets
 * ────────────────────────────────────────────────────────────
 * Cómo usarlo (una sola vez):
 * 1. Creá una Google Sheet nueva (ej: "Confirmaciones Boda").
 * 2. Menú  Extensiones → Apps Script.
 * 3. Borrá lo que haya y pegá TODO este archivo.
 * 4. Guardá (💾).
 * 5. Implementar → Nueva implementación → tipo "Aplicación web".
 *      - Ejecutar como: Yo
 *      - Quién tiene acceso: Cualquier persona
 * 6. Copiá la URL que termina en /exec.
 * 7. Pegala en Vercel como variable de entorno  RSVP_SHEET_WEBHOOK.
 *
 * La primera vez te va a pedir autorizar permisos: aceptá.
 */

var HEADERS = ["Fecha", "Grupo", "Nombre", "Invitado de", "Asiste", "Restricción", "Mensaje"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Escribe encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    var fecha = data.fecha || new Date().toLocaleString("es-AR");
    var grupo = data.grupo || "";
    var invitadoDe = data.invitadoDe || "";
    var mensaje = data.mensaje || "";
    var personas = Array.isArray(data.personas) ? data.personas : [];

    // Compatibilidad con envíos viejos (un solo invitado, sin "personas")
    if (personas.length === 0 && data.nombre) {
      personas = [{
        nombre: data.nombre,
        asiste: data.asiste,
        restriccion: data.restricciones || data.restriccion,
      }];
    }

    // Una fila por persona, todas con el mismo Grupo, Fecha y Mensaje
    personas.forEach(function (p) {
      sheet.appendRow([
        fecha,
        grupo,
        p.nombre || "",
        invitadoDe,
        p.asiste || "",
        p.restriccion || "",
        mensaje,
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite probar la URL desde el navegador (GET)
function doGet() {
  return ContentService.createTextOutput("RSVP endpoint activo ✔");
}
