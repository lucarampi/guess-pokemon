import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";

interface PokemonProps extends PokemonInterface {}

export function CurrentPokemon(pokemon: PokemonProps) {
  return (
    <div className={styles.container}>
      <h2>{pokemon.name}</h2>

      {/* <div className={styles.pokemonDisplay}>
        <img
          className={styles.pokemonBackground}
          width={200 + "px"}
          src={"https://images3.alphacoders.com/677/677583.png"}
          alt={"Backgound image"}
        />
      </div> */}
        <img
          className={styles.pokemonSilhouette}
          width={200 + "px"}
          src={pokemon.imageUrl}
          alt={pokemon.name + " image"}
        />
    </div>
  );
}
