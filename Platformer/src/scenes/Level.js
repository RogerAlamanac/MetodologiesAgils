import { GAME_SIZE, HERO, LEVEL_SIZE, SCALE } from "../core/constants.js";
import { Jumper } from '../entities/enemies/Jumper.js';
import { Slime } from '../entities/enemies/Slime.js';
import { Hero } from '../entities/heroPrefab.js';
import { Gem } from '../entities/Gem.js';
import { Door } from "../entities/Door.js";
import { EVENTS } from "../core/events.js";

/**
 * Clase Level genérica que funciona para cualquier nivel.
 * Permite crear 200+ niveles sin modificar código.
 * Aplicar SOLID: Single Responsibility, separando las responsabilidades.
 */
export class Level extends Phaser.Scene {
    constructor(levelKey) {
        super({ key: levelKey });
        this.levelKey = levelKey;
        this.levelNumber = parseInt(levelKey.replace('level', ''));
        this.gems = 0;
    }

    create() {
        this.setupLevel();
        this.loadAnimations();
        this.instantiateEntities();
        this.setupCamera();
        this.setupEventListeners();
        this.scene.launch('hud');
    }

    /**
     * Configura el tilemap y las capas del nivel.
     */
    setupLevel() {
        // Fondo
        this.add.tileSprite(0, 0, LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT, 'bg')
            .setOrigin(0);

        // Tilemap
        this.map = this.make.tilemap({ key: this.levelKey });

        // Tilesets
        const ts_walls = this.map.addTilesetImage('tileset_walls');
        const ts_moss = this.map.addTilesetImage('tileset_moss');

        // Capas
        this.walls = this.map.createLayer('layer_walls', ts_walls);
        this.map.createLayer('layer_moss_up', ts_moss);
        this.map.createLayer('layer_moss_left', ts_moss);
        this.map.createLayer('layer_moss_right', ts_moss);
        this.map.createLayer('layer_moss_down', ts_moss);

        // Colisiones
        if (this.walls) {
            this.walls.setCollisionByExclusion([-1]);
        }
    }

    /**
     * Carga todas las animaciones del nivel.
     */
    loadAnimations() {
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('hero', { start: 2, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_jumper',
            frames: this.anims.generateFrameNumbers('jumper', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'run_slime',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'gem',
            frames: this.anims.generateFrameNumbers('gem', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'door_idle',
            frames: this.anims.generateFrameNumbers('door', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    /**
     * Instancia todas las entidades del nivel desde el tilemap.
     */
    instantiateEntities() {
        // Buscar la capa de objetos
        const entityLayer = this.getEntityLayer();
        if (!entityLayer) {
            console.warn('No hay capa de entidades en el mapa');
            return;
        }

        // Procesar cada entidad
        entityLayer.objects.forEach(entity => {
            this.createEntity(entity);
        });

        this.game.events.emit(EVENTS.HERO_READY, this.hero);
    }

    /**
     * Obtiene la capa de entidades del tilemap.
     * Busca múltiples nombres posibles para compatibilidad.
     */
    getEntityLayer() {
        const possibleNames = [`${this.levelKey}_entities`, 'level1_entities', 'entities', 'objects'];
        
        for (let name of possibleNames) {
            const layer = this.map.getObjectLayer(name);
            if (layer) {
                console.log(`Capa de entidades encontrada: ${name}`);
                return layer;
            }
        }
        
        return null;
    }

    /**
     * Factory Method para crear entidades según su tipo.
     */
    createEntity(entity) {
        const { type, x, y, properties } = entity;

        switch (type) {
            case 'Jumper':
                this.createEnemy(Jumper, x, y, type, properties);
                break;

            case 'Slime':
                this.createEnemy(Slime, x, y, type, properties);
                break;

            case 'Gem':
                this.createGem(x, y, type, properties);
                break;

            case 'Door':
                this.createDoor(x, y, type, properties);
                break;

            default:
                console.log(`Entidad no reconocida: ${type}`);
        }
    }

    /**
     * Crea un enemigo genérico.
     */
    createEnemy(EnemyClass, x, y, type, properties) {
        const enemy = new EnemyClass(this, x, y, type.toLowerCase());
        if (properties && properties[0]) {
            enemy.setHealth(properties[0].value);
        }
    }

    /**
     * Crea una gema.
     */
    createGem(x, y, type, properties) {
        const gem = new Gem(this, x, y, type.toLowerCase());
        if (properties && properties[0]) {
            gem.setValue(properties[0].value);
        }
    }

    /**
     * Crea la puerta de salida.
     */
    createDoor(x, y, type, properties) {
        const door = new Door(this, x, y, type.toLowerCase());
        this.door = door;

        // Si la propiedad es 0 (false), aquí está el spawn del hero
        if (properties && properties[0] && !properties[0].value) {
            this.hero = new Hero(this, x, y, 'hero');
        }

        if (properties && properties[0]) {
            door.setState(properties[0].value);
        }

        // Configurar colisión con la puerta
        this.physics.add.overlap(
            this.hero,
            door,
            this.onDoorOverlap,
            null,
            this
        );
    }

    /**
     * Configura la cámara para seguir al hero.
     */
    setupCamera() {
        this.cameras.main.startFollow(this.hero).setBounds(0, 0,
            LEVEL_SIZE.LEVEL1_WIDTH, LEVEL_SIZE.LEVEL1_HEIGHT).setZoom(SCALE.ZOOM);
    }

    /**
     * Configura todos los event listeners.
     */
    setupEventListeners() {
        this.game.events.on(EVENTS.GEM_COLLECTED, (value) => {
            this.gems += value;
            console.log('Gemas totales: ' + this.gems);
        });

        this.game.events.on(EVENTS.GAME_OVER, () => {
            this.goToGameOver();
        });
    }

    /**
     * Callback cuando el hero toca la puerta.
     */
    onDoorOverlap(hero, door) {
        if (door.isOpen) {
            this.onLevelComplete();
        }
    }

    /**
     * Maneja la finalización del nivel.
     */
    onLevelComplete() {
        console.log('¡Nivel completado!');
        this.game.events.emit(EVENTS.LEVEL_COMPLETED);

        const nextLevelNumber = this.levelNumber + 1;
        const nextLevelKey = `level${nextLevelNumber}`;

        this.scene.stop('hud');
        this.scene.start(nextLevelKey);
    }

    /**
     * Maneja el game over.
     */
    goToGameOver() {
        const hudScene = this.scene.get('hud');
        const gems = hudScene?.gems || this.gems || 0;

        console.log('Yendo a GameOver con gemas: ' + gems);
        this.scene.stop('hud');
        this.scene.start('gameover', {
            gems: gems,
            score: this.hero.score
        });
    }

    update() {
        // Lógica de actualización si es necesaria
    }
}
