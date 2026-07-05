# Antigravity Memory Protocol - Invitación de Boda

## 1. Checkpoint
- **Proyecto**: Tarjeta de invitación interactiva (Nahiara & Rodrigo).
- **Stack**: Next.js 14 + Framer Motion.
- **Estado actual**: Flores nuevas del usuario integradas en secciones 3, 4 y 6.

## 2. Diff Log
- **Estado Deseado Anterior**: Usar flores genéricas (eucalyptus_left/right) con componente Botanical.
- **Lo que realmente pasó**: El usuario proporcionó sus propias flores (`florarribaizquierda.png` y `florabajoderecha.png`). Son imágenes distintas con tamaños diferentes. Se dejó de usar el componente genérico Botanical en ChurchSection, PartySection y Rsvp, y se usan motion.img directos con tamaños individuales y posicionamiento que evita superposición con el texto.

## 3. Process Registry
- [x] Correcciones de diseño de la diseñadora.
- [x] Sobre de apertura con sello N&R.
- [x] Fix RSVP "No asiste".
- [x] Campo "Invitado de" y timeout.
- [x] Reestructuración de secciones (orden pedido).
- [x] ChurchSection: flores nuevas arriba-izq y abajo-der, sin superposición.
- [x] PartySection: foto primero, flor nueva solo abajo-der, sin superposición.
- [x] RSVP: flores nuevas en intro, sin superposición, formulario aparte.
- [x] RSVP: sin corazón cuando dice "no".
- [x] Gifts: se sacaron N° de cuenta y CUIL.
- [x] Closing: se sacó "Hecho con cariño para...".
- [x] Integración de florarribaizquierda.png y florabajoderecha.png (imágenes del usuario).
- [ ] Esperando nuevas instrucciones.
