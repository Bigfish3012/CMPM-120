class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.path = "./assets/"
        this.load.bitmapFont('dis_letter_brown', 'fonts/dis_letter_brown.png', 'fonts/dis_letter_brown.xml')
        this.load.bitmapFont('dis_letter_blue', 'fonts/dis_letter_blue.png', 'fonts/dis_letter_blue.xml')
        this.load.bitmapFont('Cynatar', 'fonts/Cynatar.png', 'fonts/Cynatar.xml')
        this.load.bitmapFont('Cynatar_brown', 'fonts/Cynatar_brown.png', 'fonts/Cynatar_brown.xml')
        this.load.bitmapFont('intro_used', 'fonts/intro_used.png', 'fonts/intro_used.xml')
        this.load.bitmapFont('game_over', 'fonts/game_over.png', 'fonts/game_over.xml')

        this.load.audio('bgm', 'musics/background_music.mp3');
        this.load.audio('click', 'musics/click.mp3');
        this.load.audio('explosion1', 'musics/explosion1.mp3');
        this.load.audio('explosion2', 'musics/explosion2.mp3');

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

        this.load.image('map', 'images/map.png')
    }

    create(){
        // Add background music
        if (!this.sound.get('bgm')) {
            this.bg_music = this.sound.add('bgm', {
                volume: 0.5,
                loop: true
            });
            this.bg_music.play();
        }

        this.add.bitmapText(centerX, centerY - 32, 'Cynatar_brown', 'L I G H T  W A L L', 100).setOrigin(0.5)
        let flash_text = this.add.bitmapText(centerX, centerY + 300, 'Cynatar_brown', "Press [SPACE] to start", 50).setOrigin(0.5);
        this.tweens.add({
            targets: flash_text, 
            alpha: { from: 1, to: 0 },
            duration: 2000, 
            yoyo: true, 
            repeat: -1 
        });

        cursors = this.input.keyboard.createCursorKeys()

        //player car anims
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
        //enemies car anims
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

    }

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
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // Display different text based on game result
        const game_text = data.is_win ? "YOU WIN" : "GAME OVER";
        this.add.bitmapText(centerX, centerY - 200, 'game_over', game_text, 150).setOrigin(0.5);   
        if(data.time_up){
            this.add.bitmapText(centerX, centerY, 'dis_letter_blue', "Time is up", 100).setOrigin(0.5);   
        }

        let flash_text = this.add.bitmapText(centerX, centerY+300, 'game_over', "Press [SPACE] to REstart\n\nPress [R] to go back to the main menu", 30).setOrigin(0.5);        
        this.tweens.add({
            targets: flash_text, 
            alpha: { from: 1, to: 0 },
            duration: 3000, 
            yoyo: true, 
            repeat: -1 
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.sound.play('click');
            this.scene.start('play_scene') 
        }
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.get('bgm').stop();
            this.sound.play('click');
            this.sound.play('bgm');

            this.scene.start('menu_scene') 
        }
    }
}