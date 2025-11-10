class jumperPrefab extends enemyClassPrefab{
   constructor(_scene, _posX, _posY, _spriteTag = 'jumper') {
        super(_scene, _posX, _posY, _spriteTag);
        
        _scene.add.existing(this);

        this.anims.play('jumperMove', true);
        this.flipX = this.direction < 0; 
    }

    setColliders() {
        this.scene.physics.add.collider(
            this,
            this.scene.walls 
        );
    }

    preUpdate(time, delta) {
        if (this.body.blocked.left || this.body.blocked.right) {
            this.changeDirection();
        }
        super.preUpdate(time, delta); 
    }
}