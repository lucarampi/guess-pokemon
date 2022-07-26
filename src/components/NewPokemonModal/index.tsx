import { FormEvent, KeyboardEvent, SyntheticEvent, useState } from "react";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import Image from "next/image";
import { toast } from "react-toastify";

interface ModalDoCaraBomProps {
  active: boolean;
}

// Modal responsable for creating a new pokémon
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
      imageUrl: imageUrlAux,
      height,
      name: name.toLowerCase(),
      weight,
      types: {
        type1: type1 ? type1.toLowerCase() : "",
        type2: type2 ? type2.toLowerCase() : "",
      },
    });
    resetModalForm();
    handleCloseNewPokemonModal();
  }
  function handleCloseOnKeyDowPress(ev: KeyboardEvent<HTMLDivElement>) {
    if (ev.key.toLocaleLowerCase() === "escape") {
      handleCloseNewPokemonModal();
    }
  }

  function handleErrorOnImageUrl() {
    toast.warn("Invalid image! Changed back to a default one...", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setImageUrlAux(imageUrl);
  }

  return (
    <div
      className={`${styles.modal} ${active && styles.active}`}
      onClick={handleOutsideClick}
      onKeyDown={handleCloseOnKeyDowPress}
      tabIndex={0}
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
          <img
            src={imageUrlAux}
            alt="New pokemon image"
            onError={handleErrorOnImageUrl}
          />
          <label className={styles.tip} htmlFor="_height">
            * Paste the image link (URL) below.
          </label>
          <input
            type="text"
            placeholder="Image link (URL) here"
            name="_imageUrl"
            required
            value={imageUrlAux}
            onChange={(event) => setImageUrlAux(event.target.value)}
          />
          <label className={styles.tip} htmlFor="_height">
            * Name
          </label>
          <input
            className={styles.capitalize}
            type="text"
            placeholder="Pokemon's Name"
            name="_name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <div className={styles.two_items_container}>
            <label className={styles.tip} htmlFor="_height">
              * Weight (grams)
            </label>
            <label className={styles.tip} htmlFor="_height">
              * Height (centimeters)
            </label>
            <input
              className={styles.capitalize}
              type="number"
              placeholder="420"
              name="_weight"
              required
              min={0}
              step={1}
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <input
              className={styles.capitalize}
              type="number"
              placeholder="69"
              name="_height"
              required
              min={0}
              step={1}
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </div>
          <div className={styles.two_items_container}>
            <label className={styles.tip} htmlFor="_height">
              * Type 1
            </label>
            <label className={styles.tip} htmlFor="_height">
              * Type 2
            </label>
            <input
              className={styles.capitalize}
              type="text"
              placeholder="Grass"
              name="_type1"
              required
              value={type1}
              onChange={(event) => setType1(event.target.value)}
            />

            <input
              className={styles.capitalize}
              type="text"
              placeholder="Fire"
              name="_type2"
              value={type2}
              onChange={(event) => setType2(event.target.value)}
            />
          </div>
          <button type="submit">Register!</button>
        </form>
      </div>
    </div>
 
  );
}
