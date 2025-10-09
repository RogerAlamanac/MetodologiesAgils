const gamePrefs = {
    NAVE_SPEED : 2,
    BULLET_SPEED : -100,
    ENEMY_SPEED : 20
}

var config =
{
    type:Phaser.AUTO,
    width: 128,
    height: 256,
    scene:[gameState],    //Array con las scenes/niveles
    render:
    {
        pixelArt:true
    },

    physics:
    {
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:true
        }
    },
    scale:
    {
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH
    }

    
}

var juego = new Phaser.Game(config)
var isDown = false;
var playerHealth = 4;
