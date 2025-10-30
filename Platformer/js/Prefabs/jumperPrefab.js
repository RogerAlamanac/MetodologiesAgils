class jumperPrefab extends Phaser.GameObjects.Sprite{
    constructor(_scene, _posX, _posY, _spriteTag='jumper'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.jumper = this;
        this.jumper.anims.play('jumperMove');
        this.jumper.direction = 1;
        this.jumper.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.jumper.direction, 0);
        this.setColliders();
    }
    
    setColliders(){
        this.scene.physics.add.collider(
            this.jumper, 
            this.scene.walls
            )
    }
    preUpdate(time, delta){
        if(this.jumper.body.blocked.left || this.jumper.body.blocked.right){
            {
                this.jumper.direction *= -1;
                this.jumper.flipX = !this.jumper.flipX;
                this.jumper.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.jumper.direction);
            }
        }
        super.preUpdate(time,delta);
    }
}