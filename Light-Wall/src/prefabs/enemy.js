class enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        this.moveSpeed = 300
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)

        this.direction = Phaser.Math.Between(0, 3);
        this.change_direction_time = Phaser.Math.Between(1000, 3000); 
        this.last_change = 0;
    }

    update(time) {
        if (time > this.last_change + this.change_direction_time) {
            this.change_direction();
            this.last_change = time;
        }

        if (this.direction === 0) {
            this.body.setVelocityY(-this.moveSpeed);
        } else if (this.direction === 1) { 
            this.body.setVelocityY(this.moveSpeed);
        } else if (this.direction === 2) { 
            this.body.setVelocityX(-this.moveSpeed);
        } else if (this.direction === 3) { 
            this.body.setVelocityX(this.moveSpeed);
        }
    }

    change_direction() {
        this.direction = Phaser.Math.Between(0, 3);
        this.change_direction_time = Phaser.Math.Between(1000, 3000);
        this.body.setVelocityX(0); 
        this.body.setVelocityY(0);
    }

}