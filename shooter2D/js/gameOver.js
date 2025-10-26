class gameOver extends Phaser.Scene {
    constructor() {
        super({key:"gameOver"});
    }
    init(data) {
        this.finalScore = data.score || 0;

        const savedHighScore = localStorage.getItem('highScore');
        this.highScore = savedHighScore ? parseInt(savedHighScore) : 0;

        if (this.finalScore > this.highScore) {
            this.highScore = this.finalScore;
            localStorage.setItem('highScore', this.highScore);
        }
    }
    preload(){
        this.cameras.main.setBackgroundColor('#000000');
    }
    create() {
        this.gameOverText = this.add.text(config.width / 2, config.height / 2 - 30, 'GAME OVER', {
            fontFamily: 'Arial Black',
            color: '#ff0000',
            stroke: '#FFFFFF',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(.5).setScale(.7);

         this.add.text(
            config.width / 2,
            config.height / 2,
            `Score: ${this.finalScore}`,
            {
                fontFamily: 'Arial Black',
                color: '#FFFFFF',
                stroke: '#000000',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5).setScale(.5);

        this.add.text(
            config.width / 2,
            config.height / 2 + 40,
            `Highscore: ${this.highScore}`,
            {
                fontFamily: 'Arial Black',
                color: '#115525ff',
                stroke: '#FFFFFF',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5).setScale(.5);

        this.add.text(
            config.width / 2,
            config.height / 2 + 100,
            'Press SPACE to Restart',
            {
                fontFamily: 'Arial Black',
                color: '#000000ff',
                stroke: '#FFFFFF',
                strokeThickness: 4,
                align: 'center'
            }
        ).setOrigin(0.5).setScale(.5);

        // Reiniciar al pulsar espacio
        this.cursores = this.input.keyboard.createCursorKeys();
        this.cursores.space.on
        (
            'down',
            ()=>{this.scene.start('gameState');}
        );
    }
}