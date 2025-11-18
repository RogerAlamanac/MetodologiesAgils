import {Enemy} from './Enemy.js';

export class Slime extends Enemy{
    constructor(_scene, _posX = 656, _posY = 272, _spriteTag = 'slime') {
        super(_scene, _posX, _posY, _spriteTag);
        
        _scene.add.existing(this); 
        this.anims.play('run_'+_spriteTag,true);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); 
        if (this.body.blocked.left || this.body.blocked.right) {
            this.changeDirection();
        } else if (this.direction === 1) { 

            const sensorOffset = this.body.halfWidth * this.direction; 
            const sensorX = this.x + sensorOffset;
            const sensorY = this.y + this.body.halfHeight + 2; 

            const tile = this.scene.walls.getTileAtWorldXY(sensorX, sensorY);

            if (!tile) { 
                this.changeDirection(); 
            }
          
        }
    }
}