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

        this.light_walls = scene.add.group();
        this.pre_position = { x: this.x, y: this.y };
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

        this.leave_light_wall();
    }

    leave_light_wall() {
        let distance = Phaser.Math.Distance.Between(this.pre_position.x, this.pre_position.y, this.x, this.y);

        if (distance > 5) {
            let wallX = this.x;
            let wallY = this.y;
            
            const offset = 60;  
            if (this.direction_up) {
                wallY += offset;  
            } else if (this.direction_down) {
                wallY -= offset;  
            } else if (this.direction_left) {
                wallX += offset;  
            } else if (this.direction_right) {
                wallX -= offset;  
            }

            let wall = this.scene.add.sprite(wallX, wallY, 'light_wall', 0);
            wall.setOrigin(0.5);
            this.light_walls.add(wall);
            this.scene.physics.add.existing(wall);
            wall.body.setImmovable(true);
            wall.body.setAllowGravity(false);
            wall.body.customSeparateX = true;
            wall.body.customSeparateY = true;
            
            if (this.light_walls.getLength() > 60) {
                let oldest_wall = this.light_walls.getFirstAlive();
                if (oldest_wall) oldest_wall.destroy();
            }
            
            this.pre_position = { x: this.x, y: this.y };
        }
    }
}