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

        this.load.spritesheet('brown_car', 'images/brown_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })
        this.load.spritesheet('blue_car', 'images/blue_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })
        this.load.spritesheet('blue_car_ad', 'images/blue_car_ad.png', {
            frameWidth: 39,
            frameHeight: 74
        })

        this.load.image('map', 'images/map-scroll.jpg')
    }

    create(){
        this.add.bitmapText(centerX, centerY - 32, 'Cynatar_brown', 'L I G H T  W A L L', 100).setOrigin(0.5)
        let flashText = this.add.bitmapText(centerX, centerY + 300, 'Cynatar_brown', "Press [SPACE] to start", 50).setOrigin(0.5);
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 2000, 
            yoyo: true, 
            repeat: -1 
        });

        cursors = this.input.keyboard.createCursorKeys()

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
            frames: this.anims.generateFrameNumbers('blue_car', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'player_move_up',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('blue_car_ad', { start: 0, end: 0 }),
        })
        this.anims.create({
            key: 'player_move_down',
            frameRate: 1,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('blue_car_ad', { start: 1, end: 1 }),
        })

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("intro_scene")
        }
    }
}

class game_over extends Phaser.Scene{
    constructor() {
        super('game_over_scene')
    }

    create(){

        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        key_back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        this.add.bitmapText(centerX, centerY - 200, 'game_over', "GAME OVER", 150).setOrigin(0.5);   
        let flashText = this.add.bitmapText(centerX, centerY+300, 'game_over', "Press [SPACE] to REstart", 30).setOrigin(0.5);        
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 3000, 
            yoyo: true, 
            repeat: -1 
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.scene.start('play_scene') 
        }
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.start('menu_scene') 
        }
    }
}