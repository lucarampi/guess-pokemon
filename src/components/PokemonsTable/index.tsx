// import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonItem } from "../PokemonItem";
import styles from "./styles.module.scss";

export default function PokemonsTable() {
  const { pokemons } = usePokemons();
  const { handleOpenNewPokemonModal } = useNewPokemonModal();
  
  return (
    <div className={styles.container}>
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => <PokemonItem key={pokemon.id} {...pokemon} />)
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
