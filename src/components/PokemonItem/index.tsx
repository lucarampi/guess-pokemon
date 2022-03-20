import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonInterface } from "../../services/axios";
import EditPokemonModal from "../EditPokemonModal";
import { useState } from "react";

export function PokemonItem(pokemon: PokemonInterface) {
  const { height, id, imageUrl, name, types, weight } = pokemon;
  const [isOpen, setIsOpen] = useState(false)
  const { deletePokemon } = usePokemons();
  function handleDeleteItem(id: number) {
    deletePokemon(id);
  }
  function handleOpenEditPokemonModal(){
    setIsOpen(true)
  }

  return (
    <section>
      <EditPokemonModal
      active = {isOpen}
      setIsOpen={setIsOpen}
      pokemon = {pokemon}
      />
      <img width={150} src={imageUrl} alt={name + "image"}
    onClick = {handleOpenEditPokemonModal}
    />
    </section>
    // <tr className={styles.table_row}>
    //   <td>
       
    //   </td>
    //   <td>{name}</td>
    //   <td>
    //     {new Intl.NumberFormat("pt-BR", {
    //       style: "unit",
    //       unit: "kilogram",
    //     }).format(weight / 1000)}
    //   </td>
    //   <td>
    //     {new Intl.NumberFormat("pt-BR", {
    //       style: "unit",
    //       unit: "meter",
    //     }).format(height / 100)}
    //   </td>
    //   <td>{types.type1}</td>
    //   <td>{types.type2 ? types.type2 : "--"}</td>
    //   <td>
    //     <button
    //       className={styles.deleteButton}
    //       onClick={() => handleDeleteItem(id)}
    //     >
    //       {/* <img src="../../assets/trash.svg" alt="Delete Item" />
    //        */}
    //       DELETE
    //     </button>
    //   </td>
    // </tr>
  );
}
