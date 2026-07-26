# HANDOFF — Juego de cumpleaños de Aida (continuar aquí)

## 🖨️ EL REGALO FÍSICO — ya cerrado (26 jul)

**Ficheros en la carpeta del juego:**
- **`HOJA_PARA_LA_IMPRENTA.pdf`** — una página A4 para IMPRIMIR Y LLEVAR al mostrador: qué quiere, qué ficheros trae, los tres avisos que rompen un QR, el checklist de «antes de pagar» y la dirección escrita con un QR de muestra a 30 mm.
- **`COMO_IMPRIMIR_EL_REGALO.html`** — la guía larga (dónde encargarlo, cuatro caminos, riesgos del grabado en metal).
- **`para_imprenta/`** (fuera del repo por `.gitignore`) — `qr_aida_vectorial.svg` (el bueno para imprenta), `qr_aida_25/30/40mm.pdf`, `tarjeta_85x54_con_sangre.pdf`.
- **`regalo_para_imprimir.png`** — A4 para imprimir en casa: 6 llaveros de 30 mm + 2 tarjetas.

**⚠️ REGLA DE ORO DE ESTE PROYECTO: un QR no se da por bueno hasta DECODIFICARLO.** Se hizo siempre, y salvó dos cosas: un logo al 14 % que lo rompía (se quedó al 10 %) y la comprobación a tamaño real de impresión (25, 30 y 36 mm: los tres se leen). El SVG se verificó además **módulo a módulo** dibujándolo en un canvas y comparándolo con la matriz: 33×33, 446 módulos oscuros, cero discrepancias.

**⚠️ Y AL GENERAR PDFs/PNG CON PIL: repasar tildes y ñ.** Se colaron dos veces («cumpleanos», «mi nina», «los movil es»). Es un regalo impreso: hay un repaso automático al final de `hoja_encargo.py` que busca palabras sin tilde.

**Aida tiene iPhone**, y eso condiciona la entrega: escanea → juega, **sin instalar nada**. Si quiere el icono, tiene que hacerlo **desde dentro del juego** (iOS guarda la página abierta, no el `start_url`), y si ha entrado por WhatsApp, antes «Abrir en Safari».

## 🎁 CÓMO SE ENTREGA EL REGALO (26 jul, build v51)

- **La QR apunta a `/regalo/`**, una página aparte (no al juego directo): tiene el botón JUGAR, las instrucciones para instalarlo como app en iPhone/Android, el propio QR para reenviarlo y cómo se juega. Para alguien que no juega a videojuegos, esa página vale más que caer directamente en el juego.
- **`regalo_qr.png`** — QR con el ojo de Instante dentro. ⚠️ El logo va al **10 %**: se probaron cinco tamaños LEYENDO el QR con el detector de OpenCV y **a partir del 14 % deja de leerse**. No agrandarlo sin volver a comprobarlo. `regalo_qr_simple.png` es el mismo sin logo.
- **`regalo_para_imprimir.png`** — A4 a 300 ppp con medidas reales: seis QR de 30 mm con círculo de corte (llaveros) y dos tarjetas de 85×54 mm. Los QR se verificaron leyéndolos **al tamaño real de impresión**.
- Los scripts que generan todo esto están en el scratchpad de la sesión (`haz_qr.py`, `hoja_imprimir.py`); si hay que regenerarlos, el patrón es: generar → **decodificar para comprobar** → guardar.
- ⚠️ **Aviso práctico que se le dio:** el juego pesa un par de megas (fotos + audio). En una fiesta con wifi malo conviene que lo abra **una vez antes** o que lo instale; luego funciona sin datos.

## ⚠️ PRIMERO, al abrir la próxima conversación (26 jul — build v50)

**📍 CARPETA:** `C:\Users\Manuel\Desktop\Mis Apps\JUEGO_AIDA` · **URL:** https://manu4389.github.io/aidagame-2026/
**🔗 Pasarle SIEMPRE el enlace con `?v=NN`** (GitHub Pages manda `Cache-Control: max-age=600` y sin eso ve builds viejos).
**🔬 Y pasar SIEMPRE la prueba de `_PRUEBA_ARRANQUE.md`** (`game.step()` ejecuta el juego de verdad) antes de subir cualquier cambio en los capítulos.

---

### 🩸 LAS TRES REGLAS DE ORO QUE SALIERON DE FALLOS REALES

**1. UN JEFE NO ES DIFÍCIL, ES IMPOSIBLE, SI SU CAJA DE DAÑO PASA DEL ALCANCE DEL TAJO.** Pasó dos veces. Medir siempre:
```
te toca a  = |offset izquierdo de su body| + 28   (medio cuerpo de ella)
franja segura = alcance del tajo − te toca a
```
Si sale ≤ 0, **hay que meterse en su zona de daño para poder pegarle**: la pelea no se puede ganar. Con el dragón salía **−44 px**. Ahora: dragón 47 px de franja, cliente 81 px, alcance del tajo 175 px, y el tajo automático salta a 168 px (**antes** del contacto, no después).

**2. PHASER REUTILIZA LA INSTANCIA DE ESCENA AL REINTENTAR.** Todo lo que no se reinicie en `create()` sobrevive de una partida a la siguiente. `espadaFuego` no se reiniciaba y provocaba **dos síntomas a la vez**: la katana no se repintaba en llamas (parecía que su madre no le daba nada) y el daño iba doblado desde el minuto uno (el cliente final caía en un suspiro). En `create()` hay ya un bloque que reinicia todas las banderas — **si se añade una nueva, va ahí**.

**3. EMPALMAR CÓDIGO POR ANCLAS DE TEXTO ES PELIGROSO.** Sustituir «de `liberarFamilia` a `construyeMonedas`» se llevó por delante **todo el bloque del ángel** (5 métodos) y el Vol. 5 reventaba al pulsar EMPEZAR. Mirar SIEMPRE qué vive dentro del tramo que se reemplaza.

---

### 🎮 ESTADO (v50): terminado y jugable de punta a punta

Cinco capítulos, todos abiertos desde el principio (nada de candados). Instalable en el móvil (PWA).

**Vol. 5 «Instante HQ» — 6.500 px, el culmen, cuatro actos separados ~1.200 px:**
entrada narrada → **ACTO I el dragón** (5 tajos) → **ACTO II la madre baja del cielo** (silencio → música `angel` → espada de fuego, ×2 de daño) → **ACTO III el cliente final** (esmoquin y cara de demonio, 20 de vida = 10 tajos) → **ACTO IV los suyos** (la cárcel **se derrumba** al liberarlos) → meta → currículum de Instante → cumpleaños.

**Brenda:** va con Aida **desde el primer tramo** y **tira rayos láser por los ojos** — **solo a los jefes** (2 de daño cada 1,1 s) y a los bichos normales **solo si se le echan encima** (< 80 px, cada 6 s). Esto último importa: si dispara a todo, **le quita el trabajo a Aida y la katana pierde la gracia** (fue una petición explícita suya). Su mostrador lleva **el ojo de Instante**, no el nombre escrito.

**CUATRO VOCES distintas**, elegidas por puntuación (no «la primera es-ES que haya», que era lo que hacía sonar distinto cada aparato): Aida (femenina, 1.08) · **Brenda (OTRA voz femenina, 0.88)** · la madre (la de Aida, más lenta) · los villanos (masculina; el cliente 0.35, el dragón 0.10 y muy lento). En el menú hay un selector de voz que se recuerda.

**Música propia por capítulo**, sintetizada (sin ficheros ni licencias): `flamenco` (tangos con cadencia andaluza y palmas, para el Corpus), `neon`, `carrera`, `oficina`, `angel`, `jefe`.

---

### 🟡 LO ÚNICO QUE FALTA

1. **El año de fundación de Instante** → primera cartela del currículum final. **No se inventa.**
2. Que Manuel lo juegue **entero, del tirón**, y diga.
3. Si aparecen: foto de **Conchita** (ahora gimnasta dibujada) y de **Brenda de cuerpo entero** (quitaría la muleta del mostrador).
4. **Tono:** hay tacos fuertes y su madre es personaje. Los dictó él palabra por palabra y está avisado: es su decisión, no un descuido.

