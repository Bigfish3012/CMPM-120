class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.path = "./assets/"
        this.load.bitmapFont('dis_letter', 'fonts/dis_letter.png', 'fonts/dis_letter.xml')
    }

    create(){
        this.add.bitmapText(centerX, centerY - 32, 'dis_letter', 'LIGHT WALL', 100).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 50, 'dis_letter', 'Press SPACE to start', 50).setOrigin(0.5)
    }

    update(){

    }
}