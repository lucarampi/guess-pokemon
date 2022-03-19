import type { NextPage } from "next";
import _ from "lodash";
import Head from "next/head";
import styles from "./home.module.scss";
import { api, PokemonInterface } from "../services/axios";
import { useEffect, useState } from "react";
import { GuessedPokemon } from "../components/GuessedPokemon";
import { PokemonStats } from "../components/PokemonStats";
import { CurrentPokemon } from "../components/CurrentPokemon";
import { Lifes } from "../components/Lifes";

interface gameState {
  lifes: number;
  start: boolean;
  win: boolean;
  lose: boolean;
}

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);
  const [randomPokemon, setRandomPokemon] = useState<PokemonInterface>();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface>();
  const [selectedId, setSelectedId] = useState(1);
  const [gameState, setGameState] = useState<gameState>({
    lifes: 5,
    start: false,
    win: false,
    lose: false,
  });

  function generateNewRandomPokemon() {
    setRandomPokemon(_.sample(pokemons));
    setGameState({ ...gameState, start: true, lose: false, win: false });
  }

  const getPokemons = async () => {
    return await api.get<PokemonInterface[]>("/pokemons");
  };

  useEffect(() => {
    const updatePokemons = async () => {
      await getPokemons().then((response) => {
        setPokemons(response.data);
      });
    };
    updatePokemons();
  }, []);

  useEffect(() => {
    if (
      selectedPokemon?.id === randomPokemon?.id &&
      selectedPokemon?.id !== undefined
    ) {
      setGameState({ ...gameState,start:false ,win: true });
    }
    if (
      selectedPokemon?.id !== randomPokemon?.id &&
      selectedPokemon?.id !== undefined
    ) {
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
              setSelectedPokemon(pokemons[0]);
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
          <section key={randomPokemon.name} className={styles.gameInterface}>
            <h2>Choose a pokemon:</h2>
            <select
              value={selectedId}
              name="pokemonSelect"
              onChange={(ev) => {
                setSelectedId(parseInt(ev.target.value, 10));
                setSelectedPokemon(
                  _.find(pokemons, (p) => p.id === Number(ev.target.value))
                );
              }}
            >
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
