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
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.map = this.add.image(0,0, 'map').setOrigin(0)
        this.add.bitmapText(centerX, centerY - 200, 'Cynatar', 'this is PLAY scene', 70).setOrigin(0.5)
        this.player = new player (this, centerX, centerY, "brown_car", 0)
        this.enemy = new player (this, centerX, centerY + 200, "brown_car", 0)

        

        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height)
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25)
        this.physics.world.setBounds(0, 0, this.map.width, this.map.height)

        this.physics.add.collider(this.player, this.enemy, this.handleCollision, null, this);
        
    }

    update(){
        if(!this.game_over){
            this.player.update()
        }

        if(this.game_over && Phaser.Input.Keyboard.JustDown(key_start)){
            this.scene.start("menu_scene")
        }
    }

    handleCollision(player, enemy) {
        if (!this.game_over) {
            this.game_over = true;
            this.physics.pause();
            this.add.bitmapText(centerX, centerY + 200, 'dis_letter_brown', 'game over', 70).setOrigin(0.5)
        }
    }
}