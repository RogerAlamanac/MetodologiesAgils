import { ENEMY } from '../../core/constants.js';

export class Enemy extends Phaser.Physics.Arcade.Sprite {
     constructor(_scene, _posX, _posY, _spriteTag) {
        super(_scene, _posX, _posY, _spriteTag);

        this.scene = _scene;
        _scene.add.physics;
        this.direction = 1; 
        _scene.physics.world.enable(this);

        this.body.setVelocityX(ENEMY.SPEED * this.direction);
        this.anims.play(_spriteTag + 'move',true);
        this.setColliders();
    }

    setColliders() {}

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
    }
    
    // Función para cambiar la dirección del movimiento y el flipX
    changeDirection() {
        this.direction *= -1;
        this.flipX = this.direction < 0; 
        this.body.setVelocityX(ENEMY.SPEED * this.direction);
    }
}