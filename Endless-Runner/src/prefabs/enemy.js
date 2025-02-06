class Enemies extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        
        this.moveSpeed = Phaser.Math.Between(2, 4);

        this.play('enemy_anim');
    }

    update(){
        this.x -= this.moveSpeed

        if(this.x<= 0 - this.width){
            this.x = game.config.width
            this.y = Phaser.Math.Between(30, game.config.height - 50)
        }
    }

    reset(){
        this.x = game.config.width
        this.y = Phaser.Math.Between(30, game.config.height - 50)
    }
}