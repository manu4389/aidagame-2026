/* ══════════════════════════════════════════════════════════════════════════
   INSTALAR EL JUEGO COMO APP, con un solo botón
   Manuel: "¿no hay una manera más fácil, sin meterse en Safari?".
   - En Android / Chrome / Edge: SÍ. El navegador avisa con `beforeinstallprompt`,
     se guarda ese aviso y al pulsar el botón sale el diálogo nativo de instalar.
     Un toque y ya.
   - En iPhone: NO SE PUEDE, y no es cosa nuestra. Apple no da ninguna forma de
     lanzar la instalación desde la web; la única vía es Compartir → Añadir a
     pantalla de inicio. Lo que sí se puede es explicarlo con dibujos en vez de
     con un párrafo, y eso es lo que hace `pasosIPhone()`.
   ══════════════════════════════════════════════════════════════════════════ */
(function(){
  let avisoInstalar = null;

  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const yaInstalada = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;

  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();                 // que no salga la barrita del navegador: mandamos nosotros
    avisoInstalar = e;
    document.dispatchEvent(new CustomEvent('sePuedeInstalar'));
  });
  window.addEventListener('appinstalled', function(){
    avisoInstalar = null;
    document.dispatchEvent(new CustomEvent('appInstalada'));
  });

  // devuelve: 'instalada' | 'rechazada' | 'ios' | 'manual' | 'ya'
  window.instalarApp = async function(){
    if(yaInstalada) return 'ya';
    if(avisoInstalar){
      avisoInstalar.prompt();
      let res = 'rechazada';
      try { res = (await avisoInstalar.userChoice).outcome === 'accepted' ? 'instalada' : 'rechazada'; } catch(e){}
      avisoInstalar = null;
      return res;
    }
    return esIOS ? 'ios' : 'manual';
  };

  window.appSePuedeInstalarYa = () => !!avisoInstalar;
  window.appYaInstalada = yaInstalada;
  window.appEsIOS = esIOS;
})();
