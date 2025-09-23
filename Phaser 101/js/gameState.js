class gameState extends Phaser.Scene{
    constructor(){
        //Llamamos al constructor de la scene
        super({key:"gameState"});
    }
    preload(){//Cargamos los assets en memoria
        this.cameras.main.setBackgroundColor("AAA")
        this.load.image('background', 'assets/sprites/bg.jpg');
        this.load.spritesheet('bird', 'assets/sprites/birdAnim.png',
            {frameWidth:17, frameHeight:12}
        );
    }
    create(){//Pintamos los assets en pantalla
        //this.add.image(0,0, 'bgeta');
        //this.add.image(config.width/2, config.height/2, 'bgeta');
        //this.add.sprite(config.width/2, config.height/2, 'bgeta');
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background')
        .setOrigin(0,0);   //se puede hacer setOrigin(0) en el caso de que las dos coordenadas sean iguales
        //this.bird = this.add.image(config.width/2, config.height/2, 'bird').setScale(5).setFlipX(true);
        this.bird = this.add.sprite(config.width/2, config.height/2, 'bird').setScale(5)

        console.log(this.bird)
        this.loadAnimations();  //Funcion que creamos nosotros

        this.bird.anims.play('fly');

        /*this.key_right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.key_left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.key_up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);*/
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
        this.bg.tilePositionX += 2;
        //this.bird.angle += 1;

        if(this.cursores.right.isDown){
            this.bird.x += config.HEROSPEED;
        }
        if(this.cursores.left.isDown){
            this.bird.x -= config.HEROSPEED;
        }
        if(this.cursores.up.isDown){
            this.bird.y -= config.HEROSPEED;
        }
        if(this.cursores.down.isDown){
            this.bird.y += config.HEROSPEED;
        }
    }
}