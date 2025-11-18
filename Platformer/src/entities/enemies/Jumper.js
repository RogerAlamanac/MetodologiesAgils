import {Enemy} from './Enemy.js';

export class Jumper extends Enemy{
   constructor(_scene, _posX, _posY, _texture = 'jumper') {
        super(_scene, _posX, _posY, _texture);
        
        _scene.add.existing(this);

        this.anims.play('run_'+_texture, true);
        this.flipX = this.direction < 0; 
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta); 
        if (this.body.blocked.left || this.body.blocked.right) {
            this.changeDirection();
        }
        
    }
}