**Fecha: 19 de agosto de 2026.** Quedan 24 días.

## Cierre del 25 jul (build v41)

**📍 LA CARPETA:** `C:\Users\Manuel\Desktop\Mis Apps\JUEGO_AIDA` (se movió a mitad de sesión; ya NO está en el Escritorio suelto).
**🔗 URL:** https://manu4389.github.io/aidagame-2026/

---

### 🔴 LAS TRES COSAS QUE HAY QUE SABER ANTES DE TOCAR NADA

**1. GITHUB PAGES CACHEA LA PÁGINA 10 MINUTOS. Esta fue la causa REAL de media semana de «no lo veo».**
Comprobado con `curl -I`: manda `Cache-Control: max-age=600`. El navegador se queda la copia y **ni pregunta al servidor**. El despliegue estaba bien y él seguía viendo builds viejos.
- **Para que lo vea al instante: pasarle siempre el enlace con `?v=NN`** (`.../aidagame-2026/?v=41`). Al cambiar la dirección, el navegador no puede servir la copia vieja.
- El `sw.js` ya pide la página con `cache:'no-store'` para saltarse esa caché.
- **Y comprobar SIEMPRE con `curl` el número de build antes de decirle que está subido.** GitHub tarda entre 1 y 6 minutos, y algún build sale como `errored` aunque publique bien.

**2. SÍ SE PUEDE EJECUTAR EL JUEGO AQUÍ.** Los fotogramas no corren solos, pero **`game.step(t,16)` empuja el bucle a mano** y ejecuta el `create()` de verdad. Está en **`_PRUEBA_ARRANQUE.md`** con la salida esperada. **Pasarlo SIEMPRE antes de subir un cambio que toque los capítulos.** Nació de un cuelgue real: al reorganizar la cárcel se borró sin querer **todo el bloque del ángel** (5 métodos) y el Vol. 5 reventaba al pulsar EMPEZAR; desde fuera parecía «el menú no me deja entrar».
- **Lección de método:** empalmar código por anclas de texto (`s[:ini] + nuevo + s[fin:]`) es peligroso — hay que mirar QUÉ VIVE dentro del tramo que se sustituye. Ahí se perdió el ACTO II entero.

**3. LAS PELEAS SE COMPRUEBAN CON NÚMEROS, NO A OJO.** La del dragón era **matemáticamente imposible**: arena de 520 px, caja de golpes que se comía 180 px hacia la izquierda y llegaba hasta dentro del pozo anterior, y el diálogo saltaba cuando ya estabas DENTRO de esa caja → **sitio libre: −60 px**. Antes de dar una pelea por buena, calcular: `ancho de arena`, `alcance de la caja`, `dónde arranca el bicho` y `franja donde no te alcanza`.

---

### 🎮 ESTADO: EL JUEGO ESTÁ ENTERO (build v41)

Cinco capítulos + intro + selector + interludios + final. **Los cinco abiertos desde el principio** (nada de candados: Aida no juega a videojuegos).

**Vol. 5 «Instante HQ» — 6.500 px, el culmen, en cuatro actos separados ~1.200 px:**

| x | acto |
|---|---|
| 260 | entrada + narrativa (campo `intro`) · **Brenda desde el principio** |
| 1710 | **ACTO I — EL DRAGÓN** (arena 1020 px, 4 tajos) |
| 3170 | **ACTO II — LA MADRE** baja del cielo, silencio + música `angel`, espada de fuego |
| 4570 | **ACTO III — EL CLIENTE FINAL** (arena 1300 px, 14 tajos, el más duro) |
| 5360 | **ACTO IV — LA CÁRCEL**: «¡SOIS LIBRES!» → «¡GRACIAS, AIDA, ERES LA MEJOR!» → «¡Y VIVA YO, Y MI COÑO MORENO!» |
| 5900 | meta → currículum de Instante → cumpleaños |

**Piezas reutilizables:** `escenaDialogo(BEATS, alAcabar)` · `cartelaActo(num,titulo,sub,alAcabar)` · campo `intro:[...]` · `INTERLUDIOS` · música procedural por estilo (`flamenco`, `neon`, `carrera`, `oficina`, `angel`, `jefe`).

**Reglas que NO se tocan:** el silencio antes de la música del ángel (es lo que hace que se note el cambio) · las frases del diálogo son de Manuel palabra por palabra · no volver a duplicar `class Capitulo`.

---

### 🟡 PENDIENTE

1. **El año de fundación de Instante** — para la primera cartela del currículum final. **No se inventa**; en cuanto lo diga, va.
2. **Que Manuel lo juegue entero.** Es lo único que queda de verdad. Todo está verificado por geometría, por ejecución y por consola, pero el veredicto es suyo.
3. **Tono:** hay cuatro tacos fuertes en pantalla y su madre es personaje. Él los dictó palabra por palabra y está avisado; queda como decisión suya, no como descuido.
4. Fotos que mejorarían el resultado si aparecen: **Conchita** (ahora gimnasta dibujada) y **Brenda de cuerpo entero** (quitaría la muleta del mostrador).

**Fecha límite: 19 de agosto de 2026.**

## Rondas anteriores del 25 jul (builds v28-v34)

**🎬 EL VOL. 5 ES AHORA UNA PELÍCULA EN CUATRO ACTOS.** Manuel lo llama «el culmen final» y es la parte del juego que más le importa. Estructura, con su separación medida:

| x | tramo | acto |
|---|---|---|
| 260 | 0 | narrativa de entrada (3 cartelas, campo `intro`) |
| 1460 | 2 | **ACTO I — EL DRAGÓN** (cartela → diálogo → pelea) |
| 2670 | 4 | **ACTO II — LA MADRE** (ángel total, ver abajo) |
| 3900 | 6 | **ACTO III — EL CLIENTE FINAL** + la cárcel detrás |
| 5060 | 8 | META |

Hay **1.160-1.230 px entre acto y acto** a propósito: Manuel pidió dos veces que «se separe mucho más» y que «si es más larga, no pasa nada». **No volver a juntarlos.** El capítulo mide 5.260 px, el más largo del juego.

**Piezas reutilizables que quedaron montadas:**
- `cartelaActo(num, titulo, sub, alAcabar)` — cartela a pantalla completa con rayas que se abren. Sirve para cualquier capítulo.
- `escenaDialogo(BEATS, alAcabar)` — motor común de diálogo pausado. Los diálogos son datos: `BEATS_DRAGON`, `BEATS_CLIENTE`.
- Campo `intro:[...]` en la ficha de un capítulo → narrativa antes de jugar.

**⛪ EL ÁNGEL (`bajaElAngel`) — la clave está en el SILENCIO.** Lo que hace que el cambio de música se note no es la música celestial: es **cortar la anterior del todo** (`paraMusicaPropia()`), dejar el hueco, y que la de `angel` entre **2,6 s después**, cuando ella ya ha bajado. Si alguien «optimiza» eso quitando el silencio, se carga el efecto. Además: rayos de luz, fogonazo blanco, descenso real de 3,4 s desde fuera de pantalla, cámara lenta, y 7 cartelas a 3,8 s con sus palabras exactas («HOLA, MI NIÑA / LO QUE SUCEDE CONVIENE…»).

**👟 Zapatillas** en La Milla (campo `zapatillas:true`): asoman bajo el volante del traje de flamenca y dan el pasito al correr. Comprobadas dibujándolas sobre su foto a tamaño real.

**🟡 PENDIENTE Y SUYO:** el **año de fundación de Instante** (primera cartela del currículum final; no se inventa) y **que juegue el Vol. 5 entero**: los cuatro actos están verificados por geometría, orden y consola, pero nadie los ha visto seguidos.

## Ronda 23 (build v32)

