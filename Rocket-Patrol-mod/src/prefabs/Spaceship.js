class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.setting.spaceshipSpeed

        //this.moveSpeed = game.setting.spaceshipSpeed * (Math.random() > 0.5 ? 1 : -1);
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

class FasterSpaceship extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame, pointValue);

        this.moveSpeed = game.setting.spaceshipSpeed * 2;
        this.points = pointValue * 2;
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