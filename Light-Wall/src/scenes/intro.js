class intro extends Phaser.Scene{
    constructor() {
        super('intro_scene')
    }

    create(){
        this.add.bitmapText(centerX, centerY - 200, 'intro_used', 'HOW TO PLAY', 70).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY, 'intro_used',
            "1. You can use 'WASD' to control the vehicle.\n\n" +
            "2. You need to defeat the enemy within the specified time.\n\n" +
            "3. If the specified time is exceeded, everyone present will be destroyed.\n\n"+
            "4. You need to use the light wall you create to destroy the enemy\n\n"+
            "5. You will also be destroyed by the light wall that you create.",
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
            this.scene.start("play_scene")
        }
    }
}