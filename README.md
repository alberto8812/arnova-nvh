# Solvia Landing

Landing page de Solvia — plataforma de crédito para pequeños comercios en **El Salvador** y **Guatemala**. Explica el producto, muestra los montos disponibles vía el simulador de crédito y dirige al usuario a WhatsApp para iniciar el proceso (sin formularios tradicionales).

Al ingresar por primera vez, el visitante elige su país en un modal obligatorio; esa elección queda guardada localmente y determina el copy, el dialecto, la moneda y los datos del simulador que se muestran en el resto del sitio (ver [Selector de país](#selector-de-país-y-contenido-por-país) más abajo).

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 8](https://vitejs.dev)
- [React Router](https://reactrouter.com) (`createBrowserRouter`, ver `src/router.tsx`)
- [Zustand](https://zustand.docs.pmnd.rs) + `persist` para el estado del país seleccionado (ver `src/stores/country-store.ts`)
- [Tailwind CSS 4](https://tailwindcss.com) (tokens en `src/styles/globals.css`)
- [Motion](https://motion.dev) para animaciones
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) como gate anti-bots del chat (ver `docs/proteccion-anti-bots.md`)
- [Oxlint](https://oxc.rs) como linter
- [pnpm](https://pnpm.io) como package manager

## Requisitos

- Node.js 20+
- pnpm

## Uso

```bash
pnpm install
pnpm dev        # servidor de desarrollo con HMR
pnpm build      # typecheck + build de producción
pnpm preview    # preview del build
pnpm lint       # oxlint
pnpm typecheck  # tsc --noEmit (no-op en la raíz; usar `pnpm exec tsc --noEmit -p tsconfig.app.json` para el chequeo real)
```

## Selector de país y contenido por país

El sitio soporta dos países, **SV** (El Salvador) y **GT** (Guatemala), como único punto de entrada de configuración regional:

- `src/stores/country-store.ts` — store de Zustand con `persist` (localStorage, key `solvia-country`). Guarda solo el país elegido; el estado de si el modal está abierto/es cerrable es efímero y se resuelve de forma síncrona al crear el store (sin `useEffect`), para que el modal bloqueante de la primera visita nunca "parpadee".
- `src/components/country-modal.tsx` — modal de selección. No se puede cerrar sin elegir país en la primera visita; sí es cerrable cuando se reabre desde el navbar.
- `src/components/layout/navbar.tsx` — muestra el país activo y permite reabrir el modal para cambiarlo.
- `src/data/sv/` y `src/data/gt/` — todo el contenido del sitio (19 archivos JSON por país: hero, stats, benefits, steps, services, about, coverage, testimonials, videos, contact, jobs, faq, job-application, jobs-page, legal, simulator, videos-section, nav, testimonials-section), en español, con dialecto propio por país (El Salvador en voseo/registro directo, Guatemala en "usted"/registro más formal en varios contextos). No hay un `src/data/index.ts` raíz — cada país tiene su propio `index.ts` que valida su bundle contra `ContentBundle` (`src/types/content.types.ts`) con `satisfies`, así que cualquier diferencia estructural entre ambos países falla en `tsc`, no en runtime.
- `src/hooks/use-content.ts` — hook que expone el bundle del país activo (fallback a `SV` mientras no hay país elegido). Devuelve siempre una de dos referencias de objeto estables (no reconstruidas en cada render), así que los `useMemo`/`useEffect` que dependen de campos del contenido no se invalidan de más.
- El simulador de crédito (`simulator-section.tsx`, `amount-selector-section.tsx`) toma tasa, montos, moneda (`USD` para SV, `GTQ` para GT) y locale (`es-SV`/`es-GT`) desde el `simulator.json` del país activo — el cálculo (`calcCuotaDiaria`) es puro y no sabe nada de país, solo recibe los números ya resueltos.

**Nota importante para cualquier componente que renderice listas de contenido**: como el texto (`label`, `title`, `nombre`, etc.) cambia entre países, **nunca usar un campo de contenido como `key` de React** en un `.map()` — usar el índice de posición. Usar un campo de texto como key hace que React desmonte/remonte el elemento al cambiar de país (porque la key cambió), lo que puede dejar animaciones de entrada (`whileInView` con `viewport={{ once: true }}`) atascadas en su estado inicial invisible. Ya se corrigió este patrón en varias secciones (trust-bar, FAQ, videos, coverage, about, testimonials, careers) — mantenerlo al agregar contenido nuevo.

## Pendientes de negocio/legal (no técnicos)

- Valores reales del simulador por país (tasa de interés, montos mínimo/máximo, número de WhatsApp) — hoy son placeholders clonados del contenido original, pendientes de confirmación del negocio.
- `src/data/{sv,gt}/legal.json` tiene marcadores explícitos de "pendiente de confirmación final por el área legal" — el contenido regulatorio real de cada país debe revisarse antes de publicar.
- Ciudades usadas en `coverage.json` y `jobs.json` (San Salvador, Ciudad de Guatemala) son placeholders razonables, pendientes de confirmación real de cobertura/oficinas.
- `src/data/{sv,gt}/contact.json` → `social.instagram`/`social.facebook` quedaron con un handle genérico ("Instagram de Solvia"/"Facebook de Solvia", sin país) tras remover una referencia incorrecta a "Brasil" — confirmar handles reales si aplica.
- `VITE_TURNSTILE_SITE_KEY` no está configurada (no existe `.env` ni `.env.example` en el repositorio). Sin esa env var el widget de Turnstile nunca se renderiza y el botón de WhatsApp del chat queda deshabilitado en todos los ambientes (fail-closed, intencional). Ver `docs/proteccion-anti-bots.md` para el paso a paso de Cloudflare + Vercel.
- Activar manualmente **Vercel Bot Protection / Attack Challenge Mode** en el dashboard de Vercel (no es configuración de código).

## Estructura

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout (contiene el <Outlet /> con transición de ruta)
│   ├── sections/        # Secciones de la landing (hero, beneficios, simulador, pasos, servicios, sobre, cobertura, testimonios, videos, contacto, faq, careers)
│   ├── motion/           # Wrappers de animación (reveal, counter, variants)
│   ├── ui/               # Componentes base (button, card, badge, heading, icon)
│   ├── country-modal.tsx        # Modal de selección de país
│   ├── compliance-modal.tsx     # Modal de documentos legales
│   ├── job-modal.tsx            # Modal de detalle de vacante
│   ├── testimonial-modal.tsx    # Modal de testimonio completo
│   └── floating-chat-widget.tsx # Widget flotante de chat/WhatsApp global (protegido con Cloudflare Turnstile)
├── pages/                # HomePage y JobsPage (/careers)
├── router.tsx             # Rutas con createBrowserRouter ("/" y "/careers")
├── stores/country-store.ts      # Estado global del país seleccionado (Zustand + persist)
├── hooks/use-content.ts         # Hook que sirve el contenido del país activo
├── data/
│   ├── sv/                # Contenido en español (dialecto El Salvador), 19 JSON + index.ts
│   └── gt/                # Contenido en español (dialecto Guatemala), 19 JSON + index.ts
├── lib/                   # Utilidades (bridge de chat, scroll a hash, etc.)
├── styles/globals.css     # Design tokens de Tailwind v4 (brand/neutral)
└── types/content.types.ts # ContentBundle y tipos de todo el contenido
```

El flujo de conversión es: el usuario elige su país → ve el producto → pasa por el `SimulatorSection` (simulador de crédito, con tasa/montos/moneda del país activo) → es dirigido a WhatsApp. El `AmountSelectorSection` queda comentado en `home-page.tsx` hasta que el producto tenga condiciones reales definidas, y no hay formulario de contacto tradicional. La página `/careers` (`JobsPage`) muestra las vacantes abiertas de Solvia (dato estático en `src/data/{sv,gt}/jobs.json`), sin postulación online.

La sección de Preguntas Frecuentes (`FaqSection`, contenido en `src/data/{sv,gt}/faq.json`) queda al final de la landing, antes del footer.

## Documentación adicional

Ver `docs/`:

- `seo-implementacion.md` — metadatos, sitemap, robots, JSON-LD
- `formulario-email-whatsapp.md` — decisión de reemplazar el formulario por WhatsApp
- `deteccion-pais-dialectos.md` — **desactualizado**: propone detección automática de país por geo-IP para dialectos AR/MX de un proyecto anterior ("fondi-landing"); quedó reemplazado por el selector manual de país (SV/GT) descrito arriba, no lo uses como referencia de la implementación actual
- `deploy-aws-godaddy.md` — pasos de deploy (S3 + CloudFront + ACM + DNS en GoDaddy)
- `proteccion-anti-bots.md` — Cloudflare Turnstile + Vercel Bot Protection