**🎭 LO NUEVO Y GORDO DE ESTA RONDA:**
- **`Interludio`, escena nueva:** narrativa ENTRE capítulos. Al acabar uno ya no se salta al siguiente; entran cartelas lentas (3,4 s). Las de antes del Vol. 5 preparan lo de la gente encerrada. El texto vive en `INTERLUDIOS`, indexado por el capítulo que se acaba de terminar.
- **Mamá, en forma de ángel, antes de la pelea final** (`escenaAngel`): se dispara al entrar en el tramo del jefe. **Cámara lenta de verdad** (`camaraLenta()`: física ×3,2 y tweens ×0,45). ⚠️ **NO tocar `this.time.timeScale`**: los tiempos del propio guion son `delayedCall`, así que ralentizarlos alargaría la escena al triple sin querer. La música cambia al estilo `angel`, ella aparece con alas y su cara real, y le da la **ESPADA DE FUEGO** (`entregaEspadaDeFuego`): repinta la MISMA hoja de la katana en llamas —por eso se guarda `this.bladePoly` al construirla— y pasa a pegar **el doble** al jefe.
- **El jefe final ya es un DRAGÓN** («el cliente final… monstruo grande con un gran bigote, tipo dragón chino»): cuerpo serpenteante de 7 anillos, melena, cuernos, colmillos y **las dos barbas doradas ondeando**. Se dibujó a ciegas y **se comprobó renderizándolo en PNG junto a Aida a tamaño real** — así se vieron dos fallos: flotaba 42 px sobre el suelo y las garras iban sueltas. Corregidos.
- **Dos estilos de música más:** `angel` (lento, alto) y `jefe` (grave y machacón). La música cambia también al empezar la pelea de la cárcel.
- **Correcciones de texto:** es **BICHOTE**, no bigote («te voy a rebanar el bichote»). Y el «¿Qué pasa, chocho? ¡Vamos a machacarles!» **lo dice BRENDA** y se escucha.

**🔍 REVISIÓN DEL JUEGO (ronda 22, build v31) — 5 hallazgos, 3 serios, todos corregidos.** Vale la pena releerlos porque son el tipo de fallo que ninguna comprobación automática pilla:
1. **Salto fantasma:** al caminar por el borde quedaba un salto de regalo en el aire (dos en La Barra). Los pozos no daban miedo en ningún nivel.
2. **El diálogo de la cárcel no paraba el juego:** `physics.pause()` congela la física pero `update()` seguía corriendo, así que se podía matar enemigos durante la escena.
3. **La katana automática ignoraba a los dos jefes**, y a ninguno se le puede esquivar: Aida podía morir en bucle sin entender que ahí había que pulsar TAJO.
4. `children.removeAll()` sin destruir en la pantalla final.
5. Monedas encima de los barrotes.

**⏳ OJO CON GITHUB PAGES:** esta ronda tardó **más de 6 minutos** y un build salió como `errored` aunque el contenido se publicó bien. Si tarda, `gh api -X POST repos/manu4389/aidagame-2026/pages/builds` fuerza un rebuild. **Comprobar siempre con `curl` el número de build antes de decirle a Manuel que está subido.**

**🟡 SIGUE PENDIENTE Y ES SUYO:** el **año de fundación de Instante** (para la primera cartela del currículum final; no se inventa) y, sobre todo, **que juegue**: nadie ha jugado todavía la cárcel, el ángel ni el dragón.

## Ronda 21 (build v28)

**📁 LA CARPETA SE MOVIÓ: el juego ya NO está en `Desktop\JUEGO_AIDA` sino en `C:\Users\Manuel\Desktop\Mis Apps\JUEGO_AIDA`.** Se movió a mitad de sesión (también `JUEGO_MAMA` y `PARA_SAMARA`). El repo quedó intacto. Si un comando falla con "no such file", es esto.

**Ronda 21 (build v28) — todo pedido por voz en cuatro mensajes seguidos:**
- **Niveles más largos y menos saturados:** los cinco crecen (Cap1 3600→4420, Cap2 3080→3820, Cap3 3005→3770, Cap4 3800→4490, Cap5 3280→3960) manteniendo los mismos enemigos, así que la densidad baja sola. La Milla pasa de 80 a 95 s.
- **Variación** («todas las pantallas dicen lo mismo y empiezan igual»): cada capítulo tiene **su frase de apertura y sus cuatro frases propias**; **«¡Toma kit digital!»** entra en los cinco; las repisas pasan de una a varias y **en La Barra son TRAMPOLINES** (impulso −820); el tutor de la tesis ya no está solo en el Vol. 1, también en el 3.
- **🔒 LA CÁRCEL (Vol. 5, tramo intermedio)** — la pieza que más le importa, dictada literalmente por él: mamá, Diego, Alberto y Manuel tras los barrotes, y **EL DEL BIGOTE** custodiándolos. Al acercarse arranca un **diálogo LENTO con el juego parado**, cartela a cartela cada 3,2 s (frena el ritmo a propósito, fue una petición explícita), con sus frases exactas; luego cartela de **PELEA**, mini-jefe de 7 tajos con barra de vida, y al tumbarlo: «Luego te paso la factura. Por mí y por todos los míos» → se abren los barrotes → «¡Venga, chulos, a daros una vuelta!» → «¡Gracias, Aida, eres la mejor!». **Las frases son suyas palabra por palabra: no suavizarlas ni reescribirlas sin que él lo pida.**
- **Brenda**: al encontrarla le dice «Brenda, ¿qué pasa, chocho? ¡Vamos a machacarles!».
- **Final en dos partes:** 13 cartelas lentas con el **currículum real de Instante** (servicios de agenciainstante.com, Instante Weddings, autónomas) rematadas con «NO NOS LO VAIS A ARREBATAR — dicen Brenda y Aida» / «NOT TODAY», y después la celebración con las seis caras y el cumpleaños.

**🟡 DOS COSAS QUE FALTAN Y SON DE MANUEL:**
1. **El año de fundación de Instante.** El currículum del final quería empezar con «desde tal año...» y **no se puso porque nadie lo ha dicho — no se inventa una fecha en un regalo**. En cuanto lo diga, va en la primera cartela.
2. **Que lo juegue.** Sigue sin haberlo jugado nadie: cinco niveles, la cárcel y el final están verificados por geometría y por consola, no por manos.

## Ronda 20 (build v27)

**🗂️ HAY OTRO JUEGO DE MANUEL EN EL ESCRITORIO Y ES UNA MINA: `C:\Users\Manuel\Desktop\JUEGO_MAMA`** (el que le hizo a su madre, "Belén al Rescate"). De ahí salieron **la foto de mamá** y **la plantilla de PWA**. Contiene `belen2.jpg`, `mama_tio.jpg`, `hermana.jpg`, `manuel.jpg`, `manifest.json`, `sw.js`, iconos. También existe `Desktop\PARA_SAMARA`. **Mirar ahí antes de dar por perdido cualquier material familiar.**

**⚠️ Y LA LECCIÓN DE ESTA RONDA: verificar la identidad en el código, no por el nombre del fichero.** En `JUEGO_MAMA` hay dos mujeres distintas (`belen2.jpg` y `mama_tio.jpg`) y el nombre del segundo fichero invitaba a pensar que la de la foto era mamá. Lo que lo resolvió fue **leer el `index.html` de aquel juego**, que etiqueta `belen2.jpg` como `'mama'` y `mama_tio.jpg` como `'tio'`. Sin eso se habría metido a la persona equivocada en el regalo. Se reutilizó incluso **su mismo encuadre** (`CROPS.mama`).

