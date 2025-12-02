import { HERO } from '../core/constants.js';
import { EVENTS } from '../core/events.js';
export class Hero extends Phaser.Physics.Arcade.Sprite{
     constructor(_scene, _posX, _posY, _spriteTag='hero'){
        super(_scene, _posX, _posY, _spriteTag);
        _scene.add.existing(this);
        _scene.physics.world.enable(this);

        this.scene = _scene;
        this.setOrigin(.5, 1);
        this.anims.play('run');
        this.direction = 1;
        this.body.setVelocityX(HERO.SPEED * this.direction, 0);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.setColliders();
        this.score = 0;
        this.health = HERO.MAX_LIVES;
    }
    
    setColliders(){
        this.scene.physics.add.collider(
            this, 
            this.scene.walls
            )
    }  

    hitHero(_enemy, _hero){
        if(this.body.touching.down && _enemy.body.touching.up){
            if(--_enemy.health <= 0){
                _enemy.destroy();
            }
            this.body.setVelocityY(HERO.JUMP_FORCE);

        } else{
            if(this.health<0){
                this.scene.game.events.emit(EVENTS.HERO_DIED);
                this.body.reset(65, 100);
                this.health = HERO.MAX_LIVES;
                this.score = 0;
            } 
            else{
                this.scene.game.events.emit(EVENTS.HERO_DAMAGED);
                this.body.reset(65, 100);
                this.scene.cameras.main.shake(500, 0.05)
                this.scene.cameras.main.flash(500, 255, 0, 0);
                


                this.score += 10;
            }
        }
    }

    /*pickGem(_gem, _hero){
        //Actualizar UI de puntos
        this.scene.game.events.emit(EVENTS.GEM_COLLECTED, this.value ?? 1);
        //Destruir gem
        _gem.disableBody(true, true);
        _gem.destroy();    
        
    }*/

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
            this.anims.play('run', true);
        } 
        else if(this.cursors.right.isDown){ //MOVER DERECHA
            this.body.setVelocityX(HERO.SPEED);
            this.setFlipX(false);
            this.anims.play('run', true);
        } else{
            this.body.setVelocityX(0);
            this.anims.stop().setFrame(0);
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