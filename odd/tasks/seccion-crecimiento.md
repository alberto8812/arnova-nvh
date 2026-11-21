# Sección de crecimiento (reemplaza al simulador)

Home SV y GT: comentar el simulador y poner la sección del diseño 02 (texto en secuencia + medio visual con datos flotantes), sin botón, con 2-3 videos loop web hechos en Remotion con la paleta Arnova que rotan con transiciones suaves.

## Specs

- S1: "me piden retirar el simulador pero lo podemos comentar por si a futuro lo exigen" — `<SimulatorSection />` queda comentado, el componente no se borra; no quedan enlaces rotos al simulador.
- S2: (L9) "Tus ventas mantienen tu negocio, un crédito bien manejado te permite crecer, pero con Arnova aceleras ese crecimiento de forma cómoda y segura." — texto exacto en SV y GT (reemplaza el de L1).
- S3: "me gusta la segunda" — layout de `design/crecimiento-arnova/02-split-imagen.html`.
- S4: "tambien podemos retirar el boton de contactenos" — la sección no tiene botón.
- S5: "agregar un video de este estilo C:\Users\soporteqa\Videos\fondius-videos ... se puede diseñar uno con los colores de arnova y que haga referencia" — paleta Arnova en el proyecto Remotion.
- S6: "veamos como es un loop create dos o tres lo que creas correspondiente esto para variar y no siempre se vea el mismo y que tenga cambios con transiciones suaves y moderna" — 2-3 loops web que rotan en la sección con transiciones suaves.
- S7: (L11) "crear un diseño apropiado para este tipo de publicidad ... da diversas opciones de diseño que tenga buena experiencia de usuario y no redunde en información que ya está en la página" — la sección no repite datos del TrustBar (+70.000/+5.000, desembolso en minutos, 4.9/5, $0/Q0) ni de Beneficios (atención inmediata, asesoría, pagos de acuerdo a tu capacidad, asesor a la misma hora).
- S8: (L15) "explorar cual es el mejor diseño para esta sección solo dame opciones ... acorde a una buena experiencia de usuario y experto en ui" — solo propuestas (sin tocar src/) para la sección "Pasos para solicitar un crédito" con el texto de L14.
- S9: (L18) "en la sección de cobertura solo quieren esta información: Nuestra cobertura / Arnova ofrece atención personalizada a nivel nacional." + "implementemos un buen diseño y dame opciones para que no quede tan básico" — SV y GT; se retiran ciudades y requisitos.
- S10: (L22) "Se retiran las tarjetas y solo se deja el texto: Para solicitar tu asesoría y crédito solo necesitas tener negocio propio" + "implementemos un diseño porque es un solo texto que reemplazará varios componentes" — SV y GT.
- S11: (L28) "muéstrame diseño sobre este ya que siento que no respeta el diseño de la página ni la iconografía previamente establecida" — Misión y Visión con el texto de L27, usando solo patrones e íconos existentes del sitio.
- S12: (L31) "en las preguntas del chatbot deben ser estas y el chatbot se llamará nova
  Preguntas y orden del chatbot
  1. Nombre y apellido
  2. ¿En qué ciudad y departamento te encuentras?
  3. ¿Cuál es tú colonia?
  4. ¿Tienes un negocio en funcionamiento? si se elige No finaliza el chat con mensaje cuando responde Si realiza pregunta 5 envia las respuestas
    4.1 Mensaje si se elige No: Actualmente sólo contamos con productos financieros para personas que posean un negocio,  en cuanto tengamos un producto adecuado para ti, nos pondremos en contacto. Hasta pronto! 🤩🙏
  5 ¿A qué se dedica tu negocio?
  Las respuestas se van a enviar a los números de contacto de cada país" — números: SV 50370594072, GT 50252993553 (los del CTA del Hero); contact.waNumber del footer no se toca.

## Tasks

