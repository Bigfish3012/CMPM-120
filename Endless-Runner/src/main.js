/*
Name: Chengkun Li
Game title: Endless Runner
Approximate hours spent on project: 20 hours
My creative tilt justification: 
*/

"use strict"
let config = {
    type: Phaser.AUTO,
    width: 950,
    height: 500,
    physics:{
        default: 'arcade',
        arcade:{
            debug: true,
        }
    },
    scene: [ Menu, Play , Intro]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE