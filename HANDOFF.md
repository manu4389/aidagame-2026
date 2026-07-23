# HANDOFF — Juego de cumpleaños de Aida (continuar aquí)

## ⚠️ PRIMERO, al abrir la próxima conversación
Manuel dijo **"no me aparece el videojuego, no puedo verlo"** justo antes de cortar por tokens — sin más detalle (¿no carga? ¿pantalla en blanco? ¿en qué dispositivo?). **Esto es lo primero que hay que resolver**, antes de seguir con más capítulos. Pregúntale: ¿en qué carga cuándo lo abre? ¿en el móvil o el ordenador? ¿pantalla en blanco o no carga nada?
Posibles causas a mirar: caché de GitHub Pages, algún fallo real en el deploy, o problema del dispositivo de Manuel.

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
5. Ahora: "no puedo verlo" — sin resolver todavía, prioridad para la próxima sesión.

## Próximos pasos (por orden, según el plan aprobado)
1. **Resolver por qué Manuel no ve el juego** (bloqueante).
2. Conseguir su OK explícito de que el Capítulo 1 ya le convence (checkpoint de la Fase 4 del plan — todavía no lo ha dado del todo, cada vuelta pedía cambios).
3. Fase 5: replicar el patrón validado a los otros 4 capítulos del storyboard — Vol. 2 Corpus/flamenco (foto `fotos/aida_flamenca.jpg` ya lista para esto), Vol. 3 pole dance (con Conchita de aliada), Vol. 4 running, Vol. 5 Instante HQ (jefe final "Cliente Imposible" + cameo de Brenda/madre/primos/Manuel + su frase "No se brilla sin oscuridad").
4. Fase 6: montaje completo (menú entre capítulos, manifest.json + sw.js + iconos PWA — todavía NO están en este proyecto, a diferencia del de Samara).
5. Fase 7: autorevisión (nada del ex-novio, nada inapropiado — ver BRIEF.md).
6. Fase 8: ya está publicado, pero falta la ronda de feedback consolidada final antes del 19 de agosto (su cumpleaños).

## Datos que ya NO hace falta volver a preguntar
Todo está en `BRIEF.md`: nombre completo, colores de Instante (#40ada9 turquesa, #e4378c rosa, #f2c749 amarillo, #68416c morado, #d83335 rojo), pasiones, viajes, frases familiares, gente que puede aparecer, y la única cosa vetada (el ex-novio).