**Ronda 20 (build v27):**
- **El cameo final ya es de caras reales:** Aida, **Brenda**, **mamá** (de `JUEGO_MAMA`), **Diego** (foto que dejó Manuel) y **Manuel** (retrato profesional en B/N de `ARCHIVO_MAESTRO\07_PERSONAL_FAMILIA\MEDIA\_retratos_manu\Manu-1.jpg`). Todos con `rembg` + recorte redondo con borde difuminado y **margen arriba** para que el círculo no corte la coronilla.
- **Conchita se queda DIBUJADA, como GIMNASTA** — decisión de Manuel, ya no hace falta buscarle foto. Maillot, moño, brazo estirado, spagat y cinta de rítmica ondeando; fuera la barra y el emoji de bailarina.
- **PWA lista (Fase 6):** `manifest.json`, `sw.js` e iconos 192/512 con el ojo de Instante. **El service worker es NETWORK-FIRST para el HTML a propósito** — la página se pide siempre a la red, para que no pueda volver el problema de las versiones viejas. **NO pasarlo nunca a cache-first.** Solo fotos y audio van de caché (así abre al vuelo y funciona sin datos).
- **Límite que se le puso y aceptó:** buscar fotos **en su disco, sí; en Internet, no** — mamá, primos y Conchita son personas que no han dado permiso y esto se publica en abierto. La hoja de contacto de fotos familiares que se le montó para identificar gente está en `.gitignore`, fuera del repo.

## Ronda 19 (build v25 — el juego entero)

**🏗️ LA REFORMA QUE HAY QUE CONOCER ANTES DE TOCAR NADA.** `class Chapter1` ya no existe. La mecánica —la que Manuel dio por buena tras 18 rondas— vive **una sola vez** en `class Capitulo`, y **cada capítulo es una ficha de datos** en el array `CAPITULOS`. Consecuencia práctica: **un retoque de jugabilidad se hace una vez y vale para los cinco**; un retoque de contenido se hace en la ficha del capítulo. **No volver a duplicar la clase.**
- El suelo se construye con `construyeSuelo(anchos, hueco)` y de ahí sale el ancho del mundo, así que **es imposible dejar la meta o un enemigo flotando sobre un pozo** (el error clásico al alargar un nivel, que ya pasó una vez).
- Todo se coloca por **índice de tramo** (`{t:3, off:150}`), nunca por coordenada absoluta.

**Estado: los 5 capítulos del STORYBOARD están hechos.** Vol. 1 El Contrato (igual que estaba) · Vol. 2 Corpus (farolillos, balcones con mantones; gorrón y pisa-volantes) · Vol. 3 La Barra (neón; **Conchita** de aliada, regala **salto doble**) · Vol. 4 La Milla (**contrarreloj de 80 s**, corre a 240) · Vol. 5 Instante HQ (oficina + **jefe final "El Cliente Imposible"**, 6 tajos, suelta un brief contradictorio en cada golpe; la meta no se abre hasta tumbarlo). Más: **selector de capítulos** con progreso en `localStorage` y **pantalla final** con Aida, Brenda, mamá, los primos y Manuel, su frase y el felicitación de cumpleaños.

**🔴 LO QUE FALTA PARA CERRAR (fases 6-8 del plan):**
1. **Que Manuel lo pruebe entero.** Nadie ha jugado los capítulos 2-5 todavía: están verificados por geometría y por consola, **no por manos**. Es lo primero.
2. **Fotos que mejorarían mucho el resultado, si las consigue:** **Conchita** (ahora es una silueta dibujada de neón) · **mamá, los primos y Manuel** para la pantalla final (ahora son emoji) · **Brenda de cuerpo entero** (quitaría la muleta del mostrador). Mismo proceso siempre: dejar el fichero en `fotos/` → `rembg` con `u2net_human_seg` → recorte a bbox.
3. **PWA (Fase 6):** `manifest.json`, `sw.js` e iconos. El registro del service worker se quitó porque el fichero no existía; al hacerlo, volver a ponerlo.
4. **Autorrevisión (Fase 7):** repasar que no haya nada del ex-novio ni nada inapropiado (ver `BRIEF.md`) antes del 19 de agosto.

## Ronda 18 (build v24)

**🔧 LA TÉCNICA QUE HAY QUE USAR SIEMPRE: MAQUETAR LA PANTALLA EN UN PNG Y MIRARLA.** Phaser no renderiza aquí, pero **PIL sí puede recomponer la pantalla entera** —capas de parallax con sus scrollFactor y sus alphas, el suelo, los personajes a tamaño real— y luego se abre con `Read`. Hecho en esta ronda: al mirarlo se vio de golpe que el mosaico de ojos era papel pintado y que Brenda seguía descompensada. **Dos rondas de "no, sigue mal" se habrían ahorrado maquetando antes.** El script está en el historial de esta sesión; rehacerlo es media hora bien gastada cuando haya que juzgar cualquier cosa visual.

**Ronda 18 (build v24) — Manuel: "siguen descompensadas y sigue muy recargado":**
- **Brenda, 3.er intento y por fin resuelto.** El problema **no tenía solución limpia** y hubo que decírselo: la foto de Aida es de cuerpo entero y la de Brenda está cortada a medio muslo, así que **igualar la altura le dejaba la cara enorme e igualar la cara la dejaba enana**. Se le montaron **tres opciones en un PNG a tamaño real** (`_opciones_brenda.png`, ignorado en git) y **eligió la C**: Brenda a la escala buena del mundo (97px, cabeza a la misma altura y del mismo tamaño que la de Aida) con un **mostrador de Instante delante que tapa las piernas que su foto no tiene**; al unirse, el mostrador la acompaña. 🔴 **Sigue en pie: con una foto suya DE CUERPO ENTERO esto se resuelve sin muleta.**
- **Fondo, 2.ª poda.** Lo que de verdad recargaba era **el mosaico de ojos de pared a pared** (quitado; si se recupera, al 4% como mucho) y **el "AIDA" gigante** (quitado: era una mancha amarilla y encima sobraba, porque Aida ya está en pantalla). Además: ojos grandes 3→2 y 0,12→0,07 · ojo rojo 3→2 y 0,18→0,13 · collage de fondo 10→6 piezas a media opacidad · capa cercana 6→4 · ojo del suelo 0,12→0,08 · "INSTANTE" de 46px a 30px y de 5 a 3. **Los rótulos de la narrativa se mantienen legibles a propósito: son los que cuentan la historia y no tapan el suelo.**

## Ronda 17 (build v23)

**🔧 TÉCNICA NUEVA QUE FUNCIONA — MONTAR UN PNG Y MIRARLO.** Este entorno no renderiza Phaser (frames clavados en 0), pero **sí puede componer una imagen con PIL y leerla**. Cuando haya que juzgar tamaños, proporciones o encuadres, **montar las piezas a tamaño real de juego sobre una línea de suelo, guardarlo en el scratchpad y abrirlo con `Read`**. Es lo que por fin resolvió lo de Brenda. **Usar esto siempre antes de dar por buena una proporción.**

**⚠️ Y LA LECCIÓN QUE VA CON ELLO: una medición puede engañar y hay que contrastarla mirando.** En la ronda 16 se midió el "ancho de cabeza" de cada foto y salió que Aida a 160 y Brenda a 150 quedaban igualadas. **Era falso**: el peinado y la flor de la foto de flamenca hinchaban la medida de Aida, y Brenda seguía siendo un gigante — Manuel lo vio al instante. Al montarlo y mirarlo, la escala real resultó ser **Aida 168 / Brenda 96**, muy lejos de lo que decía el número.

**Ronda 17 (build v23):**
- **Tamaños, 2.º intento y ya validado a ojo:** Aida **168**, Brenda **96**. Katana y cigarrillo recolocados (×1,12 sobre el original de 150). **Brenda sale bajita a propósito**: su foto está cortada a medio muslo, así que para que su cara case con la de Aida tiene que ir a esa altura. 🔴 **Si Manuel quiere a Brenda alta Y proporcionada, hace falta una foto suya DE CUERPO ENTERO** — no hay forma de sacarla de la que hay.
- **"Está demasiado recargado, no se aprecian ni las plataformas"** → fuera las franjas de collage de la cara frontal del suelo y el ojo grabado cada 170px (queda **uno por tramo al 12%**); se mantiene el **filo de color por tramo**, que es lo que hace legible dónde se pisa. Todo el fondo de marca bajado: mosaico de ojos 0,17→0,09, ojos gigantes 0,20→0,12 y de 5 a 3, collage de fondo de 18 a 10 piezas y a la mitad de opacidad, capa cercana de 14 a 6, ojo rojo 0,30→0,18. **Los rótulos de la narrativa se bajan poco a propósito: son los que cuentan la historia.**

