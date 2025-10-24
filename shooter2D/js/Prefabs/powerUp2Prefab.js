class powerUp2Prefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='powerUp1'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.anims.play('powerUp1Anim');
    }

    preUpdate(){
        if (this.y >= config.height) {
            this.body.setVelocityY(0);
        }
    }
}