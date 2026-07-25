# 🔬 Prueba de arranque — pégala en la consola del navegador

**Esto es lo más útil que se ha encontrado en todo el proyecto.** Este entorno no
pinta fotogramas solos (`game.loop.frame` se queda en 0), pero **sí se puede
empujar el bucle a mano con `game.step()`** y así ejecutar de verdad el `create()`
de cada capítulo. Es la única forma de cazar un cuelgue sin jugar.

Nació de un fallo real: al reorganizar la cárcel se borró sin querer todo el
bloque del ángel, y el Vol. 5 reventaba con `construyeZonaAngel is not a
function`. Desde fuera parecía "el menú no me deja entrar". Cinco minutos de
esto lo habrían pillado al instante.

**Pásala SIEMPRE antes de subir un cambio que toque los capítulos.**

```js
(()=>{
  const res={}; let t=1000;
  ['Cap1','Cap2','Cap3','Cap4','Cap5'].forEach(k=>{
    try{
      game.scene.start(k);
      let err=null;
      try{ for(let i=0;i<3;i++){ game.step(t,16); t+=16; } }catch(e){ err=e.message; }
      const esc = game.scene.getScene(k);
      res[k] = err ? ('💥 '+err)
        : ('OK · enemigos:'+(esc.enemies?esc.enemies.getChildren().length:'-')
          +' · monedas:'+(esc.collectibles?esc.collectibles.getChildren().length:'-')
          +' · suelos:'+(esc.platforms?esc.platforms.getChildren().length:'-')
          +(esc.jefeCuerpo?' · DRAGON':'')+(esc.bigote?' · CLIENTE':'')
          +(esc.zonaAngel?' · ANGEL':'')+(esc.barrotes?' · CARCEL':''));
      game.scene.stop(k);
    }catch(e){ res[k]='💥 al lanzar: '+e.message; }
  });
  return JSON.stringify(res,null,1);
})()
```

Lo que tiene que salir (25 jul 2026, build v37):

```
Cap1  OK · enemigos:6 · monedas:34 · suelos:10
Cap2  OK · enemigos:5 · monedas:32 · suelos:11
Cap3  OK · enemigos:5 · monedas:31 · suelos:10
Cap4  OK · enemigos:5 · monedas:34 · suelos:10
Cap5  OK · enemigos:6 · monedas:37 · suelos:13 · DRAGON · CLIENTE · ANGEL · CARCEL
```

Si en el Vol. 5 falta alguna de las cuatro etiquetas, es que se ha perdido un
acto por el camino.
