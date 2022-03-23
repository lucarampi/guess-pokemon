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
  lifes: number;
  start: boolean;
  win: boolean;
  lose: boolean;
}

const Home: NextPage = () => {
  // const [sound] = useState(new Audio("/audios/audio.mp3"));
  const [sound] = useState(
    typeof Audio !== "undefined" && new Audio("/audios/audio.mp3")
  );
  const { pokemons } = usePokemons();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
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
        "/images/pokeball.png",
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
  function handleGameRestart(){
    setGameState({
      lifes: 5,
      start: false,
      win: false,
      lose: false,
    })

    handleGameStart()
  }
  function handleGameStart() {
    setSelectedPokemon(generateDefaultPokemon);
    generateNewRandomPokemon();
    sound.play()
  }

  useEffect(() => {
    if (selectedPokemon?.id === randomPokemon?.id && gameState.start) {
      setGameState({ ...gameState, start: false, win: true });
      setIsResultModalOpen(true);
    }
    if (selectedPokemon?.id !== randomPokemon?.id && gameState.start) {
      if (gameState.lifes - 1 === 0) {
        setGameState({
          ...gameState,
          lifes: 5,
          start: false,
          lose: true,
        });
        setIsResultModalOpen(true);
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
      setIsResultModalOpen(true);
      return;
    }

    if (gameState.win) {
      setIsResultModalOpen(true);
      return;
    }
  }, [gameState]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Head>
            <title>Guess Pokemon</title>
            <link rel="icon" href="/favicon.ico" />
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
                  pokemon={randomPokemon}
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
      </div>
    </>
  );
};

export default Home;
