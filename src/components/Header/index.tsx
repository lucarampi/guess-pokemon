import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import NewPokemonModal from "../NewPokemonModal";
import styles from "./styles.module.scss";
import useWindowDimensions from "../../Hooks/useWindowDimensions";
import Link from "next/link";


// Responsive header. It's above everything.
export function Header() {
  const [activeMenu, setActiveMenu] = useState(true);

  const { handleOpenNewPokemonModal, isOpen } = useNewPokemonModal();

  const { height, width } = useWindowDimensions();
  
  useEffect(() => {
    setActiveMenu(() => (width! >= 600 ? true : false));
  }, [width]);
  
  const router = useRouter();

  return (
    <>
      <header className={styles.wrapper}>
        <div
          className={`${styles.container} ${!activeMenu && styles.not_active}`}
        >
          <div className={styles.logoImage}>
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Logo do site"
                onClick={() => {
                 router.pathname=="/" ? router.reload() : router.push("/") ;
                }}
              />
            </Link>
          </div>
          <nav className={styles.header_wrapper_nav}>
            <Link href="/">
              <a className={router.pathname == "/" ? styles.active : ""}>
                Home
              </a>
            </Link>

            <Link href="/pokemons">
              <a
                className={router.pathname == "/pokemons" ? styles.active : ""}
              >
                Pokemons
              </a>
            </Link>

            <button
              className={styles.button_add}
              onClick={handleOpenNewPokemonModal}
            >
              <MdOutlineLibraryAdd   />
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
