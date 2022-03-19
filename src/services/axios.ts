import axios from 'axios';

export const pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});


export const pokemonData = axios.create({
  baseURL: '',
});

export const api = axios.create({
  baseURL: 'api',
});

export interface PokemonInterface {
  id: number
  name: string
  height: number
  weight: number
  types: {
    type1: string,
    type2: string,
  }
  imageUrl: string
};
