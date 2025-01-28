class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    preload(){
        this.load.image('rocket', './assets/images/rocket.png')
        this.load.atlas('spaceship_anim', './assets/images/spaceship.png', './assets/images/spaceship.json')
        this.load.image('starfield', './assets/images/starfield_1.png')
        this.load.spritesheet('explosion', './assets/images/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })
        this.load.audio("select", "./assets/music/select.wav")        
        this.load.audio("explosion", "./assets/music/explosion.wav")        
        this.load.audio("shot", "./assets/music/shot.wav")  
        this.load.audio('new_explosion1', './assets/music/new_explosion1.wav');
        this.load.audio('new_explosion2', './assets/music/new_explosion2.wav');
        this.load.audio('new_explosion3', './assets/music/new_explosion3.wav');
        this.load.audio('new_explosion4', './assets/music/new_explosion4.wav');      
        this.load.audio('background_music', './assets/music/backgroundMusic.mp3');
        
        this.load.atlas('fast_spaceship_anim', './assets/images/faster_spaceship.png', './assets/images/faster_spaceship.json');
    }
    create(){
        if(!this.anims.exists('explode')){
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
                frameRate: 30
            })
        }

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, "ROCKET PATROL", menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- -> arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press <- for Novice or -> for Expert", menuConfig).setOrigin(0.5)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.anims.create({                                                                // Reference Author: Arram Mandel      https://airum82.medium.com/working-with-texture-atlases-in-phaser-3-25c4df9a747a
            key: 'spaceship_anim',                                                         // Reference Author: Josh Morony       https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
            frames: this.anims.generateFrameNames('spaceship_anim', {                      // The production of spaceship animation refers to the articles of these two authors, 
                prefix: 'spaceship',                                                       // and the tutorials when the teacher taught us to make Beyond-Orthogonal in-class animations in class.
                start: 0,                                                                  // The new enemy Spaceship/faster Spaceship just simply copies the code of the old Spaceship.
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'fast_spaceship_anim',
            frames: this.anims.generateFrameNames('fast_spaceship_anim', {
                prefix: 'spaceship',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            game.setting = {
                spaceshipSpeed:2,
                gameTimer: 60000
            }
            this.sound.play('select')
            this.scene.start('playScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            game.setting = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }
}
