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

        // Spawn enemies in four corners
        this.enemy1 = new enemy (this, 
            Phaser.Math.Between(100, this.map.width/3), 
            Phaser.Math.Between(100, this.map.height/3), 
            "brown_car", 0);

        this.enemy2 = new enemy (this, 
            Phaser.Math.Between(this.map.width*2/3, this.map.width-100), 
            Phaser.Math.Between(100, this.map.height/3), 
            "brown_car", 0);

        this.enemy3 = new enemy (this, 
            Phaser.Math.Between(100, this.map.width/3), 
            Phaser.Math.Between(this.map.height*2/3, this.map.height-100), 
            "brown_car", 0);

        this.enemy4 = new enemy (this, 
            Phaser.Math.Between(this.map.width*2/3, this.map.width-100), 
            Phaser.Math.Between(this.map.height*2/3, this.map.height-100), 
            "brown_car", 0);

        this.enemies = [this.enemy1, this.enemy2, this.enemy3, this.enemy4];
        
        // Add collision detection
        this.enemies.forEach(enemy => {
            // Player-enemy collision
            this.physics.add.collider(this.player, enemy, this.check_collision, null, this);
            
            // Enemy-player light wall collision
            this.physics.add.collider(enemy, this.player.light_walls, this.enemy_hit_wall, null, this);
            
            // Player-enemy light wall collision
            this.physics.add.collider(this.player, enemy.light_walls, this.player_hit_wall, null, this);

            // Enemy-own light wall collision
            this.physics.add.collider(enemy, enemy.light_walls, this.enemy_hit_own_wall, null, this);

            // Enemy-other enemy light wall collision
            this.enemies.forEach(other_enemy => {
                if (enemy !== other_enemy) {
                    this.physics.add.collider(enemy, other_enemy.light_walls, this.enemy_hit_wall, null, this);
                }
            });
        });

        // Player-own light wall collision
        this.physics.add.collider(this.player, this.player.light_walls, this.player_hit_own_wall, null, this);

        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)
        

        //timer
        this.left_time = 60000;
        this.time_remaining = this.left_time/1000;
        this.timer_text = this.add.bitmapText(game.config.width - 100, 30, "dis_letter_blue", `time: ${this.time_remaining}`, 40)
        this.timer_text.setDepth(1000);
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.update_timer,
            callbackScope: this,
            loop: true
        });

        // Add enemy counter
        this.enemies_remaining = this.enemies.length;
        this.enemy_text = this.add.bitmapText(10, 30, "dis_letter_blue", `Enemies: ${this.enemies_remaining}`, 40);
        this.enemy_text.setDepth(1000);
    }

    update(){
        if(!this.game_over){
            this.player.update()
            // Update active enemies
            this.enemies.forEach(enemy => {
                if (enemy && enemy.active) {
                    enemy.update(this.time.now);
                }
            });

            // Check for R key reset
            if(Phaser.Input.Keyboard.JustDown(keyRESET)){
                this.sound.play('click');
                let current_music = this.sound.get('bgm');
                if (current_music) {
                    current_music.stop();
                }
                this.scene.start('menu_scene');
            }
        }
        
        // Move game over check outside of the game loop
        this.timer_text.x = this.cameras.main.scrollX + game.config.width - 200;
        this.timer_text.y = this.cameras.main.scrollY + 20;
        this.enemy_text.x = this.cameras.main.scrollX + 10;
        this.enemy_text.y = this.cameras.main.scrollY + 20;
    }

    check_collision(obj1, obj2) {
        return this.physics.overlap(obj1, obj2);
    }

    enemy_hit_wall() {
        if (enemy && enemy.active) {
            const walls = [...enemy.light_walls.getChildren()];
            
            // Start blinking 2 seconds before disappearing
            this.time.delayedCall(1000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        // Create blinking effect
                        this.tweens.add({
                            targets: w,
                            alpha: { from: 1, to: 0 },
                            duration: 200,
                            yoyo: true,
                            repeat: 5,
                            ease: 'Linear'
                        });
                    }
                });
            });

            // Destroy light walls after 3 seconds
            this.time.delayedCall(3000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        w.destroy();
                    }
                });
                enemy.light_walls.clear(true, true);
            });
            
            // Play random explosion sound
            const exp_sounds =  ['explosion1', 'explosion2'];
            const random_sounds = Phaser.Math.RND.pick(exp_sounds);  
            this.sound.play(random_sounds);
            enemy.destroy();
            
            // Update enemy counter
            this.enemies_remaining--;
            this.enemy_text.setText(`Enemies: ${this.enemies_remaining}`);
    
            // Check if all enemies are destroyed
            if (this.enemies_remaining <= 0) {
                this.scene.start("game_over_scene", { is_win: true });
            }
        }
    }

    player_hit_wall() {
        this.scene.start("game_over_scene", { is_win: false });
    }

    player_hit_own_wall() {
        this.scene.start("game_over_scene", { is_win: false });
    }

    update_timer(){
        if (!this.game_over) { 
            this.time_remaining --;
            this.timer_text.setText(`Time: ${Math.ceil(this.time_remaining)}`);             
            if (this.time_remaining <= 0) {            
                this.scene.start("game_over_scene", { is_win: false, time_up: true });
            }
        }
    }

    enemy_hit_own_wall(enemy, wall) {
        if (enemy && enemy.active) {
            const walls = [...enemy.light_walls.getChildren()];
            
            // Start blinking effect
            this.time.delayedCall(1000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        this.tweens.add({
                            targets: w,
                            alpha: { from: 1, to: 0 },
                            duration: 200,
                            yoyo: true,
                            repeat: 5,
                            ease: 'Linear'
                        });
                    }
                });
            });

            // Delayed light wall destruction
            this.time.delayedCall(3000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        w.destroy();
                    }
                });
                enemy.light_walls.clear(true, true);
            });
            
            // Play random explosion sound
            const exp_sounds =  ['explosion1', 'explosion2'];
            const random_sounds = Phaser.Math.RND.pick(exp_sounds);  
            this.sound.play(random_sounds);
            enemy.destroy();
            
            // Update enemy counter
            this.enemies_remaining--;
            this.enemy_text.setText(`Enemies: ${this.enemies_remaining}`);
    
            // Check if all enemies are destroyed
            if (this.enemies_remaining <= 0) {
                this.scene.start("game_over_scene", { is_win: true });
            }
        }
    }
}