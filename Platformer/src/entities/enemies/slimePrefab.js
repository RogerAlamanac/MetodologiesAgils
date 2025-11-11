import {Enemy} from './enemyClassPrefab.js';


class slimePrefab extends enemyClassPrefab{
    constructor(_scene, _posX = 656, _posY = 272, _spriteTag = 'slime') {
        super(_scene, _posX, _posY, _spriteTag);
        
        _scene.add.existing(this);

        this.anims.play('slimeMove', true);   
    }

    setColliders() {
        this.scene.physics.add.collider(
            this,
            this.scene.walls
        );
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta); 
        if (this.body.blocked.left) {
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