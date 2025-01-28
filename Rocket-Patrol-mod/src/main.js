/*
Important: At the top of your main.js file, please include a comment with the following information:

Name: Chengkun Li
My modification's title: Rocket Patrol: Bigfish Version
the approximate time it took to complete the project: 13 hours
the mods you chose from the list below, their point values, and if necessary, an explanation of their implementation
citations for any sources you used in your code (you do not need to cite Nathan's code or Phaser documentation)


*****Implemented 1-Point Tier*****
Implement the 'FIRE' UI text from the original game (1)
Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
Implement the speed increase that happens after 30 seconds in the original game (1)              //Professor's previous document mentioned that the game would be forced to end when it reached 60 seconds, so I used the same method to increase the speed.
Create a new scrolling tile sprite for the background (1)
Allow the player to control the Rocket after it's fired (1)                  //change "!this.isFiring" to "!this.isFiring || this.isFiring", in this way can let player to control the Rocket at anytime

*****Implemented 3-Point Tier*****
Display the time remaining (in seconds) on the screen (3)
Create 4 new explosion sound effects and randomize which one plays on impact (3)  // I used the website https://sfxr.me/ to generate random explosion sound effects. 
                                                                                  // Then I used https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array to make random selection sound effects.
Using a texture atlas, create a new animated sprite (three frames minimum) for the enemy spaceships (3)     //  // Explained in Menu.js

*****Implemented 5-Point Tier*****
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)         // Explained in Menu.js
Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)

References
https://stackoverflow.com/questions/37115491/how-to-set-volume-of-audio-object
https://phaser.discourse.group/t/phaser-math-rnd-pick-from-array/3541
https://www.html5gamedevs.com/topic/37731-repeat-the-animation-with-only-last-two-frames/
https://airum82.medium.com/working-with-texture-atlases-in-phaser-3-25c4df9a747a
https://www.joshmorony.com/how-to-create-animations-in-phaser-with-a-texture-atlas/
https://docs.phaser.io/phaser/concepts/textures
https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
https://phaser.discourse.group/t/how-to-change-text-in-phaser/3893
https://phaser.io/examples/v3.55.0/game-objects/text/view/change-text
https://phaser.io/examples/v3.85.0/components/data/view/set-data-event
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
