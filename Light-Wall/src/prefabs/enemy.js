class enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        this.moveSpeed = 300
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)

        // initialize direction (0:up, 1:down, 2:left, 3:right)
        this.direction = Phaser.Math.Between(0, 3);
        
        // store previous position for wall creation
        this.light_walls = scene.add.group();
        this.pre_position = { x: this.x, y: this.y };
        
        // map of opposite directions
        this.opposite_dir = {
            0: 1,  // up -> down
            1: 0,  // down -> up
            2: 3,  // left -> right
            3: 2   // right -> left
        }

        // add world bounds collision detection
        this.body.onWorldBounds = true;
        scene.physics.world.on('worldbounds', this.check_world_collision, this);
    }

    update(time) {
        // update movement based on current direction
        if (this.direction === 0) { 
            this.body.setVelocityY(-this.moveSpeed);
            this.anims.play('enemy_move_up', true);
            this.body.setSize(39, 74);
        } else if (this.direction === 1) { 
            this.body.setVelocityY(this.moveSpeed);
            this.anims.play('enemy_move_down', true);
            this.body.setSize(39, 74);
        } else if (this.direction === 2) { 
            this.body.setVelocityX(-this.moveSpeed);
            this.anims.play('enemy_move_left', true);
            this.body.setSize(74, 39);
        } else if (this.direction === 3) { 
            this.body.setVelocityX(this.moveSpeed);
            this.anims.play('enemy_move_right', true);
            this.body.setSize(74, 39);
        }

        this.leave_light_wall();
    }

    // handle collision with world bounds
    check_world_collision(body, up, down, left, right) {
        if (body.gameObject !== this) return;
        
        // determine which boundary was hit and choose a new valid direction
        let new_directions = [];
        if (up && this.direction === 0) {
            new_directions = [2, 3];  // can go left or right
        } else if (down && this.direction === 1) {
            new_directions = [2, 3];  // can go left or right
        } else if (left && this.direction === 2) {
            new_directions = [0, 1];  // can go up or down
        } else if (right && this.direction === 3) {
            new_directions = [0, 1];  // can go up or down
        }

        if (new_directions.length > 0) {
            // choose random direction from valid options
            this.direction = new_directions[Phaser.Math.Between(0, new_directions.length - 1)];
            // reset velocity before changing direction
            this.body.setVelocity(0, 0);
        }
    }

    leave_light_wall() {
        let distance = Phaser.Math.Distance.Between(this.pre_position.x, this.pre_position.y, this.x, this.y);

        if (distance > 10) {
            let wallX = this.x;
            let wallY = this.y;
            
            const offset = 60;
            switch(this.direction) {
                case 0: // up
                    wallY += offset;
                    break;
                case 1: // down
                    wallY -= offset;
                    break;
                case 2: // left
                    wallX += offset;
                    break;
                case 3: // right
                    wallX -= offset;
                    break;
            }

            let wall = this.scene.add.sprite(wallX, wallY, 'light_wall', 1);
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