//import { GAME_SIZE, HERO, LEVEL_SIZE, SCALE } from "../core/constants.js";
import {FRAMERATE} from '../core/constants.js';
import { Hero } from '../entities/heroPrefab.js';

//import { EVENTS } from "../core/events.js";
export class Level1 extends Phaser.Scene
{
    constructor()
    {
        super({key:'level1'});
    }

    preload()
    { //Carga assets en memoria
        this.cameras.main.setBackgroundColor('#666');
        

        this.load.setPath('assets/sprites');
        this.load.spritesheet('hero','richard.png',
        {frameWidth:48,frameHeight:48});
        this.load.spritesheet('chest','chest.png',{frameWidth:16,frameHeight:16});
        this.load.image('prison_fence','prison_fence.png');

        this.load.setPath('assets/tiled/tilesets');   
        this.load.image('tileset_examen','tiles_dungeon_v1.1.png');

        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('mapa','level1.json');
    }

    create()
    { //Pinta assets en pantalla
        //Pintamos el nivel
        //Cargo el JSON
        //this.map = this.add.tilemap('level1'); //DEPRECATED
        this.map = this.make.tilemap({key:'mapa'});
        //Cargo los tilesets
        // IMPORTANTE: el primer argumento debe coincidir con el "Nombre del tileset" en Tiled.
        // El segundo argumento es la 'key' del asset cargado con this.load.image(...), que cambiamos
        // por el tileset_object del paso previo
        // Si coinciden, puedo dejar sólo 1
        const ts_examen = this.map.addTilesetImage('tileset_examen');

        //Pinto las CAPAS/LAYERS
        this.map.createLayer('BackGround',ts_examen);
        this.walls = this.map.createLayer('Level1_walls',ts_examen);
        this.map.createLayer('Level1_floor',ts_examen);
        this.columns = this.map.createLayer('Level1_collision',ts_examen);

        //Defino con qué se colisiona en las capas que tocan
        this.walls.setCollisionByExclusion([-1]);
        this.columns.setCollisionByExclusion([-1]);

        this.loadAnimations();     

        this.static_objects = this.add.group();
        this.static_objects.add(this.physics.add.sprite(88,24,'prison_fence').setImmovable())
        this.static_objects.add(this.physics.add.sprite(137,38,'chest').setImmovable().setName('chest'));

        this.interactive_zones = this.add.group();
        this.chestZone = this.add.zone(133,42,24,24).setName('chest');
        this.interactive_zones.add(this.chestZone);
        this.chestZone.body.debugBodyColor = 0xFFFFFF;


        this.hero = new Hero(this,88,120, 'hero');  
    }
    interact(_hero, _object){
        switch(_object.name){
            case 'chest':
                this.static_objects.getMatching('name', _object.name)[0].setFrame(1)
            break;
        }
    }
    loadAnimations()
    {
        this.anims.create(
        {
            key: 'hero_idle',
            frames:this.anims.generateFrameNumbers('hero', 
            {start:4, end: 6}),
            yoyo: true,
            frameRate: FRAMERATE.ANIMATION_FRAMERATE,
            repeat: -1
        });
        this.anims.create(
            {
                key: 'hero_walkDown',
                frames:this.anims.generateFrameNumbers('hero', 
                {start:16, end: 19}),
                yoyo: false,
                frameRate: FRAMERATE.ANIMATION_FRAMERATE,
                repeat: -1
            });

        this.anims.create(
            {
                key: 'hero_walkSide',
                frames:this.anims.generateFrameNumbers('hero', 
                {start:24, end: 27}),
                yoyo: false,
                frameRate: FRAMERATE.ANIMATION_FRAMERATE,
                repeat: -1
            });
        
        this.anims.create(
            {
                key: 'hero_walkUp',
                frames:this.anims.generateFrameNumbers('hero', 
                {start:32, end: 35}),
                yoyo: false,
                frameRate: FRAMERATE.ANIMATION_FRAMERATE,
                repeat: -1
            });
        
        
      
    }

    update()
    {
       
        
    }
} 