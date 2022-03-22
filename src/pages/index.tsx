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
import Sound from 'react-sound'

interface gameState {
  lifes: number;
  start: boolean;
  win: boolean;
  lose: boolean;
}

const Home: NextPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { pokemons } = usePokemons();
  const [randomPokemon, setRandomPokemon] = useState<PokemonInterface>(() => {
    return (pokemons && _.sample(pokemons)) || ({} as PokemonInterface);
  });
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface>(
    generateDefaultPokemon
  );
  const [selectedId, setSelectedId] = useState(selectedPokemon.id);
  const [gameState, setGameState] = useState<gameState>({
    lifes: 5,
    start: false,
    win: false,
    lose: false,
  });
  function generateDefaultPokemon(): PokemonInterface {
    return {
      id: -1,
      name: "Select a Pokemon",
      imageUrl:
        "https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png",
      types: { type1: "", type2: "" },
      height: 0,
      weight: 0,
    };
  }
  function generateNewRandomPokemon() {
    setRandomPokemon(_.sample(pokemons));
    setGameState({
      ...gameState,
      lifes: 5,
      start: true,
      lose: false,
      win: false,
    });
  }
  useEffect(() => {
    if (selectedPokemon?.id === randomPokemon?.id && gameState.start) {
      setGameState({ ...gameState, start: false, win: true });
    }
    if (selectedPokemon?.id !== randomPokemon?.id && gameState.start) {
      if (gameState.lifes - 1 === 0) {
        setGameState({
          ...gameState,
          lifes: 5,
          start: false,
          lose: true,
        });
      } else {
        setGameState({
          ...gameState,
          lifes: gameState.lifes - 1,
        });
      }
    }
  }, [selectedId]);
  useEffect(() => {
    if (gameState.lose) {
      alert("You lose!");
      return;
    }

    if (gameState.win) {
      alert("You win!");
      return;
    }
  }, [gameState]);

  return (
    <div className={styles.contentContainer}>
      <Sound
      url="/audios/audio.mp3"
      playStatus={isPlaying? "PLAYING" : "STOPPED"}

      />
      <Head>
        <title>Guess Pokemon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {randomPokemon && gameState.start ? (
        <CurrentPokemon {...randomPokemon} />
      ) : (
        <div className={styles.gameStart}>
          <button
            onClick={() => {
              setIsPlaying(true)
              setSelectedPokemon(generateDefaultPokemon);
              generateNewRandomPokemon();
            }}
          >
            {" "}
            Start New Game
          </button>
        </div>
      )}

      {randomPokemon && selectedPokemon && gameState.start && (
        <>
          <section key={randomPokemon.name} className={styles.gameStats}>
            <select
              value={selectedId}
              name="pokemonSelect"
              defaultValue={selectedId}
              onChange={(ev) => {
                setSelectedId(parseInt(ev.target.value, 10));
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
              lifes={gameState.lifes}
            />
          </section>

          <GuessedPokemon {...selectedPokemon} />
        </>
      )}
    </div>
  );
};

export default Home;
