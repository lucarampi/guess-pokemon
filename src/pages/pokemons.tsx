import ModalDoCaraBom from "../components/ModalDoCaraBom"
import NewPokemonModal from "../components/NewPokemonModal"
import { PokemonsTable } from "../components/PokemonsTable"
import { useNewPokemonModal } from "../Hooks/useNewPokemonModal"

type Options  = typeof Options
const Options = {

}

interface ManagementStates{
    options: "add" | "remove" | "edit" 
} 

export default function Management (){

    const { handleOpenNewPokemonModal, isOpen } = useNewPokemonModal();
    console.log(isOpen)
    return (
        <div>
             <button onClick={handleOpenNewPokemonModal}>NEW POKEMON</button>
            <NewPokemonModal
            active={isOpen}
            />
            
            <h1>Management</h1>
           <PokemonsTable/>
        </div>

    )
}
