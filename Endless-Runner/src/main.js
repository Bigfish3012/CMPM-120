/*
Name: Chengkun Li
Game title: Funny Plane Wars
Approximate hours spent on project: 25 hours

My creative tilt justification: 
    My game was inspired by the game "天天酷跑"（Parkour Everyday） that I played when I was a kid.
    All the sound effects are from the internet. I made the player ship and enemy ship. the background image and the dog image are from the internet.
    
    I don't think I didn't do something "technically" interesting in my game, but I do tried to my game fun.  
    For example, random and funny sound effects. Even though my game d is not good, I still feel proud of it. Because it can reflect whether I have gained anything.
    I do learn how to do something new from the class examples, but I don't think I look beyond it. 
    The new thing I did in my game is the random sounds. I used Phaser.Math.RND.pick() to pick the sounds, 
        and used Phaser.Math.Between() to generate the enemy ship at random different heights and speeds, which is very fun.




Credits:
    background images(skies)：https://bongseng.itch.io/parallax-forest-desert-sky-moon

    music:
    background music2(Bit Quest):           https://incompetech.com/music/royalty-free/music.html
    background music (Retro Game Arcade):   https://pixabay.com/music/search/8%20biy/?pagi=3

    sound effects:
    Dog，Select, Steel pipe and GameOver sound:     https://www.myinstants.com/en/index/us/
    shot and explosion sound:                       https://sfxr.me/

References
    Flashing font：                     https://phaser.discourse.group/t/make-image-sprite-fadein-fadeout-on-loop/8910  
    Debug Sprite collision boxes:       https://www.html5gamedevs.com/topic/37761-how-to-enable-debug-showing-sprite-collision-boxes/
    overlap():                          https://docs.phaser.io/api-documentation/class/physics-arcade-arcadephysics#overlap
    isPlaying():                        https://stackoverflow.com/questions/70445004/how-can-you-detect-wether-any-music-is-playing-in-phaser 
    background music:                   https://gamedevacademy.org/creating-a-phaser-3-template-part-3/?a=13
    final score:                        https://dev.to/ceceliacreates/working-with-scenes-and-data-in-phaser-2pn4#:~:text=To%20do%20this%2C%20we'll,to%20add%20the%20score%20data.
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
            debug: true,
        }
    },
    scene: [ Menu, Play , Intro, game_over ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
let key_start, keyRESET, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyFIRE, key_back