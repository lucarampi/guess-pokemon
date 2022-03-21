// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pokemonAPI } from '../../../services/axios'
import { supabase } from '../../../services/supabase'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PokemonInterface } from '../../../services/axios'

const POKEMON_COUNT = 151;
const ENABLE_DATABASE_UPDATE = true;

interface PokeapiInterface {
  results: Array<PokeapiUrlInterface>
}

interface PokeapiUrlInterface {
  url: string
}

interface PokeapiPokemomInterface {
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

type PokemonNoId = Omit<PokemonInterface, "id">;

function getPokemonList() {
  return `/pokemon/?limit=${POKEMON_COUNT}`
}
function getPokemonById({ url }: PokeapiUrlInterface) {
  const id = url.split("pokemon/")[1]
  return `pokemon/${id}`
}

async function getPokemonsUrlFromExternalApi() {
  const urls = await pokemonAPI
    .get<PokeapiInterface>(getPokemonList())
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
    const { data } = await pokemonAPI
      .get<PokeapiPokemomInterface>(getPokemonById(pokemonUrl))

    const { types, height, weight, name, sprites } = data

    const [type1,type2] = types.map((type) => type.type.name)

    const convertedHeight = height * 10 //convert decimeter to cm
    const convertedWeight = weight * 10  //convert hectogram to gram
    const formattedImageUrl = sprites.other['official-artwork']?.front_default

    const pokemonFormated: PokemonNoId = {
      name,
      height: convertedHeight,
      weight: convertedWeight,
      types: {
        type1,
        type2
      },
      imageUrl: formattedImageUrl,
    }

    return pokemonFormated
  })
  return Promise.all(pokemomArray)
}

const registerPokemon = async (newPokemom: PokemonNoId) => {
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
    const {height, name, types, weight, imageUrl } = req.body
    const newPokemon:PokemonNoId = { height, name, types, weight, imageUrl }
    await registerPokemon(newPokemon)
    res.status(200).json(await getAllPokemons())
  }
  else if (req.method === 'PUT') {

    const {id, height, name, types, weight, imageUrl } = req.body
    const newPokemon: PokemonNoId = { height, name, types, weight, imageUrl }
    await supabase.from("pokemons")
      .update(newPokemon)
      .match({ id: id });
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
