import type { NextPage } from "next";
import _ from "lodash";
import Head from "next/head";
import styles from "./home.module.scss";
import { PokemonInterface } from "../services/axios";
import { useEffect, useState } from "react";
import { GuessedPokemon } from "../components/GuessedPokemon";
import { PokemonStats } from "../components/PokemonStats";
import { CurrentPokemon } from "../components/CurrentPokemon";
import { usePokemons } from "../Hooks/usePokemons";
import ResultModal from "../components/ResultModal";

interface gameState {
  lives: number;
  start: boolean;
  win: boolean;
  lose: boolean;
}

// Home page
const Home: NextPage = () => {
  const [sound, setSound] = useState<HTMLAudioElement>();
  const { pokemons } = usePokemons();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [randomPokemon, setRandomPokemon] = useState<PokemonInterface>();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface>(
    generateDefaultPokemon
  );

  //Prepare game
  const [gameState, setGameState] = useState<gameState>({
    lives: 5,
    start: false,
    win: false,
    lose: false,
  });

  //Set start state to playing mode
  function handleGameStateStart() {
    setGameState({
      lives: 5,
      start: true,
      win: false,
      lose: false,
    });
  }

  // Set selected pokemon to default values
  function generateDefaultPokemon(): PokemonInterface {
    return {
      id: -1,
      name: "Select Pokemon",
      imageUrl: "/images/pokeball.png",
      types: { type1: "", type2: "" },
      height: 0,
      weight: 0,
    };
  }

  // Select a random pokemon from pokemons list
  function generateNewRandomPokemon() {
    setRandomPokemon(_.sample(pokemons));
  }

  // Prepare gamne to start again
  function handleGameRestart() {
    handleGameStart();
  }

  // Prepare game to start
  function handleGameStart() {
    generateNewRandomPokemon();
    sound!.volume = 0.5;
    sound!.play();
    handleGameStateStart();
  }

  //Define audio file
  useEffect(() => {
    setSound(new Audio("/audios/audio.mp3"));
  }, []);

  // Track/Udate game state when a pokemon
  // is selected by the player
  useEffect(() => {
    //If id matches → Player wins
    if (selectedPokemon?.id === randomPokemon?.id && gameState.start) {
      setGameState({ ...gameState, start: false, win: true });
    }
    //If id doesn`t match → ...
    if (selectedPokemon?.id !== randomPokemon?.id && gameState.start) {
      // End game → Player loses
      if (gameState.lives - 1 === 0) {
        setGameState({
          ...gameState,
          start: false,
          lose: true,
        });
      } else {
        // Lose a live
        setGameState({
          ...gameState,
          lives: gameState.lives - 1,
        });
      }
    }
  }, [selectedPokemon]);


  // Track game state to display the
  // result modal (win/lose modals)
  useEffect(() => {
    if (gameState.lose) {
      setIsResultModalOpen(true);
      setSelectedPokemon(generateDefaultPokemon);
      return;
    }

    if (gameState.win) {
      setIsResultModalOpen(true);
      setSelectedPokemon(generateDefaultPokemon);
      return;
    }
  }, [gameState]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Head>
            <title>Guess Pokemon</title>
          </Head>
          {randomPokemon && gameState.start ? (
            <CurrentPokemon {...randomPokemon} />
          ) : (
            <>
              <div className={styles.gameStart}>
                <button onClick={handleGameStart}> Start New Game</button>
              </div>
              {isResultModalOpen && (
                <ResultModal
                  pokemon={randomPokemon!}
                  setIsResultModalOpen={setIsResultModalOpen}
                  result={gameState.win}
                  handleGameRestart={handleGameRestart}
                />
              )}
            </>
          )}

          {randomPokemon && selectedPokemon && gameState.start && (
            <>
              <section key={randomPokemon.name} className={styles.gameStats}>
                <select
                  value={selectedPokemon.id}
                  name="pokemonSelect"
                  defaultValue={selectedPokemon.id}
                  onChange={(ev) => {
                    setSelectedPokemon(
                      _.find(pokemons, (p) => p.id === Number(ev.target.value))
                    );
                  }}
                >
                  <option value={-1} disabled hidden>
                    Select a pokemon here!
                  </option>
                  {_.sortBy(pokemons, ["name"], ["asc"]).map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.id}>
                      {pokemon.name}
                    </option>
                  ))}
                </select>
                <PokemonStats
                  selectedPokemon={selectedPokemon}
                  randomPokemon={randomPokemon}
                  lives={gameState.lives}
                />
              </section>

              <GuessedPokemon {...selectedPokemon} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
