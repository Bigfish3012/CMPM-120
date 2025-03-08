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

        this.light_walls = scene.add.group();
        this.pre_position = { x: this.x, y: this.y };
        this.opposite_dir = {
            0:1,
            1:0,
            2:3, 
            3:2
        }
    }

    update(time) {
        if (time > this.last_change + this.change_direction_time) {
            this.change_direction();
            this.last_change = time;
        }

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

    change_direction() {
        const forbidden_dir = { 0: 1, 1: 0, 2: 3, 3: 2 };
        let allow_dir = [0, 1, 2, 3].filter(dir => dir !== forbidden_dir[this.direction]);
        
        const checkDistance = 100;
        allow_dir = allow_dir.filter(dir => {
            let testX = this.x;
            let testY = this.y;
            
            switch(dir) {
                case 0: testY -= checkDistance; break;
                case 1: testY += checkDistance; break;
                case 2: testX -= checkDistance; break;
                case 3: testX += checkDistance; break;
            }
            
            let hasWall = false;
            this.light_walls.getChildren().forEach(wall => {
                if (Phaser.Math.Distance.Between(testX, testY, wall.x, wall.y) < 50) {
                    hasWall = true;
                }
            });
            
            return !hasWall;
        });

        if (allow_dir.length === 0) {
            allow_dir = [0, 1, 2, 3].filter(dir => dir !== forbidden_dir[this.direction]);
        }
        
        this.direction = allow_dir[Phaser.Math.Between(0, allow_dir.length-1)];
        this.change_direction_time = Phaser.Math.Between(1000, 3000);
        this.body.setVelocityX(0); 
        this.body.setVelocityY(0);
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