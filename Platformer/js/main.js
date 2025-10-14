const gamePrefs=
{
    gameWidth: 960,
    gameHeight: 540,
    level1Width:1280, //40*32
    level1Height: 800, //25*32
    GRAVITY: 1000
}

var config = {
    type:Phaser.AUTO,
        width:gamePrefs.gameWidth,
        height:gamePrefs.gameHeight,
        scene: [level1],
        render:
    {
        pixelArt:true
    },

    physics:
    {
        default:'arcade',
        arcade:{
            gravity:{y:gamePrefs.GRAVITY},
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