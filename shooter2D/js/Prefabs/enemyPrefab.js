class enemyPrefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='enemy'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);

    }
  
    preUpdate(){
        if(this.y >= config.height){
            this.setActive(false);
        } 
    }
}