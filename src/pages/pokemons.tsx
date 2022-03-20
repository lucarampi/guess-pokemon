import { useState } from "react"
import { TRUE } from "sass"
import ModalDoCaraBom from "../components/ModalDoCaraBom"
import { NewPokemonModal } from "../components/NewPokemonModal"
import { PokemonsTable } from "../components/PokemonsTable"
import { useNewPokemonModal } from "../Hooks/useNewPokemonModal"

type Options  = typeof Options
const Options = {

}

interface ManagementStates{
    options: "add" | "remove" | "edit" 
} 

export default function Management (){
    const [show, setShow] = useState(false)

    const { handleOpenNewPokemonModal } = useNewPokemonModal();
    return (
        <div>
             <button onClick={()=>setShow(true)}>NEW POKEMON</button>
            <ModalDoCaraBom 
            active={show}
            setActive={setShow}
            />
            <h1>Management</h1>
           <PokemonsTable/>
        </div>

    )
}
