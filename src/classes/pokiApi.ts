import { Cache } from "../pokecache.js";

const ttl = 5 * 60 * 1000; // 5 min == 300000 ms

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationEndpoint = "/location-area/";
  private static readonly pokemonEndpoint = "/pokemon/";
  #cache: Cache | undefined;

  constructor() {
    this.#cache = new Cache(ttl);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationEndpoint}`;

    if (this.#cache?.get(pageURL ? pageURL : url)) {
      return this.#cache.get(pageURL ? pageURL : url) as ShallowLocations;
    }

    const res = await fetch(pageURL ? pageURL : url);
    const data = await res.json();
    this.#cache?.add(pageURL ? pageURL : url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<LocationDetail> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationEndpoint}${locationName}`;

    if (this.#cache?.get(url)) {
      return this.#cache.get(url) as LocationDetail;
    }

    const res = await fetch(url);
    const data = await res.json();
    this.#cache?.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}${PokeAPI.pokemonEndpoint}${pokemonName}`;

    const res = await fetch(url);
    const data = await res.json();
    this.#cache?.add(url, data);
    return data;
  }
}
export type Pokemon = {
  name: string;
  base_experience: 64;
};

export interface Location {
  name: string;
  url: string;
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: Location[];
};

export type LocationDetail = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];

  game_index: number;

  id: number;

  location: {
    name: string;
    url: string;
  };

  name: string;

  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];

  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: unknown[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
