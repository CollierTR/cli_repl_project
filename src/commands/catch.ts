import type { State } from "../state.js";
import type { Pokemon } from "../classes/pokiApi.js";

export async function catchPokemon(
  state: State,
  pokemon: string,
): Promise<void> {
  console.log(`Throwing a Pokeball at ${pokemon}...`);

  const data: Pokemon = await state.pokiApi.fetchPokemon(pokemon);

  if (state.pokedex[pokemon]) {
    console.log(`You already have a ${pokemon}`);
    return;
  }

  const baseExp = data.base_experience;
  const catchChance = Math.max(10, 100 - baseExp);
  const roll = Math.floor(Math.random() * 100);

  if (roll < catchChance) {
    console.log(`${pokemon} was caught!`);
    console.log("You may now inspect it with the inspect command.");
    state.pokedex[pokemon] = data as Pokemon;
  } else {
    console.log(`${pokemon} escaped!`);
  }
}
