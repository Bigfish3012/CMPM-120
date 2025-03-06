class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        this.moveSpeed = 300
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)
    }
    

    update(){
        this.body.setVelocity(0);
        if (keyLEFT.isDown) {
            this.body.setVelocityX(-this.moveSpeed);
        }
        if (keyRIGHT.isDown) {
            this.body.setVelocityX(this.moveSpeed);
        }
        if (keyUP.isDown) {
            this.body.setVelocityY(-this.moveSpeed);
        }
        if (keyDOWN.isDown) {
            this.body.setVelocityY(this.moveSpeed);
        }
    }
}