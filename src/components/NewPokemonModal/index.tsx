import Modal from "react-modal";
import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import closingImg from "../../assets/close.svg";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";

export function NewPokemonModal() {
  const { handleCloseNewPokemonModal, open } = useNewPokemonModal();
  const { createPokemon } = usePokemons();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  function resetModalForm() {
    setName("");
    setImageUrl("");
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
  // Modal.setAppElement('#yourAppElement');

  return (
    <Modal
      isOpen={open}
      onRequestClose={hadleCreateNewPokemon}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseNewPokemonModal}
        className="react-modal-close"
      >
        <img src={closingImg} alt="Close" />
      </button>

      <form className={styles.container} onSubmit={hadleCreateNewPokemon}>
        <h2>Nova Transação</h2>
        <input
          type="text"
          placeholder="Pokemon's Name"
          name=""
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
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
    </Modal>
  );
}