## Ronda 16 (build v22)

**🐛 BUG DE FONDO GORDO, ENCONTRADO Y ARREGLADO — apuntar la regla, que se repetirá:** un objeto con `scrollFactor` s **solo llega a verse si su x del mundo cae dentro de `[0, s*(WORLD_W-W) + W]`**. Todo el decorado estaba repartido a lo largo de los 3600px del mundo sin tener eso en cuenta, así que **buena parte NO SE VEÍA NUNCA**: de los 3 soles solo aparecía 1, se perdían 4 torres de la Alhambra, 3 edificios del skyline y casi todos los rótulos de marca. Ahora hay un helper `reparte(n, sf)` en `drawBackground()` que coloca cada capa dentro de su alcance real, y una comprobación numérica que confirma que las 10 capas se ven enteras. **Siempre que se añada algo al fondo con scrollFactor, usar `reparte()` — no poner x a mano.**

**Ronda 16 (build v22):**
- **"Brenda es mucho más grande que Aida, equilibra"** → medido, no a ojo: la foto de Aida es de cuerpo entero y la de Brenda de medio muslo arriba, así que a igual altura su cabeza salía **1,20×**. Comparando el **ancho de cabeza** de cada foto (lo fiable, no depende del encuadre): **Aida sube a 160px** (pidió "un poquito más grande") y **Brenda baja a 150px** → las dos cabezas miden ya 26,6px. Katana y cigarrillo recolocados al nuevo tamaño (mismo punto de la foto, reescalado ×1,067). **Si se vuelve a tocar el tamaño de cualquiera de las dos, rehacer esta cuenta — no ajustar a ojo.**
- **"Los colores de Instante por toda la plataforma, por todo el escenario"** → el suelo deja de ser marrón: cuerpo morado de marca, filo de un color distinto por tramo, franjas de collage en la cara frontal y **el ojo grabado en el propio suelo cada 170px**. Añadida una segunda capa de collage más cercana (sf 0.6) para que el color llegue también a primer plano.
- **"El ojo al fondo, y que el fondo cuente que alguien quiere apoderarse de Instante"** → el fondo narra ya el conflicto a dos voces: **el ojo de la competencia, en rojo, vigilando** con sus rótulos (LA COMPETENCIA VIGILA · QUIEREN QUEDARSE CON INSTANTE · OFERTA PARA COMPRAROS) frente al turquesa de ellas y sus carteles (INSTANTE NO SE VENDE · LO HAN LEVANTADO ELLAS · AUTÓNOMAS Y A MUCHA HONRA · HECHO CON CARIÑO). Palabras suyas del dictado, no inventadas.

## Ronda 15 (build v21)

**🕐 CAUSA (al menos parcial) DEL DESFASE, MEDIDA HOY: GitHub Pages tarda entre 30 y 60 s en servir el commit nuevo.** Comprobado con `curl` al desplegar la v21: al primer intento seguía sirviendo la v20; 15 s después ya era la v21. Es decir, **si se le dice a Manuel "ya está subido" y él refresca al instante, se traga la versión anterior**. Protocolo: **antes de avisarle, comprobar con `curl -s <url>/index.html | grep 'build v'` que el número ya es el nuevo** (y de paso que los ficheros nuevos dan HTTP 200, no 404).

**Ronda 15 (build v21) — dos peticiones por voz:**
- **"Brenda sigue sin tener su propia cara"** (2.ª vez que lo dice). Se verificó que la v20 estaba bien desplegada y que su PNG se servía a 200, así que **no era un fallo, era que su cara se veía pequeña de lejos**. Solución: `fotos/brenda_face.png`, recorte redondo de su cara con borde difuminado, y su cara ahora sale en **TRES sitios**: ficha de personaje casi a pantalla completa al conocerla (con su nombre), insignia fija en el HUD mientras te acompaña, y en la pantalla final junto a Aida presidiendo el testimonio del cliente que las nombra a las dos.
- **"Poder darle a la katana con una tecla del teclado"** — ya existían X/Z/Ctrl, pero **no se decían en ninguna parte**. Ahora valen **X, Z, A, Ctrl, Mayús, ENTER y flecha ABAJO** (a propósito muchas: lo importante es que le valga la que pulse, no que acierte), se ignora la repetición de tecla mantenida, y hay una **línea de ayuda bajo los controles** que las nombra. **Lección: si pide algo que YA existe, casi siempre el problema es que no era descubrible — no repetir "ya está", hacerlo visible.**

## Ronda 14 (build v20)

**🔴 MANUEL ESTABA VIENDO LA v18 CUANDO PIDIÓ LA v19.** En su feedback del 25 jul pidió literalmente "Brenda tiene que tener la cara que te he pasado" y "puedes poner el ojo de Instante al fondo" — **las dos cosas ya estaban subidas en la v19 desde hacía un rato**. Es decir: **el desfase de caché es REAL y sigue pasando**, no era una sospecha. **Protocolo obligatorio: cuando diga que algo no está, lo PRIMERO es preguntarle qué build ve abajo del todo**, antes de tocar una sola línea. Pista descartada esta vez: `sw.js` NO existía, así que no había service worker cacheando; el registro muerto se quitó. La caché es del navegador/GitHub Pages sin más.

**Ronda 14 (build v20), pedido por voz y ya hecho:**
- **"La espada tiene que tener un botón específico o que se accione sola"** → LAS DOS. (a) La katana ahora **tiene alcance de verdad**: mata a quien tenga delante (de −24 a +96 px), en vez de exigir que el cuerpo tocara al enemigo justo en los 160 ms del tajo — **esto era un fallo real de diseño, por eso atacar "no hacía nada" si no la pegabas pegadísima**. (b) **Se acciona sola**: si un malo entra a menos de 92 px, ella se gira hacia él y tira el tajo sin que Manuel toque nada. (c) El botón TAJO sigue estando, más grande (78 px) y con la palabra KATANA debajo.
- **"Los malos más grandes para que se vean"** → 56 → 76 px, con sombra y etiqueta a juego.
- **"Brenda tiene que tener la cara que te he pasado"** → ya la tenía (v19); se le sube el tamaño a 92×169 para que la cara se lea sin dudas.
- **"Todo mucho más los colores de Instante y el fondo en grande"** → mosaico de ojos a escala 1.7, **cinco ojos gigantes** de fondo, collage de círculos y barras planas en los 4 colores de marca (parallax 0.22) y una franja turquesa/rosa/amarilla fija en pantalla.
- **"Tienen que sonar también"** → sonidos nuevos de moneda, bonus, salto y daño (`playBlip` + los cuatro `sfx*`), además del impacto del tajo que ya se añadió en la v18.

**Ojo con el equilibrio del juego:** con el tajo automático los enemigos caen prácticamente solos. Es lo que pidió (jugabilidad por encima de dificultad), pero **si algún día dice "es muy fácil", el sitio donde tocar es el bloque de auto-tajo en `update()`** — subir el cooldown (ahora 360 ms) o bajar el radio (92 px).

## Ronda 13 (build v19)

**✅ RESUELTO EL BLOQUEANTE MÁS VIEJO DEL PROYECTO: Brenda ya tiene su foto real en el juego.** Manuel dejó los archivos directamente en `fotos/` (esa es la vía que funciona: **soltar los ficheros en la carpeta**, NO pegarlos en el chat) y confirmó por fin quién es quién: **Brenda es la del pelo oscuro liso, brazos cruzados y vestido gris**; la otra foto de esa pareja es Aida. Recortada con `rembg` + `u2net_human_seg` → `fotos/brenda_hero_real.png` (323×592), ya sustituye al emoji 💁‍♀️, con sombra en el suelo y etiqueta encima. Sigue peleando como aliada.

