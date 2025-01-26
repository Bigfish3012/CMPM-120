class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.setting.spaceshipSpeed

        //this.moveSpeed = game.setting.spaceshipSpeed * (Math.random() > 0.5 ? 1 : -1);
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