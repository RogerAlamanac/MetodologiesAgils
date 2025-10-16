class level1 extends Phaser.Scene{
    constructor(){
        super({key:'level1'});
    }

    preload(){
        this.cameras.main.setBackgroundColor("666");
        this.load.setPath('assets/sprites');
        this.load.image('bg', 'bg_green_tile.png');
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight:32}); 
        this.load.image('doorEntry', 'spr_door_closed_0.png');

        this.load.setPath('assets/tilesets');
        this.load.image('tileset_walls', 'tileset_walls.png');
        this.load.image('tileset_moss', 'tileset_moss.png');

        this.load.setPath('assets/maps');
        this.load.tilemapTiledJSON('level1', 'level1.json');
    }

    create(){
        //this.add.tileSprite(0,0,gamePrefs.level1Width, gamePrefs.level1Height, 'bg')
        this.add.tileSprite(0,0,gamePrefs.gameWidth, gamePrefs.gameHeight, 'bg').setOrigin(0);
        this.map = this.add.tilemap('level1');

        this.map.addTilesetImage('tileset_walls')
        this.map.addTilesetImage('tileset_moss')
        

        this.walls = this.map.createLayer('layer_walls', 'tileset_walls');
        this.map.createLayer('layer_moss_up', 'tileset_moss');
        this.map.createLayer('layer_moss_right', 'tileset_moss');
        this.map.createLayer('layer_moss_left', 'tileset_moss');
        this.map.createLayer('layer_moss_down', 'tileset_moss');

        //Defino con que se colisiona en la capa de walls
        //this.map.setCollisionBetween(1,11, true, true, 'layer_walls')
        this.map.setCollisionByExclusion(-1,true, true, 'layer_walls') //Ponemos -1 ya que el Phase lo interpreta como un 0 en el json 


        this.doorEntry = this.add.image(65,268, 'doorEntry');
       /* this.doorEntry = this.physics.add.image(65,268, 'doorEntry');
        this.doorEntry.body.setAllowGravity(false);
        this.doorEntry.body.setImmovable(true);*/

        this.hero = this.physics.add.sprite(65, 100, 'hero');
        
       this.physics.add.collider(this.hero, this.walls);

       this.cursors = this.input.keyboard.createCursorKeys();
       this.loadAnimations();
    
    }
    loadAnimations(){
        this.anims.create(
            {
                key:'move',
                frames:this.anims.generateFrameNumbers('hero', {start:2, end:5}),
                frameRate:10,
                repeat:-1
            }
        );
    }
    update(){
        if(this.cursors.left.isDown){
            this.hero.body.setVelocityX(-gamePrefs.HERO_SPEED);
            this.hero.setFlipX(true);
            this.hero.anims.play('move', true);
        } 
        else if(this.cursors.right.isDown){
            this.hero.body.setVelocityX(gamePrefs.HERO_SPEED);
            this.hero.setFlipX(false);
            this.hero.anims.play('move', true);
        } else{
            this.hero.body.setVelocityX(0);
            this.hero.anims.stop().setFrame(0);
        }
    }
}