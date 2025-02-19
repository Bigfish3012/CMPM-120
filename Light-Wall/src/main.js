/*
Name: Chengkun Li
Game title: Light Wall
Approximate hours spent on project: 25 hours

*/

"use strict"
let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 950,
    height: 800,
    physics:{
        default: 'arcade',
        arcade:{
            debug: false,
        }
    },
    scene: [menu, play, intro]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE, key_back