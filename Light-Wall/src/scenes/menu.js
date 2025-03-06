class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.path = "./assets/"
        this.load.bitmapFont('dis_letter_brown', 'fonts/dis_letter_brown.png', 'fonts/dis_letter_brown.xml')
        this.load.bitmapFont('dis_letter_blue', 'fonts/dis_letter_blue.png', 'fonts/dis_letter_blue.xml')

        this.load.spritesheet('brown_car', '.././assets/images/brown_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })
    }

    create(){
        this.add.bitmapText(centerX, centerY - 32, 'dis_letter_brown', 'LIGHT WALL', 100).setOrigin(0.5)
        let flashText = this.add.bitmapText(centerX, centerY + 300, 'dis_letter_brown', "Press [SPACE] to start", 50).setOrigin(0.5);
        this.tweens.add({
            targets: flashText, 
            alpha: { from: 1, to: 0 },
            duration: 2000, 
            yoyo: true, 
            repeat: -1 
        });

        cursors = this.input.keyboard.createCursorKeys()


    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
            this.scene.start("intro_scene")
        }
    }
}