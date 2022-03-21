import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";
import Image from "next/image";

interface PokemonProps extends PokemonInterface {}

export function CurrentPokemon(pokemon: PokemonProps) {
  return (
    <div className={styles.container}>
      <h2>Who's this Pokemon?"</h2>

      {/* <div className={styles.pokemonDisplay}>
        <img
          className={styles.pokemonBackground}
          width={200 + "px"}
          src={"https://images3.alphacoders.com/677/677583.png"}
          alt={"Backgound image"}
        />
      </div> */}
      <div className={styles.pokemonSilhouette}>
        <Image width={200} height={200} layout="responsive" className={styles.image} src={pokemon.imageUrl} alt={pokemon.name + " image"} />
      </div>
    </div>
  );
}
