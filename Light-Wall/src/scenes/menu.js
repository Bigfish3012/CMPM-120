class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.path = "./assets/"

        // Load bitmap fonts
        this.load.bitmapFont('dis_letter_blue', 'fonts/dis_letter_blue.png', 'fonts/dis_letter_blue.xml')
        this.load.bitmapFont('Cynatar_brown', 'fonts/Cynatar_brown.png', 'fonts/Cynatar_brown.xml')
        this.load.bitmapFont('intro_used', 'fonts/intro_used.png', 'fonts/intro_used.xml')
        this.load.bitmapFont('game_over', 'fonts/game_over.png', 'fonts/game_over.xml')
        this.load.bitmapFont('white_letters', 'fonts/white_letters.png', 'fonts/white_letters.xml')

        // Load audio assets
        this.load.audio('bgm', 'musics/background_music.mp3');
        this.load.audio('bgm2', 'musics/background_music2.mp3');
        this.load.audio('game_over_music', 'musics/game_over.mp3');
        this.load.audio('click', 'musics/click.mp3');
        this.load.audio('explosion1', 'musics/explosion1.mp3');
        this.load.audio('explosion2', 'musics/explosion2.mp3');

        // Load vehicle sprites
        this.load.spritesheet('brown_car', 'images/brown_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })
        this.load.spritesheet('blue_car', 'images/blue_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })
        this.load.spritesheet('car_ad', 'images/car_ad.png', {
            frameWidth: 39,
            frameHeight: 74
        })
        this.load.spritesheet('light_wall', 'images/light_wall.png', {
            frameWidth: 39,
            frameHeight: 39
        })

        // Load map and effects
        this.load.image('map', 'images/map.png')
        this.load.atlas('explosion', 'images/explode.png', 'images/explode.json')
    }

    create(){
        // Setup and play background music
        this.bg_music = this.sound.add('bgm', {
            volume: 0.2,
            loop: true
        });
        this.bg_music.play();

        // Create title and flashing start text
        this.add.bitmapText(centerX, centerY - 32, 'Cynatar_brown', 'L I G H T  W A L L', 100).setOrigin(0.5)
        let flash_text = this.add.bitmapText(centerX, centerY + 300, 'Cynatar_brown', "Press [SPACE] to start", 50).setOrigin(0.5);
        this.tweens.add({
            targets: flash_text, 
            alpha: { from: 1, to: 0 },
            duration: 2000, 
            yoyo: true, 
            repeat: -1 
        });

        // Setup input controls
        cursors = this.input.keyboard.createCursorKeys()

        // Create player vehicle animations
        if (!this.anims.exists('player_move_left') && !this.anims.exists('player_move_right') && !this.anims.exists('player_move_up') && !this.anims.exists('player_move_down')){
            this.anims.create({
                key: 'player_move_left',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('blue_car', { start: 2, end: 2 }),
            })
            this.anims.create({
                key: 'player_move_right',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('blue_car', { start: 1, end: 1 }),
            })
            this.anims.create({
                key: 'player_move_up',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('car_ad', { start: 0, end: 0 }),
            })
            this.anims.create({
                key: 'player_move_down',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('car_ad', { start: 2, end: 2 }),
            })
        }

        // Create enemy vehicle animations
        if (!this.anims.exists('enemy_move_left') && !this.anims.exists('enemy_move_right') && !this.anims.exists('enemy_move_up') && !this.anims.exists('enemy_move_down')){
            this.anims.create({
                key: 'enemy_move_left',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('brown_car', { start: 2, end: 2 }),
            })
            this.anims.create({
                key: 'enemy_move_right',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('brown_car', { start: 0, end: 0 }),
            })
            this.anims.create({
                key: 'enemy_move_up',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('car_ad', { start: 1, end: 1 }),
            })
            this.anims.create({
                key: 'enemy_move_down',
                frameRate: 1,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('car_ad', { start: 3, end: 3 }),
            })
        }

        //explosion anims, just for fun
        if (!this.anims.exists('explosion')){
            const emitter = this.add.particles(400, 250, 'explosion', {
                key: 'explosion',
                frame:["explode0.png", "explode1.png", "explode2.png", "explode3.png", "explode4.png", "explode5.png", "explode6.png"],
                lifespan: 1000,
                speed: { min: 150, max: 250 },
                scale: { start: 1, end: 0 },
                blendMode: 'ADD',
                emitting: false
            });
            
            // Create periodic random explosions
            this.time.addEvent({
                delay: 1000,  
                callback: () => {
                    const randomX = Phaser.Math.Between(100, 700); 
                    const randomY = Phaser.Math.Between(100, 500);      
                    emitter.setPosition(randomX, randomY);
                    emitter.explode(Phaser.Math.Between(100, 500));
                },
                loop: true
            });
        }
    }

    // Handle scene transition on space key press
    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('click');
            this.scene.start("intro_scene")
        }
    }
}

class game_over extends Phaser.Scene{
    constructor() {
        super('game_over_scene')
    }

    create(data){
        // Stop all previous sounds and play game over music
        this.sound.stopAll();
        this.bg_music = this.sound.add('game_over_music', {
            volume: 0.5,
            loop: false
        });
        this.bg_music.play();

        // Setup input controls
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Display appropriate game over message based on end condition
        if(data.is_hit_wall){
            this.add.bitmapText(centerX, centerY, 'white_letters', "YOU HIT THE WALL", 50).setOrigin(0.5);   
        }else if(data.is_hit_own_wall){
            this.add.bitmapText(centerX, centerY, 'white_letters', "YOU HIT YOUR OWN WALL", 50).setOrigin(0.5);   
        }else if(data.time_up){
            this.add.bitmapText(centerX, centerY, 'white_letters', "Time is up", 50).setOrigin(0.5);   
        }else if(data.is_win){
            this.add.bitmapText(centerX, centerY, 'white_letters', "YOU WIN", 50).setOrigin(0.5);   
        }

        // Display game over title and restart instructions
        this.add.bitmapText(centerX, centerY - 200, 'game_over', "G A M E  O V E R", 150).setOrigin(0.5);  
        let flash_text = this.add.bitmapText(centerX, centerY+300, 'white_letters', "Press [SPACE] to REstart\nPress [R] to go back to the main menu", 30, 0.5).setOrigin(0.5);        
        this.tweens.add({
            targets: flash_text, 
            alpha: { from: 1, to: 0 },
            duration: 3000, 
            yoyo: true, 
            repeat: -1 
        });

        //explosion anims, just for fun
        if (!this.anims.exists('explosion')){
            const emitter = this.add.particles(0, 0, 'explosion', {
                key: 'explosion',
                frame:["explode0.png", "explode1.png", "explode2.png", "explode3.png", "explode4.png", "explode5.png", "explode6.png"],
                lifespan: 1000,
                speed: { min: 150, max: 250 },
                scale: { start: 2, end: 0 },
                blendMode: 'ADD',
                emitting: false
            });
            
            // Create periodic random explosions
            this.time.addEvent({
                delay: 1000, 
                callback: () => {
                    const randomX = Phaser.Math.Between(100, 700); 
                    const randomY = Phaser.Math.Between(100, 500);
                    emitter.setPosition(randomX, randomY);
                    emitter.explode(Phaser.Math.Between(100, 500));
                },
                loop: true
            });
        }
    }

    update(){
        // Restart game on space key press
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.sound.stopAll();
            this.sound.play('click');
            this.scene.start('play_scene') 
        }
        // Return to menu on R key press
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.stopAll();
            this.sound.play('click');
            this.scene.start('menu_scene') 
        }
    }
}