class gameState extends Phaser.Scene{
    constructor(){
        //Llamamos al constructor de la scene
        super({key:"gameState"});
    }
    preload(){//Cargamos los assets en memoria
        this.cameras.main.setBackgroundColor("113");
        this.load.setPath('assets/sprites');
        this.load.image('bg1', 'background_back.png');
        this.load.image('bg2', 'background_frontal.png');
        this.load.image('bullet', 'spr_bullet_0.png')
        //this.load.image('spaceShip', 'spr_player_straight_0.png');
        this.load.spritesheet('nave', 'naveAnim.png', {frameWidth : 16, frameHeight : 24});
        this.load.spritesheet('enemy', 'enemy-big.png', {frameWidth: 32, frameHeight : 32});
        this.load.spritesheet('explosion', 'explosion.png', {frameWidth:16 , frameHeight:16 })
        this.load.image('enemyBullet', 'spr_enemy_bullet_0.png');
        this.load.spritesheet('armor', 'spr_armor.png', {frameWidth: 66,  frameHeight: 28});
        this.load.spritesheet('powerUp1', 'spr_power_up.png', {frameWidth: 16, frameHeight:16});
        this.load.image('score', 'spr_score_0.png');
    }
    create(){//Pintamos los assets en pantalla
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height, 'bg1').setOrigin(0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height, 'bg2').setOrigin(0);
        this.spaceShip = this.physics.add.sprite(config.width/2, config.height*0.95, 'nave').setScale(1);
        this.spaceShip.body.setCollideWorldBounds(true);

        this.armor = this.add.sprite(15, 10, 'armor', gamePrefs.MAX_PLAYER_HEALTH); // empieza con el primer frame
        this.armor.setDepth(10); 
        this.armor.setScale(0.5);

        this.score = this.add.sprite(config.width - 20, 10, 'score').setScale(0.5);
        this.score.setDepth(10);

        this.scoreValue = gamePrefs.INITIAL_SCORE;
        this.title = this.add.text(
            config.width -20, 
            10,
            this.scoreValue,
            {
                fontFamily: 'Arial Black',
                fill : '#000000',
                stroke: '#FFFFFF',
                strokeThickness: 4
            }
        ).setOrigin(.5).setDepth(10).setScale(0.5);

        this.loadAnimations();  //Funcion que creamos nosotros
        this.loadPools();
        this.startEnemyTimeline();
        this.shootEnemyBullet();


        this.cursores = this.input.keyboard.createCursorKeys();
        this.cursores.space.on
        (
            'down',
            ()=>{this.createBullet();}
            /*function(){
                this.createBullet();
            },
            this */
        );
         this.cursores.up.on
         (
            'down',
            ()=>{this.spawnEnemy();}
         );    
         
         

