import type { State } from "../state.js";

export async function help(state: State): Promise<void> {
  const commands = state.commands;
  let printableCommands: string = "";

  for (const command in commands) {
    printableCommands += `${commands[command].name}: ${commands[command].description}\n`;
  }

  console.log(`
Welcome to the Pokedex!
Usage:

${printableCommands}
              `);
}
