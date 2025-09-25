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
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'background')
        .setOrigin(0,0);   //se puede hacer setOrigin(0) en el caso de que las dos coordenadas sean iguales

        this.bird = this.add.sprite(config.width/2, config.height/2, 'bird').setScale(5)

        console.log(this.bird)
        this.loadAnimations();  //Funcion que creamos nosotros

        this.bird.anims.play('fly');

        this.key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
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
        this.bird.angle += 5;

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
        if(this.key_m.isDown){
            this.scene.start("mainMenu")
        }
    }
}

class gameStateLink extends Phaser.Scene{
    constructor(){
        //Llamamos al constructor de la scene
        super({key:"gameStateLink"});
    }
    preload(){//Cargamos los assets en memoria
        this.load.image('grass', 'assets/sprites/grass.png');
        this.load.spritesheet('link', 'assets/sprites/link.png',
            {frameWidth:120, frameHeight:130}
        );
    }
    create(){//Pintamos los assets en pantalla

        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'grass')
        .setOrigin(0,0); 

        this.link = this.add.sprite(config.width/2, config.height/2, 'link').setScale(0.75);
        
        this.loadAnimations();  //Funcion que creamos nosotros 
        this.link.anims.play('walkDown')
        this.key_m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.cursores = this.input.keyboard.createCursorKeys();

        this.linkCurrentAnim = 'walkDown';

    }

    loadAnimations(){
        this.anims.create(
            {
                key:'walkDown',
                frames:this.anims.generateFrameNumbers('link', {start:0, end:9}),
                frameRate:10,
                repeat:-1,
                yoyo:false
            }
        );

        this.anims.create(
            {
                key:'walkLeft',
                frames:this.anims.generateFrameNumbers('link', {start:10, end:19}),
                frameRate:10,
                repeat:-1,
                yoyo:false
            }
        )

        this.anims.create(
            {
                key:'walkUp',
                frames:this.anims.generateFrameNumbers('link', {start:20, end:29}),
                frameRate:10,
                repeat:-1,
                yoyo:false
            }
        )

        this.anims.create(
            {
                key:'walkRight',
                frames:this.anims.generateFrameNumbers('link', {start:30, end:39}),
                frameRate:10,
                repeat:-1,
                yoyo:false
            }
        )
    }

    update(){

        if(this.cursores.right.isDown){
            if(this.link.x <= config.width){
                this.link.x += config.HEROSPEED;
            }
            if(this.linkCurrentAnim !== 'walkRight') {
                this.link.anims.play('walkRight', true);
                this.linkCurrentAnim = 'walkRight';
            }

        }
        if(this.cursores.left.isDown){
            if(this.link.x >= 0){
                this.link.x -= config.HEROSPEED;
            }
            
            if(this.linkCurrentAnim !== 'walkLeft') {
                this.link.anims.play('walkLeft', true);
                this.linkCurrentAnim = 'walkLeft';
            }

        }
        if(this.cursores.up.isDown){
            if(this.link.y >= 0){
                this.link.y -= config.HEROSPEED;
            }
            if(this.linkCurrentAnim !== 'walkUp') {
                this.link.anims.play('walkUp', true);
                this.linkCurrentAnim = 'walkUp';
            }

        }
        if(this.cursores.down.isDown){
            if(this.link.y <= config.height){
                this.link.y += config.HEROSPEED;
            }
            if(this.linkCurrentAnim !== 'walkDown') {
                this.link.anims.play('walkDown', true);
                this.linkCurrentAnim = 'walkDown';
            }

        }
        if(this.key_m.isDown){
            this.scene.start("mainMenu")
        }
    }
}

class mainMenu extends Phaser.Scene{
    constructor(){
        super({key:"mainMenu"});
    }
    preload(){
        this.cameras.main.setBackgroundColor("AAA")
        this.load.spritesheet('link', 'assets/sprites/link.png',
            {frameWidth:120, frameHeight:130}
        );

        this.load.spritesheet('bird', 'assets/sprites/birdAnim.png',
            {frameWidth:17, frameHeight:12}
        );
    }
    create(){
        this.add.sprite(config.width/4, config.height/2, 'bird').setScale(5);
        this.add.sprite(config.width/1.5, config.height/2, 'link').setScale(1);

        
       this.key_one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key_two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.cursores = this.input.keyboard.createCursorKeys();
    }

    update(){
        if(this.key_one.isDown){
            this.scene.start("gameState")
        }
        if(this.key_two.isDown){
            this.scene.start("gameStateLink")
        }
    }
}