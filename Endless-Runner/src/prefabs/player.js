class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        //this.setScale(0.5)
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 3

        this.play('player_anim');
    }

    update() {
        if(!this.isFiring || this.isFiring){
            if(keyLEFT.isDown && this.x > 1){
                this.x -= this.moveSpeed
            }
            if(keyRIGHT.isDown&& this.x <= game.config.width - this.width/2){
                this.x += this.moveSpeed
            }
            if(keyUP.isDown && this.y > 0){
                this.y -= this.moveSpeed
            }
            if(keyDOWN.isDown && this.y <= game.config.height - this.height/2){
                this.y += this.moveSpeed
            }
        }
        

        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring){
            //this.isFiring = true
            console.log("FIRE FIRE FIRE")
        }
    }

    reset(){
        //this.isFiring = false
    }
}