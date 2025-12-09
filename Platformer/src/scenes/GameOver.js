import { GAME_SIZE } from "../core/constants.js";

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
    }

    init(data) {
        this.gems = data?.gems || 0;
        this.score = data?.score || 0;
        // Obtener o actualizar récord
        this.highScore = parseInt(localStorage.getItem('platformer_highscore')) || 0;
        if(this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('platformer_highscore', this.highScore);
        }
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.cameras.main.setBackgroundColor('#222');

        // Título
        this.add.text(width / 2, height / 2 - 120, 'GAME OVER', {
            fontFamily: 'Arial',
            fontSize: '48px',
            color: '#ff0000',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Gemas recolectadas
        this.add.text(width / 2, height / 2 - 30, `Gemas: ${this.gems}`, {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#ffff00'
        }).setOrigin(0.5);

        // Puntuación actual
        this.add.text(width / 2, height / 2 + 20, `Puntuación: ${this.score}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Récord
        this.add.text(width / 2, height / 2 + 70, `Récord: ${this.highScore}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#00ff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Instrucciones
        this.add.text(width / 2, height / 2 + 130, 'Presiona ESPACIO para volver al inicio', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#aaaaaa'
        }).setOrigin(0.5);

        // Tecla para reiniciar
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('level1');
        });
    }
}
