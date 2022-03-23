import { KeyboardEvent, SyntheticEvent, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { PokemonInterface } from "../../services/axios";
import { usePokemons } from "../../Hooks/usePokemons";
import { useEditPokemonModal } from "../../Hooks/useEditPokemonModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/128/188/188918.png";

interface ModalDoCaraBomProps {
  active: boolean;
  pokemon: PokemonInterface;
}

export default function EditPokemonModal({
  active,
  pokemon,
}: ModalDoCaraBomProps) {
  const { handleCloseEditPokemonModal, handleResetEditPokemonModal } =
    useEditPokemonModal();

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
  async function handleEditNewPokemon(event: any) {
    event.preventDefault();
    const editedPokemon: PokemonInterface = {
      imageUrl: imageUrlAux,
      height,
      name: name.toLowerCase(),
      weight,
      id,
      types: {
        type1: type1 ? type1.toLowerCase() : "",
        type2: type2 ? type2.toLowerCase() : "",
      },
    };
    editPokemon(editedPokemon);
    handleCloseEditPokemonModal();
  }
  async function handleDeletePokemon(id: number) {
    deletePokemon(id);
    handleCloseEditPokemonModal();
    handleResetEditPokemonModal();
  }
  function handleErrorOnImageUrl() {
    toast.warn("Imagem inválida! Substituída pela imagem anterior", {
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
  function handleCloseOnKeyDowPress(ev: KeyboardEvent<HTMLDivElement>) {
    if (ev.key.toLocaleLowerCase() === "escape") {
      handleCloseEditPokemonModal();
    }
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
          onClick={handleCloseEditPokemonModal}
          className={styles.close_modal}
        >
          <Image width={15} height={15} src="/images/close.svg" />
        </button>

        <form className={styles.container} onSubmit={handleEditNewPokemon}>
          <img
            src={imageUrlAux}
            alt="New pokemon image"
            onError={handleErrorOnImageUrl}
          />
          <label className={styles.tip} htmlFor="_height">
            * Cole o link (URL) no campo a baixo
          </label>
          <input
            type="text"
            placeholder="Link imagem Pokemon (URL)"
            name="_imageUrl"
            required
            value={imageUrlAux}
            onChange={(event) => setImageUrlAux(event.target.value)}
          />
          <label className={styles.tip} htmlFor="_height">
            * Nome
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
            <label className={styles.tip} htmlFor="_weight">
              * Peso (gramas)
            </label>
            <label className={styles.tip} htmlFor="_height">
              * Altura (centimetros)
            </label>
            <input
              className={styles.capitalize}
              type="number"
              placeholder="Peso"
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
              placeholder="Altura"
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
              * Tipo 1
            </label>
            <label className={styles.tip} htmlFor="_height">
              * Tipo 2
            </label>
            <input
              className={styles.capitalize}
              type="text"
              placeholder="Tipo 1"
              name="_type1"
              required
              value={type1}
              onChange={(event) => setType1(event.target.value)}
            />

            <input
              className={styles.capitalize}
              type="text"
              placeholder="Tipo 2"
              name="_type2"
              value={type2}
              onChange={(event) => setType2(event.target.value)}
            />
          </div>
          <div className={styles.buttons_container}>
            <button
              type="button"
              className={styles.delete_button}
              onClick={() => handleDeletePokemon(id!)}
            >
              {/* <img src="/images/trash.svg" alt="Delete this Pokemon" /> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M115.6 64L143.8 18.8C151.1 7.105 163.9 0 177.7 0H270.3C284.1 0 296.9 7.105 304.2 18.8L332.4 64H440C444.4 64 448 67.58 448 72C448 76.42 444.4 80 440 80H8C3.582 80 0 76.42 0 72C0 67.58 3.582 64 8 64H115.6zM134.4 64H313.6L290.6 27.28C286.2 20.26 278.5 16 270.3 16H177.7C169.5 16 161.8 20.26 157.4 27.28L134.4 64zM40 112C44.42 112 48 115.6 48 120V440C48 470.9 73.07 496 104 496H344C374.9 496 400 470.9 400 440V120C400 115.6 403.6 112 408 112C412.4 112 416 115.6 416 120V440C416 479.8 383.8 512 344 512H104C64.24 512 32 479.8 32 440V120C32 115.6 35.58 112 40 112zM136 416C136 420.4 132.4 424 128 424C123.6 424 120 420.4 120 416V160C120 155.6 123.6 152 128 152C132.4 152 136 155.6 136 160V416zM232 416C232 420.4 228.4 424 224 424C219.6 424 216 420.4 216 416V160C216 155.6 219.6 152 224 152C228.4 152 232 155.6 232 160V416zM328 416C328 420.4 324.4 424 320 424C315.6 424 312 420.4 312 416V160C312 155.6 315.6 152 320 152C324.4 152 328 155.6 328 160V416z" />
              </svg>
            </button>

            <button className={styles.submit_button} type="submit">
              Salvar mudanças
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
