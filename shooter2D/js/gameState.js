class gameState extends Phaser.Scene{
    constructor(){
        //Llamamos al constructor de la scene
        super({key:"gameState"});
    }
    preload(){//Cargamos los assets en memoria
        this.cameras.main.setBackgroundColor("113");
        this.load.setPath('assets/sprites');
        this.load.image('bg1', 'background_back.png');
        this.load.image('bg2', 'background_frontal.png');
        //this.load.image('spaceShip', 'spr_player_straight_0.png');
        this.load.spritesheet('nave', 'naveAnim.png', {frameWidth : 16, frameHeight : 24});
    }
    create(){//Pintamos los assets en pantalla
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height, 'bg1').setOrigin(0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height, 'bg2').setOrigin(0);
        this.spaceShip = this.add.sprite(config.width/2, config.height/2, 'nave').setScale(5);
        this.loadAnimations();  //Funcion que creamos nosotros


        this.cursores = this.input.keyboard.createCursorKeys();
    }

    loadAnimations(){
        this.anims.create(
            {
                key:'fly',
                frames:this.anims.generateFrameNumbers('bird', {start:0, end:2}),
                frameRate:10,
                repeat:-1,
                yoyo:true
            }
        );
    }

    update(){
        this.bg1.tilePositionY -= 1;
        this.bg2.tilePositionY -= 2;
    }
}