**También del 25 jul: el ojo de Instante YA está en el fondo del nivel.** El mosaico de ojos que mandó (`images (1).jpg`) se convirtió a PNG con el blanco transparente (`fotos/instante_ojos_tile.png`) y va de `tileSprite` en parallax (scrollFactor 0.25, alpha 0.13) detrás de todo. Era el pendiente "Instante en el fondo" que arrastraba desde la ronda 12.

**Sigue PENDIENTE de las 5 imágenes del 24 jul:** la **estética de collage** de la imagen 5 (foto en B/N + círculos y barras de color plano encima) como estilo visual central del juego. Manuel dijo "todo eso tiene que tener el estilo del videojuego" y eso todavía no se ha tocado — es un cambio de dirección artística, conviene enseñarle una muestra antes de aplicarlo a todo.

**Hecho el 25 jul (builds v18 y v19), sin que Manuel lo haya visto todavía:**
1. **Créditos de la Intro separados en dos cartelas** (lo último que pidió): "ESCRITO POR / MANUEL MOLINA PRADOS" y "DIRIGIDO POR / QUENTIN TARANTINO". El nombre va a 24px (`smallSize` nuevo en `INTRO_BEATS`) para que no se parta de línea.
2. **Nivel alargado 2600 → 3600** con las cinco cosas movidas a la vez, como avisaba el handoff: `segs` (ahora 7 tramos, huecos de 100px), los 6 `spawnEnemy`, Brenda (1150→1250), el tutor (2160→2600), `coinXs` (26 monedas) y la meta (`WORLD_W-170` = 3430). **Verificado con matemáticas**: los 6 huecos son de 100px y el salto llega a ~136px de alto y ~187px de largo; ninguna moneda, enemigo, aliada ni la meta queda flotando sobre un pozo.
3. **Katana de verdad**: ya no es un rectángulo con guarda. Hoja curva (sori) dibujada con `Graphics` punto a punto, que se afina hacia la punta, con punta en diagonal (kissaki), línea de temple (hamon), tsuba ovalada dorada y empuñadura trenzada. Sigue viviendo en el contenedor de la mano `(28,-28)`, así que el pivote del tajo no cambia.
4. **La lucha se ve y se oye**: estela de arco blanco+turquesa que barre delante de ella en cada tajo, sacudida de cámara al atacar (60/0.003) y al matar (150/0.011, antes 90/0.005), destello blanco + estrella de corte sobre el enemigo, silbido de espada subido (0.5→0.85, clang 0.35→0.6) y **`playImpact()` nuevo** — golpe grave + chasquido, para que el tajo suene a que ha dado. Los sfx ahora también respetan el botón de silenciar.

5. **Brenda real + ojo de Instante de fondo** (v19, detallado arriba).

**Cómo pasarle archivos a Claude, ya probado y funcionando:** soltarlos en `C:\Users\Manuel\Desktop\JUEGO_AIDA\fotos\`. Pegar imágenes en el chat NO sirve para procesarlas (se ven, pero no quedan en disco y `rembg`/PIL necesitan un fichero).

**Posible causa raíz de VARIOS "sigue sin aparecer/no hay botón" de sesiones anteriores, arreglada esta vez (build v17):** `#game-holder` tenía `aspect-ratio:9/13` calculado solo por ANCHO, sin mirar la altura real de pantalla. En un móvil con poca altura visible (barra del navegador, etc.), esto podía empujar la fila de controles (el botón TAJO, SALTAR) **fuera de la pantalla, invisible, sin poder hacer scroll** (`body` tiene `overflow:hidden`). Arreglado: `#wrap` ahora mide `100dvh` de alto y `#game-holder` es `flex:1` (se queda con lo que sobra) — los controles YA NO PUEDEN quedar cortados, pase lo que pase con la altura de la pantalla. **Si esto era la causa real, debería resolver de una vez lo del "botón de la espada que no existe" de las últimas 3-4 rondas.**

**PENDIENTE — Manuel mandó 5 imágenes pegadas en el chat en el último mensaje, NINGUNA accesible como archivo** (mismo límite de siempre: pegar una imagen en el chat no la deja en disco, solo la puedo "ver" en el momento, no procesarla con rembg/PIL). Contenido de esas 5 imágenes, descrito de memoria para la próxima sesión:
1. Foto profesional, pelo oscuro liso, brazos cruzados, vestido gris — dijo "estas son Brenda y Aida" nombrando a Brenda primero.
2. Foto profesional, pelo ondulado más claro/rubio, blazer negro, anillos dorados — la segunda de esa pareja.
3. Logo de Instante CON el texto "Instante" debajo (versión completa, no solo el ojo).
4. El mismo logo (ojo), más grande, sin texto.
5. Imagen de estilo: manos sujetando una cámara, foto en blanco y negro con círculos/barras de color (turquesa, rosa, amarillo) superpuestos — pinta de collage de la propia marca. Dijo que "todo eso tiene que tener el estilo del videojuego" — quiere ADOPTAR esta estética (foto B/N + formas de color plano) como estilo visual central del juego, no solo un detalle.

**✅ YA RESUELTO EL 25 JUL — Manuel confirmó: la #1 (pelo oscuro liso, vestido gris) es BRENDA; la #2 es Aida.** Lo que sigue queda como registro de por qué se preguntó en vez de adivinar:
**⚠️ OJO — NO asumir a ciegas cuál foto es Brenda y cuál es Aida.** Las fotos previas confirmadas de Aida (`aida_flamenca.jpg`, `aida_portada.jpg`, la de Instagram) la muestran SIEMPRE con pelo oscuro — lo cual coincidiría con la foto #1, NO con el orden literal en que Manuel las nombró ("Brenda y Aida" = 1,2). Esto es una contradicción real sin resolver. **Preguntar a Manuel explícitamente cuál es cuál antes de tocar nada de Brenda** — confundir a dos personas reales en un regalo personal es un error que hay que evitar, no adivinar.
**Vía para conseguir los archivos de verdad:** pedirle que las suba a Google Fotos/Drive y pase el link, o que se las mande por email a sí mismo y las guarde en el Escritorio — pegar en el chat no funciona para esto.

**Pedido de la ronda 12, ✅ YA RESUELTO EN LA 13 (build v18) salvo lo del ojo de Instante:**
- ~~Nivel demasiado saturado de enemigos~~ → hecho (2600→3600, las 5 cosas movidas a la vez). **La regla sigue en pie para el futuro: NO cambiar `WORLD_W` sin mover a la vez `segs`, los `spawnEnemy`, Brenda, el tutor, `coinXs` y `goalZone`.**
- ~~La katana "no parece una katana"~~ → hecho, hoja curva con `Graphics`.
- ~~Que se vea/oiga mejor la lucha~~ → hecho (estela, shake, destello, `playImpact()`).
- **"Instante" en el fondo de la pantalla de juego** — SIGUE PENDIENTE: hay texto "INSTANTE" repetido en parallax, falta usar la imagen real del ojo (`fotos/instante_logo.png`) también ahí.

## Cosas ya resueltas de rondas anteriores (no repetir preguntas ya respondidas)
**Bug real encontrado en el tajo de la katana:** el contenedor de la katana estaba en `(0,0)` (centro del cuerpo) con las piezas dibujadas en coordenadas absolutas `x=28` — al rotar, giraba alrededor del CENTRO DEL CUERPO, no de la mano, así que el tajo se veía como la espada volando en un arco ancho e irreal en vez de un giro de muñeca. **Arreglado: el contenedor ahora vive EN la mano `(28,-28)` y las piezas cuelgan de ahí en coordenadas locales** — el giro ahora pivota donde debe. **Lección general: cualquier pieza que tenga que rotar tiene que vivir en un contenedor centrado en su propio eje de giro, nunca en el origen del padre.**

**Voz en alto añadida** (Web Speech API, `speechSynthesis`) para catchphrases, taunts de derrota, mensaje de Brenda, del tutor y de la victoria. **Aviso realista para Manuel: no hay manera de forzar acento andaluz específico** — solo se puede elegir la voz "es-ES" que ya traiga instalada su propio móvil/ordenador (si no tiene ninguna en español, sonará en la voz por defecto del sistema). Esto no es algo que se pueda arreglar con más código, es una limitación de qué voces trae el dispositivo.

