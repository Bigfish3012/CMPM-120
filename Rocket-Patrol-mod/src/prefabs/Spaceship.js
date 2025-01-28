class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.setting.spaceshipSpeed

        this.play('spaceship_anim');
    }

    update(){
        this.x -= this.moveSpeed

        if(this.x<= 0 - this.width){
            this.x = game.config.width
        }
    }

    reset(){
        this.x = game.config.width
    }
}

class FasterSpaceship extends Phaser.GameObjects.Sprite {                                 //just simply copied class Spaceship
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this)
        this.moveSpeed = game.setting.spaceshipSpeed * 2;
        this.points = pointValue;
        this.play('fast_spaceship_anim');
    }
    update(){
        this.x -= this.moveSpeed

        if(this.x<= 0 - this.width){
            this.x = game.config.width
        }
    }

    reset() {
        this.x = game.config.width;
        this.y = Phaser.Math.Between(borderUISize * 3, game.config.height - borderUISize * 3);
    }
    
}