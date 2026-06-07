import type { State } from "../state.js";
import type { LocationDetail } from "../classes/pokiApi.js";

export async function explore(state: State, location: string): Promise<void> {
  const data: LocationDetail = await state.pokiApi.fetchLocation(location);
  const pokemonList = data.pokemon_encounters;

  if (pokemonList.length === 0) {
    console.log("No Pokemon found...");
    return;
  }

  console.log("Found Pokemon:");
  for (const pokemon of pokemonList) {
    console.log(pokemon.pokemon?.name);
  }
}
