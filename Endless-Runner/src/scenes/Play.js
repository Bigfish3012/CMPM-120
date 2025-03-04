class Play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    create(){
        //background music
        this.background_music = this.sound.add('background_music', {volume: 0.7, loop:true})
        this.background_music.play()
        // //Background
        this.backgroundImage = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'backgroundImage').setOrigin(0, 0)


        //Keyboard
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        key_back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        //Ships
        this.player = new Player(this, this.game.config.width/2 - 300, this.game.config.height/2, 'player_anim', 'player1.png')
        this.enemies = [];

        this.spawning_enemy = this.time.addEvent({
            delay: 2000, 
            callback: this.spawn_enemy,
            callbackScope: this,
            loop: true
        });

        this.spawning_dog = this.time.addEvent({
            delay: Phaser.Math.Between(8000, 15000),
            callback: this.spawn_dog,
            callbackScope: this,
            loop: true
        });
        


        this.gameOver = false
        this.bullets = [];
        for (let i = 0; i < 5; i++) {
            let bullet = new Bullet(this, -100, -100, 'bullet');
            this.bullets.push(bullet);
        }

        this.total_bullet = 5;
        this.last_fired = 0;
        this.last_recovered = 0;
        this.bullet_text = this.add.text(20, 20, 'Bullets: ' + this.total_bullet, { 
            fontSize: '32px Kumar One', 
            fill: '#AEEA94' 
        });
        this.score_text = this.add.text(20, 50, 'Score  : 0', { 
            fontSize: '32px Kumar One', 
            fill: '#AEEA94' 
        });
        this.score = 0;

    }

    update(time){

        if(this.gameOver){
            this.background_music.stop()
            this.scene.start("game_over_scene", {score: this.score})
        }
        if(!this.gameOver){
            //Background
            this.backgroundImage.tilePositionX += 1

            this.player.update();
            this.enemies.forEach(enemy => enemy.update());
        }

        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && this.total_bullet > 0 && time - this.last_fired > 1500) {
            let bullet = this.bullets.find(b => !b.isFired);
            if (bullet) {
                bullet.fire(this.player.x + this.player.width, this.player.y);
                this.total_bullet--;
                this.bullet_text.setText('Bullets: ' + this.total_bullet);
                this.last_fired = time;
            }
        }

        if (time - this.last_recovered > 5000 && this.total_bullet < 5) {
            this.total_bullet++;
            this.bullet_text.setText('Bullets: ' + this.total_bullet);
            this.last_recovered = time;
        }

        this.bullets.forEach(bullet => bullet.update());

        this.bullets.forEach(bullet => {
            if (bullet.isFired) {
                this.enemies.forEach((enemy, index) => {
                    if (this.check_collision(bullet, enemy)) {
                        enemy.destroy(); 
                        this.enemies.splice(index, 1); 
                        bullet.reset();
                        
                        if (enemy.is_dog) {
                            this.score += 50;
                            this.shipExplode(enemy)
                            
                        } else {
                            this.score += 10;
                            this.shipExplode(enemy)
                        }
                        this.score_text.setText('Score: ' + this.score);
                    }
                });
            }
        });
        
        

        this.enemies.forEach(enemy => {
            if (this.check_collision(this.player, enemy)) {
                this.gameOver = true;
                this.spawning_enemy.remove();
                this.spawning_dog.remove();
            }
        });
    }

    check_collision(player, enemy) {
        return this.physics.overlap(player, enemy);
    }
    
    
    shipExplode(enemy){
        const exp_sounds =  ['explosion', 'explosion2', 'explosion3', 'explosion4', 'evil-explosion'];
        const random_sounds = Phaser.Math.RND.pick(exp_sounds);   
        if(enemy.is_dog){
            this.sound.play('dog_sound');
        }else if(random_sounds == 'evil-explosion'){
            this.sound.play('evil-explosion', {volume: 0.2});
        }else{
            this.sound.play(random_sounds);
        }
        
        enemy.alpha = 0
        let boom = this.add.sprite(enemy.x, enemy.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            if(!enemy.is_dog){
                enemy.reset()
            }
            enemy.alpha = 1
            boom.destroy()
            
        })
    }
    
    spawn_enemy() {
        if (this.enemies.length < 7) {
            let enemy = new Enemies(this, game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), 'enemy_anim', 'enemy1.png', 10);
            this.enemies.push(enemy);
        }
    }
    
    spawn_dog() {
        this.dog = this.physics.add.sprite(this.game.config.width, Phaser.Math.Between(50, this.game.config.height - 50), 'dog');
        this.dog.setOrigin(0, 0);
        this.dog.setScale(0.1);
        this.dog.setVelocityX(-400);
        this.dog.setDepth(2); 
    
        this.dog.body.setSize(this.dog.width * 0.8, this.dog.height * 0.8);
    
        this.dog.is_dog = true;  
        this.enemies.push(this.dog);
        
    }
    
}