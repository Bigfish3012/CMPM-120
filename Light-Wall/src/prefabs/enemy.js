class enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        this.moveSpeed = 300
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setCollideWorldBounds(true)
        this.body.onWorldBounds = true;  // enable world bounds collision event

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

        // add random direction change timer
        this.last_direction_change = 0;
        this.direction_change_interval = Phaser.Math.Between(3000, 6000);  // random interval between 3-6 seconds

        // setup world bounds collision handler
        scene.physics.world.on('worldbounds', this.check_world_collision, this);
    }

    check_world_collision(body) {
        // make sure this is our body that hit the bounds
        if (body.gameObject !== this) return;

        // determine which boundary was hit based on position and velocity
        if (this.y <= 0 && this.body.velocity.y < 0) {  // hitting top
            this.change_direction_at_boundary('vertical');
        } else if (this.y >= this.scene.game.config.height - this.body.height && this.body.velocity.y > 0) {  // hitting bottom
            this.change_direction_at_boundary('vertical');
        } else if (this.x <= 0 && this.body.velocity.x < 0) {  // hitting left
            this.change_direction_at_boundary('horizontal');
        } else if (this.x >= this.scene.game.config.width - this.body.width && this.body.velocity.x > 0) {  // hitting right
            this.change_direction_at_boundary('horizontal');
        }
    }

    update(time) {
        // random direction change
        if (time > this.last_direction_change + this.direction_change_interval) {
            this.random_dir();
            this.last_direction_change = time;
            this.direction_change_interval = Phaser.Math.Between(2000, 3000);  // set new random interval
        }

        // update movement based on current direction
        if (this.direction === 0) { 
            this.body.setVelocityY(-this.moveSpeed);
            this.anims.play('enemy_move_up', true);
            this.body.setSize(39, 10);
            this.body.setOffset(0, 0);
        } else if (this.direction === 1) { 
            this.body.setVelocityY(this.moveSpeed);
            this.anims.play('enemy_move_down', true);
            this.body.setSize(39, 10);
            this.body.setOffset(0, 54);
        } else if (this.direction === 2) { 
            this.body.setVelocityX(-this.moveSpeed);
            this.anims.play('enemy_move_left', true);
            this.body.setSize(10, 39);
            this.body.setOffset(0, 0);
        } else if (this.direction === 3) { 
            this.body.setVelocityX(this.moveSpeed);
            this.anims.play('enemy_move_right', true);
            this.body.setSize(10, 39);
            this.body.setOffset(54, 0);
        }

        this.leave_light_wall();
    }

    // change direction when hitting boundaries
    change_direction_at_boundary(boundary_type) {
        if (boundary_type === 'vertical') {
            this.direction = [2, 3][Phaser.Math.Between(0, 1)];  // choose left or right
        } else {
            this.direction = [0, 1][Phaser.Math.Between(0, 1)];  // choose up or down
        }
        this.body.setVelocity(0, 0);  // reset velocity before changing direction
    }

    // change direction randomly but smartly
    random_dir() {
        let available_directions = [0, 1, 2, 3];
        
        // remove current direction and its opposite
        available_directions = available_directions.filter(dir => 
            dir !== this.direction && dir !== this.opposite_dir[this.direction]
        );

        // check if near boundaries and remove those directions
        if (this.y <= this.body.height) {  // near top
            available_directions = available_directions.filter(dir => dir !== 0);
        }
        if (this.y >= this.scene.game.config.height - this.body.height * 2) {  // near bottom
            available_directions = available_directions.filter(dir => dir !== 1);
        }
        if (this.x <= this.body.width) {  // near left
            available_directions = available_directions.filter(dir => dir !== 2);
        }
        if (this.x >= this.scene.game.config.width - this.body.width * 2) {  // near right
            available_directions = available_directions.filter(dir => dir !== 3);
        }

        // if we have valid directions, choose one randomly
        if (available_directions.length > 0) {
            this.direction = available_directions[Phaser.Math.Between(0, available_directions.length - 1)];
            this.body.setVelocity(0, 0);  // reset velocity before changing direction
        }
    }

    leave_light_wall() {
        let distance = Phaser.Math.Distance.Between(this.pre_position.x, this.pre_position.y, this.x, this.y);

        if (distance > 1) {
            let wallX = this.x;
            let wallY = this.y;
            
            const offset = 5;
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
            wall.setAlpha(0);
            this.light_walls.add(wall);
            this.scene.physics.add.existing(wall);
            wall.body.setImmovable(true);
            wall.body.setAllowGravity(false);
            wall.body.customSeparateX = true;
            wall.body.customSeparateY = true;
            
            this.scene.tweens.add({
                targets: wall,
                alpha: 1,
                duration: 1000,
                ease: 'Linear'
            });
            
            if (this.light_walls.getLength() > 120) {
                let oldest_wall = this.light_walls.getFirstAlive();
                if (oldest_wall) oldest_wall.destroy();
            }
            
            this.pre_position = { x: this.x, y: this.y };
        }
    }
}