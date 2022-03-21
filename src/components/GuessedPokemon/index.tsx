import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";
interface PokemonProps extends PokemonInterface {}

export function GuessedPokemon(pokemon: PokemonProps) {
  return (
    <div className={styles.container}>
      <h2>{pokemon.name}</h2>
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name + "image"}
      />
      <img />
    </div>
  );
}
