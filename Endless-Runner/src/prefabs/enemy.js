class Enemies extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)

        scene.physics.add.existing(this) 
        

        this.body.setSize(this.width, this.height* 0.7)
        this.body.setOffset(this.width*0.05, this.height*0.15)
        this.points = pointValue
        
        this.moveSpeed = Phaser.Math.Between(2, 3);
        this.setOrigin(0, 0);
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
        this.x = game.config.width + Phaser.Math.Between(100, 250);
        this.y = Phaser.Math.Between(30, game.config.height - 50)
    }
}