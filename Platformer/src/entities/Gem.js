import { EVENTS } from "../core/events.js";

export class Gem extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='gem'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.value = 0
        this.anims.play(_spriteTag, true);
        //this.setColliders();
        this.scene.game.events.once(
            EVENTS.HERO_READY,
            this.onHeroReady,
            this
        )
    }

    onHeroReady(_hero){
        this.scene.physics.add.overlap(
            this, 
            this.scene.hero,
            this.scene.hero.pickGem,
        )
    }
    setValue(_value){
        this.value = _value
        this.applyColorByValue();
    }

    /*setColliders(){
        if(this.scene.hero){
            this.scene.physics.add.overlap(
                this, 
                this.scene.hero,
                this.scene.hero.pickGem,
            )
        }
    }*/

    applyColorByValue(){
        if (this.value === 5){
            this.setTint(0x00ff00); // COLOR VERDE
        }
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta)
    }
}
   
