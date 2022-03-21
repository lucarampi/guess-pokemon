import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import NewPokemonModal from "../NewPokemonModal";
import styles from "./styles.module.scss";

export function Header() {
  const [activeMenu, setActiveMenu] = useState(false);

  const { handleOpenNewPokemonModal, isOpen } = useNewPokemonModal();

  const router = useRouter();

  return (
    <>
      <header className={styles.header_container}>
        <div
          className={`${styles.header_wrapper} ${
            !activeMenu && styles.not_active
          }`}
        >
         <div
         className={styles.image}>
         <Image
            width={200}
            height={110}
            
            layout="fixed"
            src="/images/logo.png"
            alt="Logo do site"
          />
         </div>
          <nav className={styles.header_wrapper_nav}>
            <a className={router.pathname == "/" ? styles.active : ""} href="/">
              Home
            </a>

            <a
              className={router.pathname == "/pokemons" ? styles.active : ""}
              href="/pokemons"
            >
              Pokemons
            </a>

            <button
              className={styles.button_add}
              onClick={handleOpenNewPokemonModal}
            >
              <MdOutlineLibraryAdd />
            </button>

          </nav>
            <button
              className={`${styles.mobile_button} ${
                activeMenu && styles.mobile_button_active
              }`}
              onClick={() => setActiveMenu((oldsState) => !oldsState)}
            ></button>
        </div>
      </header>

      <NewPokemonModal active={isOpen} />
    </>
  );
}
