import { KeyboardEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { PokemonInterface } from "../../services/axios";

interface ResultModalProps {
  result: boolean;
  pokemon: PokemonInterface;
  setIsResultModalOpen: (arg0: boolean) => void;
  handleGameRestart: () => void;
}

// Modal that shows the game result (win/lose) 
export default function ResultModal({
  result,
  pokemon,
  setIsResultModalOpen,
  handleGameRestart
}: ResultModalProps) {
  function handleCloseResultModal() {
    setIsResultModalOpen(false);
  }

  function handleOutsideClick(ev: SyntheticEvent) {
    ev.target === ev.currentTarget && handleCloseResultModal();
  }

  function handleCloseOnKeyDowPress(ev: KeyboardEvent<HTMLDivElement>) {
    if (ev.key.toLocaleLowerCase() === "escape" || "space") {
      handleCloseResultModal();
    }
  }

  return (
    <div
      className={`${styles.modal}`}
      onClick={handleOutsideClick}
      onKeyDown={handleCloseOnKeyDowPress}
      tabIndex={0}
    >
      <div className={styles.modal_wrapper}>
        <button
          type="button"
          onClick={handleCloseResultModal}
          className={styles.close_modal}
        >
          <Image width={15} height={15} src="/images/close.svg" />
        </button>

        {result ? (
          <div className={styles.game_win}>
            <h1>Parabéns!</h1>
            <h3>Você capturou um <span>{pokemon.name}</span>!</h3>
          </div>
        ) : (
          <div className={styles.game_lose}>
            <h1>Essa não...</h1>
            <h3><span>{pokemon.name}</span> escapou!</h3>
          </div>
        )}

        <div className={styles.container}>
          <img src={pokemon.imageUrl} alt="Pokemon image" />
        </div>
        <button
        className={styles.try_again_button}
        onClick={()=>{
          handleGameRestart()
          handleCloseResultModal}
        }
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
