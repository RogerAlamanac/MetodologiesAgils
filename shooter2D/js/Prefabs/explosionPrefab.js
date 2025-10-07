class explosionPrefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='bullet'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        this.anims.play('explosionAnim');
        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.setActive(false);
        }, _scene);
    }

    preUpdate(time, delta){
        if(this.y <= 0){
            this.setActive(false);
        } 
        super.preUpdate(time, delta);
    }
}