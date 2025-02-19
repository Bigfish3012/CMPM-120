class menu extends Phaser.Scene{
    constructor() {
        super('menu_scene')
    }

    preload(){

    }

    create(){
        this.add.text(this.game.config.width / 2, this.game.config.height / 2 - 200, "Light Wall", {
            fontSize: "60px",
            fill: "#FFF",
        }).setOrigin(0.5);
    }

    update(){

    }
}