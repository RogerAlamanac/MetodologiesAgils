export class Door extends Phaser.Physics.Arcade.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='door'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.isOpen = false;
        //this.anims.play('door', true);
        this.setColliders();
        
    }

    setOpened(_isOpen){
        this.isOpen = _isOpen;
    }

    setColliders(_hero){
       /* this.scene.physics.add.overlap(
            this, 
            this.scene._hero,
            this.scene._hero.checkDoorOverlap
        )*/
    }

    preUpdate(time, delta){
        super.preUpdate(time, delta)
    }
}