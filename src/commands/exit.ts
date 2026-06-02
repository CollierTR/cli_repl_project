import type { CLICommand } from "./commandRegistry.js";

export function exit(
  _args: string[],
  _commands: Record<string, CLICommand>,
): void {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}
