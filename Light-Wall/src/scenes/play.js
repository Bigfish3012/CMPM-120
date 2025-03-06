class play extends Phaser.Scene{
    constructor() {
        super('play_scene')
    }

    create(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        
        this.add.bitmapText(centerX, centerY - 200, 'dis_letter_brown', 'this is PLAY scene', 70).setOrigin(0.5)
        this.player = new player (this, centerX, centerY, "brown_car")

    }

    update(){
        if(this.player){
            this.player.update()
        }
    }
}