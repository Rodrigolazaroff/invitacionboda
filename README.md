# Invitación de boda — Nahiara & Rodrigo 💍

Tarjeta de invitación interactiva (una sola página con scroll), fiel al diseño
botánico de la tarjeta original. Hecha con **Next.js 14 + Framer Motion**, lista
para desplegar en **Vercel**.

- 📅 Sábado 12 de diciembre de 2026 · Goya, Corrientes
- 🌿 Paleta, tipografías (Lato + script) e ilustraciones de eucalipto tomadas de la tarjeta original
- ✅ Confirmación de asistencia integrada (reemplaza el Google Form) → guarda en tu Google Sheet
- 🎁 Sección de regalos con botones "Copiar" alias / CVU / CBU
- ⏳ Cuenta regresiva + 🖼️ galería de fotos con lightbox

---

## 1. Correr en local

```bash
npm install
npm run dev
```
Abrí http://localhost:3000

## 2. Cambiar textos, fechas, direcciones

Todo el contenido está centralizado en **`lib/data.js`**: nombres, fecha,
direcciones + links de mapa, itinerario, dress code, datos bancarios, etc.
No hace falta tocar los componentes.

## 3. Reemplazar las fotos

Las fotos van en **`public/assets/photos/`**. Actualmente hay 3 (`couple_1..3.webp`)
usadas como *placeholder* (extraídas del PDF). Reemplazá esos archivos por las
tuyas (mismo nombre) o cambiá las rutas en `lib/data.js`:

- `photos.cover` → foto principal (bajo la cuenta regresiva)
- `photos.party` → foto de la sección Fiesta
- `photos.closing` → foto del cierre (redonda)
- `gallery[]` → fotos de la galería

> Recomendado: formato `.webp` o `.jpg`, ~1400px de ancho, orientación vertical.

## 4. Confirmaciones → tu Google Sheet

1. Creá una Google Sheet nueva.
2. **Extensiones → Apps Script**, pegá el contenido de
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) y seguí los pasos
   del comentario (Implementar como *Aplicación web*, acceso *Cualquiera*).
3. Copiá la URL `…/exec` que te da.
4. Guardala como variable de entorno `RSVP_SHEET_WEBHOOK`
   (en local: `.env.local`; en Vercel: **Settings → Environment Variables**).

Sin esa variable, el formulario **igual funciona** en modo desarrollo (las
respuestas se imprimen en la consola del servidor, no se guardan).

## 5. Deploy en Vercel

1. Subí el proyecto a un repo de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New → Project** → importá el repo.
3. Framework: *Next.js* (autodetectado). Deploy.
4. Agregá la variable `RSVP_SHEET_WEBHOOK` en **Settings → Environment Variables**
   y volvé a desplegar (*Redeploy*).

## Estructura

```
app/
  layout.jsx        Fuentes (Lato + Parisienne) y metadata
  page.jsx          Orden de las secciones
  globals.css       Sistema de diseño (paleta, tipografía, componentes)
  api/rsvp/route.js Endpoint que reenvía el RSVP a Google Sheets
components/          Cover, Countdown, Venue, Itinerary, Rsvp, Gifts, Gallery, Closing…
lib/data.js         ⭐ Todo el contenido editable
public/assets/      Ilustraciones de eucalipto + fotos
google-apps-script/ Script para la Google Sheet
```

## Notas de diseño

- **Tipografía script**: la tarjeta original usa *Snell Roundhand* (fuente de Apple,
  con licencia). Acá se usa **Parisienne** (Google Fonts), visualmente muy parecida
  y gratuita. Se puede cambiar en `app/layout.jsx`.
- **Ilustraciones**: las ramas de eucalipto son el asset real de la tarjeta,
  extraído con transparencia.
- **Regalos**: por decisión del cliente, solo botones de "Copiar" (sin link de pago).
  Si más adelante querés un botón de pago de Mercado Pago de un toque, se puede
  generar un *Link de pago* desde tu cuenta MP y sumarlo.
