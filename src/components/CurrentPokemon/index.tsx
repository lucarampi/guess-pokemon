import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";


interface PokemonProps extends PokemonInterface {}

export function CurrentPokemon(pokemon: PokemonProps) {
  return (
    <div className={styles.container}>
      <h2>Who's this Pokemon?"</h2>
      <div className={styles.pokemonSilhouette}>
        
        <img
        className={styles.image}
        src={pokemon.imageUrl}
        alt={pokemon.name + " image"} />

      </div>
    </div>
  );
}