- T1 (S5, S6) Remotion: paleta `arnova` + 3 loops (`arnova-loop-crecimiento|negocio|pasos`, 1080x1350, 10 s, ~600 KB) en fondius-videos/src/loops/arnova-loops.tsx; copiados a public/videos. HECHO. Commit: n/a (fondius-videos no es repo propio).
- T2 (S1-S4, S6) Web: comentar simulador, sección nueva con rotación de videos, datos en SV/GT, reduced-motion y carga diferida. Ruta: inline. Commit: pendiente.
- T3 (S6) Loop 3 reemplazado por visita del asesor. HECHO 0ecc342.
- T4 (S7) Propuestas de diseño v2 sin información redundante: design/crecimiento-v2/ (3 artboards). Ruta: worker (context backstop). Commit: pendiente.
- T6 (S2, S7) Implementar artboard elegido design/crecimiento-v2/03-banda-inmersiva.html (01 y 02 son alternativas). Ruta: inline. Commit: ver Log L13.
- T7 (S8) Propuestas de diseño para la sección de pasos: design/pasos-credito/ (3 artboards, solo opciones). Ruta: worker. Commit: pendiente.
- T8 (S8, L14) Implementar artboard elegido design/pasos-credito/03-asesoria-y-pasos.html (01 y 02 son alternativas). Ruta: inline. Commit: ver Log L17.
- T9 (S9) Propuestas de diseño para Cobertura: design/cobertura/ (3 artboards). Ruta: worker. Commit: pendiente.
- T10 (S9) Implementar artboard elegido design/cobertura/01-mapa-de-presencia.html (02 y 03 son alternativas): CoverageSection solo título + frase, mapa de puntos por país (SV/GT), se retiran ciudades y requisitos. Ruta: worker (context backstop). HECHO; commit: ver Log L21.
- T11 (S10) Propuestas de diseño para Requisitos (una sola frase): design/requisitos/ (3 artboards). Ruta: worker. Commit: pendiente.
- T12 (S10) Implementar artboard elegido design/requisitos/02-franja-de-confianza.html (01 y 03 son alternativas): franja accent-100 después de Cobertura. Ruta: worker. HECHO; commit: ver Log L25.
- T13 (S11) Propuestas de rediseño de Misión y Visión respetando el sistema de la página e iconografía existente: design/mision-vision/ (3 artboards). Ruta: worker. Commit: pendiente.
- T14 (S11) Implementar artboard elegido design/mision-vision/03-editorial-en-lista.html (01 y 02 son alternativas). Ruta: inline. HECHO; commit: ver Log L30.
- T15 (S12) Chatbot Nova: nuevo flujo de preguntas con rama No, envío por WhatsApp al número de cada país. Ruta: worker. HECHO; commit: ver Log L32.

## Log