        this.playerHealth = gamePrefs.MAX_PLAYER_HEALTH;

    }

    loadAnimations(){

        this.anims.create(
            {
                key:'moveRight',
                frames:this.anims.generateFrameNumbers('nave', {start:4, end:5}),
                frameRate:10,
                repeat:-1
            }
        );

        this.anims.create(
            {
                key:'moveLeft',
                frames:this.anims.generateFrameNumbers('nave', {start:2, end:3}),
                frameRate:10,
                repeat:-1
            }
        );

        this.anims.create(
            {
                key:'enemyAnim',
                frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            }
        )
        this.anims.create(
            {
                key:'explosionAnim',
                frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 4}),
                frameRate: 10,
                repeat: 0,
                showOnStart: true,
                hideOnComplete:true
            }
        )
        this.anims.create(
            {
                key:'powerUp1Anim',
                frames: this.anims.generateFrameNumbers('powerUp1', {start: 0, end: 1}),
                frameRate: 10,
                repeat: -1
            }
        )
    }

    loadPools(){
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
        this.explosionPool = this.add.group();
        this.enemyBulletPool = this.physics.add.group();
        this.powerUp1Pool = this.physics.add.group();
    }

    createBullet(){
        //Miramos si hay un objeto dispoible en la pool
        var _bullet = this.bulletPool.getFirst(false);

        if(!_bullet){
            //Creo una bullet
            console.log('Bala Creada');
            _bullet = new bulletPrefab(this, this.spaceShip.x, this.spaceShip.body.top);
            _bullet.setOrigin(.5, 1);
            //Meto una bala en la pool
            this.bulletPool.add(_bullet);
        } else{
            //Hay bullet en la pool
            console.log('Reciclo bala')
            //Activamos bullet
            _bullet.setActive(true);
            //Posicionamos en nave
            _bullet.x = this.spaceShip.x;
            _bullet.y = this.spaceShip.y;
        }
        //Le doy velocidad
        _bullet.body.setVelocityY(gamePrefs.BULLET_SPEED);
        //Ejecutar el sonido



        //STUDENTS - FAIL
        //Defino una bala
        //Meter la bala en la pool
        //Le cargo el sprite
        //Le pongo un rigidbody
        //La posiciono en la nave

        //Condicion de destruccion/reutilizacion
    }

    createExplosion(_bullet){
        var _explosion = this.explosionPool.getFirst(false);
        if(!_explosion){
            console.log('create explosion')
            _explosion = new explosionPrefab(this,_bullet.x, _bullet.y);
            //Meto una bala en la pool
            this.explosionPool.add(_explosion);
        } else{
            console.log('reset explosion')
            _explosion.active = true;
            _explosion.x=_bullet.x;
            _explosion.y = _bullet.y;
            _explosion.anims.play('explosionAnim');
        }

    }
    startEnemyTimeline() {
        const delay = Phaser.Math.Between(1000, 3000);  // Entre 1 y 3 segundos
        this.time.addEvent({
            delay: delay,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        this.physics.add.overlap(
            this.bulletPool,
            this.enemyPool,
            this.killEnemy,
            null,
            this
        );

       
    }

    killEnemy(_bullet, _enemy){
        console.log("Impact");
        var _randomPorcentageSpawn = Phaser.Math.Between(0, 100);
        var _randomPorcentagePowerUp = Phaser.Math.Between(0, 100);
        this.createExplosion(_bullet);

        _bullet.setActive(false);
        _bullet.body.reset(-100, -100);
        _enemy.health--;
        if(_enemy.health > 0){
            //invulnerabilidad por X segundos
        }
        else{
            //Actualizar score
            this.scoreValue += gamePrefs.SCORE_PER_ENEMY;
            this.title.setText(this.scoreValue);

            console.log(_randomPorcentageSpawn)
            console.log(_randomPorcentagePowerUp)
            //Calcular el % de drop
            if(_randomPorcentageSpawn < 100){
                if(_randomPorcentagePowerUp < 50){
                    this.spawnPowerUp1(_enemy)
                } 
                else{
                    this.spawnPowerUp1(_enemy)
                }
            }
            //Eliminar al enemigo
            _enemy.setActive(false);
            _enemy.body.reset(-200,-200);
            _enemy.health = 2;
            
        }  
    }

    killPlayerBullet(_spaceShip, _enemyBullet) {
        console.log("Player Impact");

        this.createExplosion(_enemyBullet);

        _enemyBullet.setActive(false);
        _enemyBullet.body.reset(-100,-100);

        this.playerHealth--;

        // Comprobar si queda vida
        if (this.playerHealth < 0) {
        this.scene.restart();
        this.playerHealth = gamePrefs.MAX_PLAYER_HEALTH;
        } else {
        this.armor.setFrame(this.playerHealth);
        }
    }   

    killPlayerEnemy(_spaceShip, _enemy) {
          this.scene.restart(); 
         this.playerHealth = gamePrefs.MAX_PLAYER_HEALTH; 
    }
    spawnEnemy(){
        //Miramos si hay un objeto dispoible en la pool
        var _enemy = this.enemyPool.getFirst(false);

        var _randomX = Phaser.Math.Between(0, config.width - 32);
        var _posY = 0;

        if(!_enemy){
            //Creo un enemy
            console.log('Enemigo Creado');
            _enemy = new enemyPrefab(this, _randomX, _posY);

            //Meto un enemy en la pool
            this.enemyPool.add(_enemy);
        } 
        else{
            //Hay enemy en la pool
            console.log('Reciclo enemy')
            //Activamos enemy
            _enemy.setActive(true);
            //Posicionamos arriba de la pantalla
            _enemy.body.reset(_randomX, _posY);
        }
        //Le doy velocidad
        _enemy.body.setVelocityY(gamePrefs.ENEMY_SPEED);

         this.physics.add.overlap(
            this.enemyPool,
            this.spaceShip,
            this.killPlayerEnemy,
            null,
            this
        );
    }
    shootEnemyBullet(){
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.enemyPool.getChildren().forEach(
                    enemy => {
                        if(enemy.active){
                            this.createEnemyBullet(enemy);
                        }
                    }
                )
            },
            callbackScope: this,
            loop: true         
        });

        this.physics.add.overlap(
            this.enemyBulletPool,
            this.spaceShip,
            this.killPlayerBullet,
            null,
            this
        );
    }
    createEnemyBullet(_enemy){
         //Miramos si hay un objeto dispoible en la pool
         var _enemyBullet = this.enemyBulletPool.getFirst(false);

         if(!_enemyBullet){
             //Creo una bullet
             console.log('Bala Creada');
             _enemyBullet = new enemyBulletPrefab(this, _enemy.body.x + 16, _enemy.body.bottom);
             //Meto una bala en la pool
             this.enemyBulletPool.add(_enemyBullet);
         } else{
             //Hay bullet en la pool
             console.log('Reciclo bala')
             //Activamos bullet
             _enemyBullet.setActive(true);
             //Posicionamos en ene
             _enemyBullet.body.reset(_enemy.body.x + 16, _enemy.body.bottom);
         }
         //Le doy velocidad
         _enemyBullet.body.setVelocityY(gamePrefs.ENEMYBULLET_SPEED);
    
    }
    spawnPowerUp1(_enemy){
        var _powerUp1 = this.powerUp1Pool.getFirst(false);
        console.log("PowerUp1")
        if(!_powerUp1){
            //Creo un enemy
            console.log('PowerUp1 Creado');
            _powerUp1 = new powerUp1Prefab(this, _enemy.x, _enemy.y);

            //Meto un enemy en la pool
            this.powerUp1Pool.add(_powerUp1);
        } 
        else{
            //Hay enemy en la pool
            console.log('Reciclo PowerUp1')
            //Activamos enemy
            _powerUp1.setActive(true);
        }
        _powerUp1.body.setVelocityY(gamePrefs.ENEMY_SPEED);
    }
    
    update(){
        
        this.bg1.tilePositionY -= 1;
        this.bg2.tilePositionY -= 2;

        if(this.cursores.right.isDown){
            this.spaceShip.anims.play('moveRight', true)
            this.spaceShip.body.velocity.x += gamePrefs.NAVE_SPEED;
        }
        if(this.cursores.left.isDown){
            this.spaceShip.anims.play('moveLeft', true)
            this.spaceShip.body.velocity.x -= gamePrefs.NAVE_SPEED;
        }
        else{
            this.spaceShip.anims.play('idle', true);
        }

    }
}