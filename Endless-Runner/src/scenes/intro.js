class Intro extends Phaser.Scene{
    constructor() {
        super('intro_scene')
    }
    create(){
        
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        key_back = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 220, "HOW TO PLAY", { fontSize: "48px", fill: "#FFF"}).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 
            "1. You can use 'WASD' to control the player ship.\n\n" +
            "2. Press 'J' to fire.\n\n" +
            "3. Destroy enemy spaceships to score points.\n\n" +
            "4. Each enemy spaceship scores 10 points.\n\n" +
            "5. Avoid getting hit! If an enemy ship hits you, \n   the game ends immediately.\n\n" +
            "6. Watch out for fast-moving, high-score DOG!\n\n" + 
            "7. You can only have a maximum of 5 bullets, \n   one bullet is restored every 2 seconds, \n   and you can only fire one bullet every 1.5 seconds.", 
            {
                fontSize: "18px",
                fill: "#FFF",
            }
        ).setOrigin(0.5);        

        let flashText = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 200, "Press 'M' to go back to the main menu\nPress SPACE to continue", { fontSize: "20px", fill: "#FFF", align: 'center'}).setOrigin(0.5);
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 1000, 
            yoyo: true, 
            repeat: -1 
        });
        
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.sound.get('background_music2').stop(); 
            this.sound.play('select')
            this.scene.start('play_scene') 
        }

        if(Phaser.Input.Keyboard.JustDown(key_back)){
            this.sound.play('select')
            this.scene.start("menu_scene")
        }
    }
}