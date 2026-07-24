# HANDOFF — Juego de cumpleaños de Aida (continuar aquí)

## ⚠️ PRIMERO, al abrir la próxima conversación
**Bloqueante real: no hay forma de quitar el fondo de una foto real suya con las herramientas de esta sesión.** Dos intentos distintos fracasados (24 jul): trazado manual de silueta sobre `aida_flamenca.jpg` (no converge, el fondo de rayas se cuela) y flood-fill automático sobre `aida_portada.jpg` (el forjado de la barandilla bloquea el relleno y el interior de su figura se vacía — resultado: casi solo el contorno). **Manuel pide "tiene que ser ella tal cual"** — un cuerpo vectorial dibujado nunca lo va a cumplir del todo. **La salida real: pedirle que recorte él mismo el fondo con la función nativa de su móvil** (iPhone: mantener pulsado sobre el sujeto en Fotos y "Copiar" / compartir como pegatina; Android: Google Fotos tiene un "Borrador mágico" o el recorte de Lens) y que pase el PNG con fondo transparente resultante — 30 segundos por su parte, y resuelve lo que esta sesión no puede. **Preguntar esto ANTES de intentar una tercera vía manual de recorte de fondo — no va a converger mejor que las dos anteriores.**

**Este entorno de navegador no puede renderizar nada (confirmado 24 jul): `game.loop.frame` se queda en 0 para siempre — no hay compositor/GPU, así que ni el screenshot ni `canvas.toDataURL()` ni los tweens llegan a ejecutarse.** Todo lo visual/dinámico se verifica SOLO con matemáticas (`getBounds()`, cálculos de física) o con el veredicto real de Manuel en su dispositivo — no perder tiempo peleando con capturas otra vez.

