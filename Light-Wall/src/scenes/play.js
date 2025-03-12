class play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    create(){
        // Initialize game state and controls
        this.game_over = false;
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.map = this.add.image(0,0, 'map').setOrigin(0)

        // Create and play background music
        this.bg_music = this.sound.add('bgm2', {
            volume: 0.5,
            loop: true
        });
        this.bg_music.play();

        // Create player at center of screen
        this.player = new player (this, centerX + 100, centerY + 100, "blue_car", 0)

        // Spawn enemies in four corners with random positions
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
        
        // Setup all collision detection between players, enemies, and light walls
        this.enemies.forEach(enemy => {
            // Direct collision between player and enemy
            this.physics.add.collider(this.player, enemy, this.check_collision, null, this);
            
            // Enemy colliding with player's light wall
            this.physics.add.collider(enemy, this.player.light_walls, this.enemy_hit_wall, null, this);
            
            // Player colliding with enemy's light wall
            this.physics.add.collider(this.player, enemy.light_walls, this.player_hit_wall, null, this);

            // Enemy colliding with its own light wall
            this.physics.add.collider(enemy, enemy.light_walls, this.enemy_hit_own_wall, null, this);

            // Enemy colliding with other enemies' light walls
            this.enemies.forEach(other_enemy => {
                if (enemy !== other_enemy) {
                    this.physics.add.collider(enemy, other_enemy.light_walls, this.enemy_hit_wall, null, this);
                }
            });
        });

        // Player colliding with their own light wall
        this.physics.add.collider(this.player, this.player.light_walls, this.player_hit_own_wall, null, this);

        // Setup camera to follow player
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)
        
        // Initialize game timer
        this.left_time = 60000;  // 60 seconds in milliseconds
        this.time_remaining = this.left_time/1000;
        this.timer_text = this.add.bitmapText(game.config.width - 100, 30, "dis_letter_blue", `time: ${this.time_remaining}`, 40)
        this.timer_text.setDepth(1000);
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: this.update_timer,
            callbackScope: this,
            loop: true
        });

        // Initialize enemy counter display
        this.enemies_remaining = this.enemies.length;
        this.enemy_text = this.add.bitmapText(10, 30, "dis_letter_blue", `Enemies: ${this.enemies_remaining}`, 40);
        this.enemy_text.setDepth(1000);
    }

    update(){
        // Only update game if not in game over state
        if(!this.game_over){
            this.player.update()
            // Update all active enemies
            this.enemies.forEach(enemy => {
                if (enemy && enemy.active) {
                    enemy.update(this.time.now);
                }
            });
        }
        // Update UI elements to follow camera
        this.timer_text.x = this.cameras.main.scrollX + game.config.width - 200;
        this.timer_text.y = this.cameras.main.scrollY + 20;
        this.enemy_text.x = this.cameras.main.scrollX + 10;
        this.enemy_text.y = this.cameras.main.scrollY + 20;
    }

    // Check for physics overlap between objects
    check_collision(obj1, obj2) {
        return this.physics.overlap(obj1, obj2);
    }

    // Handle enemy collision with light walls
    enemy_hit_wall(enemy, wall) {
        if (enemy && enemy.active) {
            const walls = [...enemy.light_walls.getChildren()];
            
            // Create blinking effect before wall disappears
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

            // Clean up light walls after delay
            this.time.delayedCall(3000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        w.destroy();
                    }
                });
                enemy.light_walls.clear(true, true);
            });
            
            this.car_explode(enemy);
    
            // Check for win condition
            if (this.enemies_remaining <= 0) {
                this.time.delayedCall(1000, () => {
                    this.sound.stopAll();
                    this.scene.start("game_over_scene", { is_win: true });
                });
            }
        }
    }

    // Handle player collision with enemy light walls
    player_hit_wall() {
        this.game_over = true;
        this.car_explode(this.player, true);
        
        this.time.delayedCall(1000, () => {
            this.sound.stopAll();
            this.scene.start("game_over_scene", { is_win: false, is_hit_wall: true});
        });
    }

    // Handle player collision with their own light walls
    player_hit_own_wall() {
        this.game_over = true;
        this.car_explode(this.player, true);
        
        this.time.delayedCall(1000, () => {
            this.sound.stopAll();
            this.scene.start("game_over_scene", { is_win: false, is_hit_own_wall: true});
        });
    }

    // Update game timer and check for time-up condition
    update_timer(){
        if (!this.game_over) { 
            this.time_remaining --;
            this.timer_text.setText(`Time: ${Math.ceil(this.time_remaining)}`);             
            if (this.time_remaining <= 0) {            
                this.sound.stopAll();
                this.scene.start("game_over_scene", { is_win: false, time_up: true });
            }
        }
    }

    // Handle enemy collision with its own light walls
    enemy_hit_own_wall(enemy, wall) {
        if (enemy && enemy.active) {
            const walls = [...enemy.light_walls.getChildren()];
            
            // Create blinking effect
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

            // Clean up light walls
            this.time.delayedCall(3000, () => {
                walls.forEach(w => {
                    if (w && w.active) {
                        w.destroy();
                    }
                });
                enemy.light_walls.clear(true, true);
            });
            
            this.car_explode(enemy);
    
            // Check for win condition
            if (this.enemies_remaining <= 0) {
                this.time.delayedCall(1000, () => {
                    this.sound.stopAll();
                    this.scene.start("game_over_scene", { is_win: true});
                });
            }
        }
    }
    
    // Create explosion effect and update game state when a car is destroyed
    car_explode(enemy){
        // Play random explosion sound
        const exp_sounds =  ['explosion1', 'explosion2'];
        const random_sounds = Phaser.Math.RND.pick(exp_sounds);  
        this.sound.play(random_sounds, { volume: 0.3 });

        // Create particle explosion effect
        const emitter = this.add.particles(enemy.x, enemy.y, 'explosion', {
            key: 'explosion',
            frame:["explode0.png", "explode1.png", "explode2.png", "explode3.png", "explode4.png", "explode5.png", "explode6.png"],
            lifespan: 1000,
            speed: { min: 150, max: 250 },
            scale: { start: 2, end: 0 },
            blendMode: 'ADD',
            emitting: false
        });
        emitter.explode(200);
        enemy.destroy();

        // Update enemy counter and display
        this.enemies_remaining--;
        this.enemy_text.setText(`Enemies: ${this.enemies_remaining}`);
    }
}