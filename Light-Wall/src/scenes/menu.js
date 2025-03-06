class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.path = "./assets/"
        this.load.bitmapFont('dis_letter_brown', 'fonts/dis_letter_brown.png', 'fonts/dis_letter_brown.xml')
        this.load.bitmapFont('dis_letter_blue', 'fonts/dis_letter_blue.png', 'fonts/dis_letter_blue.xml')
        this.load.bitmapFont('Cynatar', 'fonts/Cynatar.png', 'fonts/Cynatar.xml')
        this.load.bitmapFont('Cynatar_brown', 'fonts/Cynatar_brown.png', 'fonts/Cynatar_brown.xml')
        this.load.bitmapFont('intro_used', 'fonts/intro_used.png', 'fonts/intro_used.xml')

        this.load.spritesheet('brown_car', 'images/brown_car.png', {
            frameWidth: 74,
            frameHeight: 39
        })

        this.load.image('map', 'images/map-scroll.jpg')
    }

    create(){
        this.add.bitmapText(centerX, centerY - 32, 'Cynatar_brown', 'L I G H T  W A L L', 100).setOrigin(0.5)
        let flashText = this.add.bitmapText(centerX, centerY + 300, 'Cynatar_brown', "Press [SPACE] to start", 50).setOrigin(0.5);
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