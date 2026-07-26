/* Service worker del juego de Aida.
   ⚠️ OJO CON ESTO: durante todo el desarrollo el problema recurrente fue que Manuel veía
   versiones viejas. Por eso este service worker es NETWORK-FIRST para el HTML: la página
   se pide SIEMPRE a la red y solo se tira de la copia guardada si no hay conexión. Las
   fotos y el audio sí van de caché primero, que no cambian y así el juego abre al vuelo
   y funciona sin datos. NO cambiar el HTML a cache-first: volvería el problema de siempre. */
const CACHE = 'aida-vol1-5-v42';
const ASSETS = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './fotos/aida_hero_real.png',
  './fotos/aida_face_hero.png',
  './fotos/aida_portada.jpg',
  './fotos/brenda_hero_real.png',
  './fotos/brenda_face.png',
  './fotos/mama_face.png',
  './fotos/manuel_face.png',
  './fotos/primo_face.png',
  './fotos/primo2_face.png',
  './fotos/instante_logo.png',
  './fotos/instante_ojos_tile.png',
  './fotos/enemy_machirulo1.png',
  './fotos/enemy_machirulo2.png',
  './fotos/enemy_viejo.png',
  './audio/march_intro.mp3',
  './audio/tension_western.mp3',
];

self.addEventListener('install', e => {
  // si algún fichero fallara, que no tumbe la instalación entera del service worker
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(a)))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const esHTML = e.request.mode === 'navigate' || e.request.url.endsWith('.html');
  if (esHTML) {
    // La página, SIEMPRE de la red Y SIN PASAR POR LA CACHÉ DEL NAVEGADOR.
    // ⚠️ Esto es lo que faltaba: GitHub Pages manda la página con
    // `Cache-Control: max-age=600`, así que el navegador se la queda 10 MINUTOS
    // y ni pregunta al servidor. Por eso Manuel veía builds viejos una y otra
    // vez aunque el despliegue estuviera hecho. Con `cache:'no-store'` el
    // service worker se salta esa caché y pide la página de verdad.
    e.respondWith(
      fetch(e.request, {cache: 'no-store'})
        .catch(() => fetch(e.request).catch(() => caches.match(e.request)))
    );
    return;
  }
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request)));
});
