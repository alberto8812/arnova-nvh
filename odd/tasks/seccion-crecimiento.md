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

## Tasks

- T1 (S5, S6) Remotion: paleta `arnova` + 3 loops (`arnova-loop-crecimiento|negocio|pasos`, 1080x1350, 10 s, ~600 KB) en fondius-videos/src/loops/arnova-loops.tsx; copiados a public/videos. HECHO. Commit: n/a (fondius-videos no es repo propio).
- T2 (S1-S4, S6) Web: comentar simulador, sección nueva con rotación de videos, datos en SV/GT, reduced-motion y carga diferida. Ruta: inline. Commit: pendiente.
- T3 (S6) Loop 3 reemplazado por visita del asesor. HECHO 0ecc342.
- T4 (S7) Propuestas de diseño v2 sin información redundante: design/crecimiento-v2/ (3 artboards). Ruta: worker (context backstop). Commit: pendiente.

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