**Botón de ataque simplificado a texto plano "TAJO"** (como el de "SALTAR") — se quitó el emoji ⚔️ por si el icono no se veía bien y por eso "no había tecla para la espada" en algunos dispositivos.

**Brenda: su foto SIGUE sin llegar como archivo** — búsqueda repetida, nada nuevo en el disco.
**Causa raíz real encontrada de "sigue sin sonar música al inicio":** los navegadores BLOQUEAN el audio hasta el primer toque del usuario — el `create()` de `Intro` se ejecuta automáticamente, SIN ningún toque todavía, así que `playMusic()` no sonaba nunca (sin error, silenciosamente). Arreglado con `this.sound.locked` + evento `UNLOCKED`. **Si algo de audio "no suena" en el futuro, sospechar SIEMPRE de esto primero**, no asumir que el código está mal.

**Causa raíz real de "la katana/el cigarro no están integrados":** estaba calculando la posición de manos/boca **por proporción desde OTRA foto** (la original sin recortar), nunca mirando directamente `fotos/aida_hero_real.png` (el archivo real usado en el juego). Se corrigió mirando el archivo real con el propio `Read` — sus manos quedan a la altura de las bocamangas del mantón (~y=-28 en coordenadas del contenedor), NO donde se había estimado antes. **Lección: para cualquier prop "pegado" a la foto, mirar SIEMPRE el archivo final tal cual se usa, nunca estimar por proporción de otra imagen.**

Manuel pidió explícitamente: katana en una mano, cigarrillo en la OTRA (no en la cara — "tapaba la cara"). Hecho. También encontrados y usados **testimonios reales de clientes de Instante que nombran a Aida y Brenda** (agenciainstante.com tiene una sección de opiniones que no se había mirado a fondo hasta ahora) — uno ya está en la pantalla de victoria.
**SOSPECHA FUERTE DE CACHÉ, sin confirmar todavía:** Manuel dijo "sigue sin la katana y el cigarrillo, sigue sin decir las frases" — pero AMBAS cosas estaban verificadas en el código y desplegadas (katana desde hace varias rondas, cigarrillo desde la ronda anterior). Esto solo se explica por: (a) estaba viendo una versión vieja en caché, o (b) los elementos eran demasiado pequeños/con condición de aparición demasiado rara para notarlos. Se atacaron LAS DOS posibilidades a la vez:
- Meta tags `Cache-Control: no-cache` añadidas al `<head>`.
- **`#build-tag` visible bajo los controles** (texto tipo "build v14 — fecha, resumen") — **si Manuel dice que no ve un cambio, LO PRIMERO es preguntarle qué texto de build ve** (o pedirle una captura), para saber en 2 segundos si es caché o un fallo real. Subir el número/fecha en cada commit que cambie algo visible.
- Katana y cigarrillo hechos notablemente MÁS GRANDES (ya no solo proporcionales al cuerpo reducido).
- Frases: antes solo saltaban al azar al coger un ⚡ (raro) — ahora saltan EN ORDEN con cualquier coleccionable (🦄 o ⚡) y la primera se dice sola a los 1.8s de empezar el nivel, para que se la oiga hablar sí o sí.
- Música ya suena desde la primera cartela de la Intro (antes solo empezaba al pulsar EMPEZAR).
- Personaje reducido OTRA VEZ (100×180 → 84×150) + zoom de cámara bajado de 1.2 a 1.0 — "sigue siendo demasiado grande para la jugabilidad".
- Más Instante: los enemigos de burocracia derrotados ahora nombran un servicio REAL de la agencia (Redes Sociales, Diseño Web, SEM, Kit Digital...) en vez de un "papeleo" genérico.
**Decisiones ya tomadas por Manuel (vía panel de preguntas — el widget visual no se le mostró, se le preguntó con AskUserQuestion en el chat y SÍ funcionó):**
- Espada: **katana + cigarrillo** de detalle (no sustituir, añadir). Hecho.
- "Una tecla para moverse" en realidad era **una tecla para el tajo de la katana** — ya existía (botón ⚔️ + tecla `x`/`Control`), se añadió también `z` como alternativa.
- Caras de enemigos: pidió **buscar herramienta de imagen** → Pollinations volvió a funcionar (el 429 de antes era temporal, cola llena), se generaron 3 caras "chirulas" (2 machirulo + 1 viejo) + rembg para quitar fondo. Ya en el juego.
- Alcance: **seguir puliendo el Vol. 1** hasta que esté redondo — NO pasar a Vol. 2-5 todavía.
- **Foto de Brenda: sigue sin llegar como archivo** (búsqueda exhaustiva en todo el disco, nada) — sigue pendiente que la mande por otra vía.

## Deuda técnica anterior
Manuel mandó una FOTO PEGADA EN EL CHAT de Aida y Brenda juntas (Instagram, 23 marzo 2025) para identificar a Brenda — **se pudo IDENTIFICAR de vista (la de blanco, por el comentario "brendamye" debajo) pero NO PROCESAR**: una imagen pegada directamente en el chat no llega como archivo al disco (búsqueda exhaustiva en Downloads/Pictures/Desktop/OneDrive/Temp, nada). Rembg necesita un archivo real. **Pedido a Manuel que la guarde como archivo y la pase de otra forma** (WhatsApp a sí mismo, o soltarla en `fotos/`). En cuanto llegue como archivo: mismo proceso que con Aida (rembg + u2net_human_seg, crop a bbox) y sustituye el emoji 💁‍♀️ de Brenda en el código.

En el mismo mensaje, Manuel pidió de golpe: narrativa de villano (la competencia quiere cerrar Instante), un hilo de la TESIS (el tutor le pide un artículo, mini-juego de escribir título + "el revisor lo ha pasado"), reescalar a la protagonista -12%, frases suyas reales como catchphrases al coger bonus, la frase exacta "suéltame el brazo, hijo de puta" al derrotar a un machirulo, y "mira TODO de Instante" (5ª vez que lo pide — ya se usó logo+colores+tagline+services list). **Todo esto se implementó en un único commit grande** — ver el historial numerado más abajo para el detalle punto por punto.

## Deuda técnica anterior
**✅ CONFIRMADO por Manuel (24 jul): "ahora me encanta cómo está el muñeco" — la foto real de cuerpo entero (sin dibujo vectorial) ES el acierto. NO volver a un cuerpo dibujado. Cualquier ajuste futuro de personaje parte de foto real + rembg.**
**🔴 Pendiente que Manuel mande: una foto de Brenda** (no se pudo confirmar ninguna en su Instagram sin verla — Instagram bloqueó tras varios intentos y esta sesión no puede ver imágenes en el navegador en vivo, solo archivos ya descargados). Brenda sigue con el emoji 💁‍♀️ de momento, pero YA es aliada que ataca enemigos, no solo anima.

