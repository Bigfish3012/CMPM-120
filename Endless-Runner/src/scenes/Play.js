class Play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    preload(){
        
    }
    create(){
        this.sky_sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_sky').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_clouds = this.add.tileSprite(0, -100, game.config.width, game.config.height, 'sky_clouds').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_back_mtn = this.add.tileSprite(0, -50, game.config.width, game.config.height, 'sky_back_mtn').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_single = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_single').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_front_mtn = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_front_mtn').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_floor2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_floor2').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_floor = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_floor').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_front_cloud = this.add.tileSprite(0, 50, game.config.width, game.config.height, 'sky_front_cloud').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_moon = this.add.tileSprite(0, 0, game.config.width, game.config.height,'sky_moon').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)

        // this.sky_sky.setDepth(0); 
        // this.sky_clouds.setDepth(1);
        // this.sky_front_mtn.setDepth(2);
        // this.sky_moon.setDepth(3);

        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.gameOver = false
    }

    update(){
        if(!this.gameOver){
            this.sky_clouds.tilePositionX += 0.2
            this.sky_front_mtn.tilePositionX += 1
            this.sky_cloud_single.tilePositionX += 3
            this.sky_back_mtn.tilePositionX += 0.1
            this.sky_front_cloud.tilePositionX += 5
            this.sky_cloud_floor2.tilePositionX += 7
            this.sky_cloud_floor.tilePositionX += 6
            this.sky_moon.tilePositionX += 0.1
        }
    }
}