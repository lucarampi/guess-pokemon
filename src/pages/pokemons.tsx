import Head from "next/head";
import EditPokemonModal from "../components/EditPokemonModal";
import PokemonsTable from "../components/PokemonsTable";
import { useEditPokemonModal } from "../Hooks/useEditPokemonModal";

export default function Management() {
  const { handleCloseEditPokemonModal, editingPokemon, isOpen } =
    useEditPokemonModal();
  return (
    <>
      <Head>
        <title>Pokedex</title>
      </Head>
      <div>
        <PokemonsTable />
        {isOpen && (
          <EditPokemonModal active={isOpen} pokemon={editingPokemon} />
        )}
      </div>
    </>
  );
}
