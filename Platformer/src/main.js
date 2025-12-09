//Cargamos el Intellisense
/// <reference path="./types/phaser.d.ts" />

//Importamos la configuración del motor
import { buildConfig } from './core/config.js';
//Importamos las escenas
import { Preload } from './scenes/preload.js';
import { Level1 } from './scenes/level1.js';
import { Level } from './scenes/Level.js';
import { GameOver } from './scenes/GameOver.js';
import { HUD } from './UI/HUD.js';

// Array de escenas a registrar
const scenes = [
    Preload,
    //Level1,  // Nivel 1
    // Para agregar más niveles, simplemente crea los archivos JSON de Tiled y agrega aquí:
    new Level('level1'),
    new Level('level2'),
    // etc...
];

// Agregar escenas adicionales dinámicamente (ejemplo: level2, level3, etc.)
// Descomenta y modifica según necesites:
// for (let i = 2; i <= 200; i++) {
//     scenes.push(new Level(`level${i}`));
// }

scenes.push(GameOver, HUD);

const game = new Phaser.Game
(
    buildConfig({
        // Orden en el que se registran/arrancan
        scenes: scenes,
    })
);