# Sistema de Niveles - Guía para Agregar Nuevos Niveles

## Arquitectura SOLID

La arquitectura implementada sigue los principios SOLID:

- **S (Single Responsibility)**: Cada clase tiene una única responsabilidad
  - `Level`: Maneja toda la lógica del nivel
  - `Level1`: Subclase específica de Level1 (puede ser customizada)
  - `Hero`, `Enemy`, `Gem`, `Door`: Entidades con responsabilidad única
  
- **O (Open/Closed)**: Abierto para extensión, cerrado para modificación
  - Nuevos niveles se agregan SIN modificar código existente
  
- **L (Liskov Substitution)**: Level1 puede sustituirse por cualquier Level
- **I (Interface Segregation)**: Cada clase solo implementa lo que necesita
- **D (Dependency Inversion)**: Clases dependen de abstracciones, no de implementaciones

## Cómo Agregar Nuevos Niveles

### Paso 1: Crear el Mapa en Tiled
1. Abre `assets/tiled/level1.tmx` como referencia
2. Crea un nuevo archivo `level2.tmx`
3. Diseña tu nivel
4. **Importante**: Crea una capa de objetos llamada `level2_entities` con los objetos:
   - `Door` (marcar con propiedad para indicar entrada/salida)
   - `Jumper` (enemigos)
   - `Slime` (enemigos)
   - `Gem` (gemas)
5. Exporta como JSON: `File > Export As > level2.json`

### Paso 2: Actualizar el Preload
En `src/scenes/preload.js`, agrega la carga del nuevo mapa:

```javascript
// Tilemaps - Cargar todos los niveles disponibles
this.load.setPath('assets/tiled/maps');
this.load.tilemapTiledJSON('level1', 'level1.json');
this.load.tilemapTiledJSON('level2', 'level2.json');  // ← AGREGAR ESTO
this.load.tilemapTiledJSON('level3', 'level3.json');  // ← Y ESTO
```

### Paso 3: Registrar el Nivel en main.js
En `src/main.js`, agrega el nivel al array de escenas:

```javascript
const scenes = [
    Preload,
    Level1,
    new Level('level2'),  // ← AGREGAR ESTO
    new Level('level3'),  // ← Y ESTO
];
```

O usa el generador automático (descomenta):

```javascript
// Agregar escenas adicionales dinámicamente
for (let i = 2; i <= 200; i++) {
    scenes.push(new Level(`level${i}`));
}
```

## Ejemplo: Crear Level 2

### 1. Exportar desde Tiled
- Guardar como `assets/tiled/maps/level2.json`

### 2. Actualizar preload.js
```javascript
this.load.tilemapTiledJSON('level2', 'level2.json');
```

### 3. Actualizar main.js
```javascript
const scenes = [
    Preload,
    Level1,
    new Level('level2'),  // ← Nuevo nivel
    GameOver,
    HUD
];
```

### 4. ¡Listo!
Cuando completes level1, automáticamente irás a level2.

## Crear 200 Niveles Sin Tocar Código

Una vez que tengas los 200 mapas JSON en `assets/tiled/maps/`:

```javascript
// En preload.js
for (let i = 1; i <= 200; i++) {
    this.load.tilemapTiledJSON(`level${i}`, `level${i}.json`);
}

// En main.js
for (let i = 1; i <= 200; i++) {
    scenes.push(new Level(`level${i}`));
}
```

¡Y listo! Todos tus 200 niveles funcionarán sin cambiar más código.

## Estructura de Entidades en Tiled

Cada objeto en la capa `levelX_entities` debe tener:

### Door
- **Type**: `Door`
- **Properties**: 
  - `value` = 0 (entrada, donde aparece el hero)
  - `value` = 1 (salida, abre cuando se abre la puerta)

### Jumper / Slime
- **Type**: `Jumper` o `Slime`
- **Properties**:
  - `value` = salud (ej: 1 para matar saltando una vez)

### Gem
- **Type**: `Gem`
- **Properties**:
  - `value` = cantidad de puntos (ej: 5 = 5 gemas)

## Flujo de Juego

```
Preload (carga assets)
  ↓
Level1 (nivel 1)
  ├─ Hero toca Puerta → Level Complete
  ├─ Hero muere → Game Over
  └─ Hero completa → Level2
    ├─ Hero toca Puerta → Level Complete
    └─ Hero muere → Game Over
    ...
```

## Debugging

Para ver qué capa de entidades se está cargando:

```javascript
// En Level.js, getEntityLayer() muestra:
console.log(`Capa de entidades encontrada: ${name}`);
```

Esto ayuda si el nombre de la capa es diferente al esperado.
