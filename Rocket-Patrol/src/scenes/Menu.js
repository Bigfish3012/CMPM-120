class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    preload(){
        this.load.image('rocket', './assets/images/rocket.png')
        this.load.image('spaceship', './assets/images/spaceship.png')
        this.load.image('starfield', './assets/images/starfield.png')
        
    }
    create(){
        this.add.text(20, 20, "Rocket Patrol Menu"),
        this.scene.start("playScene")
    }
}
