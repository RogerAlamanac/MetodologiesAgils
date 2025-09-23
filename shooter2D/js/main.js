var config =
{
    type:Phaser.AUTO,
    width: 128,
    height: 256,
    scene:[gameState],    //Array con las scenes/niveles
    render:
    {
        pixelArt:true
    }
}

var juego = new Phaser.Game(config)

