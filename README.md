<h1 align="center">🐉 Dungeon Tiles 🎮</center>

### This is a game written in JavaScript that involves moving around a character in a dungeon-like environment, collecting a key, and opening doors while avoiding enemies.
### It's a Game Project using Canvas JS in the subject Web Developing I in my University (URU)
### Link: https://dungeon-tiles.vercel.app/

Lenguages:
- HTML
- Javascript (Using Canvas)

Libraries:
- Sweetalert (Game over y Winning alerts)

## Getting Started
To play the game, simply open the index.html file in a web browser that supports JavaScript.

## Gameplay
The objective of the game is to collect a key and reach the exit door without getting caught by enemies.

The game features a dungeon environment consisting of walls, floors, doors, keys, enemies, and an exit. The player character can move in four directions using the arrow keys on the keyboard. The player character can only move on floors, and cannot move through walls or doors unless they have a key to open the door.

The player character starts with three lives. The player loses a life if they come into contact with an enemy. The game is over if the player loses all three lives. The game features background music and sound effects for various events in the game.

## Code Overview
The code consists of a main JavaScript file (main.js) that sets up the game environment, initializes game objects, and handles game logic. The game environment is drawn on a HTML canvas element.

The game features a player character (good), enemies (bad), keys (key), and doors (door). The good and bad objects have their own movement and collision detection functions. The key and door objects are simple static objects that are drawn on the game environment.

The game environment is defined using a two-dimensional array (dungeon). The dungeon array contains numerical values that correspond to different types of tiles on the game environment (walls, floors, doors, keys, enemies, and the exit). The game environment is drawn using a tile map image (tileMap.png).

The game uses the Howler.js library to play background music and sound effects.
