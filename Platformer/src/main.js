//Cargamos Intellisense
<reference path="./types/phaser.d.ts"/>
import { buildConfig } from "./core/config.js"

import {level1} from "./scenes/level1.js";

const game = new Phaser.Game(buildConfig({
    scenes:[level1]
}))