class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        this.moveSpeed = 300
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)
        this.body.setVelocityX(0);

        this.direction_right = false;
        this.direction_left = false;
        this.direction_up = false;
        this.direction_down = false;
    }
    
    create(){

    }
    update(){
        
        if (keyLEFT.isDown && !this.direction_right) {
            this.body.setVelocityX(-this.moveSpeed);
            this.body.setVelocityY(0);
            this.anims.play('player_move_left', true);
            this.body.setSize(74, 39);

            this.direction_left = true;
            this.direction_right = false;
            this.direction_up = false;
            this.direction_down = false;

        }else if (keyRIGHT.isDown && !this.direction_left) {
            this.body.setVelocityX(this.moveSpeed);
            this.body.setVelocityY(0);
            this.anims.play('player_move_right', true);
            this.body.setSize(74, 39);

            this.direction_left = false;
            this.direction_right = true;
            this.direction_up = false;
            this.direction_down = false;

        }else if (keyUP.isDown && !this.direction_down) {
            this.body.setVelocityY(-this.moveSpeed);
            this.body.setVelocityX(0);
            this.anims.play('player_move_up', true);
            this.body.setSize(39, 74);

            this.direction_up = true;
            this.direction_down = false;
            this.direction_right = false;
            this.direction_left = false;

        }else if (keyDOWN.isDown && !this.direction_up) {
            this.body.setVelocityY(this.moveSpeed);
            this.body.setVelocityX(0);
            this.anims.play('player_move_down',true);
            this.body.setSize(39, 74);

            this.direction_up = false;
            this.direction_down = true;
            this.direction_right = false;
            this.direction_left = false;

        }
    }
}