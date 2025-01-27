/*
Important: At the top of your main.js file, please include a comment with the following information:

Name: Chengkun Li
your modification's title (e.g. Rocket Patrol Reloaded IV: The Rocketing)
the approximate time it took to complete the project (in hours)
the mods you chose from the list below, their point values, and if necessary, an explanation of their implementation
citations for any sources you used in your code (you do not need to cite Nathan's code or Phaser documentation)

Start time:  19:12  01/25/2025

Implemented 1-Point Tier
Implement the 'FIRE' UI text from the original game (1)
Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
Implement the speed increase that happens after 30 seconds in the original game (1)
Create a new scrolling tile sprite for the background (1)
Allow the player to control the Rocket after it's fired (1)

Implemented 3-Point Tier
Display the time remaining (in seconds) on the screen (3)
Create 4 new explosion sound effects and randomize which one plays on impact (3)

Implemented 5-Point Tier
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)

References
https://stackoverflow.com/questions/37115491/how-to-set-volume-of-audio-object
https://phaser.discourse.group/t/phaser-math-rnd-pick-from-array/3541
https://www.html5gamedevs.com/topic/37731-repeat-the-animation-with-only-last-two-frames/
https://airum82.medium.com/working-with-texture-atlases-in-phaser-3-25c4df9a747a
https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
https://docs.phaser.io/phaser/concepts/textures
*/

"use strict"
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
let borderUISize = game.config.height /15
let borderPadding = borderUISize / 3
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
let hightestScore = 0
