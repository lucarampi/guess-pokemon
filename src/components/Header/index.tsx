import Image from "next/image";
import { useRouter } from "next/router";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import NewPokemonModal from "../NewPokemonModal";
import styles from "./styles.module.scss";

export function Header() {
  const { handleOpenNewPokemonModal, isOpen } = useNewPokemonModal();
  const router = useRouter();
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Image
            width={100}
            height={55}
            className={styles.image}
            layout="fixed"
            src="/images/logo.png"
            alt="Logo do site"
          />
          <nav>
            <a className={router.pathname == "/" ? styles.active : ""} href="/">
              Home
            </a>
            <a
              className={router.pathname == "/pokemons" ? styles.active : ""}
              href="/pokemons"
            >
              Pokemons
            </a>
          </nav>
          <button
            className={styles.add_button}
            onClick={handleOpenNewPokemonModal}
          >
            <MdOutlineLibraryAdd />
          </button>
        </div>
      </header>
      <NewPokemonModal active={isOpen} />
    </>
  );
}