**RESUELTO (24 jul, tras 2 fracasos): el recorte de fondo de una foto real SÍ se consiguió — con la herramienta correcta.** Los dos intentos manuales (trazado de silueta a mano, flood-fill casero por color) fracasaban porque son técnicas caseras. La solución real: Python 3.14 con pip ya estaba instalado en `C:\Users\Manuel\AppData\Local\Python\bin\` (¡no lo busques como `python3` en Bash, resuelve al stub de Microsoft Store — usa la ruta completa!); se instaló `rembg` (`pip install rembg`, usa el modelo `u2net_human_seg`, se descarga solo ~176MB la primera vez) y de un solo intento dio un recorte limpio de cuerpo entero sobre `aida_flamenca.jpg`. Resultado en `fotos/aida_hero_real.png` (recortado a su bounding box, 458×823). **El personaje del Vol. 1 ahora es esta foto real, tal cual, sin ningún dibujo vectorial de cuerpo** — solo katana y logo de Instante como añadidos encima. **Si Manuel pide más adelante otro disfraz/capítulo, usa `rembg` con `u2net_human_seg` sobre la foto que toque — ya no hace falta pedirle que lo recorte él.**

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
11. **24 jul, sexta vuelta — "la espada al revés, Brenda con su silueta y que también pelee, muchos más malos con caras más fuertes/chirulas, más jugable, saca TODO de Instante, que sea como un arcade potente, más narrativa" — y "ahora me encanta cómo está el muñeco, eso sí":**
    - **✅ El muñeco de foto real, CONFIRMADO como acierto** — no tocarlo, no volver a vectores.
    - **Espada reorientada**: colgaba apuntando hacia arriba por detrás de la cabeza (arrastre de cuando el cuerpo era el dibujo vectorial viejo); ahora el puño está junto a la mano y la hoja cuelga hacia abajo, en reposo, punta al suelo.
    - **Brenda ya ataca enemigos** (no solo anima): tras conocerla seguía a Aida y, si un enemigo entra en su radio, lo derrota ella sola (con cooldown para no ser instantáneo). **Su foto real sigue pendiente** — Instagram de Aida (@aidamp) bloqueó tras varias descargas y sin poder ver imágenes en vivo en esta sesión no se pudo confirmar cuál foto es ella con certeza. Pedido a Manuel que la mande directamente.
    - **Más enemigos + variedad**: de 3 a 6 en el nivel, nuevo tipo `chirulo_viejo` (🧔, más lento, tag rojo "VIEJO CHIRULO") además de burocracia/machirulo — variedad de caras, no siempre el mismo icono. (Los emoji siguen siendo el límite real: no hay generador de imágenes en esta sesión para caras dibujadas "más fuertes/cuadradas" de verdad — si Manuel quiere ilustraciones reales de enemigos, hace falta esa herramienta o encargarlo fuera.)
    - **"Arcade potente" con el ojo de Instante**: añadida una marquesina estilo cabina arcade encima del juego (logo real de Instante + "INSTANTE ARCADE") y un marco/bisel de cabina alrededor de la pantalla, en HTML/CSS — esto SÍ se pudo verificar visualmente porque es DOM normal, no canvas de Phaser.
    - **"Más narrativa"**: NO abordado esta vuelta por foco en lo demás — sigue pendiente, la Intro actual (7 cartelas) no se ha ampliado.
12. **24 jul, séptima vuelta — mensaje-torrente con foto de Brenda + villano + tesis + resize + catchphrases, todo junto:**
    - **Foto de Brenda**: identificada de vista, no procesable (pegada en chat ≠ archivo). Ver el bloqueante de arriba.
    - **Narrativa ampliada**: 2 cartelas nuevas en la Intro, antes del cartón de Tarantino — la competencia quiere cerrar Instante, y el tutor le pide un artículo más para la tesis. Establece a los DOS villanos/frentes del juego (Instante + tesis), tal como pidió ("es como una aventura en la que aparte de Instante tiene que hacer la tesis").
    - **Mini-juego de la tesis**: nuevo personaje 📚 TUTOR en el nivel (x=2160). Al tocarlo se pausa el juego y sale un overlay HTML (no Phaser — inputs de texto reales necesitan DOM) pidiendo el título de un artículo; al enviar, siempre "el revisor lo ha pasado ✅" con el título que haya puesto, +5 al marcador, y se reanuda el juego. Reutilizable para más "tutores" en futuros capítulos.
    - **Protagonista -12%**: cuerpo físico y sprite reescalados (antes 114×205 → ahora 100×180), katana y logo reposicionados a la misma escala.
    - **Catchphrases suyas de verdad**: 6 frases (mezcla de `BRIEF.md` + las nuevas que dio Manuel) saltan al azar al coger un ⚡. La frase "¡Suéltame el brazo, hijo de puta!" sustituye al taunt genérico específicamente al derrotar a un `machirulo` (pedido explícito, palabra por palabra). "¡Olé Instante! ¡Viva la agencia Instante!" en la pantalla de victoria.
    - **Más de Instante (5ª vez pedido)**: añadido su lema real "La primera impresión siempre cuenta." bajo el logo en el Título — sacado literal de `agenciainstante.com`. Ya van: colores, logo, tagline principal, este lema, y el nombre de los servicios (aún sin usar en el juego — posible futuro: nombrar a los enemigos "burocracia" con los servicios reales tipo SEM/Kit Digital).
    - **NO abordado esta vuelta** (pendiente si Manuel insiste): caras de enemigos dibujadas "más fuertes/cuadradas" (sigue sin generador de imágenes), cigarrillo-espada (pregunta sin resolver — ver conversación, es ambiguo si quiere sustituir la katana o añadir un cigarro como gesto de personalidad), "una tecla para moverse" (sin aclarar qué pide exactamente, las flechas y los botones táctiles ya funcionan).
13. **24 jul, octava vuelta — resolviendo las 4 preguntas abiertas de la vuelta anterior:**
    - Se ofreció un panel visual (`mcp__visualize__show_widget`) con todas las preguntas — **Manuel no lo vio** ("digo que me hagas todas las preguntas, no las veo"). Pasado a `AskUserQuestion` (preguntas nativas del chat) y esa vez SÍ funcionó. **Lección: en esta sesión/cliente concreto, usar `AskUserQuestion` para decisiones de Manuel, no el widget visual** — puede que este cliente no soporte el widget de `mcp__visualize`.
    - **Cigarrillo añadido** (no sustituye la katana) — comisura de la boca, con ascua y una voluta de humo, tres formas pequeñas en `playerVisual`.
    - **Pollinations volvió a funcionar** (la cola llena de la sesión anterior era temporal). Generadas y recortadas (rembg, modelo `u2net` general — no `u2net_human_seg`, este es para ilustraciones no fotos) 3 caras: `enemy_machirulo1.png`, `enemy_machirulo2.png`, `enemy_viejo.png`. Ya sustituyen el emoji en los enemigos `machirulo`/`chirulo_viejo` (burocracia se queda en 📋, no es una persona). **Si Manuel pide más variedad de caras en el futuro, este es el pipeline: Pollinations (prompt tipo "portrait headshot, [descripción], comic book villain style, plain dark background") → rembg modelo `u2net` → crop a bbox → `fotos/`.**
    - **HUD ampliado** con contador de artículos (📖) — sube +1 cada vez que se pasa por un TUTOR. Se decidió NO añadir además una barra de progreso separada (redundante con un solo tutor en este nivel; reconsiderar si hay varios tutores en próximos capítulos).
    - Tecla de ataque: añadida `z` como alternativa a `x`/`Control` (aunque el pedido resultó ser sobre algo que ya existía).

## Próximos pasos (por orden, según el plan aprobado)
1. **Resolver por qué Manuel no ve el juego** (bloqueante).
2. Conseguir su OK explícito de que el Capítulo 1 ya le convence (checkpoint de la Fase 4 del plan — todavía no lo ha dado del todo, cada vuelta pedía cambios).
3. Fase 5: replicar el patrón validado a los otros 4 capítulos del storyboard — Vol. 2 Corpus/flamenco (foto `fotos/aida_flamenca.jpg` ya lista para esto), Vol. 3 pole dance (con Conchita de aliada), Vol. 4 running, Vol. 5 Instante HQ (jefe final "Cliente Imposible" + cameo de Brenda/madre/primos/Manuel + su frase "No se brilla sin oscuridad").
4. Fase 6: montaje completo (menú entre capítulos, manifest.json + sw.js + iconos PWA — todavía NO están en este proyecto, a diferencia del de Samara).
5. Fase 7: autorevisión (nada del ex-novio, nada inapropiado — ver BRIEF.md).
6. Fase 8: ya está publicado, pero falta la ronda de feedback consolidada final antes del 19 de agosto (su cumpleaños).

## Datos que ya NO hace falta volver a preguntar
Todo está en `BRIEF.md`: nombre completo, colores de Instante (#40ada9 turquesa, #e4378c rosa, #f2c749 amarillo, #68416c morado, #d83335 rojo), pasiones, viajes, frases familiares, gente que puede aparecer, y la única cosa vetada (el ex-novio).
