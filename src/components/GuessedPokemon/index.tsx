import Image from "next/image";
import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";
interface PokemonProps extends PokemonInterface {}

export function GuessedPokemon(pokemon: PokemonProps) {
  return (
    <div className={styles.container}>
      <Image
        width={200}
        height={200}
        src={pokemon.imageUrl}
        alt={pokemon.name + "image"}
      />
      <h2>{pokemon.name}</h2>
      <img />
    </div>
  );
}
