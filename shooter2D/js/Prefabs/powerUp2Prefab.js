class powerUp2Prefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='powerUp2'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.add.existing(this);
        this.anims.play('powerUp2Anim');
    }

    preUpdate(){
        if (this.y >= config.height) {
            this.body.setVelocityY(0);
        }
    }
}