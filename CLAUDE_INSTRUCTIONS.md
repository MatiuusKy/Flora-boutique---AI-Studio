# Contexto del Proyecto: Flora Boutique - Panel Administrativo

Este documento sirve como contexto para la generación de scripts y funcionalidades adicionales utilizando Claude Code u otros asistentes de IA.

## 1. Visión General
**Flora Boutique** es una florería de gama alta con un enfoque en la personalización y la fidelización a largo plazo. El administrador del negocio necesita un panel centralizado que no solo muestre ventas, sino que actúe como un socio estratégico impulsado por datos.

## 2. Stack Tecnológico
- **Framework:** React 18+ con Vite.
- **Styling:** Tailwind CSS (Mobile-first, diseño limpio y minimalista).
- **Iconografía:** Lucide React.
- **Animaciones:** Framer Motion (Transiciones de página y modales).
- **Gráficos:** Recharts (Análisis de tendencias y distribución).
- **Componentes Base:** Arquitectura similar a shadcn/ui (Cards, Buttons, Inputs, Tabs).

## 3. Lógica de Negocio Implementada
- **Suscripciones por Fechas:** Los usuarios no se suscriben a una entrega semanal genérica, sino que programan fechas clave (Cumpleaños de mamá, aniversarios, etc.).
    - *Planes:* Classic ($35 USD), Premium ($55 USD), Deluxe Custom ($85 USD).
- **Sistema de Referidos:** Programa "Ganamos Ambos". Si un cliente es referido, tanto el referente como el nuevo cliente reciben un bono de $5.000 CLP.
- **Gestión de Comunas (RM):** Seguimiento de ventas por comuna para optimización logística en Santiago de Chile.
- **Auditoría de Marketing:** Integración de recomendaciones basadas en competencia (Google Ads vs Meta Ads).
- **Canales Sociales:** Seguimiento de Instagram y TikTok como motores principales de tráfico.

## 4. Estructura de Datos (Mock)
Para los scripts, considera las siguientes entidades:
- `orders`: [id, customer, amount, channel (Web/WhatsApp/Social), source, status].
- `subscriptions`: [tier, nextDate, type (Anniversary/Birthday), customer].
- `communes`: [name, value, density].

## 5. Recomendaciones de Dashboard (Roadmap)
Si se generan nuevos módulos, priorizar:
1. **Predicción de Merma (Flower Waste):** Análisis predictivo para saber cuántas flores de ciertas especies (Tulipanes, Lirios) se perderán si no se venden en las próximas 48h.
2. **Mapa de Calor de Entregas:** Visualización geográfica de los pedidos para agrupar rutas de despacho (Logística inteligente).
3. **Embudo de Conversión Social:** Rastreo del flujo desde Instagram/TikTok -> Consulta WhatsApp -> Venta Cerrada.
4. **Calculadora de LTV (Customer Lifetime Value):** Cuánto dinero aporta un cliente en un año comparando ventas únicas vs suscriptores.
5. **Alertas Diarias IA:** Notificaciones matutinas sobre eventos próximos y stock crítico.

## 6. Guía de Estilo de Código
- Usar **TypeScript** estrictamente.
- Componentes funcionales con `useState`, `useMemo` y `useEffect` minimalistas.
- Mantener el diseño en la paleta de colores: `primary-custom: #580A2D`, `secondary: #FDA4AF`.
- Accesibilidad y diseño responsivo para uso en tablets/móviles por parte del personal de tienda.
