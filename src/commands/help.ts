import { getCommands } from "./commandRegistry.js";
import type { CLICommand } from "./commandRegistry.js";

export function help(
  _args: string[],
  _commands: Record<string, CLICommand>,
): void {
  const commands = getCommands();
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
