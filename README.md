# Arnova Landing

Landing page de Arnova — plataforma de crédito para pequeños comercios en **El Salvador** y **Guatemala**. Explica el producto y dirige al usuario a WhatsApp para iniciar el proceso — por los botones de contacto o por el asistente **Nova** (sin formularios tradicionales).

Al ingresar por primera vez, el visitante elige su país en un modal obligatorio; esa elección queda guardada localmente y determina el copy, el dialecto, la moneda, los números de WhatsApp y el mapa de cobertura que se muestran en el resto del sitio (ver [Selector de país](#selector-de-país-y-contenido-por-país) más abajo).

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
- `src/components/country-modal.tsx` — modal de selección de la primera visita ("Selecciona el país de tu ubicación para conocer más información."). No se puede cerrar sin elegir país.
- `src/components/country-selector.tsx` — botón **"País · SV"** del navbar con menú desplegable (ARIA `menu`/`menuitemradio`, flechas, Enter, Escape, clic fuera) para cambiar de país sin el modal. Banderas en SVG (`country-flag.tsx`) porque Windows no renderiza los emoji de bandera.
- `src/components/layout/navbar.tsx` — los enlaces se muestran desde 1100px de ancho (debajo, menú hamburguesa). El corte se midió para que entren logo + enlaces + País + CTA; las notebooks de 14" con escalado 150% reportan ~1263px.
- `src/data/sv/` y `src/data/gt/` — todo el contenido del sitio (JSON por país: hero, stats, benefits, growth-section, steps, services, about, mission-vision, coverage, testimonials, videos, contact, jobs, faq, job-application, jobs-page, legal, simulator, videos-section, nav, testimonials-section), en español, con dialecto propio por país (El Salvador en voseo/registro directo, Guatemala en "usted"/registro más formal en varios contextos). No hay un `src/data/index.ts` raíz — cada país tiene su propio `index.ts` que valida su bundle contra `ContentBundle` (`src/types/content.types.ts`) con `satisfies`, así que cualquier diferencia estructural entre ambos países falla en `tsc`, no en runtime.
- `src/hooks/use-content.ts` — hook que expone el bundle del país activo (fallback a `SV` mientras no hay país elegido). Devuelve siempre una de dos referencias de objeto estables (no reconstruidas en cada render), así que los `useMemo`/`useEffect` que dependen de campos del contenido no se invalidan de más.
- El simulador de crédito (`simulator-section.tsx`, `amount-selector-section.tsx`) está **comentado** en `home-page.tsx` por pedido del cliente (se conserva para reactivarlo). Cuando está activo toma tasa, montos, moneda (`USD` para SV, `GTQ` para GT) y locale (`es-SV`/`es-GT`) desde el `simulator.json` del país activo — el cálculo (`calcCuotaDiaria`) es puro y no sabe nada de país, solo recibe los números ya resueltos.

**Nota importante para cualquier componente que renderice listas de contenido**: como el texto (`label`, `title`, `nombre`, etc.) cambia entre países, **nunca usar un campo de contenido como `key` de React** en un `.map()` — usar el índice de posición. Usar un campo de texto como key hace que React desmonte/remonte el elemento al cambiar de país (porque la key cambió), lo que puede dejar animaciones de entrada (`whileInView` con `viewport={{ once: true }}`) atascadas en su estado inicial invisible. Ya se corrigió este patrón en varias secciones (trust-bar, FAQ, videos, coverage, about, testimonials, careers) — mantenerlo al agregar contenido nuevo.

## Pendientes de negocio/legal (no técnicos)

- Valores reales del simulador por país (tasa de interés, montos mínimo/máximo, número de WhatsApp) — hoy son placeholders clonados del contenido original, pendientes de confirmación del negocio.
- `src/data/{sv,gt}/legal.json` contiene un único documento, **Términos y Condiciones**, con el texto de https://www.arnovagroup.com/términos-y-condiciones (es el único enlace de la columna Legal del footer). El correo final (`contacto@arnovagroup.com`) se completó porque en la web original no se pudo extraer — **confirmar**. Guatemala usa el mismo texto, que cita leyes y tribunales de El Salvador — **definir versión para GT**.
- La sección Cobertura muestra solo "atención personalizada a nivel nacional" con un mapa de puntos por país (`coverage-map.tsx`, siluetas **aproximadas**). `coverage.locations` se conserva porque lo usa el footer; esas ciudades y las de `jobs.json` siguen pendientes de confirmación.
- `src/data/{sv,gt}/contact.json` → `social.instagram`/`social.facebook` quedaron con un handle genérico ("Instagram de Arnova"/"Facebook de Arnova", sin país) tras remover una referencia incorrecta a "Brasil" — confirmar handles reales si aplica.
- `VITE_TURNSTILE_SITE_KEY` no está configurada (no existe `.env` ni `.env.example` en el repositorio). Sin esa env var el widget de Turnstile nunca se renderiza y el botón de WhatsApp del chat queda deshabilitado en todos los ambientes (fail-closed, intencional). Ver `docs/proteccion-anti-bots.md` para el paso a paso de Cloudflare + Vercel.
- Activar manualmente **Vercel Bot Protection / Attack Challenge Mode** en el dashboard de Vercel (no es configuración de código).

## Estructura

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout (contiene el <Outlet /> con transición de ruta)
│   ├── sections/        # Secciones de la landing (hero, trust bar, beneficios, crecimiento, pasos, cobertura, requisito, propósito, misión y visión, testimonios, videos, contacto, careers; simulador, servicios y faq comentados)
│   ├── motion/           # Wrappers de animación (reveal, counter, variants)
│   ├── ui/               # Componentes base (button, card, badge, heading, icon)
│   ├── country-modal.tsx        # Modal de selección de país
│   ├── compliance-modal.tsx     # Modal de documentos legales
│   ├── job-modal.tsx            # Modal de detalle de vacante
│   ├── testimonial-modal.tsx    # Modal de testimonio completo
│   └── floating-chat-widget.tsx # Asistente Nova: chat flotante → WhatsApp (protegido con Cloudflare Turnstile)
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

El flujo de conversión es: el usuario elige su país → ve el producto (hero, trust bar, beneficios, sección de crecimiento con videos, pasos, cobertura, requisito único) → contacta por WhatsApp desde los botones "Contáctanos" o desde **Nova**. No hay formulario de contacto tradicional. `SimulatorSection` y `AmountSelectorSection` quedan comentados en `home-page.tsx`.

**Nova** (`floating-chat-widget.tsx`, copy en `contact.json`): pregunta nombre y apellido, ciudad y departamento, colonia y si tiene un negocio en funcionamiento. Si responde **No**, cierra con un mensaje, no envía nada y ofrece "Empezar de nuevo". Si responde **Sí**, pregunta la actividad del negocio y abre WhatsApp con las respuestas hacia `contact.chatWaNumber` del país (SV 50370594072, GT 50252993553). `contact.waNumber` sigue siendo el número del footer.

**Sección de crecimiento** (`growth-section.tsx`): banda navy con el mensaje y 3 loops de video (`public/videos/crecimiento-0{1,2,3}.mp4` + póster `.jpg`) que rotan con fundido. Los loops se generan con Remotion en el proyecto externo `C:UserssoporteqaVideosondius-videos` (`src/loops/arnova-loops.tsx`, paleta `arnova`; render: `npx remotion render <id> out/<id>.mp4 --muted --crf=28`).

La página `/careers` (`JobsPage`) muestra el texto de "Trabaja con nosotros" con el envío de hoja de vida a recursoshumanos@arnovagroup.com y las vacantes (`src/data/{sv,gt}/jobs.json`); la sección de expectativas está comentada.

La sección de Preguntas Frecuentes (`FaqSection`, contenido en `src/data/{sv,gt}/faq.json`) está **comentada** en `home-page.tsx` por pedido del cliente.

**Al ocultar una sección**, comentar también su línea en el `import`: un import sin usar rompe `tsc -b` (y por lo tanto `pnpm build`) aunque `pnpm dev` funcione.

Las propuestas de diseño de cada sección están en `design/<slug>/` (artboards HTML) con el sistema de diseño en `design/system.md`; el seguimiento de esta iteración está en `odd/tasks/seccion-crecimiento.md`.

## Documentación adicional

Ver `docs/`:

- `seo-implementacion.md` — metadatos, sitemap, robots, JSON-LD
- `formulario-email-whatsapp.md` — decisión de reemplazar el formulario por WhatsApp
- `deteccion-pais-dialectos.md` — **desactualizado**: propone detección automática de país por geo-IP para dialectos AR/MX de un proyecto anterior ("fondi-landing"); quedó reemplazado por el selector manual de país (SV/GT) descrito arriba, no lo uses como referencia de la implementación actual
- `deploy-aws-godaddy.md` — pasos de deploy (S3 + CloudFront + ACM + DNS en GoDaddy)
- `proteccion-anti-bots.md` — Cloudflare Turnstile + Vercel Bot Protection
