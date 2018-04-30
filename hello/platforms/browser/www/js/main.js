var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('grid', 'assets/images/grid.png');
    game.load.image('atari', 'assets/sprites/atari800xl.png');

}

function create() {

    //game.add.sprite(0, 500, 'grid'); 

    var atari1 = game.add.sprite(300, 300, 'atari');
	var atari2 = game.add.sprite(500, 500, 'atari');
    //  Input Enable the sprites
    atari1.inputEnabled = true;
    atari2.inputEnabled = true;

    //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    atari1.input.enableDrag(true);
    atari2.input.enableDrag(true);

}

