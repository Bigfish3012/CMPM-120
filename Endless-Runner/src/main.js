/*
Name: Chengkun Li
Game title: Endless Runner
Approximate hours spent on project: 20 hours
My creative tilt justification: 





References
闪烁字体：https://phaser.discourse.group/t/make-image-sprite-fadein-fadeout-on-loop/8910  
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
            gravity: { y: 0 },
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: false,
        }
    },
    scene: [ Menu, Play , Intro, game_over]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE, key_back