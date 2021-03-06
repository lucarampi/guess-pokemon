import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonInterface } from "../../services/axios";
import LoadingPokeball from "../LoadingPokeball";
import styles from "./styles.module.scss";
interface PokemonProps extends PokemonInterface {}

// Recieves data from father to render the pokemon 
// selected by the player during the game
export function GuessedPokemon(pokemon: PokemonProps) {
  const { isLoading } = usePokemons();

  return (
    <div className={styles.container}>
      <h2>{pokemon.name}</h2>

      {isLoading ? (
        <LoadingPokeball />
      ) : (
        <img src={pokemon.imageUrl} alt={pokemon.name + "image"} />
      )}

      <img />
    </div>
  );
}
