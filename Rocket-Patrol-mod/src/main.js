// Important: At the top of your main.js file, please include a comment with the following information:

// Name: Chengkun Li
// your modification's title (e.g. Rocket Patrol Reloaded IV: The Rocketing)
// the approximate time it took to complete the project (in hours)
// the mods you chose from the list below, their point values, and if necessary, an explanation of their implementation
// citations for any sources you used in your code (you do not need to cite Nathan's code or Phaser documentation)

// Start time:  19:12  01/25/2025

// 1-Point Tier
// Implement the 'FIRE' UI text from the original game (1)
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
