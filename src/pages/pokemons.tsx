import NewPokemonModal from "../components/NewPokemonModal";
import { PokemonsTable } from "../components/PokemonsTable";
import { useNewPokemonModal } from "../Hooks/useNewPokemonModal";
import styles from "./pokemon.module.scss";
import { MdOutlineLibraryAdd } from "react-icons/md";
interface ManagementStates {
  options: "add" | "remove" | "edit";
}

export default function Management() {
  return (
    <div className={styles.container}>
      <PokemonsTable />
    </div>
  );
}
