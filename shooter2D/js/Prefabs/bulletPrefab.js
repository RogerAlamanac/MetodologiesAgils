class bulletPrefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='bullet'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);

    }

    preUpdate(){
        if(this.y <= 0){
            this.setActive(false);
        }
    }
}