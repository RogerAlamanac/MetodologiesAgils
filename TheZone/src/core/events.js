/**
 * Tabla centralizada de nombres de eventos del juego.
 * Evita "strings mágicos" repartidos por el código.
 */

export const EVENTS = 
{
    /**
   * Se emite cuando el héroe está creado y listo para usarse en la escena.
   * payload: (hero: Hero)
   *
   * Ejemplo de emisión:
   *   this.game.events.emit(EVENTS.HERO_READY, this.hero);
   */
    HERO_READY: 'hero:ready',

    /**
    * Se emite cuando el jugador recoge una gema.
    * payload: (value: number)
    *
    * Ejemplo (en Gem.getGem):
    *   this.scene.game.events.emit(EVENTS.GEM_COLLECTED, this.value ?? 1);
    */
    GEM_COLLECTED: 'gem:collected',
 
    /**
    * Se emite cuando el héroe recibe daño.
    * payload: (amount: number)
    *
    * Ejemplo:
    *   this.game.events.emit(EVENTS.HERO_DAMAGED, 1);
    */
    HERO_DAMAGED: 'hero:damaged',
 
    /**
    * Se emite cuando el héroe muere.
    * payload: (hero: Hero)
    */
    HERO_DIED: 'hero:died' 
};