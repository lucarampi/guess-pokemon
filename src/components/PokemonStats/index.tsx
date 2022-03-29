import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";
import { compareValuesLeftToRight, compareTypes } from "../../services/functions";
import { Lives } from "../Lives";

interface PokemonStatsProps {
  selectedPokemon: PokemonInterface;
  randomPokemon: PokemonInterface;
  lives: number;
}

//render stats dashboard where pokemons (random and selected) are compared
export function PokemonStats(pokemons: PokemonStatsProps) {
  const { selectedPokemon, randomPokemon, lives } = pokemons;

  return (
    <section className={styles.stats}>
      <h3>Pokemon Difference Stats:</h3>
      <div className={styles.stats_wrapper}>
      <p>
        Type 1:{" "}
       
        { compareTypes(selectedPokemon?.types.type1,randomPokemon?.types.type1)}
      </p>
      <p>
        Type 2:{" "}
        { compareTypes(selectedPokemon?.types.type2,randomPokemon?.types.type2)}
      </p>
      <p>
        Height:{" "}
        {compareValuesLeftToRight(
          randomPokemon?.height,
          selectedPokemon?.height
        )}
      </p>
      <p>
        Weight:{" "}
        {compareValuesLeftToRight(
          randomPokemon?.weight,
          selectedPokemon?.weight
        )}
      </p>
      </div>

      <Lives lives={lives} />
      
    </section>
  );
}
