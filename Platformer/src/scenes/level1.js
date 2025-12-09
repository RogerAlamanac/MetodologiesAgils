import { Level } from './Level.js';

/**
 * Nivel 1 - Extiende la clase Level genérica.
 * Puede ser customizado si es necesario, pero por defecto hereda todo de Level.
 */
export class Level1 extends Level {
    constructor() {
        super('level1');
    }

    // Aquí puedes agregar lógica específica de Level1 si es necesario
    // Por ejemplo: eventos especiales, enemigos únicos, etc.
}