// import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import _ from "lodash";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import { usePokemons } from "../../Hooks/usePokemons";
import LoadingPokeball from "../LoadingPokeball";
import { PokemonItem } from "../PokemonItem";
import styles from "./styles.module.scss";

//Render every pokemon (PokemonItem)
export default function PokemonsTable() {
  const { pokemons, isLoading } = usePokemons();
  const { handleOpenNewPokemonModal } = useNewPokemonModal();

  return (
    <div className={styles.container}>
      {/* 
      Wait Pokémons load from database request
      */}
      {isLoading ? (
        //If there is not finished loading, then show spinning pokeball
        <LoadingPokeball />
      ) : pokemons.length > 0 ? (
        //Once the pokemons are loaded, if there is any pokemon, render it
        pokemons.map((pokemon) => <PokemonItem key={pokemon.id} {...pokemon} />)
      ) : (
        //If there is no pokemon on database, the ask user to add one
        <div className={styles.warning_empty}>
          Hmm... looks like all pokemons ran away...!{" "}
          <strong onClick={handleOpenNewPokemonModal}>
            Create a new pokemon
          </strong>{" "}
          to play the game.
        </div>
      )}
    </div>
  );
}
