//Constantes globales del juego

export const GAME_SIZE =
{
    WIDTH: 960,
    HEIGHT: 540
}

export const LEVEL_SIZE ={
    LEVEL1_WIDTH: 1280, //40*32
    LEVEL1_HEIGHT: 800 //25*32
}

export const PHYSICS =
{
    TYPE: 'arcade',
    GRAVITY: 980,
    DEBUG: true
}

export const HERO={
    SPEED: 200,
    JUMP: -450,
    MAX_LIVES: 7
}

export const ENEMY={
    SPEED: 50
}

export const RENDER={
    PIXEL_ART: true
}

export const SCALE={
    MODE: 'Fit',
    AUTO_CENTER: 'CENTER_BOTH',
    ZOOM: 2
   /* ZOOM_WIDTH: GAME_SIZE.WIDTH / 2,
    ZOOM_HEIGHT: GAME_SIZE.HEIGHT / 2*/
}
