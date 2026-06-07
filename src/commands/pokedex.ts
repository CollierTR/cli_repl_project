import type { State } from "../state.js";
import type { Pokemon } from "../classes/pokiApi.js";

export async function pokedex(state: State): Promise<void> {
  if (Object.keys(state.pokedex).length === 0) {
    console.log("Pokedex is empty");
    return;
  }

  console.log("Your Pokedex:");

  const data = state.pokedex;

  let typesString = "";

  for (const pokemon in data) {
    console.log(` - ${pokemon}`);
  }
}
