/*
Name: Chengkun Li
Game title: Endless Runner
Approximate hours spent on project: 20 hours
My creative tilt justification: 





References
Flashing font：             https://phaser.discourse.group/t/make-image-sprite-fadein-fadeout-on-loop/8910  
Sprite collision boxes:     https://www.html5gamedevs.com/topic/37761-how-to-enable-debug-showing-sprite-collision-boxes/
overlap():                  https://docs.phaser.io/api-documentation/class/physics-arcade-arcadephysics#overlap
*/

"use strict"
let config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 950,
    height: 500,
    physics:{
        default: 'arcade',
        arcade:{
            debug: false,
            gravity: { y: 0 },
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: false,
        }
    },
    scene: [ Menu, Play , Intro, game_over ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE, key_back