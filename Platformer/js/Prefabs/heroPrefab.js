class heroPrefab extends Phaser.GameObjects.Sprite{
     constructor(_scene, _posX, _posY, _spriteTag='hero'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);
        this.scene = _scene;
        this.hero = this;
        this.hero.anims.play('move');
        this.hero.direction = 1;
        this.hero.body.setVelocityX(gamePrefs.HERO_SPEED * this.hero.direction, 0);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setColliders();
    }
    
    setColliders(){
        this.scene.physics.add.collider(
            this.hero, 
            this.scene.walls
            )
    }   
    preUpdate(time, delta){
         if(this.cursors.left.isDown){
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.hero.setFlipX(true);
            this.hero.anims.play('move', true);
        } 
        else if(this.cursors.right.isDown){ //MOVER DERECHA
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.hero.setFlipX(false);
            this.hero.anims.play('move', true);
        } else{
            this.hero.body.setVelocityX(0);
            this.hero.anims.stop().setFrame(0);
        } 

        if(this.cursors.space.isDown && this.hero.body.onFloor() 
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250)
        ){        
            this.hero.body.setVelocityY(gamePrefs.HERO_JUMP);        
        }

        if(!this.hero.body.onFloor()){
            this.hero.anims.stop().setFrame(6);
        }
        super.preUpdate(time,delta);
    }
}