class play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    create(){
        this.game_over = false;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.map = this.add.image(0,0, 'map').setOrigin(0)

        this.player = new player (this, centerX, centerY, "blue_car", 0)
        this.enemy1 = new enemy (this, centerX, centerY + 200, "brown_car", 0)
        this.enemy2 = new enemy (this, centerX, centerY + 300, "brown_car", 0)
        this.enemy3 = new enemy (this, centerX, centerY + 400, "brown_car", 0)
        this.enemy4 = new enemy (this, centerX, centerY + 500, "brown_car", 0)
        this.enemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4]
        this.enemies.forEach(enemy => {
            this.physics.add.collider(this.player, enemy, this.check_collision, null, this);
        });

        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)

        //timer
        this.left_time = 60000;
        this.time_remaining = this.left_time/1000;
        this.timer_text = this.add.bitmapText(game.config.width - 100, 30, "dis_letter_blue", `time: ${this.time_remaining}`, 40)
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.update_timer,
            callbackScope: this,
            loop: true
        });
    }

    update(){

        
        if(!this.game_over){
            this.player.update()
            this.enemies.forEach(enemy => {
                enemy.update(this.time.now);
            });
        }
        if(this.game_over){
            this.scene.start("game_over_scene")
        }
        this.timer_text.x = this.cameras.main.scrollX + game.config.width - 200;
        this.timer_text.y = this.cameras.main.scrollY + 20;

        this.enemies.forEach(enemy => {
            if (this.check_collision(this.player, enemy)) {
                this.game_over = true;
            }
        });
    }


    check_collision(ojb1, ojb2) {
        // I copy this from my Endless Runner assignment
        return this.physics.overlap(ojb1, ojb2);
    }

    update_timer(){
        // I copy this from my Rocket-Patrol-mod assignment
        if (!this.game_over) { 
            this.time_remaining --;
            this.timer_text.setText(`Time: ${Math.ceil(this.time_remaining)}`);             
            if (this.time_remaining <= 0) {            
                this.game_over = true;                  
            }
        }
    }

}