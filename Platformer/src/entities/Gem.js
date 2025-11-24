export class Gem extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='gem'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.value = 0
        this.anims.play('gem', true);
        this.setColliders();
    }

    setValue(_value){
        this.value = _value
    }

    setColliders(){
        this.scene.physics.add.overlap(
            this, 
            this.scene.hero,
            this.scene.hero.pickGem,
        )
    }

    applyColorByValue(){
        if (this.value === 5){
            this.setTint(0x00ff00); // COLOR VERDE
        }
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta)
        this.applyColorByValue();
    }
}
   
