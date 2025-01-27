class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    }

    create(){

        this.backgroundMusic = this.sound.add('backgroundMusic', {volume: 0.1, loop:true})
        this.backgroundMusic.play()


        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)

        this.fastShip = new FasterSpaceship(this, game.config.width + borderUISize * 6, Phaser.Math.Between(borderUISize * 3, game.config.height - borderUISize * 3), 'fast_spaceship_anim', 'spaceship0.png', 50).setOrigin(0, 0);

        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        this.gameOver = false
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        this.highScoreText = this.add.text(game.config.width - borderUISize - borderPadding - 100, borderUISize + borderPadding * 2, `HS: ${hightestScore}`, scoreConfig);

        if (this.p1Score > hightestScore) {
            hightestScore = this.p1Score;
            this.highScoreText.setText(`HS: ${hightestScore}`).setOrigin(0.5);
        }
        this.add.text(game.config.width / 2 -50, borderUISize + borderPadding + 30, 'FIRE', scoreConfig).setOrigin(0.5);

        this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed += 1;
            this.ship02.moveSpeed += 1;
            this.ship03.moveSpeed += 1;
            this.fastShip.moveSpeed += 1;
        }, null, this);

        this.time_remaining = game.setting.gameTimer / 1000;
        this.timeText = this.add.text(game.config.width/2 +10, borderUISize + borderPadding * 2, `Time: ${this.time_remaining}`, scoreConfig);
    
        
        this.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    update(){
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }
        if(this.gameOver){
            this.backgroundMusic.stop()
        }
        this.starfield.tilePositionX -= 1
        if(!this.gameOver){
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.fastShip.update();
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03) 
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02) 
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01) 
        }
        if (this.checkCollision(this.p1Rocket, this.fastShip)) {
            this.p1Rocket.reset();
            this.shipExplode(this.fastShip);
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene")
        }
    }

    checkCollision(rocket, ship){
        if(rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y){
                return true
        }else{
            return false
        }
    }

    shipExplode(ship){
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        this.time_remaining += 2;
        this.timeText.setText(`Time: ${Math.ceil(this.time_remaining)}`);
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        const exp_sounds =  ['explosion', 'new_explosion1', 'new_explosion2', 'new_explosion3', 'new_explosion4'];
        const random_sounds = Phaser.Math.RND.pick(exp_sounds);
        this.sound.play(random_sounds);
    }

    updateTimer() {
        if (!this.gameOver) { 
            this.time_remaining -= 1;
            this.timeText.setText(`Time: ${Math.ceil(this.time_remaining)}`);
    
            
            if (this.time_remaining <= 0) {
                this.gameOver = true;
                this.add.text(game.config.width / 2, game.config.height / 2, "GAME OVER", scoreConfig).setOrigin(0.5);
                this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            }
        }
    }
}