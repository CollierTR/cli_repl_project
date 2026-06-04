import { Readline } from "node:readline/promises";
import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands/commandRegistry.js";

export type State = {
  commands: Record<string, CLICommand>;
  rl: Interface;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export function initState() {
  const commands = getCommands();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex >",
  });

  return {
    commands: commands,
    rl: rl,
  };
}
