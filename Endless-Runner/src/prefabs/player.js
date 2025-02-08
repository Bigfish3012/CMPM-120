class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)

        scene.add.existing(this)
        scene.physics.add.existing(this) 
        
        this.body.setSize(this.width*0.3, this.height*0.7)
        this.body.setOffset(this.width*0.15, this.height*0.15)
        this.isFiring = false
        this.moveSpeed = 2
        this.setOrigin(0, 0);
        this.play('player_anim');
    }

    update() {
        if(!this.isFiring || this.isFiring){
            if(keyLEFT.isDown && this.x > 0){
                this.x -= this.moveSpeed
            }
            if(keyRIGHT.isDown&& this.x <= game.config.width - this.width){
                this.x += this.moveSpeed
            }
            if(keyUP.isDown && this.y > 0){
                this.y -= this.moveSpeed
            }
            if(keyDOWN.isDown && this.y <= game.config.height - this.height){
                this.y += this.moveSpeed
            }
        }
        

    }
}

class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)

        scene.add.existing(this)
        scene.physics.add.existing(this) 
        

        this.body.setSize(this.width*0.8, this.height*0.8)
        this.body.setOffset(this.width*0.1, this.height*0.1)
        this.moveSpeed = 3
        this.shot = scene.sound.add('shot')
    }

    update(){
        if (this.isFired) {
            this.x += this.moveSpeed;
            if (this.x > game.config.width) {
                this.reset();
            }
        }
    }

    fire(x, y) {
        this.x = x;
        this.y = y + 50;
        this.isFired = true;
        this.shot.play()
    }

    reset() {
        this.isFired = false;
        this.x = -100;
    }
}