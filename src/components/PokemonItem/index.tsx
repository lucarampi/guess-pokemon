import styles from "./styles.module.scss";
import { PokemonInterface } from "../../services/axios";
import { useEditPokemonModal } from "../../Hooks/useEditPokemonModal";

export function PokemonItem(pokemon: PokemonInterface) {
  const { id, imageUrl, name } = pokemon;
  const { handleOpenEditPokemonModal, setEditingPokemon } =
    useEditPokemonModal();

  return (
    <section
      className={styles.container}
      key={id}
      onClick={() => {
        setEditingPokemon(pokemon);
        handleOpenEditPokemonModal();
      }}
    >
      <img className={styles.image}

        src={imageUrl}
        alt={name + " image"}
      />
      <p>
        <strong>{pokemon.name}</strong>
      </p>
    </section>
  );
}
