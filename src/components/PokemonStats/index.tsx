import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";
import { compreValuesLeftToRight } from "../../services/functions";
import { Lifes } from "../Lifes";

interface PokemonStatsProps {
  selectedPokemon: PokemonInterface;
  randomPokemon: PokemonInterface;
  lifes: number;
}

export function PokemonStats(pokemons: PokemonStatsProps) {
  const { selectedPokemon, randomPokemon, lifes } = pokemons;

  return (
    <section className={styles.stats}>
      <h3>Pokemon Difference Stats:</h3>
      <div className={styles.stats_wrapper}>
      <p>
        Type 1:{" "}
        {selectedPokemon?.types.type1 == randomPokemon?.types.type1
          ? "Right!"
          : "Wrong..."}
      </p>
      <p>
        Type 2:{" "}
        {selectedPokemon?.types.type2 == randomPokemon?.types.type2
          ? "Right!"
          : "Wrong..."}
      </p>
      <p>
        Height:{" "}
        {compreValuesLeftToRight(
          randomPokemon?.height,
          selectedPokemon?.height
        )}
      </p>
      <p>
        Weight:{" "}
        {compreValuesLeftToRight(
          randomPokemon?.weight,
          selectedPokemon?.weight
        )}
      </p>
      </div>

      <Lifes lifes={lifes} />
      
    </section>
  );
}
