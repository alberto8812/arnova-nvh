# Sección de crecimiento (reemplaza al simulador)

Home SV y GT: comentar el simulador y poner la sección del diseño 02 (texto en secuencia + medio visual con datos flotantes), sin botón, con 2-3 videos loop web hechos en Remotion con la paleta Arnova que rotan con transiciones suaves.

## Specs

- S1: "me piden retirar el simulador pero lo podemos comentar por si a futuro lo exigen" — `<SimulatorSection />` queda comentado, el componente no se borra; no quedan enlaces rotos al simulador.
- S2: "En lugar del simulador se va a agregar el siguiente contenido. Tus ventas mantienen el negocio, con un crédito bien manejado creces, pero con Arnova aceleras tu crecimiento de forma cómoda. Hablar con Mafe para la popuesta de imagen y acompañar texto." — texto exacto en SV y GT.
- S3: "me gusta la segunda" — layout de `design/crecimiento-arnova/02-split-imagen.html`.
- S4: "tambien podemos retirar el boton de contactenos" — la sección no tiene botón.
- S5: "agregar un video de este estilo C:\Users\soporteqa\Videos\fondius-videos ... se puede diseñar uno con los colores de arnova y que haga referencia" — paleta Arnova en el proyecto Remotion.
- S6: "veamos como es un loop create dos o tres lo que creas correspondiente esto para variar y no siempre se vea el mismo y que tenga cambios con transiciones suaves y moderna" — 2-3 loops web que rotan en la sección con transiciones suaves.

## Tasks

- T1 (S5, S6) Remotion: paleta `arnova` + 3 loops (`arnova-loop-crecimiento|negocio|pasos`, 1080x1350, 10 s, ~600 KB) en fondius-videos/src/loops/arnova-loops.tsx; copiados a public/videos. HECHO. Commit: n/a (fondius-videos no es repo propio).
- T2 (S1-S4, S6) Web: comentar simulador, sección nueva con rotación de videos, datos en SV/GT, reduced-motion y carga diferida. Ruta: inline. Commit: pendiente.

## Log

- L1: "requerimos un investigacion y diseno profecional me piden retirar el simulador pero lo pordemo comentar por di afutro lo exigen y a cambio requieren que enta seccion piden esto En lugar del simulador se va a agregar el siguiente contenido. Tus ventas mantienen el negocio, con un crédito bien manejado creces, pero con Arnova aceleras tu crecimiento de forma cómoda. Hablar con Mafe para la popuesta de imagen y acompañar texto. pero hay que agrgarlo algo para que no se vea tan muerta es sesccion algo animado o una imagen con un extilo de diseno de seccion moderno analicemo y dame propuestas"
- L2: "me gusta la segunda tambien podemos retirar el boton de contactenos y dame un opinion sinsera agrgar un video de este estilo C:\Users\soporteqa\Videos\fondius-videos acoplandolo con la buenas diseno que ya tienes , se puede disenar un con lo colores de arnova y que haga referncia , como esrtp en marketing y ui que eres has una evalucion antes de implmentar"
- L3: "me parece buen los video veasmo como es un loop create dos o tres lo que creas correspondiente esto para variar y no siempre se vea el mismo y que tenga cambios con transiciones suves y moderna" + autorizó editar fondius-videos.
- L4: Diseño elegido: design/crecimiento-arnova/02-split-imagen.html (01 y 03 son alternativas).
- L5: Loops renderizados y revisados por stills; build del sitio OK.
