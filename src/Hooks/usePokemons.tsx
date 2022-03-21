import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api, PokemonInterface } from "../services/axios";

//--------------------------------------------------------------

interface PokemonsProviderProps {
  children: ReactNode;
}

interface PokemonsContextData {
  pokemons: PokemonInterface[];
  createPokemon: (pokemon: PokemonInterface) => Promise<void>;
  deletePokemon: (id: number) => Promise<void>;
  getPokemons: () => Promise<PokemonInterface[]>;
  editPokemon: (pokemon:PokemonInterface) => Promise<void>;
}

const PokemonsContext = createContext<PokemonsContextData>(
  {} as PokemonsContextData
);

export function PokemonsProvider({ children }: PokemonsProviderProps) {
  const [pokemons, setPokemons] = useState<PokemonInterface[]>([]);
  useEffect(() => {
    getPokemons()     
  }, []);

  //request api to create new Pokemon
  async function createPokemon(pokemonInput: PokemonInterface) {
    const response = await api.post(`pokemons/add`, pokemonInput);
    const updatedPokemons = response.data;
    Promise.all(updatedPokemons)
    setPokemons([...updatedPokemons]);
  }

  async function editPokemon(pokemonInput: PokemonInterface) {
    const response = await api.put(`pokemons/edit`, pokemonInput);
    const updatedPokemons = response.data;
    Promise.all(updatedPokemons)
    setPokemons([...updatedPokemons]);
  }

  //request api to delete a Pokemon by id
  async function deletePokemon(id: number) {
    const response = await api.delete(`/pokemons/${id}`);
    const updatedPokemons = response.data;
    Promise.all(updatedPokemons)
    setPokemons([...updatedPokemons]);
  }

    //request api to get all Pokemons
    async function getPokemons() {
      const response = await api.get(`/pokemons/data`);
      const updatedPokemons = response.data;
      // Promise.all(updatedPokemons)
      setPokemons([...updatedPokemons]);
      return updatedPokemons;
    }
  

  return (
    <PokemonsContext.Provider
      value={{
        pokemons,
        createPokemon,
        deletePokemon,
        getPokemons,
        editPokemon
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}

export function usePokemons() {
  const context = useContext(PokemonsContext);
  if (!context) {
    throw new Error("usePokemons must be used within a PokemonsProvider");
  }
  return context;
}
