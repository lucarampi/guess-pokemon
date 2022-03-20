import { FormEvent, SyntheticEvent, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { PokemonInterface } from "../../services/axios";
import { usePokemons } from "../../Hooks/usePokemons";

interface ModalDoCaraBomProps {
  active: boolean;
  pokemon: PokemonInterface;
  setIsOpen: (value: boolean) => void;
}

export default function NewPokemonModal({
  active,
  setIsOpen,
  pokemon,
}: ModalDoCaraBomProps) {
  //========== handle modal state ==========
  function handleCloseEditPokemonModal() {
    setIsOpen(false);
  }
  //========================================

  const { editPokemon, deletePokemon } = usePokemons();
  const [id, setId] = useState(pokemon.id);
  const [name, setName] = useState(pokemon.name);
  const [imageUrl, setImageUrl] = useState(pokemon.imageUrl);
  const [imageUrlAux, setImageUrlAux] = useState(pokemon.imageUrl);
  const [type1, setType1] = useState(pokemon.types.type1);
  const [type2, setType2] = useState(pokemon.types.type2);
  const [height, setHeight] = useState(pokemon.height);
  const [weight, setWeight] = useState(pokemon.weight);

  function handleOutsideClick(ev: SyntheticEvent) {
    ev.target === ev.currentTarget && handleCloseEditPokemonModal();
  }
  async function handleCreateNewPokemon(event: any) {
    event.preventDefault();
    const editedPokemon: PokemonInterface = {
      imageUrl,
      height,
      name,
      weight,
      id,
      types: {
        type1,
        type2,
      }
    };
    editPokemon(editedPokemon)
    handleCloseEditPokemonModal();
  }
  async function handleDeletePokemon(id:number){
    deletePokemon(id)
  }

  return (
    <div
      className={`${styles.modal} ${active && styles.active}`}
      onClick={handleOutsideClick}
    >
      <div className={styles.modal_wrapper}>
        <button
          type="button"
          onClick={handleCloseEditPokemonModal}
          className={styles.close_modal}
        >
          <Image width={15} height={15} src="/images/close.svg" />
        </button>
        <form className={styles.container} onSubmit={handleCreateNewPokemon}>
          <img src={imageUrl} alt="New pokemon image" />
          <input
            type="text"
            placeholder="Pokemon's image (URL)"
            name="_imageUrl"
            required
            value={imageUrl}
            onChange={(event) => setImageUrlAux(event.target.value)}
            onBlur={() => setImageUrl(imageUrlAux)}
          />
          <input
            type="text"
            placeholder="Pokemon's Name"
            name="_name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div className={styles.two_items_container}>
            <input
              type="number"
              placeholder="Weight"
              name="_weight"
              required
              min={0}
              step={0.01}
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <input
              type="number"
              placeholder="Height"
              name="_height"
              required
              min={0}
              step={0.01}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </div>

          <input
            type="text"
            placeholder="Type 1"
            name="_type1"
            required
            value={type1}
            onChange={(event) => setType1(event.target.value)}
          />
          <input
            type="text"
            placeholder="Type 2"
            name="_type2"
            value={type2}
            onChange={(event) => setType2(event.target.value)}
          />

          <button 
          type="button"
          className={styles.deleteButton}
          onClick = {()=>handleDeletePokemon(id)}
          >
            <img src="/images/trash.svg" alt="Delete this Pokemon" />
          </button>
          <button type="submit">Salvar mudanças</button>
        </form>
      </div>
    </div>
  );
}
