# Auditoría y Plan Geológico: Flora Boutique

## 1. Auditoría del Código (Basado en el Repositorio)

### Fortalezas
- **Stack Moderno**: React + Vite + Shadcn UI es una combinación ganadora para rendimiento y DX.
- **SEO Ready**: Ya tienes implementados Meta Tags, Open Graph y JSON-LD. Esto es vital para una florería local.
- **Animaciones**: El uso de Framer Motion le da un toque premium ("artisanal").
- **Estructura**: Lovable genera estructuras limpias y mantenibles.

### Oportunidades de Mejora
- **Limpieza de Producción**: Tienes múltiples versiones de la página de inicio (`IndexV2`, `Index`, etc.). Antes de producción, elige una y elimina el resto para reducir el tamaño del bundle.
- **Naming de Rutas**: Cambia las rutas como `/v2` por nombres descriptivos o manéjalas internamente para A/B testing.
- **Imágenes**: Asegúrate de usar formatos modernos como WebP y carga diferida (lazy loading) para los arreglos florales, ya que serán el contenido más pesado.

---

## 2. Implementación de Ads (Google & Meta)

He creado una utilidad en `src/lib/analytics.ts` y un componente `Analytics.tsx`.

### Cómo usarlo:
1. **Configura las variables** en tu archivo `.env`:
   ```env
   VITE_GOOGLE_ADS_ID="AW-123456789"
   VITE_META_PIXEL_ID="9876543210123"
   ```
2. **Integra el componente** en tu `App.tsx` dentro del `BrowserRouter`:
   ```tsx
   <BrowserRouter>
     <Analytics />
     <Routes>...</Routes>
   </BrowserRouter>
   ```
3. **Mide Conversiones**:
   Cuando un usuario agregue al carrito:
   ```tsx
   import { analytics } from '@/lib/analytics';
   analytics.addToCart(productId, productName, price);
   ```

---

## 3. Hoja de Ruta (Roadmap)

### Fase A: Supabase (Base de Datos)
- **Tablas Recomendadas**:
  - `products`: id, name, description, price, image_url, category, stock.
  - `orders`: id, user_id, total, status, delivery_date, delivery_address.
  - `order_items`: id, order_id, product_id, quantity, subtotal.
- **Estrategia**: He creado `src/lib/supabase.ts`. Ya puedes conectarte usando las variables de entorno `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

### Fase B: Carrito de Compras Extendido
- Implementar validación de stock en tiempo real usando Supabase.
- Añadir sección de "Mensaje Personalizado" (vital para flores).
- Selector de fecha de entrega (DatePicker de Shadcn).

### Fase C: Deployment (Vercel vs Railway)
- **Vercel**: Es la mejor opción para este Tech Stack (Vite/React). Su CDN global y optimización de imágenes son perfectas para un showcase visual.
- **Railway**: Úsalo si decides añadir un backend pesado en Node.js, pero para una App de Supabase + React, Vercel es superior.

### Fase D: Tracking de Ventas e Intel de Marketing
- Implementar el evento `Purchase` en la página de "Gracias por tu compra".
- **Tracking de Palabras Clave**: Ya configuré `src/lib/analytics.ts` para que capture parámetros `utm_term` (palabras clave) de la URL automáticamente.
- Configurar "Conversiones mejoradas" en Google Ads para mayor precisión con el email del cliente (hasheado).

---

## 4. Integración de Pagos (Chile)

Para implementar Webpay o Mercado Pago, hemos pasado a una arquitectura **Full-Stack** (revisa `server.ts`).

### Recomendación: Mercado Pago vs Webpay
1. **Mercado Pago**: Más rápido de implementar, mejor UX móvil.
2. **Webpay (Transbank)**: Comisiones bajas, integración más rígida.

---

## 5. Cómo Superar a Shopify y WordPress (Tu Ventaja Competitiva)

### Estructura de Páginas Independientes (SEO)
- **URLs Semánticas**: Hemos implementado rutas `/producto/:slug` y `/categoria/:category`. Esto permite que Google indexe cada arreglo floral individualmente bajo palabras clave específicas como "Rosas Luxury Santiago".
- **Transiciones Seamless**: A diferencia de Shopify que recarga la página, usamos `AnimatePresence`. Esto hace que el usuario sienta que está en una App premium mientras mantenemos la estructura de un e-commerce robusto.

### Marketing y Tracking de Precisión
- **Tracking de Palabras Clave**: La utilidad en `src/lib/analytics.ts` ahora captura automáticamente parámetros UTM. Si alguien llega desde un anuncio buscando "flores a domicilio", sabrás exactamente qué palabra clave convirtió.
- **Micro-conversiones**: No solo rastrearemos la compra final, sino también el "Personalizar Mensaje", lo cual es un indicador de intención de compra muy alto.

### Minimalismo vs Funcionalidad
- **Mobile First**: El diseño minimalista que estamos construyendo reduce la fricción en móviles, que es donde ocurre el 80% de las ventas de flores. No usaremos barras laterales pesadas, sino menús flotantes elegantes.

---

## 6. Fidelización y Social Login (El Futuro)

### Autenticación con Supabase
- **Social Login**: Implementaremos Google y Meta usando Supabase Auth. Esto permitirá que los clientes guarden sus direcciones de envío y fechas de aniversario (notificaciones push/email futuras).
- **Costo**: $0 hasta los 50k usuarios.

### Estrategia de suscripciones y Puntos
- **Tabla `loyalty_points`**: Cada compra sumará puntos que se pueden canjear por envíos gratis o descuentos.
- **Suscripciones**: Usaremos el módulo de **Pagos Recurrentes de Mercado Pago** conectado a nuestro servidor Node.js para gestionar membresías de flores frescas.

### Infraestructura (Cloudflare)
- Usaremos Cloudflare no solo para DNS, sino para "Image Optimization" (formato WebP automático), asegurando que las fotos de tus ramos carguen instantáneamente sin perder calidad.

---

¿Te gustaría que cree el componente de `Login` base para que ya puedas empezar a probar la conexión con Supabase Auth?
