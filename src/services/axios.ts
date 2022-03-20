import axios from 'axios';
import { buildWebStorage, setupCache } from 'axios-cache-interceptor/dist/index.cjs';

export const pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export const api = setupCache(axios.create({
  baseURL: 'api',
}));

export interface PokemonInterface {
  id?: number
  name: string
  height: number
  weight: number
  types: {
    type1: string,
    type2: string,
  }
  imageUrl: string
};
