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
    }
    create(){//Pintamos los assets en pantalla
        this.bg1 = this.add.tileSprite(0,0,config.width, config.height, 'bg1').setOrigin(0);
        this.bg2 = this.add.tileSprite(0,0,config.width, config.height, 'bg2').setOrigin(0);
        this.spaceShip = this.physics.add.sprite(config.width/2, config.height*0.95, 'nave').setScale(1);

        this.spaceShip.body.setCollideWorldBounds(true);

        this.loadAnimations();  //Funcion que creamos nosotros
        this.loadPools();
        this.startEnemyTimeline();
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

         
       
    }

    loadAnimations(){
        this.anims.create(
            {
                key:'idle',
                frames:this.anims.generateFrameNumbers('nave', {start:0, end:1}),
                frameRate:10,
                repeat:-1
            }
        );

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
    }

    loadPools(){
        this.bulletPool = this.physics.add.group();
        this.enemyPool = this.physics.add.group();
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

    startEnemyTimeline() {
        const delay = Phaser.Math.Between(1000, 3000);  // Entre 1 y 3 segundos
        this.time.addEvent({
            delay: delay,
            callback: () => {
                this.spawnEnemy();
                this.startEnemyTimeline();  // Repetir función cuando acabe
            }
        });
    }
    spawnEnemy(){
        //Miramos si hay un objeto dispoible en la pool
        var _enemy = this.enemyPool.getFirst(false);

        const randomX = Phaser.Math.Between(32, config.width - 32);

        if(!_enemy){
            //Creo un enemy
            console.log('Enemigo Creado');
            _enemy = new enemyPrefab(this, randomX, 0);
            _enemy.setOrigin(.5, 1);
            _enemy.setScale(0.75);
            //Meto un enemy en la pool
            this.enemyPool.add(_enemy);
        } 
        else{
            //Hay enemy en la pool
            console.log('Reciclo enemy')
            //Activamos enemy
            _enemy.setActive(true);
            //Posicionamos arriba de la pantalla
            _enemy.x = randomX;
            _enemy.y = 0;
        }
        //Le doy velocidad
        _enemy.body.setVelocity(0, gamePrefs.ENEMY_SPEED);
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