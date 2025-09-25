var config =
{
    type:Phaser.AUTO,
    width: 370,
    height: 550,
    scene:[ mainMenu, gameState, gameStateLink],    //Array con las scenes/niveles
    render:
    {
        pixelArt:true
    },
    HEROSPEED:5
}

var juego = new Phaser.Game(config)

