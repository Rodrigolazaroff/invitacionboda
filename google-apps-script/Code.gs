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

var HEADERS = ["Fecha", "Nombre", "Asiste", "Acompañantes", "Restricciones", "Mensaje"];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Escribe encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    sheet.appendRow([
      data.fecha || new Date().toLocaleString("es-AR"),
      data.nombre || "",
      data.asiste || "",
      data.acompanantes || "",
      data.restricciones || "",
      data.mensaje || "",
    ]);

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
