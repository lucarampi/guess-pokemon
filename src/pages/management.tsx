import { useState } from "react"
import { PokemonsTable } from "../components/PokemonsTable"

type Options  = typeof Options
const Options = {

}

interface ManagementStates{
    options: "add" | "remove" | "edit" 
} 

export default function Management (){
    const [options, setOptions] = useState<Options>()
    return (
        <div>
            <h1>Management</h1>
           <PokemonsTable/>
        </div>

    )
}
