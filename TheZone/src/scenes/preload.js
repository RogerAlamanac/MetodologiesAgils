export class Preload extends Phaser.Scene {
    constructor() {
        super('preload');
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Progress bar background
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        // Loading text
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // Percentage text
        const percentText = this.make.text({
            x: width / 2,
            y: height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // Update progress bar
        this.load.on('progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        // Complete
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Load assets
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

    create() {
        // Transition to next scene when assets are loaded
        this.scene.start('level1');
    }
}