- L1: "requerimos un investigacion y diseno profecional me piden retirar el simulador pero lo pordemo comentar por di afutro lo exigen y a cambio requieren que enta seccion piden esto En lugar del simulador se va a agregar el siguiente contenido. Tus ventas mantienen el negocio, con un crédito bien manejado creces, pero con Arnova aceleras tu crecimiento de forma cómoda. Hablar con Mafe para la popuesta de imagen y acompañar texto. pero hay que agrgarlo algo para que no se vea tan muerta es sesccion algo animado o una imagen con un extilo de diseno de seccion moderno analicemo y dame propuestas"
- L2: "me gusta la segunda tambien podemos retirar el boton de contactenos y dame un opinion sinsera agrgar un video de este estilo C:\Users\soporteqa\Videos\fondius-videos acoplandolo con la buenas diseno que ya tienes , se puede disenar un con lo colores de arnova y que haga referncia , como esrtp en marketing y ui que eres has una evalucion antes de implmentar"
- L3: "me parece buen los video veasmo como es un loop create dos o tres lo que creas correspondiente esto para variar y no siempre se vea el mismo y que tenga cambios con transiciones suves y moderna" + autorizó editar fondius-videos.
- L4: Diseño elegido: design/crecimiento-arnova/02-split-imagen.html (01 y 03 son alternativas).
- L5: Loops renderizados y revisados por stills; build del sitio OK.
- L6: Commit 7049a3e (T2 + diseño + videos, 498 líneas, mayormente artboards HTML de design/). Assess RDD: riesgo medio, review no requerida. Pendiente: revisión visual en navegador.
- L7: "YA FUNCIONA ... a que hace referencia el tercer video" -> reemplazado loop 3 (pasos) por arnova-loop-asesor (visita del asesor), 772 KB; public/videos/crecimiento-03.*
- L8: "LA CAR 4.9/5 PODEMOS CAMBIARLA POR OTRO DATA MAS RELABANTE ... OCUPA MUCHO ESPACIO" -> tarjetas reemplazadas por una píldora translúcida que cambia con cada video (caption por video).
- L9: "AHORA QUIEREN CAMBIAR EL MENSAJE NUEVAMENTE POR ESTE Tus ventas mantienen tu negocio, un crédito bien manejado te permite crecer, pero con Arnova aceleras ese crecimiento de forma cómoda y segura. REALIZA EL CAMBIO DE LA MISMA SECCION" -> S2 actualizado (SV y GT).
- L10: Rebalanceo pedido ("LA ANIMACION O VIDEO ABSORVE EL TEXTO"): texto 1.25fr 26-40px legible (AA), video 4:5 sin recorte max 440px, pasos sincronizados con los videos (clicables) en lugar de la píldora.
- L11: "SE CAMBIO EL DISENO ... Y VEO QUE HAY INFORMACION REDUNDANTE ESTABA MEJOR ANALIZA BIEN EVALUAR Y CREAR UN DISENO APROPIADA PARA ESTE TIPO DE PUBLICIDAD COMO EXPERTO DE UI Y MARKETING DA DIVERSAS OPCIONES DE DISENO QUE TENGA BUENA EXPERIENCIA DE USUARIO Y NO REDUNDE EN INFORMACION QUE YA ESTA EN LA PAGINA" -> T4 (propuestas en design/crecimiento-v2/).
- L12: "TAMBIEN PODEMOS CAMBIAR EL VIDEO 1 POR OTRO CON MEJOR EXPERIENCIA DE USUARIO EN VEZ DE MOSTRAR GRAFICOS" -> T5: crecimiento-01 = arnova-loop-expansion (el negocio se agranda), 683 KB.
- L13: Handoff del canvas: implementar design/crecimiento-v2/03-banda-inmersiva.html (elegido; 01-editorial-equilibrado y 02-la-frase-es-el-indicador quedan como alternativas). Implementado en growth-section.tsx: banda navy a sangre, video 4:5 fundido sin caja, 3 segmentos sin texto; se eliminaron los captions redundantes. Verificado con capturas headless 1440 y 414 (rotación OK).
- L14: "en esta seccion ... remplazar por esta seccion Pasos para solicitar un crédito: Identifica qué necesita tu negocio para crecer / Si no tienes clara la necesidad, llámanos, te visitaremos y te daremos una asesoría profesional en tu propio negocio, (dejar referenciado contáctanos ... con los numeros ya ingresados arriba) / Ya identificadas tus necesidades … / Evaluamos juntos tu capacidad financiera / Y listo! Te desembolsamos en minutos" -> StepsSection: 3 pasos SV/GT, enlace Contáctanos al WhatsApp del Hero de cada país. Verificado con capturas 1440/414.
- L15: "explorar cual es el mejor diseno para esta senocion solo dame opciones ... acorde a una buena experiencia de usuario y experto en ui" (captura de la sección de pasos actual).
- L16: T7 propuestas listas en design/pasos-credito/ (01-linea-de-tiempo, 02-tarjetas-con-flujo, 03-asesoria-y-pasos); pendiente elección.
- L17: Handoff del canvas: implementar design/pasos-credito/03-asesoria-y-pasos.html (elegido; 01-linea-de-tiempo y 02-tarjetas-con-flujo quedan como alternativas). StepsSection: bloque de asesoría navy con Contáctanos (WhatsApp de cada país) + stepper vertical con conector degradado y tarjeta final destacada; paso 2 con lead. Verificado con capturas 1440/414.
- L18: "en la seccion de covertura solo queren esta informacion Nuestra cobertura Arnova ofrece atención personalizada a nivel nacional. ... implmentemos un bien disenog y mae opciones para que no quede tambasico con esta nuevo cambio"
- L19: T9 propuestas listas en design/cobertura/ (01-mapa-de-presencia, 02-ruta-del-asesor, 03-declaracion-centrada); pendiente elección.
- L20: Handoff del canvas: implementar design/cobertura/01-mapa-de-presencia.html (elegido; 02-ruta-del-asesor y 03-declaracion-centrada quedan como alternativas).
- L21: T10 implementado (coverage-section.tsx + coverage-map.tsx nuevo; intro SV/GT). locations se conservan por el footer; requirements quedan en datos sin renderizar. Verificado tsc/oxlint y capturas SV/GT 1440/414.
- L22: "ahora solitan este cambio [captura: Requisitos para solicitar tu crédito, 5 tarjetas] Se retiran las tarjetas y solo se deja el texto: Para solicitar tu asesoría y crédito solo necesitas tener negocio propio ... lo mismo implmentemos un diseno por que es un solo texto que templazara parios componnetes"
- L23: T11 propuestas listas en design/requisitos/ (01-dentro-de-cobertura, 02-franja-de-confianza, 03-titular-gigante); pendiente elección.
- L24: Handoff del canvas: implementar design/requisitos/02-franja-de-confianza.html (elegido; 01-dentro-de-cobertura y 03-titular-gigante quedan como alternativas).
- L25: T12 implementado: RequirementStrip (requirement-strip.tsx) tras CoverageSection; coverage.requirementNote SV/GT. Verificado tsc/oxlint y capturas 1440/414.
- L26: "en esta seccion colocar Nuestro propósito / Transformamos vidas, impulsando el crecimiento económico de nuestros clientes. y estos valores [Honestidad, Confianza, Responsabilidad, Inclusión] sin cambiar el diseño actual de la página simplemente reemplazar el contenido" -> about.json SV/GT. Verificado captura 1440.
- L27: "incluir una nueva sección de misión y visión después del propósito ... respetar el diseño de la página y cómo se carga el contenido ... evalúa cuál es el mejor componente" -> MissionVisionSection (tarjetas gemelas, sección clara) + mission-vision.json SV/GT en ContentBundle. Verificado tsc/oxlint y capturas 1440/414.
- L28: "mustrase diseno [captura Misión/Visión actual], sobre este ya que siento que no respeta el diseno de la pagina ni la iconografica previamente establecida"
- L29: T13 propuestas listas en design/mision-vision/ (01-como-beneficios, 02-continuacion-del-proposito, 03-editorial-en-lista); pendiente elección.
- L30: Handoff del canvas: implementar design/mision-vision/03-editorial-en-lista.html (elegido; 01-como-beneficios y 02-continuacion-del-proposito quedan como alternativas). MissionVisionSection reescrita como lista de definición con AppIcon shield-lock/briefcase; icon pasa a nombre de AppIcon. Verificado tsc/oxlint y capturas 1440/414.
- L31: Pedido del chatbot Nova (ver S12, texto verbatim).
- L32: T15 implementado: Nova, 5 preguntas verbatim, rama No con mensaje de cierre sin envío, envío a contact.chatWaNumber (SV 50370594072 / GT 50252993553). Evidencia CDP: rama No sin wa.me; rama Sí SV/GT con URL correcta y 5 respuestas (token Turnstile inyectado en headless). oxlint OK; tsc -b falla solo por FaqSection sin usar en home-page.tsx (cambio del usuario, sin commit).
- L33: "EL CHAT SE BLOQUEA CUANDO DIGO NO ... IMPLEMENTA UN BOTÓN DE EMPEZAR DE NUEVO" -> botón "Empezar de nuevo" (contact.restartLabel) en lugar del input deshabilitado; reinicia al estado inicial. Verificado por CDP: rama No muestra botón; clic reinicia a "Nombre y apellido" con input habilitado y avanza a la pregunta 2.
- L34: "Se mantiene la información del pie de página y en sección Legal solo se va a mostrar Términos y condiciones. Tomar texto de términos y condiciones del siguiente enlace: https://www.arnovagroup.com/términos-y-condiciones" -> footer: un solo enlace; legal.json SV/GT: un documento terminos-y-condiciones con el texto del sitio. El texto de la web termina en "puedes contactarnos al correo" sin dirección (enlace no extraíble); completado con contacto@arnovagroup.com (email de contact.json) — pendiente confirmación del cliente. Verificado CDP: 1 enlace, modal con texto y correo.
- L35: "EN TRABAJE CON NOSOTROS ACTUALIZAR [texto] ... SOLO ESTA SECCIÓN Trabaja con Nosotros" -> hero de /careers: título "Trabaja con nosotros", 4 párrafos verbatim y "Envía tu hoja de vida a" + mailto recursoshumanos@arnovagroup.com (jobs-page.json SV/GT: heroParagraphs, heroEmail). Resto de la página sin cambios. Verificado captura 414.
