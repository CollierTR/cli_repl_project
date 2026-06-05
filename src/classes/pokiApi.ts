export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationEndpoint = "/location-area/";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationEndpoint}`;
    const res = await fetch(pageURL ? pageURL : url);
    const data = await res.json();
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationEndpoint}${locationName}/`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}

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
