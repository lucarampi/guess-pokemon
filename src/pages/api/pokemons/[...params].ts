// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pokemonAPI, pokemonData } from '../../../services/axios'
import { supabase } from '../../../services/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PokemonInterface } from '../../../services/axios'

const POKEMON_COUNT = 10;
const ENABLE_DATABASE_UPDATE = false;

interface PokeapiInterface {
  results: Array<PokeapiUrlInterface>
}

interface PokeapiUrlInterface {
  url: string
}

interface PokeapiPokemomInterface {
  id: number
  name: string
  height: number
  weight: number
  types: Array<{
    type: {
      name: string
    }
  }>
  sprites: {
    other: {
      'official-artwork': {
        front_default: string
      }
    }
  }
};

async function getPokemonsUrlFromExternalApi() {
  const urls = await pokemonAPI
    .get<PokeapiInterface>(`?limit=${POKEMON_COUNT}`)
    .then((response) => {
      const data = response.data.results
      const urlObjectArray: PokeapiUrlInterface[] = Object.assign(data.map((pokemon) => {
        return { url: pokemon.url }
      })
      )
      return urlObjectArray
    })
  return Promise.all(urls)
}

async function getFromattedPokemonsFromExternalApi(url: PokeapiUrlInterface[]) {
  const pokemomArray = url.map(async (pokemonUrl) => {
    const pokemon = await pokemonData
      .get<PokeapiPokemomInterface>(pokemonUrl.url)
      .then((response) => {
        const data = response.data
        const types = data.types.map((type) => {
          return type.type.name
        })
        const pokemonFormated: PokemonInterface = {
          id: data.id,
          name: data.name,
          height: (data.height * 10), //convert decimeter to cm
          weight: (data.weight * 100), //convert hetogram to gram
          types: {
            type1: types[0],
            type2: types[1]
          },
          imageUrl: data.sprites.other['official-artwork']?.front_default,
        }
        return pokemonFormated
      })
    return pokemon
  })
  return Promise.all(pokemomArray)
}

const registerPokemon = async (newPokemom: PokemonInterface) => {
  console.log("Inserting data...");
  console.log(newPokemom);
  await supabase.from("pokemons").insert([newPokemom]);
}

const updatePokemonDatabase = async () => {
  console.log("Starting update...");
  const urlArray = await getPokemonsUrlFromExternalApi()
  const pokemons = await getFromattedPokemonsFromExternalApi(urlArray)
  console.log(pokemons);
  console.log("--Cleaning database...");
  try {
    await supabase
      .from('pokemons')
      .delete()
      .filter("id", "gt", 0)
      .then(async () => {
        console.log("--Inserting updated data...");
        const { error } = await supabase.from("pokemons").insert([...pokemons]);
        if (error) {
          throw error;
        }
        else {
          console.log("Update completed!");
        }
      }
      )
  }
  catch (error) {
    console.log(error);
  }

}

const getAllPokemons = async () => {
  const { data, error } = await supabase
    .from("pokemons")
    .select("*")

  return data as PokemonInterface[]
}

const getRows = async () => {
  const { data } = await supabase
    .rpc('length')
  if (data) {
    return Number(data)
  }
  else {
    return -1
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  console.log(req.method)
  if (req.method === 'GET') {
    console.log("Checking database...");
    if (await getRows() != POKEMON_COUNT && ENABLE_DATABASE_UPDATE) {
      console.log("Database needs to be updated...");
      await updatePokemonDatabase()
    }
    else {
      console.log("Database is up to date...");
    }
    
    res.status(200).json(await getAllPokemons())
  }
  else if (req.method === 'POST') {
    const { id, height, name, types, weight, imageUrl } = req.body
    const newPokemon = { id, height, name, types, weight, imageUrl }
    await registerPokemon(newPokemon)
    res.status(200).json(await getAllPokemons())
  }
  else if (req.method === 'PUT') {
    
    const { id, height, name, types, weight, imageUrl } = req.body
    const newPokemon: PokemonInterface = { id, height, name, types, weight, imageUrl }
    await supabase.from("pokemons")
      .update(newPokemon)
      .match({ id: newPokemon.id });
    res.status(200).json(await getAllPokemons())
  }
  else if (req.method === 'DELETE') {
    const params = req.query.params
    const id = params[0]
    console.log(id)
    await supabase.from("pokemons")
      .delete()
      .filter("id", "eq", id)
    res.status(200).json(await getAllPokemons())
  }
  else {
    res.status(404).json({ error: 'Not found' })
  }
}
