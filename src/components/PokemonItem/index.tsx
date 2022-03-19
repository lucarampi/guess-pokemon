import trashImg from "../../assets/trash.svg";
import styles from "./styles.module.scss";
import { usePokemons } from "../../Hooks/usePokemons";
import {PokemonInterface} from "../../services/axios";


export function PokemonItem(pokemon: PokemonInterface) {
  const { height,id,imageUrl,name,types,weight} = pokemon;
  const { deletePokemon } = usePokemons();
  function handleDeleteItem(id: number) {
    deletePokemon(id);
  }

  return (
    <tr>
      <td>
        {imageUrl ? (
          <a href={imageUrl}>
          <img width={50+"px"} src={imageUrl} alt={name + "image"} />  
          </a>) : (
            "No image")
          }
      </td>
      <td>{name}</td>
      <td>
        {new Intl.NumberFormat("pt-BR", {
          style: "unit",
          unit: "kilogram",
        }).format(weight/1000)}
      </td>
      <td>
        {new Intl.NumberFormat("pt-BR", {
          style: "unit",
          unit: "meter",
        }).format(height/100)}
      </td>
      <td>{types.type1}</td>
      <td>{types.type2 ? types.type2 : "--" }</td>
      <td>
        <button className={styles.deleteButton} onClick={() => handleDeleteItem(id)}>
          {/* <img src="../../assets/trash.svg" alt="Delete Item" />
           */}
           DELETE
        </button>
      </td>
    </tr>
  );
}
