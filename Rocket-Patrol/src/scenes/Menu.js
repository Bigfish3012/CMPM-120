class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    preload(){
        this.load.image('rocket', './assets/images/rocket.png')
        this.load.image('spaceship', './assets/images/spaceship.png')
        this.load.image('starfield', './assets/images/starfield.png')
        this.load.spritesheet('explosion', './assets/images/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })        
    }
    create(){
        this.add.text(20, 20, "Rocket Patrol Menu"),
        this.scene.start("playScene")
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })
    }
}
