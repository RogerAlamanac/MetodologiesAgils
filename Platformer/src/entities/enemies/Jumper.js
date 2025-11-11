import { ENEMY } from "../../core/constants.js";

class Jumper extends enemyClassPrefab{
   constructor(_scene, _posX, _posY, _texture = 'jumper') {
        super(_scene, _posX, _posY, _texture);
        
        _scene.add.existing(this);

        this.anims.play(_texture + 'Move', true);
        this.flipX = this.direction < 0; 
    }

    setColliders() {
        if(this.scene.walls){
            this.scene.physics.add.collider(
                this,
                this.scene.walls 
            );
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); 
        if (this.body.blocked.left || this.body.blocked.right) {
            this.changeDirection();
        }
        
    }
}