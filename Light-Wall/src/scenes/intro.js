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

        // Create start button
        let startButton = this.add.bitmapText(centerX, centerY + 300, 'intro_used', "CONTINUE", 50).setOrigin(0.5);
        startButton.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        startButton.on('pointerover', () => {
            startButton.setTint(0x00ff00); // Green tint on hover
        });
        
        startButton.on('pointerout', () => {
            startButton.clearTint();
        });
        
        // Add click handler
        startButton.on('pointerdown', () => {
            this.sound.play('click');
            this.sound.stopAll();
            this.scene.start("play_scene");
        });

        let menuButton = this.add.bitmapText(centerX, centerY + 350, 'intro_used', "BACK", 50).setOrigin(0.5);
        menuButton.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        menuButton.on('pointerover', () => {
            menuButton.setTint(0x00ff00); // Green tint on hover
        });
        
        menuButton.on('pointerout', () => {
            menuButton.clearTint();
        });
        
        // Add click handler
        menuButton.on('pointerdown', () => {
            this.sound.play('click');
            this.sound.stopAll();
            this.scene.start("menu_scene");
        });
        
        // Add button animation
        this.tweens.add({
            targets: [startButton, menuButton], 
            scale: { from: 1, to: 1.1 },
            duration: 1000, 
            yoyo: true, 
            repeat: -1 
        });
    }
}