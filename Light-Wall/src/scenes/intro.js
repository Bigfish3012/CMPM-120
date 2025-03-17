class intro extends Phaser.Scene{
    constructor() {
        super('intro_scene')
    }

    create(){
        this.add.bitmapText(centerX, centerY - 200, 'intro_used', 'HOW TO PLAY', 70).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'intro_used',
            "1. Use 'WASD' to steer your vehicle.\n\n" +
            "2. Defeat the enemy before time runs out.\n\n" +
            "3. If time expires, the game ends.\n\n" +
            "4. Trap and destroy your enemy with your light wall.\n\n" +
            "5. Avoid crashing into your own light wall.",
            30
        ).setOrigin(0.5);

        cursors = this.input.keyboard.createCursorKeys()

        let flashText = this.add.bitmapText(centerX, centerY + 300, 'intro_used', "Press [SPACE] to start", 50).setOrigin(0.5);
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 2000, 
            yoyo: true, 
            repeat: -1 
        });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.sound.play('click');
            this.sound.stopAll();
            this.scene.start("play_scene")
        }
    }
}