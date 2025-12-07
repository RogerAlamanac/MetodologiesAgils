//Cargamos el Intellisense
/// <reference path="./types/phaser.d.ts" />

//Importamos la configuración del motor
import { buildConfig } from './core/config.js';
//Importamos las escenas
import { Preload } from './scenes/preload.js';
import {Level1} from './scenes/level1.js';
//import { Level2 } from './scenes/Level2.js';


const game = new Phaser.Game
(
    buildConfig({
    // Orden en el que se registran/arrancan
    scenes: [
      // Boot,    // si hay una escena de precarga
      Preload,
      Level1
    ],
  })
);