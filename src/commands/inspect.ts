import type { State } from "../state.js";
import type { Pokemon } from "../classes/pokiApi.js";

export async function inspect(state: State, pokemon: string): Promise<void> {
  if (!state.pokedex[pokemon]) {
    console.log(`you have not caught that pokemon`);
    return;
  }

  const data = state.pokedex[pokemon] as Pokemon;

  const types = data.types;
  const stats = data.stats;
  let typesString = "";
  let statsString = "";

  for (const type of types) {
    typesString += `- ${type.type.name}\n`;
  }

  for (const stat of stats) {
    statsString += `  -${stat.stat.name}: ${stat.base_stat}\n`;
  }

  console.log(`
Name: ${data.name}
Height: ${data.height}
Weight: ${data.weight}
Stats:
${statsString}
Types:
${typesString}
              `);
}