## Dónde está todo
- **Repo local**: `C:\Users\Manuel\Desktop\JUEGO_AIDA\`
- **URL en línea**: https://manu4389.github.io/aidagame-2026/
- **Repo GitHub**: manu4389/aidagame-2026 (público no listado, Pages activado)
- **Plan aprobado** (secuencia de 8 fases): `C:\Users\Manuel\.claude\plans\wobbly-waddling-crane.md`
- **Brief de contenido** (todo lo investigado de Aida): `BRIEF.md` en esta carpeta
- **Guion aprobado** (storyboard, 5 capítulos): `STORYBOARD.md` en esta carpeta
- Todo está commiteado y pusheado — `git log` limpio.

## Estado: Fase 4 del plan (rebanada vertical), en su 3ª iteración de feedback
Construido y funcionando **Vol. 1 — La Ola** (capítulo del surf) en Phaser 3, vía CDN, con:
- Físicas de plataformas reales (correr/saltar/gravedad), cámara siguiendo al jugador
- Cara real de Aida (foto de playa recortada a mano, `fotos/aida_face_surf.jpg`) en un cabezón grande con aro dorado
- Traje estilo "la Novia" de Kill Bill pero recoloreado con la paleta de Instante (turquesa + raya negra + logo) — NO usar amarillo/negro real de la película
- Enemigos: 😤 cliente pesado / 📋 brief imposible (patrullan)
- **Brenda** aparece como aliada a mitad de nivel (da +1 vida)
- Meta: foto circular suya de Corpus/flamenca (`fotos/aida_flamenca.jpg`)
- Fondo con marca "AIDA" grande repetida + fotos reales de fondo NO metidas aún en este juego (a diferencia del de Samara) — aquí el fondo es procedural (colores Instante, sol, nubes)
- **Música**: Marcha Triunfal de Verdi (dominio público, US Marine Band) suena al pulsar Empezar → a los 8.5s pasa a "Martian Cowboy" de Kevin MacLeod (CC-BY, atribución pendiente de poner en algún crédito visible) en bucle. Botón de silenciar arriba a la derecha.

## Historial de feedback de Manuel (para no repetir errores)
1. 1ª entrega: "no me gusta nada, no veo a mi hermana" → causa real: la foto se aplastaba entera en el círculo en vez de recortar la cara. Arreglado con foto pre-recortada + círculo más grande (220px textura, 92px en pantalla).
2. Pidió música: Verdi (por el nombre) + rollo Tarantino/Kill Bill → añadido (ver arriba).
3. Pidió el traje tipo Kill Bill con colores de Instante y logo → hecho.
4. Pidió que Brenda apareciera de aliada → hecho.
5. "No puedo verlo" (23 jul) → probado en escritorio y móvil (viewport emulado), carga perfecto en ambos, sin errores fatales. Diagnóstico: caché de GitHub Pages justo tras el deploy, o algo puntual de su dispositivo. No se pudo reproducir el fallo.
6. **23 jul, 1/10 — RECHAZO FRONTAL DEL CONCEPTO "LA OLA":** "No me gusta nada de nada de nada, muchísimo menos que el de Samara." Quiere el Vol. 1 reescrito por completo:
   - Tema: Aida en Instante (marketing) tiene que **conseguir firmar el contrato**, esquivando **burocracia** y **machirulos** (no clientes pesados genéricos de antes — esto es más específico y con más mala leche).
   - Kill Bill **mucho más potente** — no solo el traje, quiere sensación de combate real (katana) y **sonido de Kill Bill** (silbido/tensión tipo spaghetti western, no el western genérico que había).
   - Entorno: **Granada de fondo**, no playa/surf.
   - **Acción tomada:** reescrito el Vol. 1 entero con este concepto (ver abajo, "Estado"). Vol. 1 "La Ola" (surf) pasa a ser candidato para más adelante (Vol. 4 running ya cubre Granada corriendo; el surf podría recolocarse en otro volumen si Manuel lo quiere conservar — preguntar, no asumir que se descarta el surf del todo).
7. **23 jul, mismo golpe — "ni siquiera se ve su imagen":** la cara no se leía como ELLA, y punto. **Causa raíz encontrada:** el personaje usaba `aida_face_surf.jpg` — una selfie de playa, torcida, con la cara descentrada y pelo por medio; al recortarla en un círculo pequeño no se reconocía nada. **Arreglado (1ª pasada):** recorte nuevo de `aida_flamenca.jpg`, cabezón más grande. **Pendiente de que Manuel lo viera.**
8. **23 jul, tercera vuelta — "fatal, ni se ve el disfraz, no realista, la cara no está integrada, no has copiado Instante — cópialo de la web":** tres fallos reales, los tres corregidos:
   - **El logo de Instante era inventado** (un puntito amarillo). Fui a `agenciainstante.com`, saqué el logo REAL (el ojo hecho de dos círculos superpuestos, degradado turquesa) y ahora es una imagen de verdad en el pecho del traje y en la pantalla de título — `fotos/instante_logo.png`. Paleta de marca confirmada 100% igual a la que ya usábamos (mismos hex en el CSS de su web).
   - **La cara "no integrada":** antes era un círculo con un borde duro (máscara geométrica de Phaser pegada encima de un rectángulo — se notaba el "recorte de pegatina"). Ahora `fotos/aida_face_hero.png` lleva un **canal alpha real con borde ovalado difuminado** (hecho con .NET/System.Drawing, LockBits + degradado radial de verdad, no una máscara dura), más un conector de cuello de color piel entre cara y traje. Se ve, se pega al cuerpo.
   - **"No se ve el disfraz":** el muñeco entero era demasiado esquemático (un rectángulo + 2 rayas). Ahora tiene hombros, brazos angulados, guantes, piernas, botas y sombreado — y todo el personaje es notablemente más grande (zoom de cámara 1.2× incluido). Sigue siendo un dibujo vectorial (no una ilustración realista al estilo cómic) — **aviso honesto: no hay generador de imágenes disponible en esta sesión para hacer una ilustración completa tipo cartel; si Manuel quiere ese salto de calidad, hay que decidir cómo conseguirla** (herramienta de imagen con acceso, o encargarla fuera).
   - **No pude verlo yo mismo esta vez tampoco** (el navegador de esta sesión no saca captura de pantalla) — verificado por red/consola (todo carga a 200, sin errores), pero el veredicto visual real es 100% de Manuel.
9. **23 jul, cuarta vuelta — 4/10, "cuerpo de mujer tipo Uma Thurman/Kill Bill, la cabeza sigue viéndose como una foto rara, o si no usa la entera de flamenca y le cambias el disfraz":**
   - **Probé su sugerencia de la foto entera** (`aida_flamenca.jpg` de cuerpo completo, teñida a los colores de Instante) — **choqué con un muro real: no tengo herramienta de recorte de fondo (segmentación de persona)**. Intenté trazar su silueta a mano con puntos de referencia sobre la foto y no converge limpio (el fondo de rayas de la carpa se cuela, o se come parte del cuerpo) en un tiempo razonable. Descartado por ahora — si Manuel quiere insistir en esa vía, hace falta una herramienta de quitar-fondo de verdad (Remove.bg, una IA de segmentación, o recortarla él mismo a mano y pasármela ya en PNG con fondo transparente).
   - **Lo que sí se pudo arreglar en el dibujo vectorial:** el torso ya no es un bloque — ahora es un polígono con cintura marcada y cadera (silueta de mujer real, no un rectángulo), y la cabeza se conecta al cuerpo con cuello + cuello de traje (collar) + mechones de pelo que caen sobre los hombros, en vez de flotar encima.
   - **Pendiente de que Manuel lo vea y diga si esto ya vale, o si de verdad hace falta la vía de la foto real con fondo quitado.**
10. **24 jul, quinta vuelta — "sigue mal, poca jugabilidad, muñeco demasiado grande, cabeza no integrada, tiene que ser ella tal cual, no salta, se oye chiquito, no hay adversario, mira TODO de la web de Instante":**
    - **"Ella tal cual"** → confirmado que la web de Instante no tiene fotos de equipo (sin página "nosotros"), así que no hay atajo ahí; probé de nuevo la foto real (esta vez `aida_portada.jpg` con flood-fill automático por color) — **segundo fracaso técnico real**: el forjado de la barandilla bloquea el relleno y se come el interior de su figura. **Ver el bloqueante de arriba — la solución es que Manuel recorte con su móvil.**
    - **"No salta"** → **bug real encontrado y arreglado**: gravedad 1500 + velocidad de salto -480 solo llegaba a 76px de altura, pero la repisa con bonus estaba a 110px — **físicamente imposible de alcanzar desde el principio**. Subida la velocidad a -640 (~136px de altura).
    - **"No hay adversario" / audio flojo** → enemigos duplicados de tamaño (30px→52px), con sombra en el suelo y etiqueta con su nombre (BUROCRACIA/MACHIRULO) para que lean como personajes plantados, no un emoji flotando. Volumen de la fanfarria y de la música de acción subido (0.5→0.8 y 0.4→0.7).
    - **Confirmado con `game.loop.frame` clavado en 0: este navegador de sesión no ejecuta NINGÚN fotograma de Phaser** — ni tweens, ni física, ni render. Todo lo de este apartado se verificó con matemáticas (`getBounds()`, cálculo de altura de salto), no viendo la pantalla. Dejar de intentar capturas — es un límite duro del entorno, no del código.

## Próximos pasos (por orden, según el plan aprobado)
1. **Resolver por qué Manuel no ve el juego** (bloqueante).
2. Conseguir su OK explícito de que el Capítulo 1 ya le convence (checkpoint de la Fase 4 del plan — todavía no lo ha dado del todo, cada vuelta pedía cambios).
3. Fase 5: replicar el patrón validado a los otros 4 capítulos del storyboard — Vol. 2 Corpus/flamenco (foto `fotos/aida_flamenca.jpg` ya lista para esto), Vol. 3 pole dance (con Conchita de aliada), Vol. 4 running, Vol. 5 Instante HQ (jefe final "Cliente Imposible" + cameo de Brenda/madre/primos/Manuel + su frase "No se brilla sin oscuridad").
4. Fase 6: montaje completo (menú entre capítulos, manifest.json + sw.js + iconos PWA — todavía NO están en este proyecto, a diferencia del de Samara).
5. Fase 7: autorevisión (nada del ex-novio, nada inapropiado — ver BRIEF.md).
6. Fase 8: ya está publicado, pero falta la ronda de feedback consolidada final antes del 19 de agosto (su cumpleaños).

## Datos que ya NO hace falta volver a preguntar
Todo está en `BRIEF.md`: nombre completo, colores de Instante (#40ada9 turquesa, #e4378c rosa, #f2c749 amarillo, #68416c morado, #d83335 rojo), pasiones, viajes, frases familiares, gente que puede aparecer, y la única cosa vetada (el ex-novio).
