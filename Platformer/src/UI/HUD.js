import { GAME_SIZE } from "../core/constants.js";
import { HERO } from "../core/constants.js";
import { EVENTS } from "../core/events.js";
export class HUD extends Phaser.Scene{
    constructor()
    {
        super({key:'hud'});
    }
        preload()
        { //Carga assets en memoria
            this.cameras.main.setBackgroundColor('#666');
            this.load.setPath('assets/sprites/static');
            this.load.image('gemUI', 'spr_gem_0.png')
            this.load.setPath('assets/sprites/spritesheets');
            this.load.spritesheet('gem', 'gem.png',
            {frameWidth:32,frameHeight:32});
            this.load.spritesheet('health','health.png',
            {frameWidth:128,frameHeight:28});
            
    
            this.load.setPath('assets/fonts')
            this.load.bitmapFont('UIFont', 'font.png', 'font.fnt')
        }

        create(){
            this.gems = 0;
            this.currenthealth = HERO.MAX_LIVES
            this.health = this.add.sprite(80, 30, 'health', HERO.MAX_LIVES)//.setFrame(HERO.MAX_LIVES - 1);
            this.health.setScrollFactor(0);
            this.gemUI = this.add.sprite(GAME_SIZE.LEVEL1_WIDTH - 80, 15, 'gem').setOrigin(0).setScrollFactor(0)
            this.gemUIText = this.add.bitmapText(
                GAME_SIZE.WIDTH-5, 17,
                'UIFont',
                'x00',
                20
            ).setOrigin(1,0).setScrollFactor(0)
            this.setListeneres()
        }

        setListeneres(){
            this.game.events.on(EVENTS.HERO_READY, this.onHeroReady, this);
            this.game.events.on(EVENTS.GEM_COLLECTED, this.onGemCollected, this);
        }

        onHeroReady(){

        }

        onGemCollected(_value){
            this.gems += _value
            this.updateGemUI()
        }

        updateGemUI(){
            this.gemUIText.text='x0'+this.gems.slice(-2);
        }
}
