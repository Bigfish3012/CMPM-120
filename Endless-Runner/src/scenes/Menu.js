class Menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){

        //sounds
        this.load.audio('background_music',  './assets/music/backgroundMusic.mp3');
        this.load.audio('background_music2', './assets/music/background-music2.mp3');
        this.load.audio("shot",              "./assets/music/shot.wav")  
        this.load.audio("explosion",         "./assets/music/explosion.wav")
        this.load.audio("explosion2",        "./assets/music/explosion2.wav")
        this.load.audio("explosion3",        "./assets/music/explosion3.wav")
        this.load.audio("explosion4",        "./assets/music/explosion4.wav")
        this.load.audio("evil-explosion",    "./assets/music/evil-explosion.mp3")
        this.load.audio("select",            "./assets/music/select.mp3")
        this.load.audio("dog_sound",         "./assets/music/dog_sound.mp3")
        
        //Background 1
        
        this.load.image('sky_back_mtn',    './assets/images/skies/Sky_back_mountain.png');
        this.load.image('sky_cloud_floor2','./assets/images/skies/sky_cloud_floor_2.png');
        this.load.image('sky_cloud_floor', './assets/images/skies/sky_cloud_floor.png');
        this.load.image('sky_cloud_single','./assets/images/skies/Sky_cloud_single.png');
        this.load.image('sky_clouds',      './assets/images/skies/sky_clouds.png');
        this.load.image('sky_front_cloud', './assets/images/skies/Sky_front_cloud.png');
        this.load.image('sky_front_mtn',   './assets/images/skies/sky_front_mountain.png');
        this.load.image('sky_sky',         './assets/images/skies/Sky_sky.png');

        //Player
        this.load.atlas('player_anim', './assets/images/player.png', './assets/images/player.json')
        this.load.image('bullet', './assets/images/Bullet.png');

        //enemy
        this.load.image('dog', './assets/images/dog.png');
        this.load.atlas('enemy_anim', './assets/images/enemy.png', './assets/images/enemy.json')
        this.load.spritesheet('explosion', './assets/images/explosion.png', {
            frameWidth: 100,
            frameHeight: 100,
            startFrame: 0,
            endFrame: 7
        })
    }
    create(){
        if(!this.sound.get('background_music2')){
            this.background_music = this.sound.add('background_music2', {loop:true})
            this.background_music.play()
        }else if(!this.sound.get('background_music2').isPlaying){
            this.sound.get('background_music2').play()
        }
        
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 200, "Endless Runner", { fontSize: "60px", fill: "#FFF", fontFamily:"Kumar One"}).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "WARNING!!! \nPlease lower your game volume as some sound effects will be extremely loud", { fontSize: "20px", fill: "#FFF", align: 'center'}).setOrigin(0.5);
        let flashText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 150, "Press SPACE to continue", { fontSize: "24px", fill: "#FFF" }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height - 50, "Game by Chengkun Li \nCourse: Winter 2025 CMPM 120 \n\n Disclaimer: This game is only for class assignment", { fontSize: "16px", fill: "#FFF" , align: 'center',}).setOrigin(0.5);
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 1000, 
            yoyo: true, 
            repeat: -1 
        });

        if(!this.anims.exists('enemy_anim')){
            this.anims.create({
                key: 'enemy_anim',
                frames: this.anims.generateFrameNames('enemy_anim', {
                    prefix: 'enemy',
                    start: 0,
                    end: 4,
                    suffix: '.png'
                }),
                frameRate: 10,
                repeat: -1
            });
        }
        

        if(!this.anims.exists('player_anim')){
            this.anims.create({
                key: 'player_anim',
                frames: this.anims.generateFrameNames('player_anim', {
                    prefix: 'player',
                    start: 0,
                    end: 3,
                    suffix: '.png'
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        if(!this.anims.exists('explode')){
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 7, first: 0}),
                frameRate: 10
            })
        }

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.sound.play('select')
            this.scene.start('intro_scene')
        }
    }
}

class game_over extends Phaser.Scene{
    constructor() {
        super('game_over_scene')
    }

    preload(){
        this.load.audio('game_over',  './assets/music/game_over.mp3');
    }
    create(){

        if(!this.sound.get('game_over')){
            this.background_music = this.sound.add('game_over', {volume: 0.7, loop:true})
            this.background_music.play()
        }else if(!this.sound.get('game_over').isPlaying){
            this.sound.get('game_over').play()
        }

        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        key_back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.add.text(game.config.width / 2, game.config.height / 2 - 100, "GAME OVER", { fontSize: "120px", fill: "#E52020"}).setOrigin(0.5);
        let flashText = this.add.text(game.config.width / 2, game.config.height / 2 + 150, " Press 'R' to retry\n\n Press 'm' to go to the main menu ", { fontSize: "20px", fill: "#F8F5E9", fontStyle: 'bold', align:"center"}).setOrigin(0.5);
        
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 1000, 
            yoyo: true, 
            repeat: -1 
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.sound.get('game_over').stop()
            this.sound.play('select')
            this.scene.start('play_scene') 
        }

        if(Phaser.Input.Keyboard.JustDown(key_back)){
            this.sound.get('game_over').stop()
            this.scene.start("menu_scene")
        }
    }
}