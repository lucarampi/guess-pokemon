import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonInterface } from "../../services/axios";
import EditPokemonModal from "../EditPokemonModal";
import { useState } from "react";
import Image from "next/image";

export function PokemonItem(pokemon: PokemonInterface) {
  const { height, id, imageUrl, name, types, weight } = pokemon;
  const [isOpen, setIsOpen] = useState(false)
  const { deletePokemon } = usePokemons();
  function handleDeleteItem(id: number) {
    deletePokemon(id);
  }
  function handleOpenEditPokemonModal(){
    setIsOpen(true)
  }

  return (
   <>
    <EditPokemonModal
    active = {isOpen}
    setIsOpen={setIsOpen}
    pokemon = {pokemon}
    />
    <section
    className={styles.item}
    key={id}>
      <Image width={175} height={175} layout="fixed" src={imageUrl} alt={name + " image"}
    onClick = {handleOpenEditPokemonModal}
    />
    </section>
    </>
  );
}
