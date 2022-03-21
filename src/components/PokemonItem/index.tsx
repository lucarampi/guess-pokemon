import styles from "./styles.module.scss";
import { PokemonInterface } from "../../services/axios";
import { useState } from "react";
import Image from "next/image";
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
      <Image
        width={175}
        height={175}
        layout="fixed"
        src={imageUrl}
        alt={name + " image"}
      />
      <p>
        <strong>{pokemon.name}</strong>
      </p>
    </section>
  );
}
