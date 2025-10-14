class mainMenu extends Phaser.Scene{
    constructor(){
        //Llamamos al constructor de la scene
        super({key:"mainMenu"});
    }
    preload(){//Cargamos los assets en memoria
        this.cameras.main.setBackgroundColor("113");
        this.load.setPath('assets/sprites');
        this.load.image('bg1', 'background_back.png');
        this.load.image('bg2', 'background_frontal.png');
        this.load.spritesheet('nave', 'naveAnim.png', {frameWidth : 16, frameHeight : 24});
        this.load.image('button', 'btn.png');
    }

    create(){//Pintamos los assets en pantalla
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height, 'bg1').setOrigin(0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height, 'bg2').setOrigin(0);
        this.spaceShip = this.add.sprite(config.width/2, config.height/2, 'nave').setScale(1);
        this.button = this.add.image(
            config.width / 2, config.height / 2 + 75,
            'button'
        ).setScale(.25)
        .setInteractive({useHandCursor:true})
        .on(
            'pointerdown',
            ()=>this.startGame()
        );

        this.loadAnimations()

        this.title = this.add.text(
            config.width / 2, 
            config.height / 2 - 75,
            'SHOOTER 2D',
            {
                fontFamily: 'Arial Black',
                fill : '#43d637',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }
        ).setOrigin(.5)
        
    }
    
    startGame(){
        this.button.destroy();

        this.add.tween({
            targets:this.title,
            duration: 2 * 1000,
            alpha: 0
        })

        this.add.tween({
            targets: this.spaceShip,
            duration: 3* 1000,
            y:config.height*0.95,
            onComplete:this.changeScene,
            callbackScope: this
        })
    }

    changeScene(){
        this.scene.start('gameState');
    }
    loadAnimations(){
        this.anims.create(
            {
                key:'idle',
                frames:this.anims.generateFrameNumbers('nave', {start:0, end:1}),
                frameRate:10,
                repeat:-1
            }
        );
    }

    update(){
        this.bg1.tilePositionY -= 1;
        this.bg2.tilePositionY -= 2;
        this.spaceShip.anims.play('idle', true);
    }
}