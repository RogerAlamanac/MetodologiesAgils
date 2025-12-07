export class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'preload' });
    }

    preload() {
        // Configurar el fondo
        this.cameras.main.setBackgroundColor('#222');

        // Crear elementos de la barra de carga
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Texto de carga
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Cargando...', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Texto de porcentaje
        const percentText = this.add.text(width / 2, height / 2, '0%', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Barra de carga (fondo)
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x444444, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 + 30, 320, 30);

        // Eventos de carga
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 40, 300 * value, 10);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // ===== CARGA DE TODOS LOS ASSETS =====
        
        // Backgrounds
        this.load.setPath('assets/sprites/backgrounds');
        this.load.image('bg', 'bg_green_tile.png');

        // Spritesheets
        this.load.setPath('assets/sprites/spritesheets');
        this.load.spritesheet('hero', 'hero.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('jumper', 'jumper.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('slime', 'slime.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('gem', 'gem.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('door', 'door.png', { frameWidth: 32, frameHeight: 40 });
        this.load.spritesheet('healthUI', 'health.png', { frameWidth: 128, frameHeight: 28 });

        // UI sprites
        this.load.setPath('assets/sprites/ui');
        this.load.image('gemUI', 'spr_gui_gem_0.png');

        // Tilesets
        this.load.setPath('assets/tiled/tilesets');
        this.load.image('tileset_walls', 'tileset_walls.png');
        this.load.image('tileset_moss', 'tileset_moss.png');

        // Tilemaps
        this.load.setPath('assets/tiled/maps');
        this.load.tilemapTiledJSON('level1', 'level1.json');

        // Fonts
        this.load.setPath('assets/fonts/');
        this.load.bitmapFont('UIFont', 'font.png', 'font.fnt');
    }

    create() {
        // Iniciar la escena del nivel 1
        this.scene.start('level1');
    }
}