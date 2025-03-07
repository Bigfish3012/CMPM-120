/*
Name: Chengkun Li
Game title: Light Wall
Approximate hours spent on project:

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
            debug: true,
        }
    },
    scene: [menu, intro, play, game_over]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, key_back
const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null