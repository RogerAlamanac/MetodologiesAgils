class slimePrefab extends enemyClassPrefab{
    constructor(_scene, _posX, _posY, _spriteTag='slime'){
        super(_scene, _posX, _posY, _spriteTag);
        this.slime = this;
        this.slime.anims.play('slimeMove');
        this.slime.direction = 1;
        this.slime.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.slime.direction, 0);
        this.setColliders();
    }
    
    setColliders(){
        this.scene.physics.add.collider(
            this.slime, 
            this.scene.walls
            )
    }
    preUpdate(time, delta){
        if(this.slime.body.blocked.left || this.slime.body.blocked.right){
            {
                this.slime.direction *= -1;
                this.slime.flipX = !this.slime.flipX;
                this.slime.body.setVelocityX(gamePrefs.ENEMY_SPEED * this.slime.direction);
            }
        }
        super.preUpdate(time,delta);
    }
}