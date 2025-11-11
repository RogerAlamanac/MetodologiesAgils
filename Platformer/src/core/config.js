import {GAME_SIZE, PHYSICS, RENDER, SCALE} from './constants.js';

export function buildConfig({scenes=[]} = {}){
    return {
        type: Phaser.AUTO,
        width: GAME_SIZE.WIDTH,
        height: GAME_SIZE.HEIGHT,
        physics: {
            default: PHYSICS.TYPE,
            arcade: {
                gravity: { y: PHYSICS.GRAVITY },
                debug: PHYSICS.DEBUG
            }
        },
        render: {
            pixelArt: RENDER.PIXEL_ART
        },
        scale: {
            mode: Phaser.Scale[SCALE.MODE],
            autoCenter: Phaser.Scale[SCALE.AUTO_CENTER],
            zoom: SCALE.ZOOM
        },
        scene: scenes
    };
}