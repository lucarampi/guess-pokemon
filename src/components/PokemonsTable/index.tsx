import { useNewPokemonModal } from "../../Hooks/useNewPokemonModal";
import { usePokemons } from "../../Hooks/usePokemons";
import { PokemonItem } from "../PokemonItem";
import styles from "./styles.module.scss";

export function PokemonsTable() {
  const { pokemons } = usePokemons();
  const { handleOpenNewPokemonModal } = useNewPokemonModal();
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { pokemons ? (
            pokemons.map((pokemon) => (
              <PokemonItem key={pokemon.id} {...pokemon} />
            ))
          ) : (
            <tr>
              <td className="warning-empty" colSpan={4}>
                Ops... parece que ainda não tem nada aqui... Cadastre uma{" "}
                <strong onClick={handleOpenNewPokemonModal}>
                  nova transação
                </strong>{console.log(pokemons)}
                e veja o que acontece!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
