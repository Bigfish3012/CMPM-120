/*
Name: Chengkun Li
Game title: Light Wall
Approximate hours spent on project: I don't remember, maybe infinite hours ~~~~~~~~~ tired




References / Credit / Source:
Particle Effects:               https://www.youtube.com/watch?v=LEDPCfot_GY
on_world_bounds:                https://stackoverflow.com/questions/74976420/phaser-3-check-group-collision-with-world-bounds
setOffset:                      https://phaser.discourse.group/t/differences-between-setsize-setoffset-methods-in-arcade-static-body-and-dynamic-body/734
bgm1 Voxel Revolution:          https://incompetech.com/music/royalty-free/musihttps://incompetech.com/music/royalty-free/music.htmlc.html
bgm2 Pixel Bubbles:             https://pixabay.com/music/search/pixel/     
bgm3 Game Over:                 https://pixabay.com/sound-effects/search/game-over/


to-do-list
make ai better, not killing itself
a hard mode
Available colors

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
    scene: [menu, intro, play, game_over]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, key_back
const centerX = game.config.width / 2
const centerY = game.config.height / 2
let cursors = null