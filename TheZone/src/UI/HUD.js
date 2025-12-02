import { HERO, SCALE } from '../core/constants.js';
import { EVENTS } from '../core/events.js';

export class HUD extends Phaser.Scene {
    constructor() {
      super({ key: 'hud' });
    }
  
    preload()
    { //Carga assets en memoria
        this.load.setPath('assets/sprites/ui');
        this.load.image('gemUI','spr_gui_gem_0.png');

        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('healthUI','health.png',
        {frameWidth:128,frameHeight:28});

        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont','font.png','font.fnt');
    }

    create()
    {
        const wide = this.scale.width;

        //Inicializamos a cero el contador de gemas e inicializo la vida del hero
        this.gems = 0;
        this.currentHealth = HERO.MAX_LIVES;
        
        this.healthUI = this.add.sprite(10, 10, 'healthUI', HERO.MAX_LIVES) // frame según vidas
        .setOrigin(0)
        .setScrollFactor(0);
  
        this.gemUI = this.add.sprite(wide -80, 20, 'gemUI')
        .setScrollFactor(0);
  
        this.gemUIText = this.add.bitmapText(
        wide-10,12,
        'UIFont',
        'x00',
        20
        )
        .setOrigin(1,0)
        .setScrollFactor(0);

        this.setListeners();
    }

    setListeners()
    {
        this.game.events.on(EVENTS.HERO_READY, this.onHeroReady, this);
        this.game.events.on(EVENTS.HERO_DAMAGED, this.onHeroDamaged, this);
        this.game.events.on(EVENTS.HERO_DIED, this.onHeroDied, this);
        this.game.events.on(EVENTS.GEM_COLLECTED, this.onGemCollected, this);     
    }

    onHeroReady()
    {
        this.currentHealth = this.maxHealth;
        this.updateHealthUI();   
    }
    onHeroDamaged(_hero)
    {
        this.currentHealth--;
        this.updateHealthUI();   
    }
    onHeroDied()
    {
        this.currentHealth = HERO.MAX_LIVES;
        this.updateHealthUI();   
    }
    updateHealthUI()
    {
        this.healthUI.setFrame(this.currentHealth);   
    }

    onGemCollected(_value)
    {
        this.gems +=_value;  
          console.log('HUD recibió GEM_COLLECTED, valor:', _value); 
        this.updateGemUI();
    }

    updateGemUI()
    {
        this.gemUIText.text = 'x'+('0'+this.gems).slice(-2);
    }
}