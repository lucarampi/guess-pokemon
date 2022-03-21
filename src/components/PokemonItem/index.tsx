import styles from "./styles.module.scss";
import { PokemonInterface } from "../../services/axios";
import { useState } from "react";
import Image from "next/image";
import { useEditPokemonModal } from "../../Hooks/useEditPokemonModal";

export function PokemonItem(pokemon: PokemonInterface) {
  const { height, id, imageUrl, name, types, weight } = pokemon;
  const [isOpen, setIsOpen] = useState(false);
  const {handleOpenEditPokemonModal, setEditingPokemon} = useEditPokemonModal()
  setEditingPokemon(pokemon)

  return (
    <section className={styles.container} key={id}>
      <Image
        width={175}
        height={175}
        layout="fixed"
        src={imageUrl}
        alt={name + " image"}
        onClick={handleOpenEditPokemonModal}
      />
      <p>
        <strong>{pokemon.name}</strong>
      </p>
    </section>
  );
}
