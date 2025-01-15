class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene')
    }
    // preload(){
    //     this.preload.image(),
    //     this.preload.image(),
    //     this.preload.image()
    // }
    create(){
        this.add.text(20, 20, "Rocket Patrol Menu"),
        this.scene.start("playScene")
    }
}
