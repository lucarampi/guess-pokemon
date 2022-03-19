import { PokemonInterface } from "../../services/axios";
import styles from "./styles.module.scss";

interface PokemonProps extends PokemonInterface {}

export function CurrentPokemon(pokemon: PokemonProps) {
  return (
    <div>
          <h2>{pokemon.name}</h2>
          <img
            width={200 + "px"}
            src={pokemon.imageUrl}
            alt={pokemon.name + " image"}
          />
        </div>
  );
}
