class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)

        this.player = this.add.sprite(width/2, height/2, 'character', 1).setScale(2)

        cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if(cursors.left.isDown){
            this.player.x -= this.PLAYER_VELOCIIY
        }else if(cursors.right.isDown){
            this.player.x += this. PLAYER_VELOCIIY
        }
        if(cursors.up.isDown){
            this.player.y -= this.PLAYER_VELOCIIY
        }else if(cursors.down.isDown){
            this.player.y += this. PLAYER_VELOCIIY
        }
    }
}