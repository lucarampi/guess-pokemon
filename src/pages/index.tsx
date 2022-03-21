import type { NextPage } from "next";
import _ from "lodash";
import Head from "next/head";
import styles from "./home.module.scss";
import { PokemonInterface } from "../services/axios";
import { useEffect, useState } from "react";
import { GuessedPokemon } from "../components/GuessedPokemon";
import { PokemonStats } from "../components/PokemonStats";
import { CurrentPokemon } from "../components/CurrentPokemon";
import { Lifes } from "../components/Lifes";
import { usePokemons } from "../Hooks/usePokemons";

interface gameState {
  lifes: number;
  start: boolean;
  win: boolean;
  lose: boolean;
}

const Home: NextPage = () => {
  const { pokemons } = usePokemons();
  const [randomPokemon, setRandomPokemon] = useState<PokemonInterface>(() => {
    return (pokemons && _.sample(pokemons)) || ({} as PokemonInterface);
  });
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface>(
    () => {
      return pokemons && (_.sample(pokemons) || ({} as PokemonInterface));
    }
  );
  const [selectedId, setSelectedId] = useState(selectedPokemon.id);
  const [gameState, setGameState] = useState<gameState>({
    lifes: 5,
    start: false,
    win: false,
    lose: false,
  });

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
              setSelectedPokemon({
                id: -1,
                name: "Select a Pokemon",
                imageUrl:
                  "https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png",
                types: { type1: "", type2: "" },
                height: 0,
                weight: 0,
              });
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
            <h2>Choose a pokemon:</h2>
            <select
              value={selectedId}
              name="pokemonSelect"
              defaultValue={-1}
              onChange={(ev) => {
                setSelectedId(parseInt(ev.target.value, 10));
                setSelectedPokemon(
                  _.find(pokemons, (p) => p.id === Number(ev.target.value))
                );
              }}
            >
              <option value={-1} disabled hidden>
                Choose here
              </option>
              {pokemons.map((pokemon) => (
                <option value={pokemon.id}>{pokemon.name}</option>
              ))}
            </select>
            <PokemonStats
              selectedPokemon={selectedPokemon}
              randomPokemon={randomPokemon}
            />
            <Lifes lifes={gameState.lifes} />
          </section>

          <GuessedPokemon {...selectedPokemon} />
        </>
      )}
    </div>
  );
};

export default Home;
