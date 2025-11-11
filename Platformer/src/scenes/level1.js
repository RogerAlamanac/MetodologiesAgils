import {Jumper} from "../entities/enemies/Jumper.js";
import { LEVEL_SIZE, HERO } from "../core/constants.js";

export class Level1 extends Phaser.Scene{
    constructor(){
        super({key:'level1'});
    }

    preload(){
        this.cameras.main.setBackgroundColor('#666');
        this.load.setPath('assets/sprites/backgrounds');
        this.load.image('bg', 'bg_green_tile.png');

        this.load.setPath('assets/sprites/static');
        this.load.image('doorEntry', 'spr_door_closed_0.png');

        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('hero', 'hero.png', {frameWidth: 32, frameHeight:32}); 
        this.load.spritesheet('jumper', 'jumper.png', {frameWidth:32, frameHeight:32})
        this.load.spritesheet('slime', 'slime.png', {frameWidth:32, frameHeight:32})

        this.load.setPath('assets/tiled/tilesets');
        this.load.image('tileset_walls', 'tileset_walls.png');
        this.load.image('tileset_moss', 'tileset_moss.png');

        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1', 'level1.json');
    }

    create(){
        this.add.tileSprite(0,0,LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT, 'bg');
        //this.add.tileSprite(0,0,gamePrefs.level1Width, gamePrefs.level1Height, 'bg').setOrigin(0);
        //CARGO JSON
        this.map = this.make.tilemap({key:'level1'});

        //CARGO TILESETS
        const ts_walls = this.map.addTilesetImage('tileset_walls')
        const ts_moss = this.map.addTilesetImage('tileset_moss')
        
        //PINTO LAS CAPAS / LAYERS
        this.walls = this.map.createLayer('layer_walls', ts_walls);
        this.map.createLayer('layer_moss_up',  ts_moss);
        this.map.createLayer('layer_moss_right',  ts_moss);
        this.map.createLayer('layer_moss_left',  ts_moss);
        this.map.createLayer('layer_moss_down',  ts_moss);

        //Defino con que se colisiona en la capa de walls
        //this.map.setCollisionBetween(1,11, true, true, 'layer_walls')
        this.map.setCollisionByExclusion(-1, true, true, 'layer_walls') //Ponemos -1 ya que el Phase lo interpreta como un 0 en el json 


        this.doorEntry = this.add.image(65,268, 'doorEntry');
       /* this.doorEntry = this.physics.add.image(65,268, 'doorEntry');
        this.doorEntry.body.setAllowGravity(false);
        this.doorEntry.body.setImmovable(true);*/

       this.hero = new heroPrefab(this, 65, 100);
        
       this.cursors = this.input.keyboard.createCursorKeys();
       this.loadAnimations();
        
       //AJUSTA LA CAMARA PARA QUE SIGA AL HEROE Y QUE HAGA ZOOM
         this.cameras.main.startFollow(this.hero).setBounds(0,0,
            LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT);
         this.cameras.main.setZoom(0.75);
        
        //AJUSTA LA CAMARA PARA QUE NO SALGA DEL BORDE DEL MAPA
        this.cameras.main.setBounds(0,0, gamePrefs.level1Width, this.map.level1Height);

        this.jumper = new Jumper(this, 240, 304);
        this.slime = new slimePrefab(this, 656, 272);

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

        this.anims.create(
            {
                key:'jumperMove',
                frames:this.anims.generateFrameNumbers('jumper', {start:0, end:3}),
                frameRate:5,
                repeat:-1
            }
        );

        this.anims.create(
            {
                key:'slimeMove',
                frames:this.anims.generateFrameNumbers('slime', {start:0, end:3}),
                frameRate:5,
                repeat:-1
            }
        );
    }
    loadPools(){
        this.jumperPool = this.physics.add.group();
    }

    spawnJumper(){
            var _jumper = this.jumperPool.getFirstDead();
        if(!_jumper){
            _jumper = new jumperPrefab(this, 240, 304);
            this.jumperPool.add(_jumper);
            this.physics.add.collider(_jumper, this.walls);

        } else{
            _jumper.setPosition(240, 304);
            _jumper.setActive(true);
            
        }
    }
    update(){
       
    }
}