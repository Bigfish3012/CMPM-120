class player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        // Set basic physics properties
        this.moveSpeed = 500
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)

        // Initialize movement direction flags
        this.direction_right = false;
        this.direction_left = false;
        this.direction_up = false;
        this.direction_down = false;

        // Create group for light walls and store initial position
        this.light_walls = scene.add.group();
        this.pre_position = { x: this.x, y: this.y };
    }
    
    update(){
        // Handle left movement
        if (keyLEFT.isDown && !this.direction_right) {
            this.body.setVelocityX(-this.moveSpeed);
            this.body.setVelocityY(0);
            this.anims.play('player_move_left', true);
            this.body.setSize(10, 39);
            this.body.setOffset(0, 0);

            this.direction_left = true;
            this.direction_right = false;
            this.direction_up = false;
            this.direction_down = false;

        // Handle right movement
        }else if (keyRIGHT.isDown && !this.direction_left) {
            this.body.setVelocityX(this.moveSpeed);
            this.body.setVelocityY(0);
            this.anims.play('player_move_right', true);
            this.body.setSize(10, 39);
            this.body.setOffset(54, 0);

            this.direction_left = false;
            this.direction_right = true;
            this.direction_up = false;
            this.direction_down = false;

        // Handle upward movement
        }else if (keyUP.isDown && !this.direction_down) {
            this.body.setVelocityY(-this.moveSpeed);
            this.body.setVelocityX(0);
            this.anims.play('player_move_up', true);
            this.body.setSize(39, 10);
            this.body.setOffset(0, 0);

            this.direction_left = false;
            this.direction_right = false;
            this.direction_up = true;
            this.direction_down = false;

        // Handle downward movement
        }else if (keyDOWN.isDown && !this.direction_up) {
            this.body.setVelocityY(this.moveSpeed);
            this.body.setVelocityX(0);
            this.anims.play('player_move_down', true);
            this.body.setSize(39, 10);
            this.body.setOffset(0, 54);

            this.direction_left = false;
            this.direction_right = false;
            this.direction_up = false;
            this.direction_down = true;
        }

        // Create light wall trail
        this.leave_light_wall();
    }

    // Create light wall trail behind player
    leave_light_wall() {
        let distance = Phaser.Math.Distance.Between(this.pre_position.x, this.pre_position.y, this.x, this.y);

        if (distance > 1) {
            let wallX = this.x;
            let wallY = this.y;
            
            // Adjust wall position based on movement direction
            const offset = 5;  
            if (this.direction_up) {
                wallY += offset;  
            } else if (this.direction_down) {
                wallY -= offset;  
            } else if (this.direction_left) {
                wallX += offset;  
            } else if (this.direction_right) {
                wallX -= offset;  
            }

            // Create and configure light wall sprite
            let wall = this.scene.add.sprite(wallX, wallY, 'light_wall', 0);
            wall.setOrigin(0.5);
            wall.setAlpha(0);
            this.light_walls.add(wall);
            this.scene.physics.add.existing(wall);
            wall.body.setImmovable(true);
            wall.body.setAllowGravity(false);
            wall.body.customSeparateX = true;
            wall.body.customSeparateY = true;
            
            // Fade in the light wall
            this.scene.tweens.add({
                targets: wall,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
            
            // Limit the number of light walls to prevent memory issues
            if (this.light_walls.getLength() > 120) {
                let oldest_wall = this.light_walls.getFirstAlive();
                if (oldest_wall) oldest_wall.destroy();
            }
            
            // Update previous position for next wall placement
            this.pre_position = { x: this.x, y: this.y };
        }
    }
}