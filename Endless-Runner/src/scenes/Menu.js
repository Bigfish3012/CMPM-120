class Menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        //Background 1
        this.load.image('sky_sky',         './assets/images/skies/Sky_sky.png');
        this.load.image('sky_back_mtn',    './assets/images/skies/Sky_back_mountain.png');
        this.load.image('sky_front_mtn',   './assets/images/skies/Sky_front_mountain.png');
        this.load.image('sky_clouds',      './assets/images/skies/sky_clouds.png');
        this.load.image('sky_cloud_floor', './assets/images/skies/sky_cloud_floor.png');
        this.load.image('sky_cloud_floor2','./assets/images/skies/sky_cloud_floor_2.png');
        this.load.image('sky_cloud_single','./assets/images/skies/Sky_cloud_single.png');
        this.load.image('sky_front_cloud', './assets/images/skies/sky_front_cloud.png');
        this.load.image('sky_moon',        './assets/images/skies/sky_moon.png');
        //Player
        //this.load.image('player', './assets/images/dog.png')
        this.load.atlas('player_anim', './assets/images/player.png', './assets/images/player.json')

        //enemy
        this.load.atlas('enemy_anim', './assets/images/enemy1.png', './assets/images/enemy1.json')
    }
    create(){

        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, "Endless Runner", { fontSize: "48px", fill: "#FFF" }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, "Press SPACE to continue", { fontSize: "24px", fill: "#FFF" }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height - 50, "Game by Chengkun Li \nCourse: Winter 2025 CMPM 120 \n\n Disclaimer: This game is only for class assignment", { fontSize: "16px", fill: "#FFF" , align: 'center',}).setOrigin(0.5);
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        this.anims.create({
            key: 'enemy_anim',
            frames: this.anims.generateFrameNames('enemy_anim', {
                prefix: 'enemy1',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'player_anim',
            frames: this.anims.generateFrameNames('player_anim', {
                prefix: 'player',
                start: 0,
                end: 3,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });
        

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.scene.start('intro_scene')
        }
    }
}