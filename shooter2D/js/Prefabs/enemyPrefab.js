class enemyPrefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='enemy'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        this.setOrigin(0, 1);
        this.setScale(0.75);
        this.health = 2;
        this.anims.play('enemyAnim');
    }
  
    preUpdate(time, delta){
        if(this.y >= config.height){
            this.setActive(false);
        } 
        super.preUpdate(time,delta);
    }
}