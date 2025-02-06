class Play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    create(){
        //Background 1
        this.sky_sky = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_sky').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_clouds = this.add.tileSprite(0, -100, game.config.width, game.config.height, 'sky_clouds').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_back_mtn = this.add.tileSprite(0, -50, game.config.width, game.config.height, 'sky_back_mtn').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_single = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_single').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_front_mtn = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_front_mtn').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_floor2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_floor2').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_cloud_floor = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sky_cloud_floor').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_front_cloud = this.add.tileSprite(0, 50, game.config.width, game.config.height, 'sky_front_cloud').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)
        this.sky_moon = this.add.tileSprite(0, 0, game.config.width, game.config.height,'sky_moon').setOrigin(0, 0).setTileScale(game.config.width/1900, game.config.height/1000)

        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)

        let diff_h = this.game.config.height / 4;
        this.player = new Player(this, this.game.config.width/2 - 300, this.game.config.height/2, 'player_anim', 'player1.png').setOrigin(0, 0);
        this.enemy1 = new Enemies(this, game.config.width, Phaser.Math.Between(-1, diff_h -1), 'enemy_anim', 'enemy11.png', 10).setOrigin(0, 0);
        this.enemy2 = new Enemies(this, game.config.width, Phaser.Math.Between(diff_h, diff_h*2 -1), 'enemy_anim', 'enemy11.png', 10).setOrigin(0, 0);
        this.enemy3 = new Enemies(this, game.config.width, Phaser.Math.Between(diff_h*2, diff_h*3-1), 'enemy_anim', 'enemy11.png', 10).setOrigin(0, 0);
        this.enemy4 = new Enemies(this, game.config.width, Phaser.Math.Between(diff_h*3, diff_h*4-1), 'enemy_anim', 'enemy11.png', 10).setOrigin(0, 0);

        this.gameOver = false

    }

    update(){

        if(this.gameOver){
            //this.background_music.stop()
            this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", { fontSize: "120px", fill: "#FBA518"}).setOrigin(0.5);
            
        }
        if(!this.gameOver){
            //Background 1
            this.sky_clouds.tilePositionX += 0.2
            this.sky_front_mtn.tilePositionX += 1
            this.sky_cloud_single.tilePositionX += 3
            this.sky_back_mtn.tilePositionX += 0.1
            this.sky_front_cloud.tilePositionX += 5
            this.sky_cloud_floor2.tilePositionX += 7
            this.sky_cloud_floor.tilePositionX += 6
            this.sky_moon.tilePositionX += 0.1

            this.player.update();
            this.enemy1.update();
            this.enemy2.update();
            this.enemy3.update();
            this.enemy4.update();

        }

        // if(this.checkCollision(this.player, this.enemy1)){
        //     this.enemy1.reset()
        // }
        // if(this.checkCollision(this.player, this.enemy2)){
        //     this.enemy2.reset()
        // }
        // if(this.checkCollision(this.player, this.enemy3)){
        //     this.enemy3.reset()
        // }
        // if(this.checkCollision(this.player, this.enemy4)){
        //     this.enemy4.reset()
        // }

        if(this.checkCollision(this.player, this.enemy1)){
            this.gameOver = true;  
        }
        if(this.checkCollision(this.player, this.enemy2)){
            this.gameOver = true;  
        }
        if(this.checkCollision(this.player, this.enemy3)){
            this.gameOver = true;  
        }
        if(this.checkCollision(this.player, this.enemy4)){
            this.gameOver = true;  
        }
        

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.start("intro_scene")
        }
    }
    checkCollision(player, enemy) {
        let dist = Phaser.Math.Distance.Between(player.x, player.y + 10, enemy.x, enemy.y + 10);
        // maybe if distance < 5, consider it a collision
        return (dist < 30);
    }
    
    
}