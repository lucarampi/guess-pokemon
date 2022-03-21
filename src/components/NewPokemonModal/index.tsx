import { FormEvent, SyntheticEvent, useState } from "react";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import Image from "next/image";

interface ModalDoCaraBomProps {
  active: boolean;
}

export default function NewPokemonModal({ active }: ModalDoCaraBomProps) {
  const { handleCloseNewPokemonModal } = useNewPokemonModal();
  const { createPokemon } = usePokemons();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/128/188/188918.png"
  );
  const [imageUrlAux, setImageUrlAux] = useState(
    "https://cdn-icons-png.flaticon.com/128/188/188918.png"
  );
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  function handleOutsideClick(ev: SyntheticEvent) {
    ev.target === ev.currentTarget && handleCloseNewPokemonModal();
  }

  function resetModalForm() {
    setName("");
    setImageUrl("https://cdn-icons-png.flaticon.com/128/188/188918.png");
    setType1("");
    setType2("");
    setHeight(0);
    setWeight(0);
  }

  async function hadleCreateNewPokemon(event: FormEvent) {
    event.preventDefault();
    await createPokemon({
      name,
      imageUrl,
      height,
      weight,
      types: {
        type1,
        type2,
      },
    });
    resetModalForm();
    handleCloseNewPokemonModal();
  }

  return (
    <div
      className={`${styles.modal} ${active && styles.active}`}
      onClick={handleOutsideClick}
    >
      <div className={styles.modal_wrapper}>
        <button
          type="button"
          onClick={handleCloseNewPokemonModal}
          className={styles.close_modal}
        >
          <Image width={15} height={15} src="/images/close.svg" />
        </button>

        <form className={styles.container} onSubmit={hadleCreateNewPokemon}>
          <img src={imageUrl} alt="New pokemon image" />

          <input
            type="text"
            placeholder="Pokemon's image (URL)"
            name=""
            required
            value={imageUrlAux}
            onChange={(event) => setImageUrlAux(event.target.value)}
            onBlur={() => setImageUrl(imageUrlAux)}
          />
          <input
            type="text"
            placeholder="Pokemon's Name"
            name=""
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <div className={styles.two_items_container}>
            <input
              type="number"
              placeholder="Weight"
              name=""
              required
              step={0.01}
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <input
              type="number"
              placeholder="Height"
              name=""
              required
              step={0.01}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </div>

          <input
            type="text"
            placeholder="Type 1"
            name=""
            required
            value={type1}
            onChange={(event) => setType1(event.target.value)}
          />
          <input
            type="text"
            placeholder="Type 2"
            name=""
            value={type2}
            onChange={(event) => setType2(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
