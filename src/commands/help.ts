import { getCommands } from "./commandRegistry.js";
import type { State } from "../state.js";

export function help(state: State): void {
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
