class Intro extends Phaser.Scene{
    constructor() {
        super('intro_scene')
    }

    preload(){
        this.load.audio('background_music', './assets/music/backgroundMusic.mp3');

    }
    create(){
        this.background_music = this.sound.add('background_music', {volume: 0.1, loop:true})
        this.background_music.play()
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 200, "HOW TO PLAY", { fontSize: "48px", fill: "#FFF"}).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "1. You can use 'WASD' to control the ship.\n\n2. Use 'J' to fire \n\n3. During the game, you need to destroy the enemy's spaceship and score points.\n\n4. Each enemy spaceship scores 10 points.\n\n5. Cannot be hit by enemy ships.\n\n6. There will be some random high-scoring Easter eggs in the game,\n   but they also move very quickly.", { fontSize: "18px", fill: "#FFF"}).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 200, "Press SPACE to continue", { fontSize: "24px", fill: "#FFF" }).setOrigin(0.5);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.scene.start('play_scene') 
        }
    }
}