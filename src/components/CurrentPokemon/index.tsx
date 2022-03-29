import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonInterface } from "../../services/axios";
import LoadingPokeball from "../LoadingPokeball";
import styles from "./styles.module.scss";

interface PokemonProps extends PokemonInterface {}


// Random pokemon picked by the game itself
export function CurrentPokemon(pokemon: PokemonProps) {
  const { isLoading } = usePokemons();

  return (
    <div className={styles.container}>
      <h2>Who's this Pokemon?"</h2>
      <div className={styles.pokemonSilhouette}>
        {isLoading ? (
          <LoadingPokeball />
        ) : (
          <img
            className={styles.image}
            src={pokemon.imageUrl}
            alt={pokemon.name + " image"}
          />
        )}
      </div>
    </div>
  );
}
