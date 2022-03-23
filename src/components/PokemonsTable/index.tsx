// import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import _ from "lodash";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import { usePokemons } from "../../Hooks/usePokemons";
import LoadingPokeball from "../LoadingPokeball";
import { PokemonItem } from "../PokemonItem";
import styles from "./styles.module.scss";

export default function PokemonsTable() {
  const { pokemons, isLoading } = usePokemons();
  const { handleOpenNewPokemonModal } = useNewPokemonModal();

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingPokeball />
      ) : pokemons.length > 0 ? (
        _.sortBy(pokemons,["name"],["asc"] ).map((pokemon) => <PokemonItem key={pokemon.id} {...pokemon} />)
      ) : (
        <div className={styles.warning_empty}>
          Ops... parece que não tem nada aqui... Cadastre um{" "}
          <strong onClick={handleOpenNewPokemonModal}>novo pokemon</strong> para
          poder jogar
        </div>
      )}
    </div>
  );
}
