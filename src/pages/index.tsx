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
  const [sound,setSound] = useState<HTMLAudioElement>();
  const { pokemons } = usePokemons();
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [randomPokemon, setRandomPokemon] = useState<PokemonInterface>();
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonInterface>();
  const [selectedId, setSelectedId] = useState(0);
  const [gameState, setGameState] = useState<gameState>({
    lifes: 5,
    start: false,
    win: false,
    lose: false,
  });
  function generateDefaultPokemon(): PokemonInterface {
    return {
      id: -1,
      name: "Select Pokemon",
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
    setSelectedId(selectedPokemon?.id!)
    generateNewRandomPokemon();
    sound!.volume=0.5;
    sound!.play()
  }
  useEffect(()=>{
    setSound(new Audio("/audios/audio.mp3"))
    setRandomPokemon(_.sample(pokemons) as PokemonInterface)
    setSelectedPokemon(generateDefaultPokemon)
    

  },[])
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
