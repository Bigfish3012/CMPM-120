class Menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){
        this.load.image('sky_sky',         './assets/images/skies/Sky_sky.png');
        this.load.image('sky_back_mtn',    './assets/images/skies/Sky_back_mountain.png');
        this.load.image('sky_front_mtn',   './assets/images/skies/Sky_front_mountain.png');
        this.load.image('sky_clouds',      './assets/images/skies/sky_clouds.png');
        this.load.image('sky_cloud_floor', './assets/images/skies/sky_cloud_floor.png');
        this.load.image('sky_cloud_floor2','./assets/images/skies/sky_cloud_floor_2.png');
        this.load.image('sky_cloud_single','./assets/images/skies/Sky_cloud_single.png');
        this.load.image('sky_front_cloud', './assets/images/skies/sky_front_cloud.png');
        this.load.image('sky_moon',        './assets/images/skies/sky_moon.png');

        this.load.image('background', './assets/images/dog.png')

        this.load.audio('background_music', './assets/music/backgroundMusic.mp3');
    }
    create(){
        this.background_music = this.sound.add('background_music', {volume: 0.1, loop:true})
        //this.background_music.play()
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 100, "Endless Runner", { fontSize: "48px", fill: "#FFF" }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height / 2, "Press SPACE to Start", { fontSize: "24px", fill: "#FFF" }).setOrigin(0.5);
        this.add.text(this.game.config.width / 2, this.game.config.height - 200, "Game by Chengkun Li \nCourse: Winter 2025 CMPM 120", { fontSize: "16px", fill: "#FFF" }).setOrigin(0.5);
        key_start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        
        // this.input.keyboard.once("keydown-SPACE", () => {
        //     this.scene.start("play_scene");
        // });
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(key_start)){
            this.scene.start('play_scene')
        }
    }
}