import { HERO } from '../core/constants.js';
import { EVENTS } from '../core/events.js';
export class Hero extends Phaser.Physics.Arcade.Sprite{
     constructor(_scene, _posX, _posY, _spriteTag='hero'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        this.setColliders();
       this.setSize(12,10).setOffset(18,22);
        this.body.debugBodyColor = 0x9999FF;
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    
    setColliders(){
        this.scene.physics.add.collider(
            this, 
            this.scene.walls
            );
        this.scene.physics.add.collider(
            this, 
            this.scene.columns
            );
        this.scene.physics.add.collider(
            this, 
            this.scene.static_objects
            );

        this.scene.physics.add.overlap(
                this, 
                this.scene.interactive_zones,
                this.scene.interact(),
                null,
                this
                );
    }  


    checkDoorOverlap(_door, _hero){
        if(_door.isOpen){
            //Overlap logic
        }
    }

    setScore(_value){
        this.score = _value;
    }
 
    preUpdate(time, delta){
         if(this.cursors.left.isDown){
            this.body.setVelocityX(-HERO.SPEED);
            this.setFlipX(true);
            this.anims.play('hero_walkSide', true);
        } 
        else if(this.cursors.right.isDown){ //MOVER DERECHA
            this.body.setVelocityX(HERO.SPEED);
            this.setFlipX(false);
            this.anims.play('hero_walkSide', true);
        } else if(this.cursors.down.isDown){
            this.body.setVelocityY(HERO.SPEED);
            this.setFlipX(false);
            this.anims.play('hero_walkDown', true);
        }
        else if(this.cursors.up.isDown){
            this.body.setVelocityY(-HERO.SPEED);
            this.setFlipX(false);
            this.anims.play('hero_walkUp', true);
        }
            else{
            this.body.setVelocity(0);
            this.setFlipX(false);
            this.anims.play('hero_idle', true);
        } 

        if(this.cursors.space.isDown && this.body.onFloor() 
            && Phaser.Input.Keyboard.DownDuration(this.cursors.space, 250)
        ){        
            this.body.setVelocityY(HERO.JUMP_FORCE);        
        }

        if(!this.body.onFloor()){
            this.anims.stop().setFrame(6);
        }
        super.preUpdate(time,delta);
    }
}