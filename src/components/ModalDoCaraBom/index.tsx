import { SyntheticEvent, useState } from "react";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import styles from "./styles.module.scss";

interface ModalDoCaraBomProps {
  active: boolean;

}


export default function ModalDoCaraBom({
  active,
}: ModalDoCaraBomProps) {
  const {handleCloseNewPokemonModal} = useNewPokemonModal()
  
  function handleOutsideClick(ev: SyntheticEvent) {
    ev.target === ev.currentTarget && handleCloseNewPokemonModal();
  }

  return (
    <div
      className={`${styles.modal} ${active && styles.active}`}
      onClick={handleOutsideClick}
    >
      <div className={styles.modal_wrapper}>
        <button className={styles.close_modal} onClick={handleCloseNewPokemonModal}>
          X
        </button>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          odit quibusdam, consequuntur nostrum ipsum corporis dolorem dolorum
          deleniti magnam distinctio. Voluptates, asperiores qui. Commodi
          ratione ducimus veritatis quis reiciendis ea dolore alias rem, officia
          omnis beatae quaerat, asperiores inventore accusantium eveniet, et
          exercitationem praesentium culpa! Voluptatibus natus quam dolor
          fugiat!
        </p>
      </div>
    </div>
  );
}
