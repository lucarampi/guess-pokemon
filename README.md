 ## Requirements
### Create an API
Have to create an API that consumes [pokeapi](https://pokeapi.co/) APIs and get the first 151 Pokémons. Then create a database that can keep a register of all those Pokémons. Remember that each Pokémon has "name","type1","type2","height","weight" and CRUD must be possible too.

## Game mechanics
When the game starts, a random Pokémon, from your database, is drawn. The player has 5 chances to guess the right answer. If he/she loses all his/her lives, he/she loses the game and the interface should say:

`- You lost! The secret Pokémon was Bulbasaur!`

For each guess, the interface shows the differences between the selected and the random Pokémon and says if it is right/wrong or higher/lower.

Let's say that Bulbasaur was the random pokemon. It`s
- Type 1: Grass
- Type 2: Poison
- Height: 0.7 m
- Weight: 6.9 kg

If the player guess that is a Squirtle which has this attributes:

- Type 1: Water
- Type 2: None
- Height: 0.5 m
- Weight: 9.0 kg

The interface must show: 
![enter image description here](https://i.imgur.com/u50yWHI.png)



If the user guess is a Venusaur, with stats:
- Type 1: Grass
- Type 2: Poison
- Height: 2.0 m
- Weight: 100.0 kg

The interface must show: 
![enter image description here](https://i.imgur.com/vU7Wtec.png)

## When the player gets the right Pokémon

If the user guess is a Bulbasaur, which is the right answer, the interface should say that all pairs are "Right!". In the first moment, I did that, but I taught it was missing some spiciness. Then I decided to pop up a modal with Win/Lost messages from the original game. The result was:

![enter image description here](https://i.imgur.com/4vkpjeC.png)

## When the player loses

Again, to add something nicer than just displaying a text like "You lost! The secret Pokémon was Bulbasaur!" I made a "game over" modal like this: 
![enter image description here](https://i.imgur.com/U1IO2Ae.png)

## Running the project
This step is quite easy, just clone this repo (ou download as .zip and stract it), open the terminal at the folder and type:
```bash
  yarn 
  #or
  npm i
```
After that just type:
```bash
  yarn dev
  #or
  npm run dev
```
