"use strict"
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    // scene: [ Menu, Play ]
    scene: [Play]
}

let game = new Phaser.Game(config)

let { width, height } = game.config

// let game = new Phaser.Game(config)
// let borderUISize = game.config.height /15
// let borderPadding = borderUISize / 3
// let keyFIRE, keyRESET, keyLEFT, keyRIGHT