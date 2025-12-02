/**
* Constantes globales del juego.
* No dependen de Phaser ni de instancias específicas.
* Son valores inmutables que describen el "mundo" del juego.
*/

export const GAME_SIZE = 
{
    WIDTH: 176, //11 tiles * 16px
    HEIGHT: 176 //11 tiles * 16px
};

export const LEVEL_SIZE = 
{
    LEVEL1_WIDTH: 176, //11 tiles * 16px
    LEVEL1_HEIGHT: 176 //11 tiles * 16px
};

export const PHYSICS = 
{
    TYPE:'arcade',
    GRAVITY: 0,
    DEBUG: true
};

export const HERO = 
{
    SPEED: 80
};


export const RENDER = 
{
    PIXEL_ART: true
};

export const FRAMERATE=
{
    ANIMATION_FRAMERATE: 5
}

export const SCALE = 
{
    MODE: 'FIT',                // Phaser.Scale.FIT
    AUTO_CENTER: 'CENTER_BOTH', // Phaser.Scale.CENTER_BOTH
    ZOOM: 1                  //Para pixelart: escala lógica x2 sin deformar
}